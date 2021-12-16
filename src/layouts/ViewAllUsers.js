import React from "react";
import WrapperComponent from "../common/WrapperComponent";
import { Table, Tag, Space, Button } from "antd";
import handleError from '../common/handleError'
import displayNotification from '../common/displayNotification'
import sendApiRequest from '../common/sendApiRequest'

class ViewAllUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        }
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers() {
        sendApiRequest('get', "user")
            .then((response) => {
                const userData = response.data.map((user) => ({
                    key: user.id,
                    ...user
                }))
                this.setState({
                    userData
                })
            })
            .catch((error) => {
                handleError(error.response);
            });
    };

    deleteUser(id) {
        sendApiRequest('delete', "user/" + id)
            .then((response) => {
                displayNotification('success', 'User deleted successfully.')
                this.getAllUsers();
            })
            .catch((error) => {
                handleError(error.response);
            });
    };

    columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "User Role",
            key: "role",
            dataIndex: "role",
            render: (text) =>
                text && (
                    <Tag color={text === "Admin" ? "geekblue" : "green"}>
                        {" "}
                        {text.toUpperCase()}{" "}
                    </Tag>
                ),
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "id",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => {this.props.navigate(`/dashboard/update-profile/${text}`);}}>
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => {this.deleteUser(text);}}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    render() {
        return (
            <div>
                <h2>All Users</h2>
                <Table columns={this.columns} dataSource={this.state.userData} />
            </div>
        );
    }
}

const wrappedComponent = () => <WrapperComponent component={ViewAllUsers} />;
export default wrappedComponent;
