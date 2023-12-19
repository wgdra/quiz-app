import React, { useState } from "react";
import { ConfigProvider, Modal } from "antd";

const ModalCustomize = ({ ...props }) => {
  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     handleUpdate();
  //     setOpen(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  // const handleCancel = () => {
  //   setOpen(false);
  // };

  return (
    <ConfigProvider
      theme={{
        token: props.tokenDesign,
        components: {
          Modal:
            /* here is your component tokens */
            props.modalDesign,
        },
      }}
    >
      <Modal {...props} onCancel={props.onCancel} onOk={props.onOk}>
        {props.children}
      </Modal>
    </ConfigProvider>
  );
};
export default ModalCustomize;
