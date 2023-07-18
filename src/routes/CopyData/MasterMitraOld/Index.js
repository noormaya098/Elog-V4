import { Card, Space, Tag, Pagination, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Col, Row, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";
import CreateMitraModal from "./CreateMitraModal";
import { httpClient } from "../../../Api/Api";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
} from "@ant-design/icons";

const SamplePage = () => {
  const history = useHistory();
  const [order, setOrder] = useState([]);
  const [dataapiawal, setDataapiawal] = useState([]);
  const [mitraId, setMitraID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [DataPagination, setDataPagination] = useState("");
  const [SearchData, setSearchData] = useState("");
  const [PilihTahun, setTahun] = useState("");

  const [filter, setFilter] = useState("");

 

  // const ubahPerHalaman = (perhalaman) => {
  //   fetchData(perhalaman);
  // };

  const columns = [
    {
      name: "No.",
      selector: (row) => row.no,
      width: "80px",
    },
    {
      name: "Status",
      selector: (row) =>
        row.status === "habis kontrak" ? (
          <Tag color="red">Habis Kontrak</Tag>
        ) : row.status === "aktif" ? (
          <Tag color="green">Aktif</Tag>
        ) : row.status === "tidak aktif" ? (
          <Tag color="yellow">Tidak Aktif</Tag>
        ) : (
          ""
        ),
      width: "125px",
    },
    // {
    //   name: "Code",
    //   selector: (row) => row.mitraCode,
    //   width: "100px",
    // },
    {
      name: "Mitra Name",
      selector: (row) => row.mitraName,
      width: "100px",
    },
    {
      name: "Mitra Address",
      selector: (row) => row.mitraAddress,
      width: "150px",
    },
    {
      name: "Awal Kontrak",
      selector: (row) => row.awalKontrak,
      width: "120px",
    },
    {
      name: "Akhir Kontrak",
      selector: (row) => row.akhirKontrak,
      width: "120px",
    },
    {
      name: "Kontrak",
      selector: (row) => row.kontrak,
      width: "100px",
    },
    {
      name: " Berlaku Perpanjangan Otomatis",
      // selector: (row) => row.perpanjangOtomatis
      width: "250px",
      selector: (row) =>
      row.perpanjangOtomatis === "iya" ? (
        <Tag color="green">Iya</Tag>
      ) : row.perpanjangOtomatis === "tidak" ? (
        <Tag color="red">Tidak</Tag>
      )  : (
        ""
      ),
    },
    {
      name: "Pic",
      selector: (row) => row.pic,
      width: "150px",
    },
    {
      name: "Telepon",
      selector: (row) => row.mitraTelephone,
      width: "151px",
    },
    // {
    //   name: " Memo",
    //   selector: (row) => `-`,
    //   width: "100px",
    // },
    {
      name: " Opsi",
      width: "200px",
      selector: (row) => (
        <>
          <Space size="middle">
            <Button
              onClick={() => buttondetailMitra(row.mitraId)}
              type="primary"
              className="mt-2"
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <FormOutlined />
              </span>
            </Button>
            <Button
              danger
              onClick={() => handleDelete(row.mitraId)}
              className="mt-2"
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <DeleteOutlined />
              </span>
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const router = useHistory();

  const handleEdit = (id) => {
    router.push(`/mastermitra/edit/${id}`);
  };

  const buttondetailMitra = (mitraId) => {
    setMitraID(mitraId);
    history.push(`/mastermitradetaill/${mitraId}`);
  };

  const fetchData = async (page = 1, perhalaman = 10) => {
    setLoading(true);
    httpClient
      .get(`mitra/get-mitra?limit=${perhalaman}&page=${page}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          const dataawal = data.data.order;
          setDataapiawal(dataawal);
          setDataPagination(data.data.totalData);
        
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const ubahHalaman = (page) => {
    fetchData(page);
  };

  const handleDelete = (mitraId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this customer?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id: mitraId,
        };
        httpClient
          .post(`mitra/del-mitra`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = order.filter((item) => item.mitraId !== mitraId);
              setOrder(newOrder);
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

  useEffect(() => {
    fetchData();
  }, [ filter]);

  // const handlePageChange = (page) => {
  //   setPageInfo((prevPageInfo) => ({
  //     ...prevPageInfo,
  //     currentPage: page,
  //   }));
  // };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Card>
        <h4>Data Master Mitra</h4>
        <Row>
          <Col>
            {/* <Row className="d-flex justify-content-end">
              <Col sm={3}>
                <Form.Control
                  placeholder={`Cari kode mitra / Nama Mitra`}
                  onChange={handleFilterChange}
                />
              </Col>
            </Row> */}
           <Row>
            <Col sm={12} className="d-flex justify-content-end">
            <CreateMitraModal />
            </Col>
           </Row>
            <DataTable
              columns={columns}
              data={dataapiawal}
              // pagination
              // paginationServer
              // paginationTotalRows={pageInfo.totalData}
              // onChangePage={handlePageChange}
              // progressPending={loading}
            />
            <div className="mt-5 d-flex justify-content-end">
              <Pagination
                onChange={ubahHalaman}
                showSizeChanger
                defaultCurrent={1} // Change this to your desired default page number
                total={DataPagination}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SamplePage;
