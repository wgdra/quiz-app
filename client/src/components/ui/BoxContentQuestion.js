import { Col, Space, Collapse, Radio } from "antd";
import RadioChecked from "../form/RadioChecked";

const BoxContentQuestion = ({ ...props }) => {
  const {
    data,
    initValueRadio,
    questionNumber,
    onChangeRadio,
    setQuestionNumber,
  } = props;

  setQuestionNumber(questionNumber + 1);

  return (
    <>
      <Col className="gutter-row" span={12}>
        <h2 style={{ margin: "0 0 16px 0" }}>{`Câu ${questionNumber + 1}: ${
          data?.question_name
        }`}</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: 400,
            marginBottom: 16,
          }}
        >
          <img src={data?.question_img} style={{ width: 400 }} />
        </div>
        <Collapse
          ghost
          size="large"
          bordered={false}
          items={[
            {
              key: "1",
              label: "GỢI Ý",
              children: <p>{data?.suggest}</p>,
            },
          ]}
          style={{ height: 130 }}
        />
      </Col>
      <Col className="gutter-row" span={12}>
        <h3 style={{ color: "#44A500", margin: "0 0 16px 0" }}>
          Con hãy chọn 1 đáp án đúng nhất:
        </h3>
        <Radio.Group
          onChange={(e) => onChangeRadio(e, data.answer, data.options)}
          value={initValueRadio}
          style={{ minHeight: 500 }}
        >
          <Space direction="vertical">
            {data?.options.map((option, index) => {
              return <RadioChecked key={index} value={index} option={option} />;
            })}
          </Space>
        </Radio.Group>
      </Col>
    </>
  );
};

export default BoxContentQuestion;
