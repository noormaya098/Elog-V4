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
    title: "No.",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Kode",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Muat-Bongkar",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tujuan",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Nilai barang",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Rate",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Premi",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "ETA",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "ETD",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tgl.Buat",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
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

const SamplePage = () => {
  return (
    <div>
      <Card>
      <Row justify="space-between" align="middle">
        <Col span={24}>
          {/* <a href="/plussadd" className="btn btn-outline-primary btn-sm">
            +ADD
          </a> */}
          <Button style={{ float: "right" }} 
            onClick={()=>{
              window.location.href = "/plussadd"
            }}
          >
        +ADD  
      </Button>
  
    </Col>
    </Row>
        <Row justify="space-between" align="middle">
        
          <Col span={20}>
            <Table
              dataSource={data}
              columns={columns}
              style={{ marginTop: 10 }}
            />
          </Col>
          
        </Row>
      </Card>
    </div>
  );
};

export default SamplePage;
