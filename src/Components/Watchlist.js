import React from "react";
import {
  Table,
  Divider,
  Tag,
  Button,
  Popconfirm,
  Popover,
  AutoComplete,
  Input,
  Icon
} from "antd";
import Trend from "react-trend";
import TranslatedText from "./TranslatedText";

const getColorClass = value => {
  if (value === 0) return "";

  if (value > 0) return "positive";

  return "negative";
};
export default class Watchlist extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  };
  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };
  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };
  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    return (
      <div className="app-content watchlist">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>
            <TranslatedText lang={this.props.language} textKey="watchlist" />
          </h2>
          <AutoComplete
            className="certain-category-search"
            dropdownClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={false}
            dropdownStyle={{ width: 300 }}
            size="large"
            style={{ width: "300px", marginLeft: 20 }}
            dataSource={this.props.removedItems}
            placeholder="Search for stock"
            optionLabelProp="value"
            onChange={value => {
              this.props.onAddTicker(value);
            }}
          />
        </div>
        <Divider />
        <Table
          onChange={this.handleChange}
          columns={[
            {
              title: "Name",
              dataIndex: "ticker",
              key: "ticker2",
              render: (ticker, record) => (
                <div>
                  <div>{ticker}</div>
                  <div className="ant-list-item-meta-description">
                    {record.display_name}
                  </div>
                </div>
              ),
              filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters
              }) => (
                <div className="custom-filter-dropdown">
                  <Input
                    ref={ele => (this.searchInput = ele)}
                    placeholder="Search ticker"
                    value={selectedKeys[0]}
                    onChange={e =>
                      setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={this.handleSearch(selectedKeys, confirm)}
                  />
                  <Button
                    type="primary"
                    onClick={this.handleSearch(selectedKeys, confirm)}
                  >
                    Search
                  </Button>
                  <Button onClick={this.handleReset(clearFilters)}>
                    Reset
                  </Button>
                </div>
              ),
              onFilter: (value, record) =>
                record.ticker.toLowerCase().includes(value.toLowerCase()),
              onFilterDropdownVisibleChange: visible => {
                if (visible) {
                  setTimeout(() => {
                    this.searchInput.focus();
                  });
                }
              },
              sorter: (a, b) =>
                a.ticker.toLowerCase().localeCompare(b.ticker.toLowerCase()),
              sortOrder: sortedInfo.columnKey === "ticker2" && sortedInfo.order
            },
            {
              title: (
                <TranslatedText lang={this.props.language} textKey="change" />
              ),
              dataIndex: "pct_change",
              align: "right",
              key: "pct_change",
              render: text => (
                <span className={getColorClass(text)}>{`${parseFloat(
                  text
                ).toFixed(2)}%`}</span>
              ),
              sorter: (a, b) => a.pct_change - b.pct_change,
              sortOrder:
                sortedInfo.columnKey === "pct_change" && sortedInfo.order
            },
            {
              title: (
                <TranslatedText
                  lang={this.props.language}
                  textKey="net_change"
                />
              ),
              dataIndex: "net_change",
              align: "right",
              key: "net_change",
              render: (text, record) => (
                <Popover
                  title={`${record.ticker} Trend`}
                  content={
                    <Trend
                      smooth
                      autoDraw
                      autoDrawDuration={3000}
                      autoDrawEasing="ease-out"
                      data={[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 15]}
                      gradient={["#f72047", "#ffd200", "#1feaea"]}
                      radius={0}
                      strokeWidth={2.5}
                      strokeLinecap={"square"}
                    />
                  }
                >
                  <span
                    className={`detail-chart ${getColorClass(text)}`}
                  >{`${parseFloat(text).toFixed(2)}`}</span>
                </Popover>
              )
            },
            {
              title: (
                <TranslatedText lang={this.props.language} textKey="high" />
              ),
              align: "right",
              dataIndex: "high",
              key: "high",
              render: text => <span>{`${parseFloat(text).toFixed(2)}`}</span>
            },
            {
              title: (
                <TranslatedText lang={this.props.language} textKey="low" />
              ),
              align: "right",
              dataIndex: "low",
              key: "low",
              render: text => <span>{`${parseFloat(text).toFixed(2)}`}</span>
            },
            {
              title: (
                <TranslatedText
                  lang={this.props.language}
                  textKey="last_price"
                />
              ),
              dataIndex: "latest_price",
              align: "right",
              key: "latest_price",
              render: text => <span>{`${parseFloat(text).toFixed(2)}`}</span>
            },

            {
              title: (
                <TranslatedText lang={this.props.language} textKey="remove" />
              ),
              dataIndex: "ticker",
              align: "center",
              render: ticker => (
                <Popconfirm
                  title={`Are you sure you want to remove ${ticker} from the watchlist?`}
                  onConfirm={() => {
                    this.props.onRemoveTicker(ticker);
                  }}
                >
                  <Button onClick={() => {}} shape="circle" icon="close" />
                </Popconfirm>
              )
            }
          ]}
          pagination={{
            pageSize: 20,
            hideOnSinglePage: true
          }}
          dataSource={this.props.data}
        />
      </div>
    );
  }
}
