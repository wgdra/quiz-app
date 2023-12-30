import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, notification } from "antd";
import InfoTest from "../../../components/ui/InfoTest";
import BoxContentTest from "../../../components/ui/BoxContentTest";

const Test = () => {
  const location = useLocation();
  const data = location.state.dataTest;

  const [dataAnswer, setDataAnswer] = useState([]);

  const [countAnswerChoise, setCountAnswerChoise] = useState(0);
  const [countAnswerEssay, setCountAnswerEssay] = useState(0);

  const [count, setCount] = useState(0);
  const [testPoint, setTestPoint] = useState();

  const totalQuestion = [];
  data.content.map((item) => {
    item.questions.map((_, idx) => {
      totalQuestion.push({
        numberQuestion: idx,
        state: 0,
      });
    });
  });

  const [stateQuestion, setStateQuestion] = useState(totalQuestion);

  console.log("stateQuestion", stateQuestion);
  // Handle
  useEffect(() => {
    setCount(countAnswerChoise + countAnswerEssay);
  }, [countAnswerChoise, countAnswerEssay]);

  const handleClickQuestion = (question) => {
    console.log("handleClickQuestion", question);
  };
  const handleClickButton = (e) => {
    console.log("handleClickButton", e.target.innerText);
  };

  // Handle Answer User
  const handleAnswerChoise = (data, index) => {
    data?.forEach((item) => {
      if (item.checked) {
        setCountAnswerChoise(countAnswerChoise + 1);
      }
    });
    const newTotalQuestion = [...stateQuestion];

    if (newTotalQuestion[index].state === 2) {
      newTotalQuestion.splice(index, 1, {
        numberQuestion: index,
        state: 2,
        initState: 1,
      });
      setStateQuestion(newTotalQuestion);
      return;
    }
    if (newTotalQuestion[index].state !== 2) {
      newTotalQuestion.splice(index, 1, {
        numberQuestion: index,
        state: 1,
      });
      setStateQuestion(newTotalQuestion);
    }
  };

  useEffect(() => {
    handleAnswerEssay();
  }, [dataAnswer]);

  const handleAnswerEssay = () => {
    const arraysWithAnswer = dataAnswer.reduce((acc, arr, index) => {
      if (arr.some((element) => element !== "answer")) {
        acc.push(index);
      }
      return acc;
    }, []);
    setCountAnswerEssay(0 + arraysWithAnswer.length);
  };

  const handleChangeCheckBoxWonder = (questionNumber) => {
    const newTotalQuestion = [...stateQuestion];

    if (newTotalQuestion[questionNumber].state === 0) {
      newTotalQuestion.splice(questionNumber, 1, {
        numberQuestion: questionNumber,
        state: 2,
        initState: 0,
      });
      setStateQuestion(newTotalQuestion);
      return;
    }

    if (newTotalQuestion[questionNumber].state === 1) {
      newTotalQuestion.splice(questionNumber, 1, {
        numberQuestion: questionNumber,
        state: 2,
        initState: 1,
      });
      setStateQuestion(newTotalQuestion);
      return;
    }

    if (newTotalQuestion[questionNumber].state === 2) {
      newTotalQuestion.splice(questionNumber, 1, {
        numberQuestion: questionNumber,
        state: newTotalQuestion[questionNumber].initState,
      });
      setStateQuestion(newTotalQuestion);
    }
  };

  return (
    <>
      <h1 style={{ color: "#44A500" }}>
        {data.test_name} - {data.description}
      </h1>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={18}>
          <div
            style={{
              fontSize: "1.3em",
              minHeight: 730,
              background: "#FFFFFF",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              padding: "16px 32px",
            }}
          >
            <BoxContentTest
              contents={data.content}
              setDataAnswer={setDataAnswer}
              handleAnswerChoise={handleAnswerChoise}
              handleAnswerEssay={handleAnswerEssay}
              handleChangeCheckBoxWonder={handleChangeCheckBoxWonder}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <InfoTest
            count={count}
            stateQuestion={stateQuestion}
            handleClickButton={handleClickButton}
            handleClickQuestion={handleClickQuestion}
          />
        </Col>
      </Row>
    </>
  );
};

export default Test;
