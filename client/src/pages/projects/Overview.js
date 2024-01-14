import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Row, Col, Progress, Space } from "antd";
import BoxTitle from "../../components/ui/BoxTitle";
import BoxContent from "../../components/ui/BoxContent";
import FormChart from "../../components/form/Chart";
import { getData } from "../../services/apiService";
import { useAuthContext } from "../../hooks/useAuthContext";

const OverView = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [data, setData] = useState("T");

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    let res = await getData(user?.token);

    if (res.status !== 200) return;
    if (res.status === 200) {
      setData(res.data);
    }
  };

  const colorsProgress = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };

  const handleClickStart = (label) => {
    if (label === "Bắt đầu") {
      navigate("/project/classes", {
        state: {
          data: data,
        },
      });
    }
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
          T
        </Avatar>
        <h1 style={{ marginLeft: "15px" }}>
          Xin chào {user && user.full_name ? user.full_name : ""} !
        </h1>
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
            labelBtn="Bắt đầu"
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
                labelBtn="Bắt đầu"
                heading="Ôn luyện lý thuyết"
                content="Hơn 620 bài lý thuyết"
                handleClickStart={handleClickStart}
              />
            </Col>
            <Col span={12}>
              <BoxContent
                mainColor="#9077F5"
                labelBtn="Bắt đầu"
                heading="Làm bài kiểm tra"
                content="Hơn 300 bài kiểm tra"
                handleClickStart={handleClickStart}
              />
            </Col>
          </Row>
          <BoxTitle title="Năng lực & Tư duy" />
          <BoxContent
            mainColor="#FFC2D5"
            labelBtn="Tìm hiểu ngay"
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
