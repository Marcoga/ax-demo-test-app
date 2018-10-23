import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon, Avatar, Drawer, Switch, Select, Divider } from "antd";
import TranslatedText from "./TranslatedText";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Option = Select.Option;

class Navigation extends React.Component {
  state = {
    current: "watchlist",
    theme: localStorage.getItem("theme") || "light",
    language:
      document.cookie && document.cookie.includes("lang=")
        ? document.cookie.replace("lang=", "")
        : "de",
    userSettingsOpen: false
  };

  handleClick = e => {
    if (e.key === "user") {
      this.setState({ userSettingsOpen: true });
      return;
    }
    this.setState(
      {
        current: e.key
      },
      () => {
        this.props.history.push(e.key);
      }
    );
  };

  componentDidMount() {
    window.addEventListener(
      "message",
      event => {
        if (event.data && event.data.theme) {
          this.setState({
            theme: event.data.theme
          });
        }
      },
      false
    );
  }

  render() {
    return (
      <>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="watchlist">
            <Icon type="stock" theme="outlined" />
            <TranslatedText lang={this.state.language} textKex="watchlist" />
          </Menu.Item>
          <Menu.Item key="fxrates">
            <Icon type="dollar" theme="outlined" />Fx Rates
          </Menu.Item>
          <Menu.Item key="positions" disabled>
            <Icon type="table" theme="outlined" />Positions
          </Menu.Item>
          <Menu.Item key="transactions" disabled>
            <Icon type="wallet" theme="outlined" />Transactions
          </Menu.Item>
          <Menu.Item key="user" style={{ float: "right" }}>
            {this.props.username}
            <Avatar icon="user" style={{ marginLeft: 5 }} />
          </Menu.Item>
        </Menu>
        <Drawer
          title={
            <>
              {this.props.username}
              <Avatar icon="user" style={{ marginLeft: 5 }} />
            </>
          }
          placement="right"
          closable={false}
          onClose={() => {
            this.setState({ userSettingsOpen: false });
          }}
          visible={this.state.userSettingsOpen}
        >
          <div>
            Theme:
            <Switch
              checkedChildren="Light"
              unCheckedChildren="Dark"
              style={{ marginLeft: 30 }}
              checked={this.state.theme === "light"}
              onChange={useLight => {
                const newTheme = useLight ? "light" : "dark";
                this.setState({ theme: newTheme }, () => {
                  localStorage.setItem("theme", newTheme);
                });
              }}
            />
          </div>
          <Divider />
          <div>
            <label for="lang-selector">Language:</label>
            <Select
              id="lang-selector"
              defaultValue={this.state.language}
              style={{ marginLeft: 15, width: 100 }}
              onChange={value => {
                this.setState({
                  language: value
                });
              }}
            >
              <Option value="en">English</Option>
              <Option value="de">Deutsch</Option>
            </Select>
          </div>
          <Divider />
        </Drawer>
      </>
    );
  }
}

export default withRouter(Navigation);
