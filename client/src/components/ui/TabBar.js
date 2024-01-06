import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Tabs, Upload, message } from "antd";
import RadioInput from "../form/RadioInput";
import ButtonBasic from "./Button";
import ButtonGroup from "./ButtonGroup";

const TabBar = ({ ...props }) => {
  const {
    items,
    handleCreateQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
  } = props;

  const [dataItems, setDataItems] = useState([]);
  const [formOptions, setFormOptions] = useState(["", "", "", ""]);
  const [valueRadio, setValueRadio] = useState("");
  const [activeKey, setActiveKey] = useState("");

  const newItem = items.map((item) => {
    return {
      item: item,
      state: 0,
      disabled: true,
    };
  });

  useEffect(() => {
    setDataItems(newItem);
  }, [items]);

  // UI
  const boxContent = (items, idx) => {
    const { TextArea } = Input;
    // handle click update
    const onClick = (innerText, item, idx) => {
      switch (innerText) {
        case "Chỉnh sửa":
          handleClickUpdate(item, idx);
          break;

        case "Hủy bỏ":
          handleClickCancelUpdate(item, idx);
          break;
        default:
          break;
      }
    };

    // onChange Image Question
    const onChangeImageQuestion = (info) => {
      console.log("ìno", info);
      if (info.file.status === "done") {
        message.success(`${info.file.name} đã tải ảnh lên`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} Lỗi tải ảnh.`);
      }
    };

    const onFinish = (data, item, idx) => {
      const nameButton = document.activeElement.getAttribute("name");

      if (nameButton === "add") {
        handleCreateQuestion(activeKey, data, formOptions, valueRadio);
        const newDataItems = [...dataItems];
        newDataItems.splice(idx, 1, {
          item: item,
          state: 0,
          disabled: true,
        });
        setDataItems(newDataItems);
      }
      if (nameButton === "update") {
        handleUpdateQuestion(activeKey, data, formOptions, valueRadio);
        const newDataItems = [...dataItems];
        newDataItems.splice(idx, 1, {
          item: item,
          state: 0,
          disabled: true,
        });
        setDataItems(newDataItems);
      }
    };

    return (
      <>
        <Form
          layout="vertical"
          disabled={items.disabled}
          onFinish={(data) => onFinish(data, items.item, idx)}
          initialValues={items.item.question_name}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item name="question_name" label="Câu hỏi">
                <Input defaultValue={items.item.question_name} />
              </Form.Item>
              <Form.Item name="question_img" label="Hình ảnh câu hỏi (nếu có)">
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture"
                  onChange={onChangeImageQuestion}
                >
                  <Button>Nhấn để thêm</Button>
                </Upload>
              </Form.Item>
              <Form.Item name="suggest" label="Gợi ý">
                <TextArea rows={6} defaultValue={items.item.suggest} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item name="options" label="Phần trả lời">
                <RadioInput
                  options={items.item.options}
                  formOptions={formOptions}
                  setFormOptions={setFormOptions}
                  valueRadio={valueRadio}
                  setValueRadio={setValueRadio}
                />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: "center" }}>
            {items.state === 1 && (
              <ButtonGroup
                items={[
                  {
                    name: "update",
                    type: "primary",
                    label: "Lưu chỉnh sửa",
                    style: { background: "#04aa6d" },
                    htmlType: "submit",
                  },
                  {
                    type: "primary",
                    label: "Hủy bỏ",
                    danger: true,
                    submit: "button",
                    onClick: (e) =>
                      onClick(e.target.innerText, items.item, idx),
                  },
                ]}
              />
            )}
            {items.state === 3 && (
              <ButtonBasic
                type="primary"
                name="add"
                label="Thêm"
                style={{ background: "#6DAE40" }}
                htmlType="submit"
              />
            )}
          </div>
        </Form>
        <div style={{ textAlign: "center" }}>
          {items.state === 0 && (
            <ButtonBasic
              type="primary"
              label="Chỉnh sửa"
              style={{ background: "#eb9a25", alignItem: "center" }}
              onClick={(e) => onClick(e.target.innerText, items.item, idx)}
            />
          )}
        </div>
      </>
    );
  };

  // Tabbar ỉtems
  const initialItems = dataItems.map((items, index) => {
    return {
      key: items.item.questionId || index + 1,
      label: `Câu ${index + 1}`,
      children: boxContent(items, index),
    };
  });
  // Handle
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      addQuestion();
    } else {
      remove(targetKey);
    }
  };

  const addQuestion = () => {
    const newPanes = [...dataItems];
    newPanes.push({
      item: {
        question_name: "",
        question_img: "",
        options: ["", "", "", ""],
        suggest: "",
        answer: "",
      },
      state: 3,
    });
    setDataItems(newPanes);
  };

  const remove = (targetKey) => {
    handleDeleteQuestion(targetKey);
  };

  const handleClickUpdate = (item, idx) => {
    const newDataItems = [...dataItems];
    newDataItems.splice(idx, 1, {
      item: item,
      state: 1,
      disabled: false,
    });
    setDataItems(newDataItems);
  };

  const handleClickCancelUpdate = (item, idx) => {
    const newDataItems = [...dataItems];
    newDataItems.splice(idx, 1, {
      item: item,
      state: 0,
      disabled: true,
    });
    setDataItems(newDataItems);
  };

  return (
    <Tabs
      {...props}
      type="editable-card"
      onChange={onChange}
      defaultActiveKey={1}
      activeKey={activeKey}
      onEdit={onEdit}
      items={initialItems}
    />
  );
};
export default TabBar;
