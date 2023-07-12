import React, { useEffect, useState } from "react";
import { Table, Button, Space, Card, Modal, Col } from "antd";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";


const SamplePage = () => {
  const router = useHistory();
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const handleView = (id) => {
    router.push(`/tarif_eureka_edit/${id}`);
  };
  const columns = [
   
    // {
    //   title: "id_price",
    //   dataIndex: "id_price",
    //   key: "id_price",
    // },
    // {
    //   title: "id_muat_kota",
    //   dataIndex: "id_muat_kota",
    //   key: "id_muat_kota",
    // },
    // {
    //   title: "id_tujuan_kota",
    //   dataIndex: "id_tujuan_kota",
    //   key: "id_tujuan_kota",
    // },
    // {
    //   title: "id_kendaraan_jenis",
    //   dataIndex: "id_kendaraan_jenis",
    //   key: "id_kendaraan_jenis",
    // },
    {
      title: "Jenis Pelayanan",
      dataIndex: "service_type",
      key: "service_type",
    },
    {
      title: "Jenis Kiriman",
      dataIndex: "jenis_kiriman",
      key: "jenis_kiriman",
    },
    {
      title: "Tarif",
      dataIndex: "tarif",
      key: "tarif",
    },
    {
      title: "Ritase",
      dataIndex: "ritase",
      key: "ritase",
    },
    {
      title: "Uang Jalan",
      dataIndex: "uang_jalan",
      key: "uang_jalan",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
    {
      title: "Tanggal Pembuatan",
      dataIndex: "date_created",
      key: "date_created",
    },
    // {
    //   title: "id_user",
    //   dataIndex: "id_user",
    //   key: "id_user",
    // },
    {
      title: "Kota Muat",
      dataIndex: "kotaAsal",
      key: "kotaAsal",
    },
    {
      title: "Kota Tujuan",
      dataIndex: "kotaTujuan",
      key: "kotaTujuan",
    },
    {
      title: "Jenis Kendaraan",
      dataIndex: "kendaraanJenis",
      key: "kendaraanJenis",
    },
    {
      title: "Action",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleView(record.id_price)} type="primary">
          <EyeOutlined />
          </Button>
          <Button
            className="mt-2"
            onClick={() => handleDelete(record.id_price)}
            type="danger"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
            {/* <DeleteOutlined /> */}
          </Button>
        </Space>
        
        
      ),
    },
  ];
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get(
          `tarif/get-tarifeureka?limit=${limit}&page=${page}&id_muat_kota=&id_tujuan_kota=&id_kendaraan_jenis=`
      
          
        );
        const data = response.data;

        if (data.status.code === 200) {
          setListData(data.data.order);
          setTotal(data.data.totalData);
        } else {
          console.log("Error: ", data.status.message);
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    };

    fetchData();
  }, []);

  const handleAdd = (id) => {
    router.push(`/tarif_eurekacreate`);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Tarif?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id_price: id,
        };
        httpClient
          .post(`tarif/delete-tarifEureka`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = listData.filter(
                (item) => item.id_price !== id
              );
              setListData(newOrder);
              // Reload the data after successful deletion if necessary
              // fetchData();
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <Card>
      <h3>
        Tarif Eureka 
        </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Col sm={24} className="d-flex justify-content-end">
        <Button type="primary" onClick={handleAdd}>
          New Tarif
        </Button>
        </Col>
        
        {/* <Button type="default">Cari Pricelist</Button> */}
      </div>
      <Table
        dataSource={listData}
        columns={columns}
        scroll={{
          x: 1300,
        }}
        pagination={{ total, current: page, pageSize: limit }}
        onChange={(pagination) => setPage(pagination.current)}
      />
      </Card>
    </div>
  );
};

export default SamplePage;
