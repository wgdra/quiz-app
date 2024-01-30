import React, { useEffect, useState } from "react";
import { Avatar, Skeleton, List } from "antd";
import VirtualList from "rc-virtual-list";

const BoxListUser = ({ ...props }) => {
  const { listUser, createNewConversation } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [listUser]);

  const onClickNewConversation = (data) => {
    createNewConversation(data._id);
  };

  return (
    <Skeleton loading={loading}>
      <List>
        <VirtualList
          data={listUser}
          height={700}
          itemHeight={50}
          itemKey="userId"
        >
          {(item) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://upload.wikimedia.org/wikipedia/commons/0/03/Logo_HAU.png" />
                }
                title={
                  <span
                    style={{ fontSize: "1.2em", cursor: "pointer" }}
                    onClick={() => onClickNewConversation(item)}
                  >
                    {item.full_name}
                  </span>
                }
                description={item.email}
              />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </Skeleton>
  );
};
export default BoxListUser;
