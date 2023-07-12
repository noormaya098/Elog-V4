import { Card, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Baseurl from "../../../../Api/BaseUrl";

function Index() {
  const [dataapi, setDataapi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const limit = 10;
  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
    },
    {
      name: "No Polisi",
      selector: (row) => row.driverName,
    },
    {
      name: "Kode Kendaraan",
      selector: (row) => `-`,
    },
    {
      name: "Pemilik Armada",
      selector: (row) => row.vendor,
    },
    {
      name: "Jenis Kendaraan",
      selector: (row) => row.vehicleType,
    },
    {
      name: "Nama Supir",
      selector: (row) => row.driverName,
    },
  ];
  const dataapis = (page) => {
    axios
      .get(
        `${Baseurl}vehicle/get-vehicle?limit=${limit}&page=${page}&keyword=`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setDataapi(response.data.data.order);
        setTotalPage(response.data.data.totalPage);
        setCurrentPage(response.data.data.currentPage);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dataapis(currentPage);
  }, [currentPage]);
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
              paginationTotalRows={totalPage}
              onChangePage={handlePageChange}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Index;
