import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  SnippetsOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";

const SideWrapper = (props) => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const getItem = (label, key, icon, children, type) => {
    return {
      label,
      key,
      icon,
      children,
      type,
    };
  };
  const items = [
    getItem("DASHBOARD", "1", <AppstoreOutlined />),
    getItem("Người Dùng", "2", <TeamOutlined />),
    getItem("Quản Lý", "sub1", <UnorderedListOutlined />, [
      getItem("Tổng hợp", "4"),
      getItem("Quản Lý Môn Học", "5"),
      getItem("Quản Lý Chương", "6"),
      getItem("Quản Lý Bài tập", "7"),
    ]),
    getItem("Bộ Bài Thi", "sub2", <SnippetsOutlined />, [
      getItem("Lý Thuyết", "9"),
      getItem("Trắc Nghiệm", "10"),
      getItem("Kết Quả", "sub3", <CarryOutOutlined />, [
        getItem("Môn Toán", "11"),
        getItem("Môn Tiếng Việt", "12"),
      ]),
    ]),
  ];

  // Handle Navigate
  const handleNavigate = (e) => {
    switch (e) {
      case "1":
        navigate("/manage");
        break;

      case "2":
        navigate("/manage/user");
        break;

      case "4":
        navigate("/manage/synthetic");
        break;

      case "5":
        navigate("/manage/subject");
        break;

      case "6":
        navigate("/manage/chapter");
        break;

      case "7":
        navigate("/manage/quiz");
        break;

      default:
        break;
    }
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        // overflow: "auto",
        // position: "fixed",
        // height: "100vh",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      width={238}
    >
      <div
        className="demo-logo-vertical"
        style={{ textAlign: "center", color: "white" }}
      >
        <h1 onClick={() => setCollapsed(!collapsed)}>Logooo</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        style={{ fontSize: "1.1em" }}
        onClick={(e) => handleNavigate(e.key)}
      />
    </Sider>
  );
};

export default SideWrapper;
