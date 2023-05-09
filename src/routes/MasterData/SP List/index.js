import { Button, Card, Row,Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import useSpStore from "./Api Get/GetSPList";
import { Tag } from "antd";
import Token from "../../../Api/Token";
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import DetailSP from "../DetailSP/Index";
function SpList() {
  // const navigate = useNavigate();
  // const posts = useSpStore((state) => state.posts);
  // const fetchPosts = useSpStore((state) => state.fetchPosts);
  const [DataTable, setDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const spDetails = useSpStore((state) => state.spDetails);
  const [idmpData, setIdmpData] = useState([]);
  const [Kendaraan , setKendaraanData] = useState([]); //

  const DataSp = async () => {
    const urlData = await axios.get(
      `${Baseurl}sp/get-SP?limit=10&page=3&keyword=`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    const idmpArr = urlData.data.data.order.map((item) => item.idmp);
    setIdmpData(idmpArr);

    setDataTable(urlData.data.data.order);

    // console.log(`setdata`, DataTable);
    // console.log(`inissmsp`, idmpData);
  };

  useEffect(() => {
    DataSp();
  }, []);

  const getIdmpDetails = async (idmp) => {
    try {
      const response = await axios.get(
        `${Baseurl}sp/get-SP-detail?idmp=${idmp}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`
          },
        }
      );
      const dataKendaraan = response.data.data.map((items) => ({
        kendaraan: items.kendaraan,
        destination: items.pickupAddress,
      }));
  
      console.log(`ini test isi kendaraan `, combinedData);
      setKendaraanData(dataKendaraan); // set state here instead
      return dataKendaraan;
    } catch (error) {
      console.error("There was a problem with the axios request:", error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      await DataSp();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (idmpData && idmpData) {
      idmpData.forEach((idmp) => {
        getIdmpDetails(idmp);
      });
    }
  }, [idmpData]);

  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const updateDataWithKendaraan = async () => {
      if (idmpData && idmpData.length > 0) {
        const updatedData = await Promise.all(
          DataTable.map(async (item) => {
            const result = await getIdmpDetails(item.idmp);
            if (result && result.length > 0) {
              return {
                ...item,
                kendaraan: result[0].kendaraan || "N/A",
                destination: result[0].destination || "N/A",
              };
            } else {
              return {
                ...item,
                kendaraan: "N/A",
                destination: "N/A",
              };
            }
          })
        );
        setCombinedData(updatedData);
      }
    };

    
    updateDataWithKendaraan();
  }, [idmpData, DataTable]);

  useEffect(() => {
    setCombinedData(DataTable);
  }, [DataTable]);
  
 
  const history = useHistory();

  const handleDetailClick = (idmp, kendaraan) => {
    history.push({
      pathname: `/masterdata/detailsplama/${idmp}`,
      state: { kendaraanyu: kendaraan }
    });
  };
  
  return (
    <div>
      <Card>
        <Row>
          <Col sm={3}>
            <h4>SP List</h4>
          </Col>
          <Table responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>SP ID</th>
                <th>Perusahaan</th>
                <th>Marketing</th>
                <th>Service</th>
                <th>Vehicle</th>
                <th>Pickup Date</th>
                <th>Destination</th>
                <th>Tanggal Approved / Decline</th>
                <th>OPS</th>
                <th>Opsi</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.no}</td>
                  <td>{item.sp}</td>
                  <td>{item.perusahaan}</td>
                  <td>{item.salesName}</td>
                  <td>{item.service}</td>
                  <td>{item.kendaraan || "N/A"}</td>
                  <td>{item.pickupDate}</td>
                  <td>{item.destination}</td>
                  <td>{item.dateApproveOps}</td>
                  <td>
                    {item.approveOps == "Y" ? (
                      <Tag color="green">Approved</Tag>
                    ) : item.dateApproveOps == "Invalid date" ? (
                      <Tag color="red">Waiting</Tag>
                    ) : item.dateApproveOps != "Invalid date" ? (
                      <Tag color="orange">Reject</Tag>
                    ) : (
                      <Tag color="red">Waiting</Tag>
                    )}
                  </td>
                  <td>
                    <Button
                      size="lg"
                      type="primary"
                      onClick={() => handleDetailClick(item.idmp , item.kendaraan)}
                    >
                      Detail
                    </Button>
                    {/* <DetailSP u
                    kendaraan={item.kendaraan}
                    /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Card>
    </div>
  );
}

export default SpList;
