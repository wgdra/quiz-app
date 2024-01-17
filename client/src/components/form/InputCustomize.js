import { ConfigProvider, Input } from "antd";

const InputCustomize = ({ ...props }) => {
  const { inputRef } = props;

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: props.inputDesign,
        },
      }}
    >
      <Input {...props} ref={inputRef} />
    </ConfigProvider>
  );
};

export default InputCustomize;
