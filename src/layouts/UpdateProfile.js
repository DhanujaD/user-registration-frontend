import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import handleError from '../common/handleError'
import displayNotification from '../common/displayNotification'
import sendApiRequest from '../common/sendApiRequest'


function UpdateProfile(props) {
    let { id } = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        fillFormData(id);
    }, []);

    const fillFormData = (userId) => {
        sendApiRequest('get', "user/" + userId)
            .then((response) => {
                form.setFieldsValue(response.data);
            })
            .catch((error) => {
                handleError(error.response);
            });
    };

    const submitData = (values) => {
        delete values.confirmPassword;
        sendApiRequest('put', "user/" + props.userId, values)
            .then((response) => {
                displayNotification('success', 'User updated successfully.')
            })
            .catch((error) => {
                handleError(error.response);
            });
    };

    return (
        <div>
            <h2>Update Profile</h2>
            <Form layout="vertical" form={form} onFinish={submitData}>
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
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UpdateProfile;
