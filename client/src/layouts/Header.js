import { Layout } from "antd";
import DropDown from "../components/ui/Dropdown";
import MenuNavigate from "../components/ui/Menu";
import { UserOutlined } from "@ant-design/icons";

const HeaderWrapper = ({ ...props }) => {
  const { Header } = Layout;

  return (
    <Header
      {...props}
      // style={{
      //   padding: "0px 16px",
      //   display: "flex",
      //   alignItems: "center",
      // }}
    >
      {/* {role === 0 && (
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
      )} */}
      {/* <DropDown
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
      /> */}
      {props.children}
    </Header>
  );
};

export default HeaderWrapper;
