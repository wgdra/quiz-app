import React, { useState } from "react";
import { ConfigProvider, Menu } from "antd";

function getItem(label, key, item, icon, type) {
  return {
    key,
    label,
    item,
    icon,
    type,
  };
}

const MenuSubject = ({ ...props }) => {
  const { dataSubject, setSubjectSelect } = props;

  const items = dataSubject.map((subject, index) =>
    getItem(subject.subject_name, index, subject)
  );

  const onClickItem = (e) => {
    setSubjectSelect(e.item.props.item);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          fontSize: "1.3em",
          borderRadius: 5,
        },
        components: {
          Menu: {
            /* here is your component tokens */
            activeBarBorderWidth: 0,
            itemBg: "#f5f5f5",
            itemActiveBg: "rgb(149,211,84)",
            itemHoverColor: "#fff",
            itemHoverBg: "rgb(149,211,84)",
            itemSelectedColor: "#fff",
            itemSelectedBg: "rgb(149,211,84)",
          },
        },
      }}
    >
      <Menu
        defaultSelectedKeys={["0"]}
        style={{
          height: 36,
          width: 265,
          fontWeight: "bold",
        }}
        items={items}
        onClick={onClickItem}
      />
    </ConfigProvider>
  );
};
export default MenuSubject;
