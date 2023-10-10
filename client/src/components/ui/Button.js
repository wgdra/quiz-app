import { ConfigProvider, Button } from "antd";

const ButtonBasic = ({ ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            /* here is your component tokens */
            defaultColor: "#ffffff",
            defaultBg: props.tokenDefaultColor,
            defaultBorderColor: props.tokenDefaultColor,
          },
        },
      }}
    >
      <Button {...props}>{props.label}</Button>
    </ConfigProvider>
  );
};

export default ButtonBasic;
