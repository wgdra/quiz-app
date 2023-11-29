import React, { useState } from "react";
import { Avatar, Row, Col, Progress, Space } from "antd";
import BoxTitle from "../../components/ui/BoxTitle";
import BoxContent from "../../components/ui/BoxContent";
import FormChart from "../../components/form/Chart";
import { useNavigate } from "react-router-dom";

const OverView = () => {
  const [user, setUser] = useState("T");
  const navigate = useNavigate();

  const colorsProgress = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };

  const handleClickStart = (name) => {
    console.log("name", name);
    navigate("/project/classes", {
      state: {
        name: name,
      },
    });
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
        <Avatar
          style={{
            backgroundColor: "#f56a00",
            verticalAlign: "middle",
          }}
          size={58}
          gap={4}
        >
          {user}
        </Avatar>
        <h1 style={{ marginLeft: "15px" }}>Xin chào Trung !</h1>
      </div>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col
          className="gutter-row"
          span={16}
          style={{ borderBottom: "3px solid #95cbf0" }}
        >
          <BoxTitle title="Ôn luyện bài tập" />
          <BoxContent
            mainColor="#50C4EE"
            heading="Bài tập trắc nghiệm"
            content="Hơn 600 bài trắc nghiệm"
            handleClickStart={handleClickStart}
          />
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col span={12}>
              <BoxContent
                mainColor="#F372C7"
                heading="Ôn luyện lý thuyết"
                content="Hơn 620 bài lý thuyết"
                handleClickStart={handleClickStart}
              />
            </Col>
            <Col span={12}>
              <BoxContent
                mainColor="#9077F5"
                heading="Làm bài kiểm tra"
                content="Hơn 300 bài kiểm tra"
                handleClickStart={handleClickStart}
              />
            </Col>
          </Row>
          <BoxTitle title="Năng lực & Tư duy" />
          <BoxContent
            mainColor="#FFC2D5"
            heading="Đánh giá"
            content="Đánh giá năng lực, đánh giá tư duy và học online cùng giáo viên"
            handleClickStart={handleClickStart}
          />
        </Col>

        <Col className="gutter-row" span={8}>
          <BoxTitle title="Tiến triển" />

          <div wrap style={{ marginBottom: 14 }}>
            <Space wrap style={{ marginBottom: 26 }}>
              <h2>Lớp 1</h2>
              <Progress
                type="circle"
                percent={90}
                strokeColor={colorsProgress}
              />
              <Progress
                type="circle"
                percent={60}
                strokeColor={colorsProgress}
              />
              <Progress
                type="circle"
                percent={60}
                strokeColor={colorsProgress}
              />
            </Space>

            <Space wrap style={{ marginBottom: 26 }}>
              <h2>Lớp 2</h2>
              <Progress
                type="circle"
                percent={90}
                strokeColor={colorsProgress}
              />
              <Progress
                type="circle"
                percent={60}
                strokeColor={colorsProgress}
              />
              <Progress
                type="circle"
                percent={60}
                strokeColor={colorsProgress}
              />
            </Space>

            <Space wrap style={{ marginBottom: 26 }}>
              <h2>Lớp 3</h2>
              <Progress
                type="circle"
                percent={80}
                strokeColor={colorsProgress}
              />
              <Progress
                type="circle"
                percent={50}
                strokeColor={colorsProgress}
              />
              <Progress
                type="circle"
                percent={60}
                strokeColor={colorsProgress}
              />
            </Space>
          </div>

          <BoxTitle title="Thống kê tuần" />

          <FormChart />
        </Col>
      </Row>
    </>
  );
};

export default OverView;
