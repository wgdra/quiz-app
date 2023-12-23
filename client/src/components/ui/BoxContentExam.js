import { useState } from "react";
import { Row, Col, Space } from "antd";
import { FileOutlined } from "@ant-design/icons";
import ButtonBasic from "./Button";

const BoxContentExam = ({ ...props }) => {
  const { dataSet, handleClickStartTest } = props;

  const [isHoveredBox, setIsHoveredBox] = useState(null);
  const [isHoveredTitle, setIsHoveredTitle] = useState(null);

  return (
    <>
      {dataSet &&
        dataSet.length > 0 &&
        dataSet.map((set, index) => {
          return (
            <Col key={index} className="gutter-row" span={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: isHoveredBox === index ? "" : "1px solid #cfcfcf",
                  background: "#FFFFFF",
                  padding: "16px 32px",
                  boxShadow:
                    isHoveredBox === index
                      ? "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
                      : "none",
                }}
                onMouseOver={() => setIsHoveredBox(index)}
                onMouseOut={() => setIsHoveredBox(null)}
              >
                <FileOutlined
                  style={{
                    fontSize: "3.3em",
                    color: "#999999",
                    marginRight: 16,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: "0px 0px 6px 0px",
                      fontSize: "1.4em",
                      fontWeight: "bold",
                      position: "relative",
                      cursor: "default",
                      padding: "16px 0px",
                    }}
                    onMouseOver={() => setIsHoveredTitle(index)}
                    onMouseOut={() => setIsHoveredTitle(null)}
                  >
                    {set.test_name}{" "}
                    <span
                      style={{
                        content: "",
                        position: "absolute",
                        bottom: 10,
                        left: 0,
                        width: "100%",
                        height: "0.1em",
                        backgroundColor: "#999999",
                        opacity: 1,
                        transition: "opacity 300ms, transform 300ms",
                        transform:
                          isHoveredTitle === index ? "scale(1)" : "scale(0)",
                        transformOrigin: "center",
                      }}
                    />
                    <span
                      style={{
                        color: "#999999",
                        fontSize: "0.8em",
                      }}
                    >
                      {set.description}
                    </span>
                  </p>
                </div>
                <ButtonBasic
                  size="middle"
                  label="Thi Ngay"
                  defaultColor="#8AC53E"
                  defaultBorderColor="#8AC53E"
                  tokenCustomize={{
                    borderRadius: "5px",
                    colorPrimaryHover: "#EC8E00",
                    colorPrimaryActive: "#EC8E00",
                  }}
                  style={{
                    fontSize: "1.1em",
                    fontWeight: "bold",
                    padding: "0px 18px",
                  }}
                  onClick={() => handleClickStartTest(set)}
                />
              </div>
            </Col>
          );
        })}
    </>
  );
};

export default BoxContentExam;
