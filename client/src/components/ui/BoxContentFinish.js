import FinishImg from "../../assets/images/finish-quiz.png";
const BoxContentFinish = ({ ...props }) => {
  const { quiz_name, stateAnswer, point } = props;

  const data = [
    {
      title: "Thời gian làm bài",
      content: "08 phút, 30 giây",
      mainColor: "#77909b",
    },
    {
      title: "Số điểm đạt được",
      content: `${point}/100`,
      mainColor: "#8ac53e",
    },
    {
      title: "Câu làm đúng",
      content: `${stateAnswer.rightAnswer.join(",")}`,
      mainColor: "#ec8e00",
    },
    {
      title: "Câu làm sai",
      content: `${stateAnswer.wrongAnswer.join(",")}`,
      mainColor: "#ec8e00",
    },
    {
      title: "Câu chưa làm",
      content: `${stateAnswer.skip.join(",")}`,
      mainColor: "#ec8e00",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: 530,
        paddingTop: 20,
      }}
    >
      <img src={FinishImg} style={{ width: 360 }} />
      <h2 style={{ color: "#44A500" }}>Kết quả: Bài tập {quiz_name}</h2>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              border: "1px solid #cfcfcf",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 166,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                background: item.mainColor,
                padding: 8,
              }}
            >
              <span>{item.title}</span>
            </div>
            <span style={{ padding: 8, width: 146, color: item.mainColor }}>
              {item.content}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BoxContentFinish;
