import React, { useState } from "react";
import { ConfigProvider, Layout, Menu } from "antd";

const SideWrapper = ({ ...props }) => {
  const { items, handleNavigate, background } = props;

  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
        },
        components: {
          Menu: {
            /* here is your component tokens */
            darkSubMenuItemBg: "#6051f8",
            darkItemSelectedBg: "#95d354",
            itemHeight: 50,
            itemBorderRadius: "0px 50px 50px 0px",
            itemMarginInline: "0px 30px",
          },
        },
      }}
    >
      <Sider
        {...props}
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
          background: background,
        }}
        width={238}
        onCollapse={(value) => setCollapsed(value)}
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
          style={{
            fontSize: "1.2em",
            fontWeight: "bold",
            background: background,
          }}
          onClick={(e) => handleNavigate(e.key)}
        />
      </Sider>
    </ConfigProvider>
  );
};

export default SideWrapper;
