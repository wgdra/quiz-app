import { ConfigProvider, Button, Space } from "antd";

const ButtonGroup = ({ ...props }) => {
  const { items } = props;

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
        {items &&
          items.length >= 0 &&
          items.map((item, _) => {
            return (
              <Button key={_} {...item}>
                {item.label}
              </Button>
            );
          })}
      </Space>
    </ConfigProvider>
  );
};

export default ButtonGroup;
