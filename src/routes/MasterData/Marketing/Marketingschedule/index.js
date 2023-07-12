import React from "react";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
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
  Calendar,
} from "antd";
import { CSVLink } from "react-csv";

const { RangePicker } = DatePicker;

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
    pickupDate: "2022-01-01",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
    pickupDate: "2022-01-02",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
    pickupDate: "2022-01-03",
  },
];

const columns = [
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "SM",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "SP",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Perusahaan",
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
    dataIndex: "pickupDate",
    key: "pickupDate",
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

const SamplePage = () => {
  const csvData = [["No.", "SM", "SP", "Perusahaan", "Pickup Date"]];
  data.forEach((item) => {
    const { key, age, address, tags, pickupDate } = item;
    const perusahaan = tags.join(", ");
    csvData.push([key, age, address, perusahaan, pickupDate]);
  });

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <div>
      <Row>
        <Col md={11}>
          <Calendar
            onPanelChange={onPanelChange}
            style={{ marginBottom: 10 }}
          />
        </Col>
        <Col md={13}>
          <Card style={{ marginBottom: "16px" }}>
            <Row gutter={[16, 16]}>
              <Col span={4}>
                <RangePicker format="DD-MM-YYYY" showToday />
              </Col>
              <Col span={16}>
                <Button type="primary" style={{ marginRight: 16 }}>
                  Add
                </Button>
                <CSVLink data={data} filename={"data.csv"}>
                  <Button icon={<DownloadOutlined />} type="primary">
                    Export
                  </Button>
                </CSVLink>
              </Col>

              <Col span={4}>
                <Input.Search
                  placeholder="Search"
                  allowClear
                  enterButton={<SearchOutlined />}
                />
              </Col>
            </Row>
          </Card>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </div>
  );
};

export default SamplePage;
