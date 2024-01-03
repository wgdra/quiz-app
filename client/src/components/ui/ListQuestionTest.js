import { Row, Col } from "antd";

const ListQuestionTest = ({ ...props }) => {
  const { docHidden, stateQuestion, handleClickQuestion } = props;

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
      label: "Câu chưa chắc chắn",
      color: "#EC8E00",
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
        {stateQuestion.length > 0 &&
          stateQuestion.map((state, index) => {
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
                    color: !state.state ? "black" : "#FFFFFF",
                    background:
                      (state.state === 0 && "#f1f1f1") ||
                      (state.state === 2 && "#EC8E00") ||
                      (state.state === 1 && "#6dae40"),

                    cursor: "pointer",
                  }}
                  onClick={() => handleClickQuestion(state)}
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
        <span style={{ padding: "0px 16px", fontSize: "1.1em" }}>
          <p style={{ fontSize: "1.3em", fontWeight: "bold", color: "red" }}>
            Lưu ý:
          </p>{" "}
          Em không được phép rời khỏi trang thi trong lúc làm bài. Nếu vượt quá
          3 lần bài thi sẽ bị hủy !!!
          <p style={{ fontWeight: "bold", margin: "8px 0px" }}>
            Số lần vi phạm: {docHidden}
          </p>{" "}
        </span>
      </Row>
    </>
  );
};

export default ListQuestionTest;
