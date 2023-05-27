import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import { Col, Row, Form, Button, ButtonGroup } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Baseurl from "../../../../Api/BaseUrl";
function SJ() {
  const [isiData, setIsiData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [search, setSearch] = useState([]);
  const [nosj, setNoSJ] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
  });
  const history = useHistory();

  const dataapi = async (page) => {
    const isi = await axios.get(
      `${Baseurl}sm/get-sm?limit=10&page=${page}&keyword=${search}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const isidata = isi.data.data.order
    const sjs = isi.data.data.order.map((item)=>item.id)
    console.log(`no sj`, sjs);
    setNoSJ(sjs);
    setPagination({
      currentPage: isi.data.data.currentPage,
      limit: isi.data.data.limit,
    });

    setIsiData(isidata);
  };
  useEffect(() => {
    dataapi(pagination.currentPage, search);
  }, [search]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      width: "5%",
    },
    {
      name: "SJ",
      selector: (row) => row?.sm,
      width: "15%",
    },
    {
      name: "SP",
      selector: (row) => row?.sp,
      width: "15%",
    },
    {
      name: "Perusahaan",
      selector: (row) => row?.perusahaan,
      width: "20%",
    },
    {
      name: "Pickup Date",
      selector: (row) => row?.pickupDate === "Invalid date" ? "-" : row?.pickupDate,
      width: "15%",
    },
    {
      name: "Destination",
      selector: (row) => row?.destination,
      width: "15%",
    },
    {
      name: "Options",
      selector: (row) => <><Button onClick={()=>buttonarahin(row.id)} size="sm">Detail</Button></>,
      width: "15%",
    },
  ];
  

  const buttonarahin = (id) => {
    history.push(`/masterdata/detailsjlist/${id}`);
  };

  const handlePageChange = async (page) => {
    setPagination({ ...pagination, currentPage: page });
    await dataapi(page, search);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <Card>
        <Row>
          <Col>
            <h1>SJ List</h1>
            <div className="d-flex justify-content-end">
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="No SJ "
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </div>
            <DataTable
              columns={columns}
              data={isiData}
              pagination
              paginationServer
              paginationPerPage={pagination.limit}
              paginationTotalRows={isiData.length}
              onChangePage={handlePageChange}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default SJ;
