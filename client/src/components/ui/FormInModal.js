import React from "react";
import { Form, Input, Modal } from "antd";

const FormInModal = ({ ...props }) => {
  const [form] = Form.useForm();
  const { onCancel, onHandleForm, items } = props;

  return (
    <Modal
      {...props}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        const isHandle = form.__INTERNAL__.name;

        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onHandleForm(values, isHandle);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name={props.nameModal}
        initialValues={{
          modifier: "public",
        }}
      >
        {items.map((item, index) => {
          return (
            <Form.Item
              key={`item-${index}`}
              hasFeedback
              validateFirst
              name={item.name}
              label={item.label}
              rules={item.rule}
              initialValue={item.initialValue}
            >
              {item.name === "password" ? <Input.Password /> : <Input />}
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default FormInModal;
