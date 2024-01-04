import { ConfigProvider, Button, Space } from "antd";

const ButtonGroup = ({ ...props }) => {
  const { items } = props;

  return (
    <Space wrap>
      {items &&
        items.length >= 0 &&
        items.map((item, _) => {
          return (
            <ConfigProvider
              theme={{
                token: item.tokenCustomize,
                components: {
                  Button: item.buttonDesign,
                  // {
                  //   /* here is your component tokens */
                  //   defaultColor
                  // },
                },
              }}
            >
              <Button
                key={_}
                {...props}
                name={item.name}
                htmlType={item.htmlType || props.htmlType}
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            </ConfigProvider>
          );
        })}
    </Space>
  );
};

export default ButtonGroup;
