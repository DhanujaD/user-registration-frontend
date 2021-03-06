import React from "react";
import WrapperComponent from "../../common/WrapperComponent";
import { Form, Input, Button } from "antd";
import "./register.css";
import handleError from '../../common/handleError'
import sendApiRequest from '../../common/sendApiRequest'
import login from '../../common/login'


class Register extends React.Component {

    submitData(values, navigate) {
        delete values.confirmPassword;
        sendApiRequest('post', "user", values)
            .then((response) => {
                login({
                    username: response.data.username,
                    password: response.data.password,
                }, sendApiRequest, navigate, handleError);
            })
            .catch((error) => {
                handleError(error.response);
            });
    };

    render() {
        return (
            <div className="register-container">
                <h2>Register</h2>
                <Form layout="vertical" form={this.props.form} onFinish={(values) => this.submitData(values, this.props.navigate)}>
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        tooltip="This field is required"
                        rules={[
                            { required: true, message: "Please enter first name" },
                        ]}
                    >
                        <Input placeholder="Please enter first name" />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        tooltip="This field is required"
                        rules={[
                            { required: true, message: "Please enter last name" },
                        ]}
                    >
                        <Input placeholder="Please enter last name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        tooltip="This field is required"
                        rules={[{ required: true, message: "Please enter email" }]}
                    >
                        <Input placeholder="Please enter email" />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        tooltip="This field is required"
                        rules={[
                            { required: true, message: "Please enter username" },
                        ]}
                    >
                        <Input placeholder="Please enter username" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        tooltip="This field is required"
                        rules={[
                            { required: true, message: "Please enter password" },
                        ]}
                    >
                        <Input.Password placeholder="Please enter password" />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        tooltip="This field is required"
                        rules={[
                            { required: true, message: "Please confirm password" },
                        ]}
                    >
                        <Input.Password placeholder="Please enter password again" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>{" "}
                        <span>
                            Already have an account? <a href="login">Sign in</a>
                        </span>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const wrappedComponent = () => <WrapperComponent component={Register} />;
export default wrappedComponent;
