import { useState } from "react";
import { Layout, Row, Col, Space, Carousel } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import wallpaper_home_1 from "../assets/images/wallpaper-home-i1.jpg";
import wallpaper_home_2 from "../assets/images/wallpaper-home-i2.jpg";
import wallpaper_home_3 from "../assets/images/wallpaper-home-i3.jpg";
import wallpaper_home_4 from "../assets/images/wallpaper-home-i4.jpg";
import wallpaper_home_5 from "../assets/images/wallpaper-home-i5.jpg";
import HeaderWrapper from "../layouts/Header";
import Logo from "../assets/images/Sprout-logo.png";
import ButtonGroup from "../components/ui/ButtonGroup";
import ButtonBasic from "../components/ui/Button";

const Home = () => {
  const { Content } = Layout;
  const navigate = useNavigate();

  const [isHomePage, setIsHomePage] = useState(true);

  const btnNavigate = [
    {
      label: "Giới Thiệu",
      href: "",
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

  const onClickLogo = () => {
    navigate("/");
    setIsHomePage(true);
  };

  const onClickAuth = (e) => {
    switch (e.target.innerText) {
      case "Đăng ký":
        setIsHomePage(false);
        navigate("/signup");
        break;

      case "Đăng nhập":
        setIsHomePage(false);
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
        <img
          src={Logo}
          style={{ width: 160, cursor: "pointer" }}
          onClick={onClickLogo}
        />
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

      {isHomePage ? (
        <Carousel autoplay effect="fade" autoplaySpeed={6000} speed={800}>
          <img src={wallpaper_home_1} />
          <img src={wallpaper_home_2} />
          <img src={wallpaper_home_3} />
          <img src={wallpaper_home_4} />
          <img src={wallpaper_home_5} />
        </Carousel>
      ) : (
        <Content
          style={{
            padding: "30px 30px",
            background: "#f5f5f5",
          }}
        >
          <Outlet />
        </Content>
      )}
    </Layout>
  );
};

export default Home;
