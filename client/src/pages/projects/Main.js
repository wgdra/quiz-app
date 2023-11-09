import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideWrapper from "../../layouts/Sidebar";
import HeaderWrapper from "../../layouts/Header";
import FooterWrapper from "../../layouts/Footer";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout } from "antd";
import DropDown from "../../components/ui/Dropdown";
const { Header, Content, Footer } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Tổng Quan", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Chọn lớp", "sub1", <UserOutlined />, [
    getItem("Lớp 1", "3"),
    getItem("Lớp 2", "4"),
    getItem("Lớp 3", "5"),
    getItem("Lớp 4", "6"),
    getItem("Lớp 5", "7"),
  ]),
];

const MainProject = () => {
  const navigate = useNavigate();
  const role = 1;

  const isRole = role === 0 ? "Admin" : "Tài khoản";

  // Handle Navigate
  const handleNavigate = (e) => {
    // switch (e) {
    //   case "1":
    //     navigate("/project/overview");
    //     break;
    //   case "2":
    //     navigate("/manage/user");
    //     break;
    //   case "4":
    //     navigate("/manage/synthetic");
    //     break;
    //   case "5":
    //     navigate("/manage/theory");
    //     break;
    //   case "6":
    //     navigate("/manage/test");
    //     break;
    //   case "9":
    //     navigate("/result/test");
    //     break;
    //   default:
    //     break;
    // }
  };

  const handleButtonClick = (e) => {
    console.log("e", e);
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
        padding: "12px 12px 12px 0px",
        background: "#6051f8",
      }}
    >
      <SideWrapper
        items={items}
        handleNavigate={handleNavigate}
        background="#6051f8"
      />
      <Layout
        style={{
          background: "#6051f8",
        }}
      >
        <HeaderWrapper
          style={{
            padding: 0,
            background: "#f5f5f5",
            borderTopLeftRadius: "50px",
            borderTopRightRadius: "50px",

            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <DropDown
            key="1"
            label={isRole}
            icon={<UserOutlined />}
            items={[
              {
                key: "2",
                label: "Hồ Sơ",
                icon: <UserOutlined />,
              },
              {
                key: "3",
                label: "Đăng Xuất",
                icon: <UserOutlined />,
              },
            ]}
            placement="bottomLeft"
            style={{
              justifyContent: "end",
              marginRight: 18,
            }}
            onClick={handleButtonClick}
          />
        </HeaderWrapper>
        <Content
          style={{
            padding: "0 16px",
            background: "#f5f5f5",
          }}
        >
          <Outlet />
        </Content>
        <FooterWrapper />
      </Layout>
    </Layout>
  );
};

export default MainProject;
