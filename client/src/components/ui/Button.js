import { ConfigProvider, Button } from "antd";

const ButtonBasic = ({ ...props }) => {
  const name = props.name;
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

export default ButtonBasic;
