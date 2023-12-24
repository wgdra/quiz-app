import { useEffect, useState } from "react";
import { Col } from "antd";

const DragAndDropTest = ({ ...props }) => {
  const { topic, topic_answer } = props;

  const [textDragOver, setTextDragOver] = useState();
  const [isDrag, setIsDrag] = useState(false);
  const [isDrop, setIsDrop] = useState([]);

  console.log("isDrop", isDrop);
  const a = isDrop.map((i) => i);
  console.log("a", a);

  const [dataDrag, setDataDrag] = useState(topic_answer);
  const [dataDrop, setDataDrop] = useState(dataDrag.map(() => "ô tương ứng"));

  // Handle
  const handleDragStart = (e, item, index) => {
    e.dataTransfer.setData("text", item);
    e.dataTransfer.setData("index", index);

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    setIsDrag(true);
  };

  const handleDragEnd = (e) => {
    setIsDrag(false);
  };

  const handleDragStartResult = (e, item, index) => {
    console.log("handleDragStartResult", item);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setIsDrag(false);

    setIsDrop([...isDrop, index]);

    const text = e.dataTransfer.getData("text");
    const indexDrag = e.dataTransfer.getData("index");

    const newDataDrag = [...dataDrag];
    newDataDrag.splice(indexDrag, 1);
    setDataDrag(newDataDrag);

    const newDataDrop = [...dataDrop];
    newDataDrop.splice(index, 1, text);
    setDataDrop(newDataDrop);
  };

  return (
    <>
      <Col span={8} style={{ fontSize: "1.3em" }}>
        {topic.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid black",
                borderRight: "none",
                marginBottom: 16,
              }}
            >
              {item}
            </div>
          );
        })}
      </Col>
      <Col span={8} style={{ fontSize: "1.3em" }}>
        {dataDrop.map((item, index) => {
          return (
            <div
              style={{
                color: "#999999",
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border:
                  a === index
                    ? "4px dashed #6DAE40"
                    : isDrag
                    ? "4px dashed #6DAE40"
                    : "2px dashed #999999",
                marginBottom: 16,
                marginLeft: "-36px",
              }}
              draggable={true}
              onDragStart={(e) => handleDragStartResult(e, item, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
            >
              {item}
            </div>
          );
        })}
      </Col>
      <Col span={8} style={{ fontSize: "1.3em" }}>
        {dataDrag.length > 0 &&
          dataDrag.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  //   display: isDragStart != index ? "flex" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  height: 80,
                  border: "2px solid black",
                  cursor: "pointer",
                }}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, item, index)}
                onDragEnd={handleDragEnd}
              >
                <span>{item}</span>
              </div>
            );
          })}
      </Col>
    </>
  );
};

export default DragAndDropTest;
