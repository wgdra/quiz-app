import { Row, Col, Space, Avatar } from "antd";
import BoxContentClass from "../../../components/ui/BoxContentClass";
import { useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import RankTable from "../../../components/ui/RankTable";

const Classes = () => {
  const location = useLocation();
  const isTitle = location.state?.name;
  const dataClass = [
    {
      class_name: "Lớp 1",
      thumbnail:
        "https://cdn.vungoi.vn/vungoi/2021/1103/1635909455400_cu_1.png",
      description:
        "Trẻ thấy thú vị với bài tập thông qua câu hỏi sinh động, tăng tư duy logic qua các bài tập trắc nghiệm Toán và Tiếng Việt.",
    },
    {
      class_name: "Lớp 2",
      thumbnail:
        "https://cdn.vungoi.vn/vungoi/2021/1103/1635909526523_cu_2.png",
      description:
        "Hào hứng với các bài tập trắc nghiệm Toán và Tiếng Việt giúp trẻ rèn tư duy với hình ảnh bắt mắt sinh động và trực quan.",
    },
    {
      class_name: "Lớp 3",
      thumbnail:
        "https://cdn.vungoi.vn/vungoi/2021/1103/1635911166718_cu_3.png",
      description:
        "Mỗi ngày trẻ thấy thú vị với các bài tập trắc nghiệm Toán và Tiếng Việt giúp rèn tư duy thông qua hình ảnh bắt mắt sinh động và trực quan.",
    },
    {
      class_name: "Lớp 4",
      thumbnail:
        "https://cdn.vungoi.vn/vungoi/2021/1103/1635911205350_cu_4.png",
      description:
        "Bài tập lớp 4 sẽ dễ dàng hơn khi con tiếp cận bài tập Toán và Tiếng Việt sinh động và thú vị giúp con có tư duy mở.",
    },
    {
      class_name: "Lớp 5",
      thumbnail:
        "https://cdn.vungoi.vn/vungoi/2021/1103/1635911292236_cu_5.png",
      description:
        "Học thông qua bài tập trắc nghiệm Toán và Tiếng Việt theo từng dạng để các con nhớ kiến thức lâu hơn.",
    },
  ];

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

  return (
    <>
      <h1 style={{ color: "#44a500" }}>{isTitle}</h1>
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
          {dataClass.map((data, index) => {
            return (
              <BoxContentClass
                key={index}
                class_name={data.class_name}
                thumbnail={data.thumbnail}
                description={data.description}
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
