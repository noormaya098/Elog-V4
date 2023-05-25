import React, { useEffect, useState } from "react";
import { Button, Card, Input, Space, Table, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../util/Api";

const { confirm } = Modal;

const SamplePage = () => {
  const router = useHistory();

  const handleAdd = (id) => {
    router.push(`/mastercustomer/add`);
  };

  const handleDetail = (id) => {
    router.push(`/mastercustomer/detail/${id}`);
  };

  const [order, setOrder] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [nameFilter, setNameFilter] = useState(null);

  const handleDelete = (custId) => {
    confirm({
      title: "Are you sure you want to delete this customer?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id_customer: custId,
        };
        httpClient
          .post(`customer/del-customer`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = order.filter((item) => item.custId !== custId);
              setOrder(newOrder);
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Kode",
      dataIndex: "custCode",
      key: "custCode",
    },
    {
      title: "Perusahaan",
      dataIndex: "custName",
      key: "custName",
    },
    {
      title: "Telephone",
      dataIndex: "custTelephone",
      key: "custTelephone",
    },
    {
      title: "Address",
      dataIndex: "custAddress",
      key: "custAddress",
    },
    {
      title: "Action",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleDetail(record.custId)} type="primary">
            View
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    httpClient
      .get("customer/get-customer?limit=10&page=1&keyword=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrder(data.data.order);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const onSearch = (value) => {
    setNameFilter(value.target.value);
    setLoadingState(true);
    httpClient
      .get(
        `customer/get-customer?limit=10&page=1&keyword=${value.target.value}`
      )
      .then(({ data }) => {
        if (data.status.code === 200) {
          setLoadingState(false);
          setOrder(data.data.order);
        }
      })
      .catch(function (error) {
        setLoadingState(false);
        console.log(error.message);
      });
  };

  return (
    <div>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={handleAdd}>
            New Customer
          </Button>
          <Input.Search
            placeholder="Search by company name"
            onSearch={onSearch}
            onChange={onSearch}
            loading={loadingState}
          />
        </Space>
        <Table columns={columns} dataSource={order} />
      </Card>
    </div>
  );
};

export default SamplePage;
