import { Row, Col } from "antd";

const ListQuestionTest = ({ ...props }) => {
  const { totalQuestion, handleClickQuestion } = props;

  const colorNote = [
    {
      label: "Câu đã làm",
      color: "#6DAE40",
    },
    {
      label: "Câu chưa làm",
      color: "#f1f1f1",
    },
    {
      label: "Câu đã làm nhưng chưa chắc chắn",
      color: "#9298c2",
    },
  ];

  return (
    <>
      <Row
        style={{
          padding: "0px 16px",
          marginBottom: 16,
          borderBottom: "1px solid #cfcfcf",
        }}
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        {totalQuestion.length > 0 &&
          totalQuestion.map((question, index) => {
            return (
              <Col key={index} className="gutter-row" style={{ width: "20%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "1.3em",
                    border: "1px solid #cfcfcf",
                    padding: "8px 14px",
                    borderRadius: "50%",
                    marginBottom: 16,
                    background: "#f1f1f1",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClickQuestion(question.question)}
                >
                  {index + 1}
                </div>
              </Col>
            );
          })}
      </Row>
      <Row
        style={{ padding: "0px 16px", marginBottom: 32 }}
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        {colorNote.map((note, index) => {
          return (
            <Col
              key={index}
              className="gutter-row"
              span={24}
              style={{ marginBottom: 12 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.1em",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: 30,
                    height: 30,
                    border: "1px solid #cfcfcf",
                    borderRadius: "50%",
                    background: note.color,
                    marginRight: 16,
                  }}
                />
                <span>{note.label}</span>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ListQuestionTest;
