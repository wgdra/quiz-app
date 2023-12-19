import { ConfigProvider, Radio } from "antd";

const RadioChecked = ({ ...props }) => {
  const optionImg = props.option.includes("data:image/png;base64");

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#95d354",
        },
        components: {
          Radio: {
            /* here is your component tokens */
          },
        },
      }}
    >
      <Radio value={props.value} defaultChecked={false}>
        {optionImg ? (
          <img src={props.option} style={{ width: "100%" }} />
        ) : (
          props.option
        )}
        {/* {props.option} */}
      </Radio>
    </ConfigProvider>
  );
};

export default RadioChecked;
