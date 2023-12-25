import React from "react";
import { ConfigProvider, Checkbox } from "antd";

const CheckboxCustomize = ({ ...props }) => {
  return (
    <ConfigProvider
      theme={{
        token: props.checkBoxDesign,
      }}
    >
      <Checkbox {...props}>{props.label}</Checkbox>
    </ConfigProvider>
  );
};
export default CheckboxCustomize;
