import React, { useState } from "react";
import { Radio, Space, Input } from "antd";
import UploadPicturesWall from "../ui/UploadPicturesWall";

const RadioInput = ({ ...props }) => {
  const { options, setFormOptions, valueRadio, setValueRadio } = props;

  const onChangeRadio = (e) => {
    setValueRadio(e.target.value);
  };

  const onChangeInput = (value, index) => {
    options.splice(index, 1, value);
    setFormOptions(options);
  };

  const onChangeImage = (value, index) => {
    options.splice(index, 1, value);
    setFormOptions(options);
  };

  return (
    <Radio.Group onChange={onChangeRadio} value={valueRadio}>
      <Space style={{ display: "flex", flexDirection: "column" }}>
        {options?.length > 0
          ? options.map((option, index) => {
              let optionImg = option.includes("data:image/png;base64");

              return (
                <Space style={{ display: "flex" }} key={index}>
                  <Radio value={index}></Radio>
                  <Input
                    style={{ width: "600px" }}
                    placeholder="Nhập câu trả lời (nếu có)"
                    defaultValue={optionImg ? "" : option}
                    onChange={(e) => onChangeInput(e.target.value, index)}
                  />
                  <UploadPicturesWall
                    thumbUrl={optionImg ? option : null}
                    onChangeImage={(value) => onChangeImage(value, index)}
                  />
                </Space>
              );
            })
          : ""}
      </Space>
    </Radio.Group>
  );
};
export default RadioInput;
