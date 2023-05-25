import React from "react";
import {
  Button,
  Card,
  Col,
  Image,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";

const CommentInternal = () => {
  const columns = [
    {
      title: "No.",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "SP Number",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Coment",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "User",
      dataIndex: "image",
      key: "image",
      render: (gambarUrl) => <Image width={50} height={50} src={gambarUrl} />,
    },
    {
      title: "Tanggal Coment",
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
      image:
        "https://i1.wp.com/yosualogistik.co.id/wp-content/uploads/2021/07/Hino-new-Ranger_TruckMagz.jpg?fit=900%2C550&ssl=1",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      image:
        "https://www.deliveree.com/id/wp-content/uploads/sites/2/2020/06/harga-truk-angkut-barang-ekspedisi-og.jpg",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      image:
        "https://www.unionlogistics.co.id/wp-content/uploads/2021/07/Memahami-Berbagai-Jenis-Truk-Untuk-Pengiriman-Barang.jpg",
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

export default CommentInternal;
