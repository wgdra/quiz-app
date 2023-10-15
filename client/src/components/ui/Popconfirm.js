import { QuestionCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Button, Popconfirm, ConfigProvider } from "antd";

const PopConfirm = ({ ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Popconfirm: {
            /* here is your component tokens */
          },
        },
      }}
    >
      <Popconfirm
        title={props.title}
        description={props.description}
        icon={
          props.icon
          //   <QuestionCircleOutlined
          //     style={{
          //       color: "red",
          //     }}
          //   />
        }
      >
        {props.children}
      </Popconfirm>
    </ConfigProvider>
  );
};

export default PopConfirm;
