const FormTitle = ({ ...props }) => {
  return (
    <div
      style={{
        color: "#fff",
        // background: "#1677ff",
        background: props.background,
        padding: "8px 0px",
        margin: props.margin,
      }}
    >
      <span
        style={{
          fontSize: props.fontSize,
          fontWeight: "bold",
        }}
      >
        {props.title}
      </span>
    </div>
  );
};

export default FormTitle;
