import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideWrapper from "../../layouts/Sidebar";
import HeaderWrapper from "../../layouts/Header";
import FooterWrapper from "../../layouts/Footer";
import {
  PieChartOutlined,
  MessageOutlined,
  TeamOutlined,
  ContactsOutlined,
  DownOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
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
  getItem("Trò chuyện", "2", <MessageOutlined />),
  getItem("Chọn lớp", "sub1", <TeamOutlined />, [
    getItem("Lớp 1", "3"),
    getItem("Lớp 2", "4"),
    getItem("Lớp 3", "5"),
    getItem("Lớp 4", "6"),
    getItem("Lớp 5", "7"),
  ]),
  getItem("Liên Hệ", "8", <ContactsOutlined />),
];

const MainProject = () => {
  const navigate = useNavigate();

  const full_name = "Nguyễn Tiến Trung";

  // Handle Navigate
  const handleNavigate = (key) => {
    switch (key) {
      case "1":
        navigate("/project/overview");
        break;
      case "3":
        navigate("/project/method", {
          state: {
            class: "Lớp 1",
          },
        });
        break;
      case "4":
        navigate("/project/method", {
          state: {
            class: "Lớp 2",
          },
        });
        break;
      case "5":
        navigate("/project/method", {
          state: {
            class: "Lớp 3",
          },
        });
        break;
      case "6":
        navigate("/project/method", {
          state: {
            class: "Lớp 4",
          },
        });
        break;
      case "7":
        navigate("/project/method", {
          state: {
            class: "Lớp 5",
          },
        });
        break;
      default:
        break;
    }
  };

  const handleButtonClick = () => {
    console.log("account");
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
        menuCustomize={{
          darkSubMenuItemBg: "#6051f8",
          darkItemSelectedBg: "#95d354",
          itemHeight: 50,
          itemBorderRadius: "0px 50px 50px 0px",
          itemMarginInline: "0px 30px",
        }}
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
            padding: "0px 30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <DropDown
            label={full_name}
            icon={<DownOutlined />}
            items={[
              {
                key: "1",
                label: "Hồ Sơ",
                icon: <UserOutlined />,
              },
              {
                key: "2",
                label: "Thiết lập",
                icon: <SettingOutlined />,
              },
              {
                type: "divider",
              },
              {
                key: "3",
                label: "Đăng Xuất",
              },
            ]}
            placement="bottomLeft"
            style={{
              justifyContent: "end",
              margin: "30px 0px",
            }}
            colorPrimary="#6051f8"
            onClick={handleButtonClick}
          />
        </HeaderWrapper>
        <Content
          style={{
            padding: "0 30px",
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
