import React from "react";
import { Layout, theme } from "antd";

const PageContainer = (props) => {
  const { Content } = Layout;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: "24px 16px",
      }}
    >
      <div
        style={{
          minHeight: "88vh",
          padding: 24,
          background: colorBgContainer,
        }}
      >
        {props.children}
      </div>
    </Content>
  );
};

export default PageContainer;
