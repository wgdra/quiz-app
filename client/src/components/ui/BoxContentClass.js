import ButtonBasic from "./Button";

const BoxContentClass = ({ ...props }) => {
  const { index, data, handleClickClass } = props;
  return (
    <div
      style={{
        height: 120,
        border: "2px solid #cfcfcf",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 27,
      }}
    >
      <img src={data.thumbnail} />
      <div style={{ width: "70%" }}>
        <h2 style={{ margin: 0, color: "#44a500" }}>{data.class_name}</h2>
        <span style={{ fontSize: "1.3em" }}>{data.description}</span>
      </div>
      <ButtonBasic
        size="large"
        label="Bắt đầu"
        defaultColor="#ffff"
        tokenDefaultColor="#95d354"
        tokenCustomize={{
          colorPrimaryHover: "#ffff",
          borderRadius: "10px",
          colorPrimaryActive: "#ffff",
        }}
        style={{
          fontSize: "1.3em",
          fontWeight: "bold",
          padding: "0px 28px",
        }}
        onClick={() => handleClickClass(data)}
      />
    </div>
  );
};

export default BoxContentClass;
