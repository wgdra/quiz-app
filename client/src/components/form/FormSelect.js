import React, { useState, useRef } from "react";
import { PlusOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button, ConfigProvider } from "antd";

const FormSelect = ({ ...props }) => {
  const {
    items,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleOptionSelect,
  } = props;

  const [name, setName] = useState("");
  const [dataInput, setDataInput] = useState("");
  const [dataInputUpdate, setDataInputUpdate] = useState("");
  const [dataOption, setDataOption] = useState({});

  const inputRef = useRef(null);

  const onClickSelect = (data) => {
    setName(data);
  };

  const onChangeCreate = (e) => {
    setDataInput(e.target.value);
  };
  const onChangeUpdate = (e) => {
    setDataInputUpdate(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    handleCreate(dataInput, name);
    setDataInput("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const updateItem = (e) => {
    e.preventDefault();
    setDataInputUpdate("");
    handleUpdate(dataInputUpdate, name);
  };

  const deleteItem = () => {
    handleDelete(name);
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
                    dataOption.theory_name ||
                    `${dataOption.test_name} ${dataOption.description}`
                  }
                  ref={inputRef}
                  value={dataInputUpdate}
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
            item.theory_name ||
            `${item.test_name} ${item.description}`,
          option: item,
        }))}
      />
    </ConfigProvider>
  );
};
export default FormSelect;
