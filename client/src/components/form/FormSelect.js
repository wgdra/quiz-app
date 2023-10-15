import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button, ConfigProvider } from "antd";

let index = 0;
const FormSelect = ({ ...props }) => {
  // const [items, setItems] = useState(props.items);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const { items, setItems, handleDataItem, handleOptionSelect } = props;

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    // setItems([...items, name || `New item ${index++}`]);
    handleDataItem(name);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // const isItem = (value, option) => {
  //   console.log("value", value);
  //   setIsOption(value, option);
  // };

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
            optionFontSize: 18,
          },
        },
      }}
    >
      <Select
        style={{
          width: "100%",
        }}
        listHeight={200}
        placeholder="custom dropdown render"
        onChange={(_, option) => handleOptionSelect(option)}
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
          label: item.name,
          option: item,
        }))}
      />
    </ConfigProvider>
  );
};
export default FormSelect;
