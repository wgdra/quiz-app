import { useEffect, useState } from "react";
import { Col } from "antd";

const DragAndDropTest = ({ ...props }) => {
  const { topic, topic_answer, setDataAnswerDragAndDrop } = props;

  const [isDrag, setIsDrag] = useState(false);
  const [isDragResult, setIsDragResult] = useState(false);

  const [dataDrag, setDataDrag] = useState(topic_answer);
  const [dataDrop, setDataDrop] = useState(
    dataDrag.map(() => {
      return { label: "ô tương ứng", active: false };
    })
  );

  useEffect(() => {
    setDataAnswerDragAndDrop(dataDrop);
  }, [dataDrop]);

  // Handle
  // Drag
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
    e.dataTransfer.setData("textDragResult", item);
    e.dataTransfer.setData("indexDragResult", index);

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";

    const newDataDrop = [...dataDrop];
    newDataDrop.splice(index, 1, { label: "ô tương ứng", active: false });
    setDataDrop(newDataDrop);

    setIsDragResult(true);
  };

  const handleDragEndResult = (e) => {
    setIsDrag(false);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  // Drop
  const handleDrop = (e, label, index, active) => {
    e.preventDefault();
    setIsDrag(false);
    setIsDragResult(false);

    // Drag
    const text = e.dataTransfer.getData("text");
    const indexDrag = e.dataTransfer.getData("index");

    // Drag Result
    const textDragResult = e.dataTransfer.getData("textDragResult");
    const indexDragResult = e.dataTransfer.getData("indexDragResult");

    // Handle drag start
    if (isDrag) {
      const newDataDrag = [...dataDrag];
      newDataDrag.splice(indexDrag, 1);
      setDataDrag(newDataDrag);
      if (isDrag && active) {
        newDataDrag.push(label);
      }
    }

    // Handle drag result
    const newDataDrop = [...dataDrop];
    newDataDrop.splice(index, 1, {
      label: text || textDragResult,
      active: true,
    });
    setDataDrop(newDataDrop);
    if (isDragResult && active) {
      newDataDrop.splice(indexDragResult, 1, { label: label, active: true });
      setDataDrop(newDataDrop);
    }
  };

  return (
    <>
      <Col span={8} style={{ fontSize: "1.3em", fontWeight: "bold" }}>
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
                color: item.active ? "black" : "#999999",
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: item.active
                  ? "4px solid #6DAE40"
                  : isDrag || isDragResult
                  ? "4px dashed #EC8E00"
                  : "2px dashed #999999",
                marginBottom: 16,
                marginLeft: "-36px",
                cursor: item.active && "pointer",
              }}
              draggable={true}
              onDragStart={(e) => handleDragStartResult(e, item.label, index)}
              onDragEnd={handleDragEndResult}
              onDrop={(e) => handleDrop(e, item.label, index, item.active)}
              onDragOver={(e) => handleDragOver(e, index)}
            >
              {item.label}
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
