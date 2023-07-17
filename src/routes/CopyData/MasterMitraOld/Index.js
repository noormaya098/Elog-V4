import { Card, Space, Tag, Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";
import CreateMitraModal from "./CreateMitraModal";
import { httpClient } from "../../../Api/Api";

const SamplePage = () => {
  const history = useHistory();
  const [dataapiawal, setDataapiawal] = useState([]);
  const [mitraId, setMitraID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [DataPagination, setDataPagination] = useState("");
  const [SearchData, setSearchData] = useState("");
  const [PilihTahun , setTahun] = useState (""); 
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalData: 0,
  });
  const [filter, setFilter] = useState("");

  const ubahHalaman = (page) => {
    fetchData(page);
  };
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
      selector: (row) => row.perpanjangOtomatis,
      width: "250px",
    },
    {
      name: "Pic",
      selector: (row) => row.pic,
      width: "100px",
    },
    {
      name: "Telepon",
      selector: (row) => row.mitraTelephone,
      width: "150px",
    },
    // {
    //   name: " Memo",
    //   selector: (row) => `-`,
    //   width: "100px",
    // },
    {
      name: " Opsi",
      width: "100px",
      selector: (row) => (
        <>
          <Space size="middle">
            <Button
              onClick={() => buttondetailMitra(row.mitraId)}
              variant="primary"
            >
              Detail
            </Button>
            <Button onClick={() => handleEdit(row.mitraId)} variant="primary">
              Edit
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
            setPageInfo({
              currentPage: data.data.currentPage,
              totalData: data.data.totalData,
            });
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };

    useEffect(() => {
      fetchData();
  }, [pageInfo.currentPage, filter]);

  const handlePageChange = (page) => {
    setPageInfo((prevPageInfo) => ({
      ...prevPageInfo,
      currentPage: page,
    }));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

 

  return (
    <div>
      <Card>
        <h4>Data Master Mitra</h4>
        <Row>
          <Col>
            <Row className="d-flex justify-content-end">
              <Col sm={3}>
                <Form.Control
                  placeholder={`Cari kode mitra / Nama Mitra`}
                  onChange={handleFilterChange}
                />
              </Col>
            </Row>
            <CreateMitraModal />
            <DataTable
              columns={columns}
              data={dataapiawal}
              // pagination
              // paginationServer
              // paginationTotalRows={pageInfo.totalData}
              // onChangePage={handlePageChange}
              // progressPending={loading}
            />
              <Pagination
            onChange={ubahHalaman}
            showSizeChanger
            // onShowSizeChange={ubahPerHalaman}
            defaultCurrent={100}
            total={DataPagination}
          />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SamplePage;
