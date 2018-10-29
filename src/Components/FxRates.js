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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <img
                      width="35"
                      src={`https://www.xe.com/themes/xe/images/flags/svg/${r.symbol
                        .substr(3)
                        .toLowerCase()}.svg`}
                    />
                  </div>
                  <div style={{ marginLeft: 7 }}>{`${r.symbol.substr(3)}`}</div>
                </div>
              )
            },
            {
              title: (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <div>
                    <img
                      width="35"
                      src="https://www.xe.com/themes/xe/images/flags/svg/eur.svg"
                    />
                  </div>
                  <div style={{ marginLeft: 7 }}>1 EUR</div>
                </div>
              ),
              align: "right",
              dataIndex: "bid",
              key: "bid"
            }
          ]}
        />
      </div>
    );
  }
}
