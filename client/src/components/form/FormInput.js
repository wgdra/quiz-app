import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space } from "antd";

const HandleSubmit = ({ form }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  console.log("values", values);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const FormInput = ({ ...props }) => {
  const [form] = Form.useForm();
  const items = props?.items;

  console.log("form", form);

  return (
    <Form form={form} name="form" layout="vertical" autoComplete="off">
      {items.map((item, index) => {
        return (
          <Form.Item
            hasFeedback
            validateFirst
            key={index}
            name={item.name}
            label={item.label}
            rules={item.rule}
          >
            <Input placeholder="e" />
          </Form.Item>
        );
      })}
      {/* <Form.Item>
        <SubmitButton form={form} />
      </Form.Item> */}
    </Form>
  );
};
export default FormInput;
