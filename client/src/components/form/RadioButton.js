import React, { useState } from "react";
import { Radio, Space } from "antd";

const RadioButton = ({ ...props }) => {
  const [value, setValue] = useState("");

  const { options } = props;

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space wrap="horizontal" style={{ justifyContent: "space-between" }}>
        {options?.length > 0
          ? options.map((option, index) => {
              return (
                <Radio key={index} value={index}>
                  <div
                    style={{
                      height: "100px",
                      width: "300px",
                      border: "1px solid black",
                    }}
                  >
                    {option}
                  </div>
                </Radio>
              );
            })
          : ""}
      </Space>
    </Radio.Group>
  );
};
export default RadioButton;
