import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Tag, Space } from "antd";
import handleError from '../common/handleError'
import displayNotification from '../common/displayNotification'
import sendApiRequest from '../common/sendApiRequest'


function ViewAllUsers() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);

    const columns = [
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
                    <a
                        onClick={() => {
                            navigate(`/dashboard/update-profile/${text}`);
                        }}
                    >
                        Edit
                    </a>
                    <a
                        style={{ color: "red" }}
                        onClick={() => {
                            deleteUser(text);
                        }}
                    >
                        Delete
                    </a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        sendApiRequest('get', "user")
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                handleError(error.response);
            });
    };

    const deleteUser = (id) => {
        sendApiRequest('delete', "user/" + id)
            .then((response) => {
                displayNotification('success', 'User deleted successfully.')
                getAllUsers();
            })
            .catch((error) => {
                handleError(error.response);
            });
    };

    return (
        <div>
            <h2>All Users</h2>
            <Table columns={columns} dataSource={userData} />
        </div>
    );
}

export default ViewAllUsers;
