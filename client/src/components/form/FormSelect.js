import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button, ConfigProvider } from "antd";

let index = 0;
const FormSelect = ({ ...props }) => {
  const [items, setItems] = useState(props.items);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const isItem = (value) => {
    console.log("value", value);
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          colorBorder: "#0092ff",
          colorPrimaryHover: "#3eabfc",
        },
        components: {
          Select: {
            /* here is your component tokens */
          },
        },
      }}
    >
      <Select
        style={{
          width: "100%",
        }}
        placeholder="custom dropdown render"
        onChange={(value) => isItem(value)}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider
              style={{
                margin: "8px 0",
              }}
            />
            <Space
              style={{
                padding: "0 8px 4px",
              }}
            >
              <Input
                placeholder="Nhập để thêm mới"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Thêm mới
              </Button>
            </Space>
          </>
        )}
        options={items?.map((item) => ({
          value: item.id,
          label: item.label,
        }))}
      />
    </ConfigProvider>
  );
};
export default FormSelect;
