import { Row, Col, Space, Avatar } from "antd";
import BoxContentClass from "../../../components/ui/BoxContentClass";
import { useNavigate, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import RankTable from "../../../components/ui/RankTable";

const Classes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state.data;

  const dataRank = [
    {
      avatar: "",
      name: "Nguyễn Văn Mạnh",
      point: 2023,
    },
    {
      avatar: "",
      name: "Nguyễn Tiến Trung",
      point: 2000,
    },
    {
      avatar: "",
      name: "Vũ Khắc Hữu",
      point: 1888,
    },
    {
      avatar: "",
      name: "Đỗ Duy Nam",
      point: 1880,
    },
    {
      avatar: "",
      name: "Ngô Bá Khang",
      point: 1878,
    },
    {
      avatar: "",
      name: "Thảo Thị Trang",
      point: 1877,
    },
    {
      avatar: "",
      name: "Nguyễn Văn Tiến",
      point: 1865,
    },
    {
      avatar: "",
      name: "Nguyễn Hoàng Long",
      point: 1830,
    },
    {
      avatar: "",
      name: "Nguyễn Thị An",
      point: 1825,
    },
    {
      avatar: "",
      name: "Nguyễn Thị Lam",
      point: 1806,
    },
  ];

  const handleClickClass = (data) => {
    console.log("data", data);
    navigate("/project/method", {
      state: {
        data: data,
      },
    });
  };
  return (
    <>
      <h1 style={{ color: "#44a500" }}>{}</h1>
      <h2>Lựa chọn lớp mà em muốn Luyện tập!</h2>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={16}>
          {data.map((data, index) => {
            return (
              <BoxContentClass
                key={index}
                data={data}
                handleClickClass={handleClickClass}
              />
            );
          })}
        </Col>
        <Col className="gutter-row" span={8}>
          <RankTable dataRank={dataRank} />
        </Col>
      </Row>
    </>
  );
};

export default Classes;
