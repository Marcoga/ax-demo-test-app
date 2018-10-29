import React from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Card,
  Popover,
  Alert
} from "antd";
import "./Login.css";

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  state = {
    userError: false,
    passwordError: false,
    loggedIn: !!localStorage.getItem("user"),
    user: localStorage.getItem("user")
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const userError = !values.userName;
      const passwordError = !values.password;
      this.setState({
        userError,
        passwordError,
        loggedIn: !userError & !passwordError,
        user: values.userName
      });
    });
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <Alert
            message={`Welcome ${this.state.user}`}
            description="You have successfully logged in."
            type="success"
            showIcon
          />
        </div>
      );
    }
    const { getFieldDecorator } = this.props.form;
    let userErrors = {};
    if (this.state.userError) {
      userErrors = {
        validateStatus: "error",
        help: "Please input your username!"
      };
    }
    let passwordErrors = {};
    if (this.state.passwordError) {
      passwordErrors = {
        validateStatus: "error",
        help: "Please input your Password!"
      };
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Card title="Login" style={{ width: 350 }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem {...userErrors}>
              {getFieldDecorator("userName", {})(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem {...passwordErrors}>
              {getFieldDecorator("password", {})(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                id="submit"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);

export const Login = ({ children }) => <LoginForm children={children} />;
