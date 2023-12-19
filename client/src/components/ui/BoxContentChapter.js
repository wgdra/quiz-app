import { Row, Col, Space } from "antd";
import "../../assets/styles/App.css";

const BoxContentChapter = ({ ...props }) => {
  const { dataChapter, handleClickChapter } = props;

  const boxItem = (items) => {
    return items.map((item, index) => {
      return (
        <Col key={index} className="gutter-row" span={12}>
          <Space
            className="box-chapter"
            style={{
              border: "1px solid #cfcfcf",
              width: "100%",
              margin: "8px 0px",
              padding: 8,
              cursor: "pointer",
            }}
            onClick={() => handleClickChapter(item)}
          >
            <img
              src={item.quiz_img || item.theory_img}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
              }}
            />
            <span
              style={{
                color: "#2F6A4F",
                fontSize: "1.1em",
                marginLeft: 8,
              }}
            >
              {item.quiz_name || item.theory_name}
            </span>
          </Space>
        </Col>
      );
    });
  };

  return (
    <>
      {dataChapter &&
        dataChapter.length > 0 &&
        dataChapter.map((item, index) => {
          return (
            <Col
              key={index}
              className="gutter-row"
              span={12}
              style={{ marginBottom: 16 }}
            >
              <div style={{ border: "1px solid #cfcfcf", padding: 8 }}>
                <p
                  style={{
                    color: "#86a937",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    margin: 0,
                    paddingBottom: 8,
                    borderBottom: "1px solid #cfcfcf",
                  }}
                >
                  {item.chapter_name}
                </p>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                  }}
                >
                  {boxItem(item.quizes || item.theories)}
                </Row>
              </div>
            </Col>
          );
        })}
    </>
  );
};

export default BoxContentChapter;
