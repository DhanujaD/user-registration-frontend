import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import UpdateProfile from "./UpdateProfile";
import ViewAllUsers from "./ViewAllUsers";
import NotFound from "./NotFound";
import logo from "../logo.svg";

import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    UserOutlined,
    TeamOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const isAuthenticated =
            typeof currentUser !== "undefined" && currentUser !== null;
        setCurrentUser(currentUser);
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, []);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        navigate("/login");
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <img style={{ width: 84 }} src={logo} alt="Logo" />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/dashboard">Home</Link>
                    </Menu.Item>

                    <Menu.Item key="2" icon={<UserOutlined />}>
                        <Link
                            to={`/dashboard/update-profile/${
                                currentUser ? currentUser.id : ""
                            }`}
                        >
                            Profile
                        </Link>
                    </Menu.Item>
                    {currentUser.role === "Admin" && (
                        <Menu.Item key="3" icon={<TeamOutlined />}>
                            <Link to="/dashboard/view-all-users">
                                View All users
                            </Link>
                        </Menu.Item>
                    )}
                    <Menu.Item
                        key="4"
                        icon={<LogoutOutlined />}
                        onClick={logout}
                    >
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: toggle,
                        }
                    )}
                </Header>
                <Content className="site-layout-background">
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route
                            path="/update-profile/:id"
                            element={<UpdateProfile userId={currentUser.id} />}
                        />
                        <Route
                            path="/view-all-users"
                            element={<ViewAllUsers />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Dashboard;
