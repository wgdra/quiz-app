import { Row, Col, Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { SwapLeftOutlined } from "@ant-design/icons";
import "../../../assets/styles/App.css";
import BoxContentChapter from "../../../components/ui/BoxContentChapter";

const Chapter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state.data;

  const handleClickChapter = (item) => {
    if (item.questions) {
      navigate("/project/quiz", {
        state: {
          dataQuiz: item,
        },
      });
    }
    if (item.lessons) {
      navigate("/project/theory", {
        state: {
          dataChapter: data.chapters,
          dataTheory: item,
        },
      });
    }
  };

  return (
    <>
      <Space>
        <a
          href="javascript:window.history.back()"
          style={{ fontSize: "3em", color: "#6051f8", marginRight: 16 }}
        >
          <SwapLeftOutlined />
        </a>
        <h1 style={{ color: "#44A500" }}>
          {data.method} {location.state.subject_name} -{" "}
          {location.state.class_name}
        </h1>
      </Space>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <BoxContentChapter
          dataChapter={data.chapters}
          handleClickChapter={handleClickChapter}
        />
      </Row>
    </>
  );
};

export default Chapter;
