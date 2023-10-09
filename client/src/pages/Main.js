import SideWrapper from "../layouts/Sidebar";
import HeaderWrapper from "../layouts/Header";
import PageContainer from "../layouts/PageContainer";
import FooterWrapper from "../layouts/Footer";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const Main = () => {
  const role = 0;

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SideWrapper />
      <Layout className="site-layout">
        <HeaderWrapper />
        <PageContainer>
          <Outlet />
        </PageContainer>
        {role === 1 && <FooterWrapper />}
      </Layout>
    </Layout>
  );
};

export default Main;
