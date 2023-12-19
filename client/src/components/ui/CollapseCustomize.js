import { Collapse } from "antd";

const CollapseCustomize = ({ ...props }) => {
  return <Collapse {...props} items={props.items} />;
};

export default CollapseCustomize;
