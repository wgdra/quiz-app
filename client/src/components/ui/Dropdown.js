import React from "react";
import { Dropdown } from "antd";

const DropDown = ({ ...props }) => {
  const items = props.items;

  const handleMenuClick = (e) => {
    console.log("e", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown.Button menu={menuProps} {...props}>
      {props.label}
    </Dropdown.Button>
  );
};

export default DropDown;
