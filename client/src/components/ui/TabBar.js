import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Tabs, Upload } from "antd";
import RadioInput from "../form/RadioInput";
import FormInput from "../form/FormInput";
import PopConfirm from "./Popconfirm";
import ButtonBasic from "./Button";
import ButtonGroup from "./ButtonGroup";

const TabBar = ({ ...props }) => {
  const { items, setItems, handleUpdateQuestion } = props;

  const [defaultValueInput, setDefaultValueInput] = useState({});
  const [formOptions, setFormOptions] = useState([]);
  const [disabledForm, setDisabledForm] = useState(true);
  const [valueRadio, setValueRadio] = useState("");

  const [activeKey, setActiveKey] = useState("");
  // initialItems[0].key
  const newTabIndex = useRef(0);

  const customRequest = (data) => {
    console.log("data customRequest", data);
  };

  // Handle
  const add = () => {
    console.log("create");
    // const newActiveKey = `newTab${newTabIndex.current++}`;
    // const newPanes = [...items];
    // newPanes.push({
    //   label: "New Tab",
    //   children: "Content of new Tab",
    //   key: newActiveKey,
    // });
    // setItems(newPanes);
    // setActiveKey(newActiveKey);
  };

  const remove = (targetKey) => {
    console.log("targetKey", targetKey);

    // let newActiveKey = activeKey;
    // let lastIndex = -1;
    // items.forEach((item, i) => {
    //   if (item.key === targetKey) {
    //     lastIndex = i - 1;
    //   }
    // });

    // const newPanes = items.filter((item) => item.key !== targetKey);
    // if (newPanes.length && newActiveKey === targetKey) {
    //   if (lastIndex >= 0) {
    //     newActiveKey = newPanes[lastIndex].key;
    //   } else {
    //     newActiveKey = newPanes[0].key;
    //   }
    // }
    // setItems(newPanes);
    // setActiveKey(newActiveKey);
  };

  // Content Quiz
  const boxContent = (item) => {
    const { TextArea } = Input;

    console.log("defaultValueInput", defaultValueInput);
    // handle click update
    const handleButtonClickUpdate = (innerText) => {
      switch (innerText) {
        case "Chỉnh sửa":
          setDisabledForm(false);
          break;
        case "Lưu chỉnh sửa":
          setDisabledForm(false);
          break;
        case "Hủy bỏ":
          setDisabledForm(true);
          break;
        default:
          break;
      }
    };

    // onChange Image Question
    const onChangeImageQuestion = (data) => {
      console.log("data image", data.file.thumbUrl);
    };

    const onFinish = (data) => {
      console.log("data form", data);
      console.log("formOptions", formOptions);
      console.log("radio checked", valueRadio);
    };

    return (
      <>
        <Form
          layout="vertical"
          disabled={disabledForm}
          onFinish={onFinish}
          initialValues={{ question_name: item.question_name }}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item name="question_name" label="Câu hỏi">
                <Input defaultValue={item.question_name} />
              </Form.Item>
              <Form.Item
                name="question_img"
                label="Hình ảnh câu hỏi (nếu có)"
                valuePropName="fileList"
                getValueFromEvent={onChangeImageQuestion}
              >
                <Upload name="question_img" listType="picture">
                  <Button>Chọn để thêm</Button>
                </Upload>
              </Form.Item>
              <Form.Item name="suggest" label="Gợi ý">
                <TextArea rows={6} defaultValue={item.suggest} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item name="options" label="Phần trả lời">
                <RadioInput
                  options={item.options}
                  setFormOptions={setFormOptions}
                  valueRadio={valueRadio}
                  setValueRadio={setValueRadio}
                />
              </Form.Item>
            </Col>
          </Row>

          {disabledForm === false && (
            <ButtonGroup
              items={[
                {
                  htmlType: "submit",
                  type: "primary",
                  label: "Lưu chỉnh sửa",
                  style: { background: "#04aa6d" },
                  onClick: (e) => handleButtonClickUpdate(e.target.innerText),
                },
                {
                  type: "primary",
                  label: "Hủy bỏ",
                  danger: true,
                  onClick: (e) => handleButtonClickUpdate(e.target.innerText),
                },
              ]}
            />
          )}
        </Form>
        {disabledForm === true && (
          <ButtonBasic
            type="primary"
            label="Chỉnh sửa"
            style={{ background: "#eb9a25" }}
            onClick={(e) => handleButtonClickUpdate(e.target.innerText)}
          />
        )}
      </>
    );
  };

  // Tabbar ỉtems
  const initialItems = items.map((item, _) => {
    return {
      key: item.questionId,
      label: `Câu ${item.questionId}`,
      children: boxContent(item),
    };
  });

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      {...props}
      type="editable-card"
      onChange={onChange}
      defaultActiveKey={1}
      // activeKey={activeKey}
      onEdit={onEdit}
      items={initialItems}
    />
  );
};
export default TabBar;
