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
    title: "No.SP",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "No.SPK",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Perusahaan",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Service",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tgl.Pickup",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tujuan",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Mct",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "OPS",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Purch",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Act",
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

const input = () => <Input placeholder="Basic usage" />;

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
    options={[
      {
        value: "no sp",
        label: "NO SP",
      },
      {
        value: "no sm",
        label: "NO SM",
      },
      {
        value: "tanggal pick up",
        label: "Tanggal Pick Up",
      },
    ]}
  />
);

const SamplePage = () => {
  return (
    <div>
      <Card>
        <Col>
          <Button>Advance Search</Button>
        </Col>
        <Row gutter={16} align="middle">
          <Col span={4}>
            <Input placeholder="Input" />
          </Col>
          <Col>{select()}</Col>
          <Col span={4}>
            <Button type="primary" onClick={() => onSearch("search value")}>
              Search
            </Button>
          </Col>
        </Row>
        <Card>
          <Row gutter={16}>
            <Col>
              <Button>New SM</Button>
            </Col>
            <Col>
              <RangePicker />
            </Col>
            <Col>
              <Button>Print</Button>
            </Col>
          </Row>
          <Space className="site-button-ghost-wrapper" wrap>
            <Button type="primary" ghost>
              NO SPK
            </Button>
            <Button type="primary">SPK LIST</Button>
            <Button type="primary" danger>
              SPK PENDING
            </Button>
          </Space>
        </Card>
      </Card>
      <Table dataSource={data} columns={columns} style={{ marginTop: 10 }} />
    </div>
  );
};

export default SamplePage;
