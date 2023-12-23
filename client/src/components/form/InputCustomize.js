import { ConfigProvider, Input } from "antd";

const InputCustomize = ({ ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: props.inputDesign,
        },
      }}
    >
      <Input {...props} />
    </ConfigProvider>
  );
};

export default InputCustomize;
