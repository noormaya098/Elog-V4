import React, { useEffect, useState } from "react";
import { Table, Button, Space, Card, Modal, Col, Tag, Pagination, Select, Row} from "antd";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FormOutlined
} from "@ant-design/icons";
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";

const SamplePage = () => {
  const router = useHistory();
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const handleView = (id) => {
    router.push(`/tarif_eureka_edit/${id}`);
  };

  let nomor = 1;

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
    // {
    //   title: "No.",
    //   dataIndex: nomor,
    //   key: nomor,
    // },

    {
      title: "Jenis Pelayanan",
      dataIndex: "service_type",
      key: "service_type",
      render: (text) => {
        let tagColor = "";
        if (text === "Retail") {
          tagColor = "lime";
        } else if (text === "Charter") {
          tagColor = "orange";
        } else if (text === "reguler") {
          tagColor = "blue";
        }
        return <Tag color={tagColor}>{text}</Tag>;
      },
    },
    {
      title: "Jenis Kiriman",
      dataIndex: "jenis_kiriman",
      key: "jenis_kiriman",
      render: (text) => {
        let tagColor = "";
        if (text === "Express") {
          tagColor = "green";
        } else if (text === "Reguler") {
          tagColor = "blue";
        } else if (text === "Charter") {
          tagColor = "orange";
        }
        return <Tag color={tagColor}>{text}</Tag>;
      },
    },
    {
      title: 'Tarif',
      dataIndex: 'tarif',
      key: 'tarif',
      render: (tarif) => formatRupiah(tarif), // Menggunakan fungsi formatRupiah untuk mengubah angka menjadi format Rupiah
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
      render: (uang_jalan) => formatRupiah(uang_jalan),
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
      title: "Muat",
      dataIndex: "kotaAsal",
      key: "kotaAsal",
    },
    {
      title: "Tujuan",
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
            <span style={{ display: "flex", alignItems: "center" }}>
            <FormOutlined />
            </span>
          </Button>
          <Button danger onClick={() => handleDelete(record.id_price)}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
            {/* <DeleteOutlined /> */}
          </Button>
        </Space>
      ),
    },
  ];

  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
    return formatter.format(angka);
  };
  
  const [listData, setListData] = useState([]);
  const [muatKota, setMuatKota] = useState("");
  const [kotaTujuan, setKotaTujuan] = useState("");
  const [kotaTujuannOptionSelect, setKotaTujuanOpionSelect] = useState("");
  const [muatKotaOptionSelect, setMuatKotaOptionsSelect] = useState("");


  const fetchData = async (limit = 10, pageSize = 1) => {
    try {
      const response = await httpClient.get(
        `tarif/get-tarifeureka?limit=${limit}&page=${pageSize}&id_muat_kota=${muatKota}&id_tujuan_kota=${kotaTujuan}&id_kendaraan_jenis=`
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

  const getDataSelectt = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}tarif/get-select`, 
        {
          headers: { 
            'Authorization': localStorage.getItem('token'),
          }
        },
        
      );
      // setMuatKotaOptionsSelect (response.data);
      console.log(response.data);
      setMuatKotaOptionsSelect(response.data);
      setKotaTujuanOpionSelect(response.data);
      // Cek apakah permintaan berhasil (kode status 200-299)
      if (response.status >= 200 && response.status < 300) {
        // Mengembalikan data yang diterima dari permintaan
        return response.data;
      
      } else {
        // Menangani situasi ketika permintaan tidak berhasil (status error)
        throw new Error('Permintaan tidak berhasil.');
      }
    } catch (error) {
      // Menangani kesalahan jaringan atau kesalahan lain yang terjadi selama permintaan
      console.error('Kesalahan saat mengambil data:', error.message);
      throw error; // Lanjutkan penanganan kesalahan di tempat lain jika perlu
    }
  };

  useEffect(() => {
    fetchData();
    getDataSelectt();
  }, [muatKota, kotaTujuan]);

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

  const onShowSizeChange = (current, pageSize) => {
    fetchData(current, pageSize);
  };

  return (
    <div>
      <Card>
        <h3>Data Tarif Eureka</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Row className="mt-3">
          <Col sm={12}>
            <label className="mb-2" htmlFor="muatKotaSelect" style={{fontWeight: "bold"}}>Search Muat :</label>
            <Select
          
              value={muatKota}
              name="namaKota"
              showSearch
              optionFilterProp="children"
              placeholder="Select Muat Kota"
              style={{ width: "100%" }}
              onChange={(e, options) => {console.log(options); setMuatKota(options.value)}}
            
            >
              {muatKotaOptionSelect && muatKotaOptionSelect.muatKota.map((item, index) => (
                <Select.Option value={item.idKota} >
                  {item.namaKota}
                </Select.Option>
              ))}
            </Select>
           
            </Col>
            <Col sm={12}>
            <label className="mb-2" htmlFor="muatKotaSelect" style={{fontWeight: "bold"}}>Search Tujuan :</label>
            <Select
          
              value={kotaTujuan}
              name="kotaTujuan"
              showSearch
              optionFilterProp="children"
              placeholder="Select Muat Kota"
              style={{ width: "100%" }}
              onChange={(e, options) => {console.log(options); setKotaTujuan(options.value)}}
            
            >
              {kotaTujuannOptionSelect && kotaTujuannOptionSelect.tujuanKota.map((item, index) => (
                <Select.Option value={item.idKota} >
                  {item.namaKota}
                </Select.Option>
              ))}
            </Select>
           
            </Col>
          </Row>
          <Row className="mt-4">
          <Col sm={12} className="d-flex justify-content-end">
            <Button type="primary" onClick={handleAdd}>
              New Tarif
            </Button>
          </Col>
          </Row>
         
          {/* <Button type="default">Cari Pricelist</Button> */}
        </div>

        <Table
          dataSource={listData}
          columns={columns}
          scroll={{
            x: 1300,
          }}
          pagination={{
            showSizeChanger: true,
            onChange: onShowSizeChange,
            defaultCurrent: 3,
            total: 500,
          }}
        />

        {/* <Pagination
      showSizeChanger
      onChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
    /> */}
      </Card>
    </div>
  );
};

export default SamplePage;
