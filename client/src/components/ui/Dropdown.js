import React from "react";
import { ConfigProvider, Dropdown } from "antd";

const DropDown = ({ ...props }) => {
  const { items, handleMenuClick } = props;

  const menuProps = {
    items,
    onClick: (e) => handleMenuClick(e.domEvent.target.innerText),
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
