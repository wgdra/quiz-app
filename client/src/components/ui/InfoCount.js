import { useEffect, useState } from "react";
import { Statistic } from "antd";
import PopConfirm from "./Popconfirm";

const InfoCount = ({ ...props }) => {
  const { Countdown } = Statistic;

  const { totalQuestion } = props;

  const [time, setTime] = useState();

  useEffect(() => {
    setTime(Date.now() + 1200 * 1000);
  }, []);

  const dataInfoTest = [
    {
      title: "Số câu đã làm",
      content: `10 / ${totalQuestion.length}`,
    },
    {
      title: "Thời gian làm bài",
      content: (
        <PopConfirm>
          <Countdown
            value={time}
            valueStyle={{ color: "#77909b" }}
            // onChange={onChangeCountdown}
            // onFinish={onFinishCountdown}
          />
        </PopConfirm>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        fontSize: "1.2em",
        fontWeight: "bold",
        borderBottom: "1px solid #cfcfcf",
        marginBottom: 16,
      }}
    >
      {dataInfoTest.map((info, index) => {
        return (
          <div
            key={index}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRight: index === 0 && "1px solid #cfcfcf",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: 40,
              }}
            >
              <span>{info.title}</span>
            </div>
            <span style={{ fontSize: "1.43em" }}>{info.content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default InfoCount;
