import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { httpClient } from "../../util/Api";

const { RangePicker } = DatePicker;

const SamplePage = () => {
  const [order, setOrder] = useState([]);

  const columns = [
    {
      title: "No.",
      dataIndex: "sm",
      key: "sm",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "SM",
      dataIndex: "sm",
      key: "sm",
    },
    {
      title: "SP",
      dataIndex: "sp",
      key: "sp",
    },
    {
      title: "Perusahaan",
      dataIndex: "perusahaan",
      key: "perusahaan",
    },
    {
      title: "Pickup Date",
      dataIndex: "pickupDate",
      key: "pickupDate",
    },

    {
      title: "Destination",
      key: "destination",
      dataIndex: "destination",
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

  useEffect(() => {
    httpClient
      .get("sm/get-sm?limit=10&page=1&keyword=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrder(data.data.order);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <Card>
        <Row gutter={16}>
          <Col>
            <Link href="/splistnew">
              <a href="/addnewsm">
                <Button>New SM</Button>
              </a>
            </Link>
          </Col>
          <Col>
            <RangePicker />
          </Col>
          <Col>
            <Button>Print</Button>
          </Col>
          <Col>
            <Input placeholder="No SMID..." />
          </Col>
        </Row>
        <Table dataSource={order} columns={columns} style={{ marginTop: 10 }} />
      </Card>
    </div>
  );
};

export default SamplePage;
