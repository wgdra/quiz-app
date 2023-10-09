import { ConfigProvider, Button } from "antd";

const ButtonPrimary = ({ ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            /* here is your component tokens */
          },
        },
      }}
    >
      <Button {...props}>{props.label}</Button>
    </ConfigProvider>
  );
};

export default ButtonPrimary;
