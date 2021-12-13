import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./login.css";
import handleError from '../../common/handleError'
import sendApiRequest from '../../common/sendApiRequest'

function Login(props) {
    let navigate = useNavigate();
    const [form] = Form.useForm();

    const login = (values) => {
        sendApiRequest('post', "login", values)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(response.data.user)
                );
                navigate("/dashboard");
            })
            .catch((error) => {
                handleError(error.response);
            });
    };

    return (
        <div className="login-component">
            <h2>Login</h2>
            <Form layout="vertical" form={form} onFinish={login}>
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

export default Login;
