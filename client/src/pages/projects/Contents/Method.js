import { Col, Row } from "antd";
import { RightOutlined } from "@ant-design/icons";
import ImgMethod1 from "../../../assets/images/img-method-1.png";
import ImgMethod2 from "../../../assets/images/img-method-2.png";
import ImgMethod3 from "../../../assets/images/img-method-3.png";
import { useLocation } from "react-router-dom";

const Method = () => {
  const location = useLocation();

  return (
    <>
      <h1 style={{ color: "#e29000" }}>{location.state.class}</h1>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={6}>
          <div
            style={{
              height: 36,
              width: 245,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "1.3em",
              fontWeight: "bold",
              color: "#fff",
              background: "linear-gradient(90deg, #44a500 0%, #baef48 100%)",
              borderRadius: "5px",
              padding: "8px 16px",
              marginBottom: 16,
            }}
          >
            <p>MÔN TOÁN</p>
            <RightOutlined />
          </div>
          <div
            style={{
              height: 36,
              width: 245,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "1.3em",
              fontWeight: "bold",
              //   color: "#fff",
              //   background: "linear-gradient(90deg, #44a500 0%, #baef48 100%)",
              border: "1px solid #cfcfcf",
              borderRadius: "5px",
              padding: "8px 16px",
              marginBottom: 16,
            }}
          >
            <p>MÔN TIẾNG VIỆT</p>
            <RightOutlined />
          </div>
        </Col>
        <Col className="gutter-row" span={18}>
          <span
            style={{
              fontSize: "1.3em",
              fontWeight: "bold",
              display: "block",
              marginBottom: 20,
            }}
          >
            Bạn đã chọn MÔN TOÁN. Chọn phương thức bạn muốn ôn luyện.
          </span>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: 186,
                height: 166,
                fontSize: "1.2em",
                fontWeight: "bold",
                textAlign: "center",
                border: "2px solid #cfcfcf",
                borderRadius: "5px",
                padding: 16,
                marginRight: 16,
              }}
            >
              <img src={ImgMethod1} style={{ width: 60, height: 60 }} />
              <p>Luyện bài tập trắc nghiệm</p>
            </div>
            <div
              style={{
                width: 186,
                height: 166,
                fontSize: "1.2em",
                fontWeight: "bold",
                textAlign: "center",
                border: "2px solid #cfcfcf",
                borderRadius: "5px",
                padding: 16,
                marginRight: 16,
              }}
            >
              <img src={ImgMethod2} style={{ width: 60, height: 60 }} />
              <p>Ôn tập lý thuyết</p>
            </div>

            <div
              style={{
                width: 186,
                height: 166,
                fontSize: "1.2em",
                fontWeight: "bold",
                textAlign: "center",
                border: "2px solid #cfcfcf",
                borderRadius: "5px",
                padding: 16,
                marginRight: 16,
              }}
            >
              <img src={ImgMethod3} style={{ width: 60, height: 60 }} />
              <p>Làm đề thi</p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Method;
