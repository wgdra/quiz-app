import { Layout, Row, Col, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderWrapper from "../layouts/Header";
import Logo from "../assets/images/Sprout-logo.png";
import ButtonGroup from "../components/ui/ButtonGroup";
import ButtonBasic from "../components/ui/Button";
import wallpaper_home_4 from "../assets/images/wallpaper-home-i4.jpg";

const Home = () => {
  const { Content } = Layout;
  const navigate = useNavigate();

  const btnNavigate = [
    {
      label: "Giới Thiệu",
      href: "/",
    },
    {
      label: "Vào Học",
      href: "",
    },
    {
      label: "Tin Tức",
      href: "",
    },
    {
      label: "Liên Hệ",
      href: "",
    },
  ];

  const onClickAuth = (e) => {
    switch (e.target.innerText) {
      case "Đăng ký":
        navigate("/signup");
        break;

      case "Đăng nhập":
        navigate("/login");

        break;
      default:
        break;
    }
  };

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <HeaderWrapper
        style={{
          height: 80,
          background: "#6051f8",
          padding: "0px 160px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={Logo} style={{ width: 160 }} />
        <Row style={{ width: "80%" }}>
          <Col span={16} offset={8}>
            {btnNavigate.map((item, index) => {
              return (
                <ButtonBasic
                  key={index}
                  type="link"
                  href={item.href}
                  size="large"
                  label={item.label}
                  fontWeight="bold"
                  tokenCustomize={{
                    fontSize: 14,
                    colorLink: "#FFFFFF",
                  }}
                  style={{
                    margin: "0px 24px",
                  }}
                />
              );
            })}
          </Col>
        </Row>
        <Space style={{ width: "20%", justifyContent: "flex-end" }}>
          <ButtonGroup
            items={[
              {
                type: "primary",
                label: "Đăng nhập",
                style: { background: "#04aa6d" },
                buttonDesign: {
                  fontWeight: "bold",
                  defaultColor: "#FFFFFF",
                  defaultBorderColor: "#6DAE40",
                  defaultBg: "#6DAE40",
                  colorPrimaryHover: "#FFFFFF",
                  colorPrimaryActive: "#FFFFFF",
                  paddingInlineLG: 20,
                },
                onClick: onClickAuth,
              },
              {
                type: "primary",
                label: "Đăng ký",
                buttonDesign: {
                  fontWeight: "bold",
                  defaultColor: "#FFFFFF",
                  defaultBorderColor: "#6051f8",
                  defaultBg: "#6051f8",
                  colorPrimaryHover: "#FFFFFF",
                  colorPrimaryActive: "#FFFFFF",
                  paddingInlineLG: 20,
                },
                onClick: onClickAuth,
              },
            ]}
            size="large"
            style={{ marginRight: 12 }}
          />
        </Space>
      </HeaderWrapper>
      <Content
        style={{
          padding: "30px 30px",
          background: "#f5f5f5",
        }}
      >
        <Outlet />
        <img
          src={wallpaper_home_4}
          style={{ width: "96vw", height: "100vh", margin: "-30px, -30px" }}
        />
      </Content>
    </Layout>
  );
};

export default Home;
