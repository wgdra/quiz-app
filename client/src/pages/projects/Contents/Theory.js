import { useState } from "react";
import { Row, Col } from "antd";
import { useLocation } from "react-router-dom";
import CollapseList from "../../../components/ui/CollapseList";
import BoxContentTheory from "../../../components/ui/BoxContentTheory";

const Theory = () => {
  const location = useLocation();

  const dataChapter = location.state.dataChapter;
  const dataTheory = location.state.dataTheory;

  const [dataContent, setDataContent] = useState(dataTheory.lessons);

  return (
    <>
      <h1 style={{ color: "#44A500" }}>{dataTheory.theory_name}</h1>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={6}>
          <CollapseList
            dataChapter={dataChapter}
            dataTheory={dataTheory}
            setDataContent={setDataContent}
          />
        </Col>
        <Col className="gutter-row" span={18} style={{ paddingRight: "32px" }}>
          <BoxContentTheory dataContent={dataContent} />
        </Col>
      </Row>
    </>
  );
};

export default Theory;
