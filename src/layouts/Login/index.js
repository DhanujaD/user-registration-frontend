import React from "react";
import { Form, Input, Button } from "antd";
import WrapperComponent from "../../common/WrapperComponent";
import "./login.css";
import handleError from '../../common/handleError'
import sendApiRequest from '../../common/sendApiRequest'
import login from '../../common/login'

class Login extends React.Component {
    render() {
        return (
            <div className="login-component">
                <h2>Login</h2>
                <Form layout="vertical" form={this.props.form} onFinish={(values) => login(values, sendApiRequest, this.props.navigate, handleError)}>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: "Please enter username" },
                        ]}
                    >
                        <Input placeholder="Please enter username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "Please enter password" },
                        ]}
                    >
                        <Input.Password placeholder="Please enter password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>{" "}
                        <span>
                            Don't have an account? <a href="/register">Register</a>
                        </span>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const wrappedComponent = () => <WrapperComponent component={Login} />;
export default wrappedComponent;
