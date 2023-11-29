import React from "react";
import { ConfigProvider, Dropdown } from "antd";

const DropDown = ({ ...props }) => {
  const { items } = props;

  const handleMenuClick = (e) => {
    console.log("e", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          colorPrimary: props.colorPrimary,
        },
      }}
    >
      <Dropdown.Button menu={menuProps} {...props}>
        {props.label}
      </Dropdown.Button>
    </ConfigProvider>
  );
};

export default DropDown;
