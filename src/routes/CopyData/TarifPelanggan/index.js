import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Col,
  Input,
  Pagination,
  Card,
  Modal,
  Tag,
} from "antd";
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
  const [nameFilter, setNameFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const [limit, setLimit] = useState(10);
  const handleView = (id) => {
    router.push(`/pelanggantarifedit/${id}`);
  };
  const { Search } = Input;
  const onSearch = (value) => {
    setNameFilter(value.target.value);
    setLoadingState(true);
    httpClient
      .get(
        `tarif/get-tarifMitra?limit=${limit}&page=1&id_muat_kota=&id_tujuan_kota=&id_kendaraan_jenis=${value.target.value}`
      )
      .then(({ data }) => {
        if (data.status.code === 200) {
          setLoadingState(false);
          setOrder(data.data.order);
          setTotal(data.data.totalData);
        }
      })
      .catch(function (error) {
        setLoadingState(false);
        console.log(error.message);
      });
  };
  const columns = [
    // {
    //   title: "No ID",
    //   dataIndex: "id_customer",
    //   key: "id_customer",
    // },
    {
      title: "Kode Tarif",
      dataIndex: "kode_tarif",
      key: "kode_tarif",
      render: (text) => (
        <Tag color="blue">{text}</Tag>
      ),
    },
    {
      title: "Pelanggan",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Muat",
      dataIndex: "kotaAsal",
      key: "kotaAsal",
    },
    {
      title: "Bongkar",
      dataIndex: "kotaTujuan",
      key: "kotaTujuan",
    },
    {
      title: "Jenis Kendaraan",
      dataIndex: "kendaraanJenis",
      key: "kendaraanJenis",
    },
    {
      title: "Date Created",
      dataIndex: "date_created",
      key: "date_created",
    },
    {
      title: "Biaya Kirim",
      dataIndex: "biaya_jalan",
      key: "biaya_jalan",
    },
    // {
    //   title: "Biaya Muat",
    //   dataIndex: "-",
    //   key: "biaya_muat",
    // },
    // {
    //   title: "Biaya Bongkar",
    //   dataIndex: "biaya_bongkar",
    //   key: "biaya_bongkar",
    // },
    {
      title: "Biaya Lain",
      dataIndex: "biaya_lain",
      key: "biaya_lain",
    },
    {
      title: "Aksi",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleView(record.id_price)} type="primary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <EyeOutlined />
            </span>
          </Button>
          <Button onClick={() => handleDelete(record.id_price)} type="danger">
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
            {/* <DeleteOutlined /> */}
          </Button>
        </Space>
      ),
    },

    // {
    //   title: "Keterangan",
    //   dataIndex: "status",
    //   key: "status",
    // },
  ];
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get(
          `tarif/get-tarifCustomer?limit=${limit}&page=${currentPage}&id_muat_kota=&id_tujuan_kota=&id_kendaraan_jenis=&id_price=&id_customer=`
        );
        const data = response.data;
        console.log(data);
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
  }, [currentPage, limit]);

  const handleAdd = (id) => {
    router.push(`/pelanggantarifcerate/`);
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
          .post(`tarif/delete-tarifCustomer`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = listData.filter((item) => item.id_price !== id);
              setListData(newOrder);
              // Reload the data after successful deletion if necessary
              // fetchData();
              window.location.reload();

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
        <h3>Data Tarif Customer</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Col sm={24} className="d-flex justify-content-end">
            <Button type="primary" onClick={handleAdd}>
              Tambah Tarif Baru
            </Button>
          </Col>
          <Col span={4}>
            {/* <Search
            placeholder="Cari Pelanggan"
            allowClear
            onSearch={onSearch}
            onChange={onSearch}
            loading={loadingState}
          /> */}
          </Col>
          {/* <Button type="default">Cari Daftar Harga</Button> */}
        </div>
        <style>
          {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: 	#ADD8E6;
          }
          
        `}
        </style>
        <Table
          dataSource={listData}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: limit,
            total,
            onChange: (page) => setCurrentPage(page),
          }}
          onChange={(pagination) => {
            setCurrentPage(pagination.current);
            setLimit(pagination.pageSize);
          }}
        />
      </Card>
    </div>
  );
};

export default SamplePage;
