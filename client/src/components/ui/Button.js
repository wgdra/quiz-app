import { ConfigProvider, Button } from "antd";

const ButtonBasic = ({ ...props }) => {
  return (
    <ConfigProvider
      theme={{
        token: props.tokenCustomize,
        // {
        //   /* here is your global tokens */
        //   colorPrimaryHover: props.colorPrimaryHover,
        // },
        components: {
          Button: {
            /* here is your component tokens */
            defaultColor: props.defaultColor,
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
