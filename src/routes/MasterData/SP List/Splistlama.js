import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import { Col, Row, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import { useHistory } from "react-router-dom";
function SPListlama() {
  const [isiData, setIsiData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [search, setSearch] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
  });
  const history = useHistory();

  const dataapi = async (page) => {
    const isi = await axios.get(
      `${Baseurl}sp/get-SP-all?limit=15&page=${page}&keyword=${search}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const isidata = isi.data.data.order;
    setPagination({
      currentPage: isi.data.data.currentPage,
      limit: isi.data.data.limit,
    });

    setIsiData(isidata);
  };
  useEffect(() => {
    dataapi(pagination.currentPage, search);
  }, [search]);

  useEffect(() => {
    if (isiData && isiData.length > 0) {
      isiData.forEach((item) => {
        getDestinationData(item.idmp);
      });
    }
  }, [isiData]);

  const getDestinationData = async (idmp) => {
    const isi = await axios.get(`${Baseurl}sp/get-SP-detail?idmp=${idmp}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const isis = isi.data.data.map((item) => ({
      idmp: idmp,
      kendaraan: item.kendaraan,
      pickupAddress: item.pickupAddress,
      perusahaan: item.perusahaan,
      destination: item.destination,
      via: item.via,
      item: item.item,
      qty: item.qty,
      service: item.service,
      pickupDate: item.pickupDate,
    }));

    setDestinationData((prevData) => [...prevData, ...isis]);
  };

  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    if (isiData.length > 0 && destinationData.length > 0) {
      const combined = isiData.map((isiItem) => {
        const destItem = destinationData.find(
          (destinationItem) => destinationItem.idmp === isiItem.idmp
        );

        if (destItem) {
          return {
            ...isiItem,
            destination: destItem.destination,
            ...isiItem,
            kendaraan: destItem.kendaraan,
          };
        }

        return isiItem;
      });

      setCombinedData(combined);
    }
  }, [isiData, destinationData]);
  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "50px",
    },
    {
      name: "SP ID",
      selector: (row) => row.sp,
    },
    {
      name: "Perusahaan",
      selector: (row) => row.perusahaan,
      width: "150px",
    },
    {
      name: "Marketing",
      selector: (row) => row.salesName,
      width: "120px",
    },
    {
      name: "Service",
      selector: (row) => row.service,
      width: "100px",
    },
    {
      name: "Vehicle",
      selector: (row) => row.kendaraan,
      width: "100px",
    },
    {
      name: "Pickup Date",
      selector: (row) => row.pickupDate,
      width: "150px",
    },
    {
      name: "Destination",
      selector: (row) => row.destination,
      width: "150px",
    },

    {
      name: "Tgl Approved/Decline",
      selector: (row) => {
        const dateApproveOps = row.dateApproveOps;
        const isValidDate = !isNaN(new Date(dateApproveOps));

        return isValidDate ? dateApproveOps : "-";
      },
    },
    {
      name: "Akunting",
      selector: (row) => {
        return row.approveAct === "Y" ? (
          <Tag color="green">Approved</Tag>
        ) : row.approveAct === "Invalid date" ? (
          <Tag color="red">Reject</Tag>
        ) : (
          <Tag color="orange">Waiting</Tag>
        );
      },
    },
    {
      name: "Operasional",
      selector: (row) => {
        return row.approveOps === "Y" ? (
          <Tag color="green">Approved</Tag>
        ) : row.dateApproveOps === "Invalid date" ? (
          <Tag color="orange">Waiting</Tag>
        ) : (
          <Tag color="red">Reject</Tag>
        );
      },
    },
    {
      name: "Detail",
      selector: (row) => <><Button size="sm" onClick={()=>buttonarahin(row.idmp)}>Detail</Button></>,
      width: "150px",
    },
  ];

  const buttonarahin = (idmp) => {
    // history.push(`/masterdata/detailsp/${idmp}`);
    history.push(`/masterdata/splistdetailakunting/${idmp}`);
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
            <h1>SP List</h1>
            <div className="d-flex justify-content-end">
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="No SP "
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </div>
            <DataTable
              columns={columns}
              data={combinedData}
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

export default SPListlama;
