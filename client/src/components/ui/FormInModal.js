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
            onHandleForm(info, isHandle);
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
            >
              {item.name === "password" ? (
                <Input.Password placeholder="******" />
              ) : (
                <Input placeholder={item.placeholder} />
              )}
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default FormInModal;
