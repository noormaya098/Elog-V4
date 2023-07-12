import React, { useEffect, useState } from "react";
import { Button, Card, Input, Space, Table, Modal, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../util/Api";

const { confirm } = Modal;

const SamplePage = () => {
  const router = useHistory();
  const [customerAddresses, setCustomerAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get(
          "customer/get-customer-address?id_customer=1027"
        );
        const data = response.data;

        if (data.status.code === 200) {
          setCustomerAddresses(data.data);
        } else {
          console.log("Error: ", data.status.message);
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    router.push(`/masteralamat/edit/${id}`);
  };

  const handleAdd = (id) => {
    router.push(`/masteralamat/add`);
  };

  const handleDelete = (id) => {
    confirm({
      title: "Are you sure you want to delete this customer?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id_customer: id,
        };
        httpClient
          .post(`customer/del-customer`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = customerAddresses.filter(
                (item) => item.id !== id
              );
              setCustomerAddresses(newOrder);
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
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
    },
    {
      title: "Alamat Detail",
      dataIndex: "alamat_detail",
      key: "alamat_detail",
    },
    {
      title: "Kecamatan",
      dataIndex: "kecamatan",
      key: "kecamatan",
    },
    {
      title: "Kota",
      dataIndex: "kota",
      key: "kota",
    },
    {
      title: "Kode Wilayah",
      dataIndex: "kode_wilayah",
      key: "kode_wilayah",
    },
    {
      title: "Kode Provinsi",
      dataIndex: "kode_provinsi",
      key: "kode_provinsi",
    },
    {
      title: "Action",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record.id)} type="primary">
            Edit
          </Button>
          {/* <Button onClick={() => handleDelete(record.id)} type="primary">
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col span={4}>
          <Button type="primary" onClick={handleAdd}>
            New Alamat
          </Button>
        </Col>
      </Row>
      <Table dataSource={customerAddresses} columns={columns} />
    </>
  );
};

export default SamplePage;
