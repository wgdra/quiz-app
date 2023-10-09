import React from "react";
import { Dropdown } from "antd";

const DropDown = ({ ...props }) => {
  const items = props.items;

  const menuProps = {
    items,
  };

  return (
    <Dropdown.Button menu={menuProps} {...props}>
      {props.label}
    </Dropdown.Button>
  );
};

export default DropDown;
