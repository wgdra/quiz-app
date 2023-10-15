import React, { useRef, useState } from "react";
import { ConfigProvider, Table, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ListTable = ({ ...props }) => {
  const [loading, setLoading] = useState(false);
  const searchInput = useRef(null);
  const columns = props.columns;

  // Handle Search
  const handleSearch = (confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : "rgba(0, 0, 0, 0.88)",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  // Colums
  const newColums = columns.map((column) => {
    if (column.key) {
      return {
        ...column,
        ...getColumnSearchProps(column.key),
      };
    }
    return column;
  });

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            /* component tokens */
            cellFontSize: 16,
            headerBg: "#d9d9d9",
            headerBorderRadius: "0px",
          },
        },
      }}
    >
      <Table columns={newColums} loading={loading} dataSource={props.data} />;
    </ConfigProvider>
  );
};

export default ListTable;
