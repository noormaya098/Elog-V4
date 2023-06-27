import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import { Col, Row, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import { useHistory } from "react-router-dom";
import ElogLoadingGif from "../../.././assets/Loader_Elogs1.gif"
import Swal from "sweetalert2";
import { Pagination } from 'antd';
function SPListlama() {
  const [isiData, setIsiData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [destinationData, setDestinationData] = useState([]);
  const [search, setSearch] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
  });

  // const [Pagginations, setPagginations] = useState(1)
  const history = useHistory();

  const dataapi = async (page = 1 , pageSize = 10) => {
    try {
      setLoading(true)
      const isi = await axios.get(
        `${Baseurl}sp/get-SP-all?limit=${pageSize}&page=${page}&keyword=${search}`,
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
        totalPage: isi.data.data.totalPage,
      });

      setIsiData(isidata);
      setLoading(false)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        if (localStorage.getItem('token') === null) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error Login, Silahkan Login Kembali '
          });
          setTimeout(() => {
            window.location.reload()
          }, 2000);
          // history.push('/signin');
        }
      } else {
        console.error(error);
      }
    }
  };
  useEffect((page) => {
    dataapi();
    // dataapi(Pagginations);
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
      kendaraan: item?.kendaraan,
      pickupAddress: item?.pickupAddress,
      perusahaan: item?.perusahaan,
      destination: item?.destination,
      via: item?.via,
      item: item?.item,
      qty: item?.qty,
      service: item?.service,
      pickupDate: item?.pickupDate,
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
      selector: (row) => row?.no,
      width: "80px",
      wrap: true,
    },
    {
      name: "SP ID",
      selector: (row) => row?.sp,
      width: "150px",
      wrap: true,
    },
    {
      name: "Perusahaan",
      selector: (row) => row?.perusahaan,
      width: "150px",
      wrap: true,
    },
    {
      name: "Marketing",
      selector: (row) => row?.salesName,
      width: "100px",
      wrap: true,
    },
    {
      name: "Service",
      selector: (row) => row?.service,
      width: "100px",
      wrap: true,
    },
    {
      name: "Vehicle",
      selector: (row) => row?.kendaraan,
      width: "100px",
      wrap: true,
    },
    {
      name: "Pickup Date",
      selector: (row) => {
        let date = new Date(row?.pickupDate);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
    
        return (
          <Tag color="green">{`${year}-${month}-${day}`}</Tag> // return dalam format yyyy-mm-dd
        );
      },
      width: "120px",
      wrap: true,
    },

    {
      name: "Destination",
      selector: (row) => row?.destination,
      width: "150px",
      wrap: true,
    },

    // {
    //   name: "Tgl Approved/Decline",
    //   selector: (row) => {
    //     const dateApproveOps = row?.dateApproveOps;
    //     const isValidDate = !isNaN(new Date(dateApproveOps));

    //     const data = isValidDate ? dateApproveOps : "-";
    //     return data
    //   },
    // },
    {
      name: "Akunting",
      selector: (row) => {
        const tanggal = row.dateApproveAct
        return row?.approveAct === "Y" ? (
          <Tag color="green">Approved <br /> {tanggal}</Tag>
        ) : (row?.approveAct === "N" && tanggal === "Invalid date") ? (
          <Tag color="yellow">Waiting <br/> {tanggal ? "-" : tanggal}</Tag>
        ) : (row?.approveAct === "N" && tanggal !== "Invalid date") ?
        (
          <Tag color="red">Diverted <br/> {tanggal }</Tag>
        ) : ""
      },
      width: "170px",
    },
    {
      name: "Operasional",
      selector: (row) => {
        const dateApproveOps = row?.dateApproveOps;
        const isValidDate = !isNaN(new Date(dateApproveOps));
        const data = isValidDate ? dateApproveOps : "-";
        if (row?.approveOps === "Y") {
          return <Tag color="green">Approved <br /> {data}</Tag>;
        } else if (!isValidDate) {
          return <Tag color="yellow">Waiting <br /> {data}</Tag>;
        } else {
          return <Tag color="red">Diverted <br /> {data}</Tag>;
        }
      },
      width: "170px",
    },
    {
      name: "Purchasing",
      selector: (row) => {
        const date = row?.dateApprovePurch
        return (
          <>
            {(row.approvePurch === "Y" && date != null) ? (
              <Tag color="green">Approved <br /> {date}</Tag>
            ) : (
              (row.approvePurch === "N" && date === "Invalid date") ? (
                <Tag color="yellow">Waiting <br /> {date ? "-" : date}</Tag>
              ) : (
                (row.approvePurch === "N" && date != "Invalid date") ? (
                  <Tag color="red">Diverted <br /> {date}</Tag>
                ) : (
                  null
                )
              )
            )}
          </>
        )
      },
      width: "180px",
    },
    // {
    //   name: "Detail",
    //   selector: (row) => <><Button size="sm" onClick={() => buttonarahin(row.idmp)}>Detail</Button></>,
    //   width: "170px",
    // },
  ];

  const RowClick = (row)=>{
    history.push(`/masterdata/splistdetailakunting/${row.idmp}`);
  }
  const buttonarahin = (idmp) => {
    // history.push(`/masterdata/detailsp/${idmp}`);
    history.push(`/masterdata/splistdetailakunting/${idmp}`);
  };

  const handlePageChange = async (page , pageSize) => {
    dataapi(page ,pageSize)
    // setPagginations(page)
    // setPagination({ ...pagination, currentPage: page });
    // await dataapi(page, search);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <Card>
        <Row>
          <Col>
            {/* <h1>SP List</h1> */}
            <div className="d-flex justify-content-end">
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="No SP "
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </div>
            {(Loading ? (<img src={ElogLoadingGif}></img>) : (
              <DataTable
                columns={columns}
                title="SP List"
                data={combinedData}
                onRowClicked={RowClick}

                // pagination
              // paginationServer
              // paginationPerPage={pagination.limit}
              // paginationTotalRows={isiData.length}
              // onChangePage={handlePageChange}
              />
            ))}
            <div className="mt-3 d-flex justify-content-end">
              <Pagination
                showSizeChanger
                onShowSizeChange={handlePageChange}
                onChange={handlePageChange}
                defaultCurrent={1}
                total={pagination.totalPage}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default SPListlama;
