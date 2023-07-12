import React from "react";
import { Button, Card, Col, Row, Space, Table, Tag } from "antd";
import { useHistory } from "react-router-dom";

const Pengajuaninternal = () => {
  const router = useHistory();
  const columns = [
    {
      title: "NO.",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "No.Pengajuan",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "No.Surat",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Perihal",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Pemohon",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Divisi",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tgl.Pengajuan",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tgl Buat",
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
  const handleClick = () => {
    router.push("/pengajuaninternal/create");
  };
  return (
    <div>
      <Card>
        <Row>
          <Col md={6}>
            <Button onClick={handleClick}>Pengajuan Dana</Button>
          </Col>
          <Col md={6}>
            <a href="/formklaimdana">
              <Button>Klaim</Button>
            </a>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default Pengajuaninternal;
