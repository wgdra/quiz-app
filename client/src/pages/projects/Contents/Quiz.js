import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import InfoQuiz from "../../../components/ui/InfoQuiz";
import BoxContentQuestion from "../../../components/ui/BoxContentQuestion";
import ButtonBasic from "../../../components/ui/Button";
import ModalCustomize from "../../../components/ui/Modal";
import BoxContentFinish from "../../../components/ui/BoxContentFinish";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dataQuiz = location.state.dataQuiz;
  const dataQuestion = dataQuiz.questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [count, setCount] = useState({
    question: 0,
    point: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [checked, setChecked] = useState(false);
  const [finish, setFinish] = useState(false);

  const [questionNumber, setQuestionNumber] = useState(0);
  const [data, setData] = useState({
    valueRadio: "",
    answer: "",
    options: [],
  });

  const [stateAnswer, setStateAnswer] = useState({
    rightAnswer: [],
    wrongAnswer: [],
    skip: [],
  });

  const [result, setResult] = useState();
  const [initValueRadio, setInitValueRadio] = useState();

  // UI
  const ResultBox = () => {
    const arrOptions = data.options;

    const answer = arrOptions[data.answer];

    return (
      <div>
        {result === true ? <span>Dung roi</span> : <span>Sai roi</span>}
        <div>
          <h3>Đáp án đúng :</h3>
          {answer?.includes("data:image/png;base64") ? (
            <img src={answer} style={{ width: "100%" }} />
          ) : (
            answer
          )}
        </div>
      </div>
    );
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type) => {
    api[type]({
      message: "Thời Gian Làm Bài Còn 1 Phút",
      description:
        "Sắp hết thời gian làm bài. Em hãy nhanh chóng hoàn thành bài làm nhé !",
    });
  };

  // Handle

  // Radio
  const onChangeRadio = (e, answer, options) => {
    setChecked(true);
    setData({
      valueRadio: e.target.value,
      answer: answer,
      options: options,
    });
    setInitValueRadio(e.target.value);
  };

  // Button

  // Result
  const handleResult = () => {
    if (data.valueRadio !== data.answer) {
      setIsModalOpen(true);
      setResult(false);
      setStateAnswer({
        ...stateAnswer,
        wrongAnswer: [...stateAnswer.wrongAnswer, questionNumber],
      });
      return;
    }
    if (data.valueRadio === data.answer) {
      setIsModalOpen(true);
      setResult(true);
      setCount({
        ...count,
        point: count.point + 10,
      });
      setStateAnswer({
        ...stateAnswer,
        rightAnswer: [...stateAnswer.rightAnswer, questionNumber],
      });
    }
  };

  // Question
  const handleQuestion = (e) => {
    if (e.target.innerText === "Kiểm tra") {
      handleResult();
    }
    if (e.target.innerText === "Câu tiếp theo") {
      setIsModalOpen(true);
      setStateAnswer({
        ...stateAnswer,
        skip: [...stateAnswer.skip, questionNumber],
      });
    }
    if (e.target.innerText === "Hoàn thành") {
      window.history.back();
    }
  };

  // Modal
  const handleOkModal = () => {
    setIsModalOpen(false);
    setChecked(false);
    setInitValueRadio();

    if (count.question < dataQuestion.length) {
      setCurrentQuestion(currentQuestion + 1);
      setCount({
        ...count,
        question: count.question + 1,
      });
    }

    if (count.question + 1 === dataQuestion.length) {
      setFinish(true);
    }
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  // Countdown
  const onChangeCountdown = (val) => {
    if (typeof val === "number" && 179.95 * 1000 < val && val < 180 * 1000) {
      openNotification("warning");
    }
  };

  const onFinishCountdown = () => {
    setFinish(true);
  };

  return (
    <>
      {contextHolder}
      <h1 style={{ color: "#44A500" }}>
        {dataQuiz.quiz_name} - ({dataQuestion.length} Câu hỏi)
      </h1>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={4}>
          <InfoQuiz
            totalQuestion={dataQuestion.length}
            count={count}
            onChangeCountdown={onChangeCountdown}
            onFinishCountdown={onFinishCountdown}
          />
        </Col>
        <Col className="gutter-row" span={20} style={{ paddingRight: "32px" }}>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            style={{
              minHeight: 760,
              background: "#ffffff",
              padding: "16px 0px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            {finish ? (
              <Col span={24}>
                <BoxContentFinish
                  quiz_name={location.state.quiz_name}
                  stateAnswer={stateAnswer}
                  point={count.point}
                />
              </Col>
            ) : (
              <BoxContentQuestion
                data={dataQuestion[currentQuestion]}
                initValueRadio={initValueRadio}
                questionNumber={currentQuestion}
                onChangeRadio={onChangeRadio}
                setQuestionNumber={setQuestionNumber}
              />
            )}

            <Col span={6} offset={18}>
              <ButtonBasic
                size="large"
                label={
                  finish ? "Hoàn thành" : checked ? "Kiểm tra" : "Câu tiếp theo"
                }
                defaultColor="#FFFFFF"
                tokenDefaultColor="#8ac53e"
                tokenCustomize={{
                  colorPrimaryHover: "#FFFFFF",
                  borderRadius: "5px",
                  colorPrimaryActive: "#8ac53e",
                }}
                style={{
                  float: "right",
                  width: 220,
                  fontSize: "1.3em",
                  fontWeight: "bold",
                  padding: "0px 28px",
                  margin: "86px 14px 0px 0px",
                }}
                onClick={handleQuestion}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <ModalCustomize
        open={isModalOpen}
        title={checked ? "Kết quả" : "Em chưa chọn câu trả lời"}
        children={checked ? <ResultBox /> : "Em muốn bỏ qua câu hỏi này ?"}
        okText="Đồng ý"
        cancelText="Hủy bỏ"
        modalDesign={{ titleFontSize: "22px", titleColor: "#44a500" }}
        tokenDesign={{}}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
      />
    </>
  );
};

export default Quiz;
