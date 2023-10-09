import { ConfigProvider, Button, Space } from "antd";

const ButtonGroup = ({ ...props }) => {
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
      <Space wrap>
        <Button {...props}>{props.labelPrev}</Button>
        <Button {...props} danger>
          {props.labelNext}
        </Button>
      </Space>
    </ConfigProvider>
  );
};

export default ButtonGroup;
