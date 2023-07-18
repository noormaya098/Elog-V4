import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Card,
  Input,
  Pagination,
  Modal,
  Select,
  Tag,
} from "antd";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { async } from "q";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";

const SamplePage = () => {
  const router = useHistory();
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [tarifMitraDelete, setTarifMitraDelete] = useState([]);
  const handleView = (id) => {
    router.push(`/tarifmitraedit/${id}`);
  };

  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(angka);
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
      name: "Kode Mitra",
      selector: (row) => row.id_mitra,
      width: "10%",
    },
    {
      name: "Nama Mitra",
      selector: (row) => row.mitra,
      width: "10%",
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
      width: "150px",
    },
    {
      name: "Biaya Kirim",
      selector: "tarif",
      key: "tarif",
      width: "130px",
      cell: (row) => formatRupiah(row.tarif), // Menggunakan fungsi formatRupiah untuk mengubah angka menjadi format Rupiah
    },
    {
      name: "Keterangan",
      // selector: (row) => row.perpanjangOtomatis
      width: "150px",
      selector: (row) =>
        row.service_type === "Retail" ? (
          <Tag color="green">Retail</Tag>
        ) : row.service_type === "Charter" ? (
          <Tag color="red">Charter</Tag>
        ) : (
          ""
        ),
    },
    // {
    //   name: "Keterangan",
    //   selector: "service_type",
    //   key: "service_type",

    // },
    {
      name: "Action",
      selector: (record) => (
        <>
          {/* <Button
            onClick={() => handleView(record.id_price_mitra)}
            type="primary"
          >
            <EditOutlined />
          </Button> */}
          {/* <Button
            className="mt-2"
            type="primary"
            onClick={() => handleView(record.id_price_mitra)}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined />
            </span>
          </Button> */}

          <Button
            danger
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
  const [muatKota, setMuatKota] = useState("");
  const [NamaMitranya, setNamaMitranya] = useState("");
  const [kotaTujuan, setKotaTujuan] = useState("");
  const [kotaTujuannOptionSelect, setKotaTujuanOpionSelect] = useState("");
  const [muatKotaOptionSelect, setMuatKotaOptionsSelect] = useState("");
  const [namaMitranyaoptionSelect, setnamaMitranyaoptionSelect] = useState("");

  const IniRowClick = (record) => {
    handleView(record.id_price_mitra);
  };

  const fetchData = async (pages = 1) => {
    try {
      const response = await httpClient.get(
        `tarif/get-tarifMitra?limit=${limit}&page=${pages}&id_muat_kota=${muatKota}&id_tujuan_kota=${kotaTujuan}&id_kendaraan_jenis=&id_mitra=${NamaMitranya}&id_price_mitra=`
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

  const getDataSelectt = async () => {
    try {
      const response = await axios.get(`${Baseurl}tarif/get-select`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      // setMuatKotaOptionsSelect (response.data);
      console.log(response.data);
      setMuatKotaOptionsSelect(response.data);
      setKotaTujuanOpionSelect(response.data);
      setnamaMitranyaoptionSelect(response.data);
      // Cek apakah permintaan berhasil (kode status 200-299)
      if (response.status >= 200 && response.status < 300) {
        // Mengembalikan data yang diterima dari permintaan
        return response.data;
      } else {
        // Menangani situasi ketika permintaan tidak berhasil (status error)
        throw new Error("Permintaan tidak berhasil.");
      }
    } catch (error) {
      // Menangani kesalahan jaringan atau kesalahan lain yang terjadi selama permintaan
      console.error("Kesalahan saat mengambil data:", error.message);
      throw error; // Lanjutkan penanganan kesalahan di tempat lain jika perlu
    }
  };

  useEffect(() => {
    fetchData();
    getDataSelectt();
  }, [muatKota, kotaTujuan, NamaMitranya]);

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
          <Row className="mt-4 mb-2">
            <Col sm={3}>
              <label className="mb-2" htmlFor="muatKotaSelect">
                Search Kota Muat:
              </label>
              <Select
                value={muatKota}
                name="namaKota"
                showSearch
                optionFilterProp="children"
                placeholder="Select Muat Kota"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setMuatKota(options.value);
                }}
              >
                <Select.Option value="">-</Select.Option>
                {muatKotaOptionSelect &&
                  muatKotaOptionSelect.muatKota.map((item, index) => (
                    <Select.Option value={item.idKota}>
                      {item.namaKota}
                    </Select.Option>
                  ))}
              </Select>
            </Col>
            <Col sm={3}>
              <label className="mb-2" htmlFor="muatKotaSelect">
                Search Kota Tujuan:
              </label>
              <Select
                value={kotaTujuan}
                name="kotaTujuan"
                showSearch
                optionFilterProp="children"
                placeholder="Select Muat Kota"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setKotaTujuan(options.value);
                }}
              >
                <Select.Option value="">-</Select.Option>
                {kotaTujuannOptionSelect &&
                  kotaTujuannOptionSelect.tujuanKota.map((item, index) => (
                    <Select.Option value={item.idKota}>
                      {item.namaKota}
                    </Select.Option>
                  ))}
              </Select>
            </Col>
            <Col sm={3}>
              <label className="mb-2" htmlFor="muatKotaSelect">
                Search Nama Mitra:
              </label>
              <Select
                value={NamaMitranya}
                name="customer"
                showSearch
                optionFilterProp="children"
                placeholder="Select Nama Mitra"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setNamaMitranya(options.value);
                }}
              >
                <Select.Option value="">-</Select.Option>
                {namaMitranyaoptionSelect &&
                  namaMitranyaoptionSelect.customer.map((item, index) => (
                    <Select.Option value={item.idCustomer}>
                      {item.Customer}
                    </Select.Option>
                  ))}
              </Select>
            </Col>
            <Col sm={3} className="d-flex justify-content-end mt-4">
              <Button type="primary" onClick={handleAdd}>
                New Tarif
              </Button>
            </Col>
            {/* <Col sm={3} className="d-flex justify-content mb-2">
              <Input style={{ width: "100%" }} placeholder="Cari Pricelist" />
            </Col> */}
          </Row>
        </div>
        <style>
          {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: #C7E1FB;
          }
          
        `}
        </style>

        <DataTable
          onRowClicked={IniRowClick}
          columns={columns}
          data={listData}
        />
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
