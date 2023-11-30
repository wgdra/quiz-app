import { Space, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ImgPoint from "../../assets/images/hat-dau.png";

const RankTable = ({ ...props }) => {
  const { dataRank } = props;

  return (
    <div
      style={{
        border: "2px solid #cfcfcf",
        borderRadius: 5,
        padding: "0px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          borderBottom: "1px solid #44a500",
          marginBottom: 16,
        }}
      >
        <img src="https://vungoi.vn/images/icon_ranking.png" />
        <p
          style={{
            fontSize: "1.3em",
            fontWeight: "bold",
            color: "#44a500",
            marginLeft: 16,
          }}
        >
          Bảng xếp hạng luyện tập
        </p>
      </div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        {dataRank &&
          dataRank.map((item, index) => {
            return (
              <div
                key={index + 1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  fontSize: "1.2em",
                }}
              >
                <Avatar size="large" icon={<UserOutlined />} />
                <p style={{ width: "60%" }}>{item.name}</p>
                <Space>
                  <p style={{ fontWeight: "bold" }}>{item.point}</p>
                  <img src={ImgPoint} style={{ height: 26, width: 26 }} />
                </Space>
              </div>
            );
          })}
      </Space>
    </div>
  );
};

export default RankTable;
