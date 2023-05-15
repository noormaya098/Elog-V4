import { Card, Tag, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Baseurl from "../../../../Api/BaseUrl";

function Index() {
  const [dataapi, setdataapi] = useState([]);
  const [filterText, setFilterText] = useState("");
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

  const dataapis = (page, keyword) => {
    axios
      .get(`${Baseurl}driver/get-driver?limit=${limit}&page=${page}&keyword=${keyword}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const datas = response.data.data.order.map((item, index) => {
          return {
            ...item,
            no: ((page - 1) * limit) + index  + 1
          };
        });
        const totalPage = response.data.data.totalPage;
        setdataapi(datas);
        setTotalPages(totalPage);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  

  useEffect(() => {
    dataapis(currentPage, filterText);
  }, [currentPage, filterText]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const filteredItems = dataapi.filter(
    item => (item.driverName && item.driverName.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.no && item.no.toString().toLowerCase().includes(filterText.toLowerCase()))
  );
  

  const handleSearch = (e) => {
    setFilterText(e.target.value);
    setCurrentPage(1); // Reset page to 1 when starting a new search
  };
  
  return (
    <div>
      <Card>
        <Row>
          <Col>
            <div className="d-flex justify-content-end">
              <Col sm={3}>
                <Input
                  id="search"
                  type="text"
                  placeholder="Filter by driver name"
                  value={filterText}
                  onChange={handleSearch}
                />
              </Col>
            </div>
            <DataTable
              columns={columns}
              data={dataapi} // No need to filter here as the server does the filtering
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
