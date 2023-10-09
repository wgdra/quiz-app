import React, { useState } from "react";
import { Modal } from "antd";

const ModalCustomize = ({ ...props }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { open, setOpen, handleUpdate } = props;

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleUpdate();
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        {...props}
        open={open}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </>
  );
};
export default ModalCustomize;
