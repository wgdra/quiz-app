import SideWrapper from "../../layouts/Sidebar";
import HeaderWrapper from "../../layouts/Header";
import PageContainer from "../../layouts/PageContainer";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  SnippetsOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";

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
  // getItem("DASHBOARD", "1", <AppstoreOutlined />),
  getItem("Người Dùng", "2", <TeamOutlined />),
  getItem("Quản Lý", "sub1", <UnorderedListOutlined />, [
    getItem("Bài Tập Trắc Nghiệm", "4"),
    getItem("Ôn Tập Lý Thuyết", "5"),
    getItem("Bài Thi", "6"),
  ]),
  getItem("Kết Quả", "sub2", <CarryOutOutlined />, [
    getItem("Bài Thi", "sub3", <CarryOutOutlined />, [
      getItem("Môn Toán", "9"),
      getItem("Môn Tiếng Việt", "10"),
    ]),
  ]),
];

const MainAdmin = () => {
  const navigate = useNavigate();
  const { Content } = Layout;

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
        navigate("/manage/theories");
        break;

      case "6":
        navigate("/manage/test");
        break;

      case "9":
        navigate("/result/test");
        break;

      default:
        break;
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SideWrapper items={items} handleNavigate={handleNavigate} />
      <Layout>
        <HeaderWrapper />

        <PageContainer>
          <Outlet />
        </PageContainer>
      </Layout>
    </Layout>
  );
};

export default MainAdmin;
