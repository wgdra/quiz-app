import ButtonBasic from "./Button";

const BoxContent = ({ ...props }) => {
  const { handleClickStart } = props;

  return (
    <div
      style={{
        height: "200px",
        color: "#fff",
        background: props.mainColor,
        borderRadius: 20,
        padding: 20,
        marginBottom: 26,
      }}
    >
      <p style={{ margin: 0, fontSize: "1.5em", fontWeight: "bold" }}>
        {props.heading}
      </p>
      <p style={{ marginBottom: 42, fontSize: "1.2em" }}>{props.content}</p>
      <ButtonBasic
        size="large"
        label="Bắt đầu"
        defaultColor={props.mainColor}
        tokenDefaultColor="#ffff"
        tokenCustomize={{
          colorPrimaryHover: props.mainColor,
          borderRadius: "50px",
          colorPrimaryActive: props.mainColor,
        }}
        style={{
          fontSize: "1.3em",
          fontWeight: "bold",
          padding: "0px 28px",
        }}
        onClick={() => handleClickStart(props.heading)}
      />
    </div>
  );
};

export default BoxContent;
