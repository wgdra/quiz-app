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
        overflow: "initial",
        // minHeight: "88vh",
      }}
    >
      <div
        style={{
          height: "88vh",
          maxHeight: "88vh",
          padding: 24,
          textAlign: "center",
          background: colorBgContainer,
        }}
      >
        {props.children}
      </div>
    </Content>
  );
};

export default PageContainer;
