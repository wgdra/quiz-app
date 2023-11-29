import { SwapRightOutlined } from "@ant-design/icons";

const BoxTitle = ({ ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
      }}
    >
      <h2>{props.title}</h2>
      <SwapRightOutlined style={{ fontSize: 40, color: "#6051F8" }} />
    </div>
  );
};

export default BoxTitle;
