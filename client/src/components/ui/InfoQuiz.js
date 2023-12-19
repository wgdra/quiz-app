import { Statistic } from "antd";
import { useEffect, useState } from "react";
import PopConfirm from "./Popconfirm";

const InfoQuiz = ({ ...props }) => {
  const { Countdown } = Statistic;
  const { totalQuestion, count, onChangeCountdown, onFinishCountdown } = props;

  const [time, setTime] = useState();

  useEffect(() => {
    setTime(Date.now() + 900 * 1000);
  }, []);

  const dataInfoQuiz = [
    {
      title: "Thời gian làm bài",
      content: (
        <PopConfirm>
          <Countdown
            value={time}
            valueStyle={{ color: "#77909b" }}
            onChange={onChangeCountdown}
            onFinish={onFinishCountdown}
          />
        </PopConfirm>
      ),
      mainColor: "#77909b",
    },
    {
      title: "Số câu đã làm",
      content: `${count.question} / ${totalQuestion}`,
      mainColor: "#ec8e00",
    },
    {
      title: "Số điểm đạt được",
      content: `${count.point}/100`,
      mainColor: "#8ac53e",
    },
  ];

  return (
    <div style={{ width: "80%", fontSize: "1.3em", fontWeight: "bold" }}>
      {dataInfoQuiz.map((info, index) => {
        return (
          <div
            key={index}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #cfcfcf",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: 60,
                color: "#fff",
                background: info.mainColor,
              }}
            >
              <span>{info.title}</span>
            </div>
            <span
              style={{
                display: "block",
                color: info.mainColor,
                padding: "20px 0px",
              }}
            >
              {info.content}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default InfoQuiz;
