import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Baseurl from "../../../../Api/BaseUrl";
import { useHistory } from "react-router-dom";
import CreateMitraModal from "./CreateMitraModal";

function Index() {
  const history = useHistory();
  const [dataapiawal, setDataapiawal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalData: 0,
  });
  const [filter, setFilter] = useState("");
  const columns = [
    {
      name: "Title",
      selector: (row) => row.no,
      width: "80px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      width: "80px",
    },
    {
      name: "Code",
      selector: (row) => row.mitraCode,
      width: "100px",
    },
    {
      name: "Mitra Name",
      selector: (row) => row.mitraName,
      width: "250px",
    },
    {
      name: "Mitra Address",
      selector: (row) => row.mitraAddress,
      width: "150px",
    },
    {
      name: "Awal Kontrak",
      selector: (row) => row.awalKontrak,
      width: "100px",
    },
    {
      name: "Kontrak",
      selector: (row) => `-`,
      width: "100px",
    },
    {
      name: " Berlaku Perpanjangan Otomatis",
      selector: (row) => row.perpanjangOtomatis,
      width: "250px",
    },
    {
      name: " Pic",
      selector: (row) => row.pic,
      width: "100px",
    },
    {
      name: " Memo",
      selector: (row) => `-`,
      width: "100px",
    },
    {
      name: " Opsi",
      width: "100px",
      selector: (row) => (
        <Button
          onClick={() => buttondetailMitra(row.mitraId)}
          size="sm"
          variant="primary"
        >
          Detail
        </Button>
      ),
    },
  ];

  const buttondetailMitra = (mitraId) => {
    console.log(`id mitrra adalah `, mitraId);
    history.push(`/purchasing/DetailMitra/${mitraId}`);
  };

  useEffect(() => {
    const apiawal = async () => {
      setLoading(true);
      const isi = await axios.get(
        `${Baseurl}mitra/get-mitra?limit=10&page=${pageInfo.currentPage}&keyword=${filter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const dataawal = isi.data.data.order;
      console.log(`isi data`, isi.data.data.totalData);
      setDataapiawal(dataawal);
      setPageInfo({
        currentPage: isi.data.data.currentPage,
        totalData: isi.data.data.totalData,
      });
      setLoading(false);
    };
    apiawal();
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
              pagination
              paginationServer
              paginationTotalRows={pageInfo.totalData}
              onChangePage={handlePageChange}
              progressPending={loading}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Index;
