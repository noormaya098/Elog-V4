import React from "react";
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
} from "antd";

const { RangePicker } = DatePicker;

const columns = [
  {
    title: "No.as",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Action",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "REQ ID",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "SP ID",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Perusahaan",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Service",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Pickup Date",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Date Create",
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
const { Search } = Input;

const onSearch = (value) => console.log(value);

const SamplePage = () => {
  return (
    <div>
      <Card>
        <Row>
          <Col>
            <Search
              placeholder="No. SPID"
              allowClear
              onSearch={onSearch}
              style={{ width: 304 }}
            />
          </Col>
        </Row>
        <Table dataSource={data} columns={columns} style={{ marginTop: 10 }} />
      </Card>
    </div>
  );
};

export default SamplePage;
