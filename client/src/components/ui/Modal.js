import React, { useState } from "react";
import { Modal } from "antd";

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
    <>
      <Modal {...props} onCancel={props.onCancel} onOk={props.onOk}>
        {props.children}
      </Modal>
    </>
  );
};
export default ModalCustomize;
