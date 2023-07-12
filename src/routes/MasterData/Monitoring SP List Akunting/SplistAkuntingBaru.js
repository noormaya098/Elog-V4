import { Card, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Baseurl from "../../../Api/BaseUrl";
import { useHistory } from "react-router-dom";
import elogGif from "../../../assets/Loader_Elogs1.gif"
function SplistAkuntingBaru() {
  const [dataApi, setdataapi] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const history = useHistory();
  const [datamobil, setDatamobil] = useState([]);
  const [loading, setLoading] = useState(false);
  const [AapproveActValue, setAapproveActValue] = useState("");
  const columns = [
    {
      name: "No",
      selector: (row) => row?.no,
      width: "50px",
    },
    {
      name: "No SP",
      selector: (row) => row?.sp,
      width: "150px"
    },
    {
      name: " Perusahaan",
      selector: (row) => row?.perusahaan,
      width: "250px"
    },
    {
      name: "Service",
      selector: (row) => row?.service,
    },
    // {
    //   name: "Vehicle",
    //   selector: (row) => row?.vehicles.map(v => v.kendaraan).join(', '),
    //   width: "80px"
    // },

    {
      name: "Pickup Date",
      selector: (row) => {
        const formattedDate = new Date(row.pickupDate).toLocaleDateString('en-CA');
        return (
          <Tag color="cyan">
            {formattedDate}
          </Tag>
        );
      },
      width: "150px"
    },





    {
      name: "Approve By Akunting",
      cell: (row) => {
        const approveact = row?.approveAct;
        const dateApproveAct = row?.dateApproveAct;
        let displayText =
          approveact === "Y" && dateApproveAct !== "Invalid date" ? (
            <Tag color="green">
              Approve <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : approveact === "N" && dateApproveAct === "Invalid date" ? (
            <Tag color="yellow">
              Waiting <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : (
            <Tag color="red">
              Diverted <br /> <small>{dateApproveAct}</small>
            </Tag>
          );

        return <>{displayText}</>;
      },
      width: "150px",
    },
    {
      name: "Approve By Ops",
      selector: (row) => {
        const approveact = row?.approveOps;
        const dateApproveAct = row?.dateApproveOps;
        let displayText =
          approveact === "Y" && dateApproveAct !== "Invalid date" ? (
            <Tag color="green">
              Approve <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : approveact === "N" && dateApproveAct === "Invalid date" ? (
            <Tag color="yellow">
              Waiting <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : (
            <Tag color="red">
              Diverted <br /> <small>{dateApproveAct}</small>
            </Tag>
          );

        return <>{displayText}</>;
      },
      width: "150px",
    },

    {
      name: "Approve By Purchasing",
      selector: (row) => {
        const approveact = row?.approvePurch;
        const dateApproveAct = row?.dateApprovePurch;
        let displayText =
          approveact === "Y" && dateApproveAct !== "Invalid date" ? (
            <Tag color="green">
              Approve <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : approveact === "N" && dateApproveAct === "Invalid date" ? (
            <Tag color="yellow">
              Waiting <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : (
            <Tag color="red">
              Diverted <br /> <small>{dateApproveAct}</small>
            </Tag>
          );

        return <>{displayText}</>;
      },
      width: "150px",
    },
    {
      name: "Detail",
      selector: (row) => (
        <Button size="sm" onClick={() => {
          buttonarahin(row.idmp, row.approveAct);
        }}>
          Detail
        </Button>
      ),
    },

  ];

  const buttonarahin = (idmp, approveAct) => {
    console.log(`approveAct before setting state: `, approveAct);
    localStorage.setItem(`ApproveAct`, approveAct);
    setAapproveActValue(localStorage.getItem(`ApproveAct`));
    console.log(`AapproveActValue immediately after setting state: `, AapproveActValue);
    history.push(`/masterdata/purchasing/detailsp/${idmp}`);
  };


  // useEffect(() => {
  //   alert(`ini adalah nilai approveAct: ${AapproveActValue}`);
  // }, [AapproveActValue]);



  useEffect(() => {
    setLoading(true)
    const dataapi = async () => {
      setLoading(true)
      const data = await axios.get(
        `${Baseurl}sp/get-SP-all?limit=11&page=${page}&keyword=${filter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const isi = data.data.data.order.map((item) => ({
        no: item?.no,
        idmp: item?.idmp,
        sp: item?.sp,
        salesName: item?.salesName,
        perusahaan: item?.perusahaan,
        service: item?.service,
        pickupDate: item?.pickupDate,
        approveAct: item?.approveAct,
        dateApproveAct: item?.dateApproveAct,
        approveOps: item?.approveOps,
        idops: item?.idops,
        operationalName: item?.operationalName,
        dateApproveOps: item?.dateApproveOps,
        approvePurch: item?.approvePurch,
        dateApprovePurch: item?.dateApprovePurch,
      }));

      console.log(`ini`, data.data.data.order.approveAct);
      const detailPromises = isi.map(item => detailSP(item.idmp));
      const details = await Promise.all(detailPromises);

      const combinedData = isi.map((item, index) => ({
        ...item,
        vehicles: details[index]
      }));

      setTotalRows(data.data.data.total);
      setCombinedData(combinedData);
      setLoading(false)
    };
    dataapi();
  }, [filter, page]);

  console.log();
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const detailSP = async (idmp) => {
    try {
      const response = await axios.get(
        `${Baseurl}sp/get-SP-all-detail?idmp=${idmp}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data.detail.map((item) => ({
        kendaraan: item?.kendaraan,
        destination: item?.destination
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
  }, [datamobil]);

  return (
    <div>
      <Card>
        <Row>
          <Col>
            <Row>

              <div className="d-flex justify-content-end">
                <Col sm={3}>
                  <Form.Control
                    type="text"
                    placeholder="No SP "
                    onChange={handleFilterChange}
                  />
                </Col>
              </div>
            </Row>
            {loading ? (
              <img className="d-flex justify-content-center" src={elogGif} width="800px" />
            ) : (
              <DataTable
                columns={columns}
                data={combinedData}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangePage={setPage}
              />
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default SplistAkuntingBaru;
