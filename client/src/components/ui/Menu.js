import { Menu, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";

const MenuNavigate = ({ ...props }) => {
  const cusItemColor = props.itemColor;
  const cusItemHoverColor = props.itemHoverColor;

  const navigate = useNavigate();

  const handleNavigate = (key) => {
    switch (key) {
      case key:
        navigate(key);
        break;

      default:
        break;
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            /* here is your component tokens */
            itemHoverColor: cusItemHoverColor,
            itemColor: cusItemColor,
          },
        },
      }}
    >
      <Menu
        {...props}
        items={props.items}
        onClick={(e) => handleNavigate(e.key)}
      />
    </ConfigProvider>
  );
};

export default MenuNavigate;
