import React from "react";
import { Table, Spin } from "antd";
import "./FxRates.css";

export default class FxRates extends React.Component {
  render() {
    if (this.props.loading) return <Spin />;
    return (
      <div className="app-content fx-rates">
        <Table
          dataSource={this.props.rates || []}
          columns={[
            {
              title: "Currency",
              key: "currency",
              render: (_, r) => (
                <div>{`${r.symbol.substr(0, 3)} - ${r.symbol.substr(3)}`}</div>
              )
            },
            {
              title: "Rate",
              dataIndex: "bid",
              key: "bid"
            }
          ]}
        />
      </div>
    );
  }
}
