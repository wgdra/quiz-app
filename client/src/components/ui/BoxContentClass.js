import ButtonBasic from "./Button";

const BoxContentClass = ({ ...props }) => {
  return (
    <div
      style={{
        height: 120,
        border: "2px solid #cfcfcf",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: "16px 0px",
      }}
    >
      <img src={props.thumbnail} />
      <div style={{ width: "70%" }}>
        <h2 style={{ margin: 0, color: "#44a500" }}>{props.class_name}</h2>
        <span style={{ fontSize: "1.3em" }}>{props.description}</span>
      </div>
      <ButtonBasic
        size="large"
        label="Bắt đầu"
        defaultColor="#ffff"
        tokenDefaultColor="#95d354"
        tokenCustomize={{
          colorPrimaryHover: "#ffff",
          borderRadius: "10px",
        }}
        style={{
          fontSize: "1.3em",
          fontWeight: "bold",
          padding: "0px 28px",
        }}
      />
    </div>
  );
};

export default BoxContentClass;
