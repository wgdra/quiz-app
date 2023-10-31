import React, { useRef, useState } from "react";
import { Card, Tabs } from "antd";
import RadioButton from "../form/RadioButton";
import PopConfirm from "./Popconfirm";
import ButtonBasic from "./Button";

const TabBar = ({ ...props }) => {
  const { items, setItems, handleUpdateQuestion } = props;

  const [activeKey, setActiveKey] = useState("");
  // initialItems[0].key
  const newTabIndex = useRef(0);

  // Content
  const boxContent = (item) => {
    return (
      <Card
        title={item.question_name}
        extra={
          <ButtonBasic
            type="primary"
            label="Chỉnh sửa"
            style={{ background: "#eb9a25" }}
            onClick={() => handleUpdateQuestion(item._id)}
          />
        }
        bodyStyle={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            height: "200px",
            width: "100%",
            border: "1px solid black",
          }}
        ></div>
        <span
          style={{ fontSize: "1.2em", textAlign: "left", margin: "8px 0px" }}
        >
          Tích vào ô tròn để ghi nhận đáp án (chỉ 1 đáp án)
        </span>
        <RadioButton options={item.options} />
      </Card>
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
