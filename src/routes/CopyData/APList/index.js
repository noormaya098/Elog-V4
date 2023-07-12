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
  Select,
} from "antd";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../util/Api";

const { RangePicker } = DatePicker;

const { Search } = Input;

const onSearch = (value) => console.log(value);

const SamplePage = () => {
  const router = useHistory();

  const [order, setOrder] = useState([]);
  const [detailSp, setDetailSp] = useState([]);

  const handleView = (id) => {
    httpClient
      .get(`sp/get-SP-detail?idmp=${id}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setDetailSp(data.data.order);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const columns = [
    {
      title: "Action",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleView(record.idmp)} type="primary">
            View
          </Button>
        </Space>
      ),
    },
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Invoice Number",
      dataIndex: "sp",
      key: "sp",
    },
    {
      title: "Mitra Invoice",
      dataIndex: "perusahaan",
      key: "perusahaan",
    },
    {
      title: "Receive Invoice",
      dataIndex: "salesName",
      key: "salesName",
    },
    {
      title: "Partner",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Invoice Date",
      dataIndex: "address",
      key: "address",
      responsive: ["md"],
    },
    {
      title: "PPH 23",
      dataIndex: "pickupDate",
      key: "pickupDate",
      responsive: ["md"],
    },
  ];

  function handleClick() {
    router.push("/splist/create");
  }

  useEffect(() => {
    httpClient
      .get("sp/get-AP?limit=10&page=1&keyword=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrder(data.data.order);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Card>
        <Row>
          <Col md={16}>
            <Select
              defaultValue="lucy"
              style={{
                width: 120,
                marginRight: 10,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
                {
                  value: "disabled",
                  label: "Disabled",
                  disabled: true,
                },
              ]}
            />
            <Button type="primary">View</Button>
            <Button type="primary">Export Excel</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleClick}>
              New AP
            </Button>
          </Col>
        </Row>
        <Table dataSource={order} columns={columns} style={{ marginTop: 10 }} />
      </Card>
    </div>
  );
};

export default SamplePage;
