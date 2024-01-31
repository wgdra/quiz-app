import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, notification, Alert } from "antd";
import InfoTest from "../../../components/ui/InfoTest";
import BoxContentTest from "../../../components/ui/BoxContentTest";
import ModalCustomize from "../../../components/ui/Modal";
import ButtonGroup from "../../../components/ui/ButtonGroup";

const Test = () => {
  const location = useLocation();
  const data = location.state.dataTest;

  const totalQuestion = [];
  data.content.map((item) => {
    item.questions.map((_, idx) => {
      totalQuestion.push({
        numberQuestion: idx,
        state: 0,
      });
    });
  });

  const dataAnswerChoise = [];
  const dataAnswerEssay = [];
  data.content.map((item) => {
    if (item.answer.length > 0) {
      dataAnswerChoise.push(item.answer);
    }

    item.questions.forEach((question) => {
      if (question.answer) {
        dataAnswerEssay.push(question.answer);
      }
    });
  });

  const [dataUserAnswerChoise, setDataUserAnswerChoise] = useState([]);
  const [dataUserAnswerEssay, setDataUserAnswerEssay] = useState([]);

  const [countAnswerChoise, setCountAnswerChoise] = useState(0);
  const [countAnswerEssay, setCountAnswerEssay] = useState(0);

  const [stateQuestion, setStateQuestion] = useState(totalQuestion);
  const [count, setCount] = useState(0);
  const [pointChoise, setPointChoise] = useState(0);
  const [pointEssay, setPointEssay] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const [docHidden, setDocHidden] = useState(0);
  // UI

  console.log("point 1", pointChoise);
  console.log("point 2", pointEssay);
  console.log("point", pointChoise + pointEssay);

  const ChildrenModal = () => {
    return (
      <>
        {isModal ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "1.3em",
              fontWeight: "bold",
            }}
          >
            <span>
              Đề: <span style={{ fontWeight: "normal" }}>{data.test_name}</span>
            </span>
            <span>
              Nội dung:{" "}
              <span style={{ fontWeight: "normal" }}>{data.description}</span>
            </span>
            <span>
              Điểm:{" "}
              <span style={{ color: "#44A500" }}>
                {pointChoise + pointEssay}
              </span>
              /10
            </span>
            <span>Đáp án đề thi: xem tại đây</span>
          </div>
        ) : null}
      </>
    );
  };

  const FooterModal = () => {
    return (
      <ButtonGroup
        size="large"
        items={
          !isModal
            ? [
                {
                  label: "Quay lại",
                  tokenCustomize: {
                    colorPrimaryHover: "#999999",
                    colorPrimaryActive: "#999999",
                  },
                },
                {
                  label: "Đồng ý",
                  tokenCustomize: {
                    colorPrimaryHover: "#EC8E00",
                    colorPrimaryActive: "#EC8E00",
                  },
                  buttonDesign: {
                    defaultColor: "#8AC53E",
                    defaultBorderColor: "#8AC53E",
                  },
                },
              ]
            : [
                {
                  label: "Đồng ý",
                  tokenCustomize: {
                    colorPrimaryHover: "#EC8E00",
                    colorPrimaryActive: "#EC8E00",
                  },
                  buttonDesign: {
                    defaultColor: "#8AC53E",
                    defaultBorderColor: "#8AC53E",
                  },
                },
              ]
        }
        onClick={handleClickTest}
      />
    );
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type) => {
    if (type === "warning") {
      api[type]({
        message: "Thời Gian Làm Bài Còn 3 Phút",
        description: "Em hãy nhanh chóng hoàn thành bài thi nhé !",
      });
    }
    if (type === "error") {
      api[type]({
        message: "Lưu ý không được rời khỏi trang thi",
        description: "Em hãy nhanh chóng hoàn thành bài thi nhé !",
      });
    }
  };

  // Handle
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // Tab mất focus
        setDocHidden(docHidden + 1);
      }
      if (!document.hidden) {
        // openNotification("error");
        if (docHidden === 4) {
          handleVioletion();
        }
      }
    });
  }, [docHidden]);

  const handleVioletion = () => {
    setIsModal(true);
    setOpenModal(true);
  };

  useEffect(() => {
    setCount(countAnswerChoise + countAnswerEssay);
  }, [countAnswerChoise, countAnswerEssay]);

  const handleClickQuestion = (question) => {
    return;
  };

  const handleClickButton = (e) => {
    if (e.target.innerText === "Nộp bài") {
      handleCorrectResult();
      setIsModal(true);
      setOpenModal(true);
    }

    if (e.target.innerText === "Thoát") {
      setOpenModal(true);
    }
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
  }, [dataUserAnswerEssay]);

  const handleAnswerEssay = () => {
    const arraysWithAnswer = dataUserAnswerEssay.reduce((acc, arr, index) => {
      if (arr.some((element) => element !== "answer")) {
        acc.push(index);
        if (index === 2) {
          handleStateQuestion(index);
        }
      }
      return acc;
    }, []);
    setCountAnswerEssay(arraysWithAnswer.length);
  };

  const handleStateQuestion = (questionIndex) => {
    const newTotalQuestion = [...stateQuestion];
    newTotalQuestion.splice(questionIndex + 5, 1, {
      numberQuestion: questionIndex,
      state: 1,
    });
    setStateQuestion(newTotalQuestion);
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

  const handleCorrectResult = () => {
    dataAnswerChoise.forEach((answer) => {
      console.log("ans", answer);
      if (dataUserAnswerChoise.length > 0) {
        const correctResult = answer.filter(
          (element, index) => element === dataUserAnswerChoise[index]
        );
        const point = correctResult.length * (5 / answer.length);
        setPointChoise(point);
      }
    });

    const pointArr = [];
    dataAnswerEssay.map((answer, index) => {
      if (dataUserAnswerEssay[index]?.length > 0) {
        const correctResult = answer.filter(
          (element, idx) => element == dataUserAnswerEssay[index][idx]
        );
        const point = correctResult.length * (1 / answer.length);
        pointArr.push(point);
      }
    });
    const pointEssay = pointArr.reduce((acc, point) => acc + point, 0);
    setPointEssay(pointEssay);
  };

  const handleClickTest = (e) => {
    if (e.target.innerText === "Quay lại") {
      setOpenModal(false);
      return;
    }
    if (e.target.innerText === "Đồng ý") {
      window.history.back();
    }
  };

  const onChangeCountdown = (val) => {
    if (typeof val === "number" && 179.95 * 1000 < val && val < 180 * 1000) {
      openNotification("warning");
    }
  };

  const onFinishCountdown = () => {
    handleCorrectResult();
    setIsModal(true);
    setOpenModal(true);
  };

  return (
    <>
      {contextHolder}
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
              setDataUserAnswerChoise={setDataUserAnswerChoise}
              setDataUserAnswerEssay={setDataUserAnswerEssay}
              handleAnswerChoise={handleAnswerChoise}
              handleAnswerEssay={handleAnswerEssay}
              handleStateQuestion={handleStateQuestion}
              handleChangeCheckBoxWonder={handleChangeCheckBoxWonder}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <InfoTest
            docHidden={docHidden}
            count={count}
            stateQuestion={stateQuestion}
            handleClickButton={handleClickButton}
            handleClickQuestion={handleClickQuestion}
            onChangeCountdown={onChangeCountdown}
            onFinishCountdown={onFinishCountdown}
          />
        </Col>
      </Row>
      <ModalCustomize
        open={openModal}
        title={isModal ? "Kết quả bài thi" : "Em xác nhận rời phòng thi chứ ?"}
        modalDesign={{
          titleFontSize: 26,
          titleColor: "#44A500",
        }}
        closable={false}
        footer={<FooterModal />}
      >
        <ChildrenModal />
      </ModalCustomize>
    </>
  );
};

export default Test;
