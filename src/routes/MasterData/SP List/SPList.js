import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import { Col, Row, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import { useHistory } from "react-router-dom";
function SPList() {
  const [isiData, setIsiData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
  });
  const history = useHistory();
  const [spId, setSpId] = useState("");

  const dataapi = async (page, spId) => {
    const isi = await axios.get(
      `${Baseurl}sp/get-SP?limit=15&page=${page}&keyword=${spId}`,
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
    dataapi(pagination.currentPage, spId);
  }, [spId]);

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
      width : "150px"
    },
    {
      name: "Perusahaan",
      selector: (row) => row.perusahaan,
    },
    {
      name: "Marketing",
      selector: (row) => row.salesName,
      width : "100px"
    },
    {
      name: "Service",
      selector: (row) => row.service,
      width : "80px"
    },
    {
      name: "Vehicle",
      selector: (row) => row.kendaraan,
      width : "80px"
    },
    {
      name: "Pickup Date",
      selector: (row) => row.pickupDate,
      width : "150px"
    },
    {
      name: "Destination",
      selector: (row) => row.destination,
    },

    {
      name: "Tgl Approved/Decline",
      selector: (row) => (row.dateApproveOps === "Invalid date" ? "-" : row.dateApproveOps),
      width: "150px"
    },
    
  {
      name: "OPS",
      selector: (row) => {
          return row.approveOps === "Y" ? (
              <Tag color="green">Approved  <br/>{row.dateApproveOps}</Tag>
          ) : row.dateApproveOps === "Invalid date" ? (
              <Tag color="orange">Waiting <br/> {row.dateApproveOps}</Tag>
          ) : (
              <Tag color="red">Reject <br/> {row.dateApproveOps}</Tag>
          );
      },
      width : "150px"
  },
  

    {
      name: "Opsi",
      selector: (row) => (
        <Button
          size="sm"
          variant="primary"
          onClick={() => buttonarahin(row.idmp)}
        >
          Detail
        </Button>
      ),
    },
  ];

  const buttonarahin = (idmp) => {
    history.push(`/masterdata/detailsp/${idmp}`);
    // history.push(`/masterdata/splistdetailakunting/${idmp}`);
  };

  const handlePageChange = async (page) => {
    setPagination({ ...pagination, currentPage: page });
    await dataapi(page, spId);
  };

  const handleSpIdChange = (e) => {
    setSpId(e.target.value);
  };

  return (
    <div>
      <Card>
        <Row>
          <Col>
            <h1>New SP List</h1>
            <div className="d-flex justify-content-end">
              <Col sm={3}>
                <Form.Group controlId="spId">
                  <Form.Control
                    type="text"
                    placeholder="No SP "
                    onChange={handleSpIdChange}
                  />
                </Form.Group>
                <br />
              </Col>
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

export default SPList;
