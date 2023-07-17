import { Button, Card, Input, Pagination, Tag } from "antd";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Select } from "antd";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Baseurl from "../../../../../Api/BaseUrl";
import { useHistory } from "react-router-dom";

function APListALL() {
  const pindah = useHistory();
  const history = useHistory();
  // DataList = keluar data
  // setDataList = Ambil data dari fetch
  const [Datalist, setDataList] = useState("");
  const [DataPagination, setDataPagination] = useState("");
  const [SearchData, setSearchData] = useState("");
  const [PilihTahun, setTahun] = useState("");
  const [isTableClicked, setTableClicked] = useState(false);

  const fetchData = async (page = 1, perhalaman = 10) => {
    try {
      const respons = await axios.get(
        `${Baseurl}ap/get-AP-List?limit=${perhalaman}&page=${page}&keyword=${SearchData}&filterYear=${PilihTahun}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", respons.data.data.totalPage);
      setDataList(respons.data.data.order);
      setDataPagination(respons.data.data.totalPage);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [SearchData, PilihTahun]);

  const ubahHalaman = (page) => {
    fetchData(page);
  };

  const ubahPerHalaman = (perhalaman) => {
    fetchData(perhalaman);
  };

  const handleRowClick = (row) => {
    // Misalnya, asumsikan ID berada di properti 'id' dari objek baris
    // const id = row.id;

    // Lakukan perpindahan halaman dengan ID
    // history.push(`/halaman-tujuan/${id}`);
    history.push(`/akunting/detailaplist/`);
  };

  const handleTableClick = () => {
    setTableClicked(!isTableClicked);
    history.push(`/akunting/detailaplist/`);
  };

  const columns = [
    {
      name: "No.",
      selector: (row) => row.no,
      width: "70px",
    },
    {
      name: "Invoice Number",
      selector: (row) => row.invoiceNumber,
      width: "170px", // Atur lebar kolom di sini
    },
    {
      name: "Mitra Invoice",
      selector: (row) => row.mitraInvoice,
      width: "200px",
    },
    {
      name: "Receive Invoice",
      selector: (row) => <Tag color="blue">{row.receiveInvoice}</Tag>,
      width: "120px", // Atur lebar kolom di sini
    },
    {
      name: "Partner",
      selector: (row) => row.partner,
    },
    {
      name: "Invoice Date",
      selector: (row) => <Tag color="green">{row.invoiceDate}</Tag>,
    },
    {
      name: "PPH 23",
      selector: (row) => "-",
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  const tombolNew = () => {
    pindah.push(`/akunting/tambahdataap`);
  };

  return (
    <div>
      <Card>
        <div>
          <h3 className="mb-5">Data AP List ALL</h3>
        </div>
        <Row gutter={16}>
          <Col sm={2}>
            <Select
              placeholder="Pilih Tahun"
              showSearch
              optionFilterProp="children"
              style={{ width: "150px" }}
              onChange={(e) => setTahun(e)}
            >
              <Select.Option value="2023">TAHUN 2023</Select.Option>
              <Select.Option value="2022">TAHUN 2022</Select.Option>
              <Select.Option value="2021">TAHUN 2021</Select.Option>
              <Select.Option value="2020">TAHUN 2020</Select.Option>
              <Select.Option value="2019">TAHUN 2019</Select.Option>
            </Select>
          </Col>
          <Col sm={1} style={{ marginLeft: "-20px" }}>
            <Button style={{ backgroundColor: "green", color: "white" }}>
              View
            </Button>
          </Col>
          <Col sm={1} style={{ marginLeft: "-25px" }}>
            <Button style={{ backgroundColor: "green", color: "white" }}>
              Exsport Excel
            </Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              onClick={() => tombolNew()}
              style={{ backgroundColor: "#367fa9", color: "white" }}
            >
              + NEW AP
            </Button>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-end">
            {/* <input
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="haiiii"
              style={{ width: 200 }}
            ></input> */}
            <div>
              Search :
              <Input
                placeholder="input search text"
                onChange={(e) => setSearchData(e.target.value)}
                style={{
                  width: 200,
                  marginLeft: "10px",
                }}
              />
            </div>
          </Col>
        </Row>

        <style>
          {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color:	#FDF5E6;
          }
          
        `}
        </style>
        <DataTable
          columns={columns}
          data={Datalist}
          onRowClicked={handleTableClick}
          style={{
            cursor: "pointer",
            backgroundColor: isTableClicked ? "yellow" : "red",
          }}
        />
        <div className="mt-5 d-flex justify-content-end">
          <Pagination
            onChange={ubahHalaman}
            showSizeChanger
            // onShowSizeChange={ubahPerHalaman}
            defaultCurrent={100}
            total={DataPagination}
          />
        </div>
      </Card>
    </div>
  );
}

export default APListALL;
