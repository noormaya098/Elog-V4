import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import { Col, Row, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Baseurl from "../../../Api/BaseUrl";
import mobil from "../../redux toolkit/store/ZustandStore";

function SPList() {
  const [isiData, setIsiData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
  });
  const [filter, setFilter] = useState("");
  const history = useHistory();
  const { isicombinedData, setisiCombinedData } = mobil();

  const dataapi = async (page, search = "") => {
    try {
      const isi = await axios.get(
        `${Baseurl}sp/get-SP-all?limit=15&page=${page}&search=${filter}`,
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
    } catch (error) {
      console.error("Failed to fetch SP data:", error);
    }
  };

  useEffect(() => {
    dataapi(pagination.currentPage, filter);
  }, [filter]);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = combinedData.filter((data) =>
    data.sp.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (isiData && isiData.length > 0) {
      isiData.forEach((item) => {
        getDestinationData(item.idmp);
      });
    }
  }, [isiData]);

  const getDestinationData = async (idmp) => {
    try {
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
    } catch (error) {
      console.error("Failed to fetch SP detail data:", error);
    }
  };

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
      setisiCombinedData(combined);
      setCombinedData(combined);
    }
  }, [isiData, destinationData]);

  console.log(`isi zustan`, isicombinedData);
  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "50px",
    },
    {
      name: "No SP",
      selector: (row) => row.sp,
      width: "150px",
    },
    {
      name: "Perusahaan",
      selector: (row) => {
        return (
          <>
            {" "}
            <strong>{row.perusahaan} </strong>
            <br /> {row.salesName}
          </>
        );
      },
      width: "230px",
    },
    {
      name: "Service",
      selector: (row) => row.service,
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
      name: "Approve by Akunting",
      selector: (row) => {
        const dateApproveAct = row.dateApproveAct;
        return row.approveAct === "Y" ? (
          <>
            <Tag color="green">
              Approved <br /> <small>{dateApproveAct}</small>{" "}
            </Tag>{" "}
          </>
        ) : row.approveAct === "Invalid date" ? (
          <>
            {" "}
            <Tag color="Red">
              Reject <br /> <small>{dateApproveAct}</small>{" "}
            </Tag>{" "}
          </>
        ) : (
          <>
            {" "}
            <Tag color="yellow">
              Waiting <br /> <small>{dateApproveAct}</small>{" "}
            </Tag>{" "}
          </>
        );
      },

      width: "150px",
    },
    {
      name: "Approve by OPS",
      selector: (row) => {
        const dateApproveOps = row.dateApproveOps;
        return row.approveOps === "Y" ? (
          <>
            <Tag color="green">
              Approved <br /> <small>{dateApproveOps}</small>{" "}
            </Tag>
          </>
        ) : row.approveAct === "Invalid date" ? (
          <>
            {" "}
            <Tag color="Red">
              Reject <br /> <small>{dateApproveOps}</small>{" "}
            </Tag>{" "}
          </>
        ) : (
          <>
            {" "}
            <Tag color="yellow">
              Waiting <br /> <small>{dateApproveOps}</small>{" "}
            </Tag>{" "}
          </>
        );
      },
      width: "150px",
    },

    {
      name: "Approve by Purchasing",
      selector: (row) => {
        return row.approvePurch === "Y" ? (
          <Tag color="green">Approved</Tag>
        ) : row.approvePurch === "Invalid date" ? (
          <Tag color="red">Reject</Tag>
        ) : (
          <Tag color="yellow">Waiting</Tag>
        );
      },
      width: "180px",
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
    history.push(`/masterdata/splistdetailakunting/${idmp}`);
    console.log(`ini idmp`, idmp);
  };

  const handlePageChange = async (page) => {
    setPagination({ ...pagination, currentPage: page });
    await dataapi(page);
  };

  return (
    <div>
      <Card>
        <Row>
          <Col>
            <h3>Akunting</h3>
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
            />
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              paginationServer
              paginationPerPage={pagination.limit}
              paginationTotalRows={isiData.length}
              onChangePage={handlePageChange}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-end"></div>
      </Card>
    </div>
  );
}

export default SPList;
