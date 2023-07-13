import React, { useEffect, useState } from "react";
import { Button, Space, Card, Input, Pagination, Modal, Tag } from "antd";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
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
  const [tarifMitraDelete, setTarifMitraDelete] = useState([]);
  const handleView = (id) => {
    router.push(`/tarifmitraedit/${id}`);
  };
  const columns = [
    // {
    //   name: "No ID",
    //   selector: "id_customer",
    //   key: "id_customer",
    // },
    {
      name: "No.",
      selector: (row) => row.no,
      width: "8%",
    },
    {
      name: "Muat",
      selector: (row) => row.kotaAsal,
      key: "kotaAsal",
    },
    {
      name: "Bongkar",
      selector: (row) => row.kotaTujuan,
      key: "kotaTujuan",
    },
    {
      name: "Jenis Kendaraan",
      selector: "kendaraanJenis",
      key: "kendaraanJenis",
      width: "200px",
    },
    {
      name: "Biaya Kirim",
      selector: "tarif",
      key: "tarif",
      width: "100px",
    },
    {
      name: "Keterangan",
      selector: (row) =>
        row.service_type === "Retail" ? (
          <Tag color="magenta">Retail</Tag>
        ) : row.service_type === "Charter" ? (
          <Tag color="gold">Charter</Tag>
        ) : (
          ""
        ),
      key: "service_type",
    },

    {
      name: "Action",
      selector: (record) => (
        <>
          <Button
            className="mt-2"
            type="primary"
            onClick={() => handleView(record.id_price_mitra)}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <EyeOutlined />
            </span>
          </Button>
          <Button
            className="mt-2"
            onClick={() => handleDelete(record.id_price_mitra)}
            type="danger"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
            {/* <DeleteOutlined /> */}
          </Button>
        </>
      ),
    },
  ];
  const [listData, setListData] = useState([]);

  const fetchData = async (pages = 1) => {
    try {
      const response = await httpClient.get(
        `tarif/get-tarifMitra?limit=${limit}&page=${pages}&id_muat_kota=&id_tujuan_kota=&id_kendaraan_jenis=`
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

  useEffect(() => {
    fetchData();
  }, []);

  const ubahHalaman = (pages) => {
    fetchData(pages);
  };

  const ubahPerHalaman = (limit) => {
    fetchData(limit);
  };

  const handleAdd = () => {
    router.push(`/tarifmitracreate`);
  };

  const handleEdit = (id) => {
    router.push(`/tarifmitraedit`);
  };

  const handleDetail = (id) => {
    router.push(`/tarifmitradetail/${id}`);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Tarif?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id_price_mitra: id,
        };
        httpClient
          .post(`tarif/del-tarifMitra`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = listData.filter(
                (item) => item.id_price_mitra !== id
              );
              setListData(newOrder);
              window.location.reload();
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
        <h4>Data Tarif Mitra</h4>
        <div>
          <Row>
            <Col sm={12} className="d-flex justify-content-end ">
              <Button type="primary" onClick={handleAdd}>
                New Tarif
              </Button>
            </Col>
            {/* <Col sm={3} className="d-flex justify-content mb-2">
              <Input style={{ width: "100%" }} placeholder="Cari Pricelist" />
            </Col> */}
          </Row>
        </div>
        <DataTable columns={columns} data={listData} />
        <div className="mt-5 d-flex justify-content-end">
          <Pagination
            onChange={ubahHalaman}
            showSizeChanger
            // onShowSizeChange={ubahPerHalaman}
            defaultCurrent={100}
            total={total}
          />
        </div>
        {/* <>
          <DataTable data={listData}  columns={columns} />
        </>
        <div className="mt-5 d-flex justify-content-end">
          <Pagination
            onChange={ubahHalaman}
            showSizeChanger
            // onShowSizeChange={ubahPerHalaman}
            defaultCurrent={100}
            total={total}
          />
        </div> */}
      </Card>
    </div>
  );
};

export default SamplePage;
