import { Card, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Baseurl from "../../../../Api/BaseUrl";

function Index() {
  const [dataapi, setdataapi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 10;

  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
    },
    {
      name: "Nama",
      selector: (row) => row.driverName,
    },
    {
      name: "Kiriman (SM)",
      selector: (row) => `-`,
    },
    {
      name: "Penjualan",
      selector: (row) => row.totalPenjualan,
    },
    {
      name: "Status",
      cell: (row) => (
        <Tag color={row.status === 1 ? "green" : "red"}>
          {row.status === 1 ? "Tersedia" : "Tidak tersedia"}
        </Tag>
      ),
    },
  ];

  const dataapis = (page) => {
    axios
      .get(`${Baseurl}driver/get-driver?limit=${limit}&page=${page}&keyword=`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const datas = response.data.data.order;
        const totalPage = response.data.data.totalPage;
        setdataapi(datas);
        setTotalPages(totalPage);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    dataapis(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Card>
        <Row>
          <Col>
            <DataTable
              columns={columns}
              data={dataapi}
              pagination
              paginationServer
              paginationTotalRows={totalPages}
              onChangePage={handlePageChange}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Index;
