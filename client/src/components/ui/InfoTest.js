import { useEffect, useState } from "react";
import InfoCount from "./InfoCount";
import ListQuestionTest from "./ListQuestionTest";
import ButtonGroup from "./ButtonGroup";

const InfoTest = ({ ...props }) => {
  const { totalQuestion, handleClickButton, handleClickQuestion } = props;

  return (
    <div
      style={{
        minHeight: 430,
        background: "#FFFFFF",
        border: "1px solid #cfcfcf",
      }}
    >
      <InfoCount totalQuestion={totalQuestion} />
      <ListQuestionTest
        totalQuestion={totalQuestion}
        handleClickQuestion={handleClickQuestion}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
      >
        <ButtonGroup
          size="large"
          type="primary"
          style={{ padding: "0px 38px" }}
          items={[
            {
              label: "Thoát",
              tokenCustomize: {
                colorPrimaryHover: "#EC8E00",
                colorPrimaryActive: "#EC8E00",
                colorPrimary: "#78909C",
              },
            },
            {
              label: "Nộp bài",
              tokenCustomize: {
                colorPrimaryHover: "#EC8E00",
                colorPrimaryActive: "#EC8E00",
                colorPrimary: "#6DAE40",
              },
            },
          ]}
          onClick={handleClickButton}
        />
      </div>
    </div>
  );
};

export default InfoTest;
