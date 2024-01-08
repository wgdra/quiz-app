import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";

const UploadPicturesWall = ({ ...props }) => {
  const { thumbUrl, name, onChangeImage } = props;
  const [imageUrl, setImageUrl] = useState(thumbUrl);
  const [loading, setLoading] = useState(false);

  //Check IMG
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ tải lên file JPG hoặc PNG!");
    }

    return isJpgOrPng;
  };

  // Base64
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  // Handle Change
  const handleChange = (info) => {
    setLoading(true);
    setTimeout(() => {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        onChangeImage(url, name);
      });
    }, 1000);
  };

  // Button upload
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Thêm hình ảnh
      </div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={1}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};
export default UploadPicturesWall;
