import { ConfigProvider, Breadcrumb } from "antd";

const BreadCrumb = ({ ...props }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          lineHeight: "2em",
        },
        components: {
          Breadcrumb: {
            /* here is your component tokens */
            itemColor: props.itemColor,
            separatorColor: props.itemColor,
            lastItemColor: props.lastItemColor,
          },
        },
      }}
    >
      <Breadcrumb {...props} items={props.items} />
    </ConfigProvider>
  );
};

export default BreadCrumb;
