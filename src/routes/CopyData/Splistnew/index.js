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
  Tooltip,
  Select,
} from "antd";
import { httpClient } from "../../util/Api";

const { RangePicker } = DatePicker;

const SamplePage = () => {
  const [order, setOrder] = useState([]);
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

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text) => <a>{text}</a>,
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
      title: "Marketing",
      dataIndex: "marketing",
      key: "marketing",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Kendaraan",
      dataIndex: "kendaraan",
      key: "kendaraan",
    },
    {
      title: "Tgl Pickup",
      dataIndex: "tglPickup",
      key: "tglPickup",
    },
    {
      title: "Destinasi",
      dataIndex: "destinasi",
      key: "destinasi",
    },
    {
      title: "Act",
      dataIndex: "act",
      key: "act",
      render: (text) => {
        let tagColor = "";
        switch (text) {
          case "Confirmed":
            tagColor = "green";
            break;
          case "Pending":
            tagColor = "orange";
            break;
          case "Cancelled":
            tagColor = "red";
            break;
          default:
            tagColor = "default";
        }
        return <Tag color={tagColor}>{text}</Tag>;
      },
    },
    {
      title: "OPS",
      dataIndex: "ops",
      key: "ops",
      render: (text) => {
        let tagColor = "";
        switch (text) {
          case "Confirmed":
            tagColor = "green";
            break;
          case "Pending":
            tagColor = "orange";
            break;
          case "Cancelled":
            tagColor = "red";
            break;
          default:
            tagColor = "default";
        }
        return <Tag color={tagColor}>{text}</Tag>;
      },
    },
    {
      title: "Purch",
      dataIndex: "purch",
      key: "purch",
      render: (text) => {
        let tagColor = "";
        switch (text) {
          case "Confirmed":
            tagColor = "green";
            break;
          case "Pending":
            tagColor = "orange";
            break;
          case "Cancelled":
            tagColor = "red";
            break;
          default:
            tagColor = "default";
        }
        return <Tag color={tagColor}>{text}</Tag>;
      },
    },
    {
      title: "Opsi",
      key: "opsi",
      render: () => (
        <Button type="primary" ghost>
          Detail SP
        </Button>
      ),
    },
  ];

  useEffect(() => {
    httpClient
      .get("sp/get-SP-sales?limit=10&page=1&keyword=")
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
      <Card style={{ marginBottom: "16px" }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <RangePicker />
          </Col>
          <Col span={8}>{select()}</Col>
          <Col span={4}>
            <Space className="site-button-ghost-wrapper" wrap>
              <a href="/addnewsp">
                <Button type="primary">NEW SP</Button>
              </a>
            </Space>
          </Col>
          <Col span={4}>
            <DatePicker picker="year" />
          </Col>
        </Row>
        <Card>
          <Table
            dataSource={order}
            columns={columns}
            style={{ marginTop: 10 }}
          />
        </Card>
      </Card>
    </div>
  );
};

export default SamplePage;
