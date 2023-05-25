import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Space,
  Table,
  Tag,
  DatePicker,
  Input,
  Row,
  Col,
  Tooltip,
  Select,
} from "antd";

const { RangePicker } = DatePicker;

const columns = [
  {
    title: "No.",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "SPID",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Sales",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Perusahaan",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Pickup Date",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Order Date",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Price(RP)",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Pickup Date",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Destination",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};

const select = () => (
  <Select
    showSearch
    placeholder="Select Here"
    optionFilterProp=""
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    }
  >
    <Select.Option value="webmaster_jkt" label=" Webmaster_jkt">
      Webmaster_jkt
    </Select.Option>
    <Select.Option value="webmaster_sales" label="Webmaster_sales">
      Webmaster_sales
    </Select.Option>
    <Select.Option value="Webmaster_admin" label="Webmaster_admin">
      Webmaster_admin
    </Select.Option>
  </Select>
);

const SamplePage = () => {
  return (
    <div>
      <Card style={{ marginBottom: "16px" }}>
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <RangePicker />
          </Col>
          <Col span={4}>{select()}</Col>
          <Button type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
          <Col span={4}>
            <Space className="site-button-ghost-wrapper" wrap>
              <Button type="primary">PRINT</Button>
            </Space>
          </Col>
        </Row>
        <Card>
          <Table
            dataSource={data}
            columns={columns}
            style={{ marginTop: 10 }}
          />
        </Card>
      </Card>
    </div>
  );
};

export default SamplePage;
