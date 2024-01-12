import { Form, Input } from "antd";
import ButtonGroup from "../../components/ui/ButtonGroup";
import Logo from "../../assets/images/Sprout-logo.png";

const FormAuth = ({ ...props }) => {
  const { loadings, formItems, lableBtn, more, onFinish, onClickLink } = props;

  return (
    <Form
      name="basic"
      style={{
        minWidth: 760,
        background: "#ffffff",
        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
        borderRadius: 25,
        padding: "46px 66px",
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div style={{ textAlign: "center" }}>
        <img src={Logo} style={{ width: 220 }} />
      </div>
      {formItems.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              marginBottom: 26,
            }}
          >
            <span
              style={{
                fontSize: "1.3em",
                fontWeight: "bold",
                color: "#222B45",
              }}
            >
              {item.lable}
            </span>
            <Form.Item {...item} name={item.name} rules={item.rules}>
              {item.type}
            </Form.Item>
          </div>
        );
      })}
      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 8,
        }}
      >
        <ButtonGroup
          loading={loadings}
          size="large"
          items={[
            {
              type: "primary",
              htmlType: "submit",
              label: lableBtn,
              style: { background: "#04aa6d" },
              buttonDesign: {
                fontWeight: "bold",
                defaultColor: "#FFFFFF",
                defaultBorderColor: "#6DAE40",
                defaultBg: "#6DAE40",
                colorPrimaryHover: "#FFFFFF",
                colorPrimaryActive: "#FFFFFF",
                paddingInlineLG: 20,
              },
            },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <p style={{ textAlign: "end", fontSize: "1.2em" }}>
          {more.title}{" "}
          <a style={{ color: "#65B446" }} onClick={onClickLink}>
            {more.link}
          </a>
        </p>
      </Form.Item>
    </Form>
  );
};

export default FormAuth;
