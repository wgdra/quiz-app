import { Layout } from "antd";
import DropDown from "../components/ui/Dropdown";
import MenuNavigate from "../components/ui/Menu";
import { UserOutlined } from "@ant-design/icons";

const HeaderWrapper = () => {
  const { Header } = Layout;
  const role = 0;
  const isRole = role === 0 ? "Admin" : "Tài khoản";

  return (
    <Header
      style={{
        padding: "0px 16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <MenuNavigate
        theme="light"
        mode="horizontal"
        style={{
          width: "100%",
          fontSize: "1.4em",
          fontWeight: "bold",
          backgroundColor: "#001529",
        }}
        itemColor={"#fff"}
        itemHoverColor={"#1677ff"}
        itemHoverBg={"#black"}
        items={[
          {
            key: "/home",
            label: "Trang Chủ",
          },
        ]}
      />
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
      />
    </Header>
  );
};

export default HeaderWrapper;
