import React from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";

const Customerrequest = () => {
  const columns = [
    {
      title: "No.",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "No.PH",
      dataIndex: "age",
      key: "age",
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
      title: "Pickup Date",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date Create",
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
      title: "Action",
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
  return (
    <div>
      <Card>
        <Row style={{ marginBottom: 10 }}>
          <Col md={20}>
            <Typography>Show</Typography>
          </Col>
          <Col md={4}>
            <Input placeholder="No SPID" />
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default Customerrequest;
