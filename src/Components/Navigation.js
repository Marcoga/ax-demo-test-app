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
            <TranslatedText lang={this.props.language} textKey="watchlist" />
          </Menu.Item>
          <Menu.Item key="fxrates">
            <Icon type="dollar" theme="outlined" />
            <TranslatedText lang={this.props.language} textKey="fxrates" />
          </Menu.Item>
          <Menu.Item key="positions" disabled>
            <Icon type="table" theme="outlined" />
            <TranslatedText lang={this.props.language} textKey="positions" />
          </Menu.Item>
          <Menu.Item key="transactions" disabled>
            <Icon type="wallet" theme="outlined" />
            <TranslatedText lang={this.props.language} textKey="transactions" />
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
              defaultValue={this.props.language}
              style={{ marginLeft: 15, width: 100 }}
              onChange={this.props.onLangChange}
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
