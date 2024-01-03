import React, { useState, useRef } from "react";
import { PlusOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button, ConfigProvider } from "antd";

const FormSelect = ({ ...props }) => {
  // const [items, setItems] = useState(props.items);
  const { items, setItems, handleCreate, handleOptionSelect } = props;

  const [name, setName] = useState("");
  const [dataInput, setDataInput] = useState("");
  const [dataOption, setDataOption] = useState({});

  const inputRef = useRef(null);

  const onClickSelect = (data) => {
    setName(data);
  };

  const onChangeCreate = (e) => {
    setDataInput(e.target.value);
  };
  const onChangeUpdate = (e) => {
    console.log("e", e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    // setItems([...items, name || `New item ${index++}`]);
    handleCreate(dataInput, name);
    setDataInput("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // const isItem = (value, option) => {
  //   console.log("value", value);
  //   setIsOption(value, option);
  // };

  const updateItem = () => {
    console.log("update");
  };
  const deleteItem = () => {
    console.log("deleteItem");
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
            optionFontSize: 18,
          },
        },
      }}
    >
      <Select
        {...props}
        style={{
          width: "100%",
        }}
        listHeight={200}
        // placeholder="custom dropdown render"
        onChange={(_, option) => {
          handleOptionSelect(option);
          setDataOption(option.option);
        }}
        onClick={() => onClickSelect(props.name)}
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
                display: "flex",
                flexDirection: "column",
                padding: "0 8px 4px",
              }}
            >
              <Space>
                <Input
                  placeholder="Nhập để thêm mới"
                  ref={inputRef}
                  value={dataInput}
                  onChange={onChangeCreate}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  Thêm mới
                </Button>
              </Space>

              <Space>
                <Input
                  placeholder={
                    dataOption.class_name ||
                    dataOption.subject_name ||
                    dataOption.chapter_name ||
                    dataOption.quiz_name ||
                    dataOption.theory_name
                  }
                  ref={inputRef}
                  onChange={onChangeUpdate}
                />

                <EditOutlined
                  style={{
                    margin: "0px 20px",
                    cursor: "pointer",
                  }}
                  onClick={updateItem}
                />
                <CloseOutlined
                  style={{
                    margin: "0px 20px",
                  }}
                  onClick={deleteItem}
                />
              </Space>
            </Space>
          </>
        )}
        options={items?.map((item) => ({
          value: item._id,
          label:
            item.class_name ||
            item.subject_name ||
            item.chapter_name ||
            item.quiz_name ||
            item.theory_name,
          option: item,
        }))}
      />
    </ConfigProvider>
  );
};
export default FormSelect;
