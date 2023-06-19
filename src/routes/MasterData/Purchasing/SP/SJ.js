import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import { Col, Row, Form, Button, ButtonGroup } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Baseurl from "../../../../Api/BaseUrl";
import Swal from "sweetalert2";
import LoadingElogGif from "../../../../assets/Loader_Elogs1.gif"
import { Pagination, DatePicker } from 'antd';
import mobil from "../../../redux toolkit/store/ZustandStore";
import { Select } from 'antd';


function SJ() {
  const [loading, setLoading] = useState(false)
  const [isiData, setIsiData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [search, setSearch] = useState([]);
  const [nosj, setNoSJ] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
  });
  const history = useHistory();
  const { KodeCabang, setJenisKodeCabang } = mobil((state) => ({
    KodeCabang: state.KodeCabang,
    setJenisKodeCabang: state.setJenisKodeCabang
  }))
  const { NamaMitraGlobalZustand, setNamaMitraGlobalZustand } = mobil((state) => ({
    NamaMitraGlobalZustand: state.NamaMitraGlobalZustand,
    setNamaMitraGlobalZustand: state.setNamaMitraGlobalZustand
  }))

  const [KodeCabangValue, setKodeCabangValue] = useState([])
  const [NamaMitraValue, setNamaMitraValue] = useState("")
  const [NamaMitraValue2, setNamaMitraValue2] = useState("")

  const dataapi = async (page) => {
    try {
      setLoading(true)
      const isi = await axios.get(
        `${Baseurl}sm/get-sm?limit=10&page=${page}&keyword=${search}&kodeCabang=${KodeCabangValue}&mitra1=${NamaMitraValue[0]}&mitra2=${NamaMitraValue[1]}&mitra3=${NamaMitraValue[2]}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const isidata = isi.data.data.order
      const sjs = isi.data.data.order.map((item) => item.id)
      console.log(`no sj`, sjs);
      setNoSJ(sjs);
      setPagination({
        currentPage: isi.data.data.currentPage,
        limit: isi.data.data.limit,
        totalPage: isi.data.data.totalPage
      });
      setLoading(false)
      setIsiData(isidata);
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
    dataapi(page)
    // dataapi(pagination.currentPage);
    SMFilter()
  }, [search, KodeCabangValue]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => row?.no,
      width: "2%",
    },
    {
      name: "SJ/SP",
      selector: row => (
        <>
          <strong>{row?.sm}</strong> <br /> {row.sp}
        </>
      ),
      width: "170px",
    },
    {
      name: "Rute",
      selector: (row) => (
        <>
          <strong>{row?.perusahaan} </strong><br /> {row?.destination},
        </>),
      width: "230px",
    },
    {
      name: "Pickup",
      selector: (row) => (
        <>
          {row?.mitraPickup === "-" ? "" : row?.mitraPickup}
          <br />
          {row?.unit1 === "-" ? "" : row?.unit1} - {row?.driver1 === "-" ? "" : row?.driver1}
        </>
      ),
      width: "230px",
    },
    {
      name: "Mitra 1",
      selector: (row) => (
        <>
          {row?.mitra1 === "-" ? "-" : row?.mitra1}
          <br />
          {row?.unit1 === "-" ? "" : row?.unit1}
        </>
      ),
      width: "230px",
    },
    {
      name: "Mitra 2",
      selector: (row) => (
        <>
          -
        </>
      ),
      width: "230px",
    },
    {
      name: "Tanggal Muat",
      selector: (row) => row?.pickupDate === "Invalid date" ? "-" : row?.pickupDate,
      width: "150px",
    },
    {
      name: "Uang Jalan",
      selector: (row) => "uang jalan",
      width: "150px",
    },
    {
      name: "onProcess",
      selector: (row) => "uang jalan",
      width: "150px",
    },
    {
      name: "onPickup",
      selector: (row) => "uang jalan",
      width: "150px",
    },
    {
      name: "onDelivery",
      selector: (row) => "uang jalan",
      width: "150px",
    },
    {
      name: "Unloading",
      selector: (row) => "uang jalan",
      width: "150px",
    },
    {
      name: "Success",
      selector: (row) => "uang jalan",
      width: "150px",
    },
    {
      name: "receiveSJ",
      selector: (row) => <Button size="sm" variant="primary">Terima</Button>,
      width: "150px",
    },
    {
      name: "SJonAP",
      selector: (row) => <Button size="sm" variant="primary">Terima</Button>,
      width: "150px",
    },
    {
      name: "SJonAR",
      selector: (row) => <Button size="sm" variant="primary">Terima</Button>,
      width: "150px",
    },
    {
      name: "Invoice",
      selector: (row) => "uang jalan",
      width: "150px",
    },
    {
      name: "AP",
      selector: (row) => "uang jalan",
      width: "150px",
    },
    // {
    //   name: "Options",
    //   selector: (row) => <><Button onClick={()=>buttonarahin(row.id)} size="sm">Detail</Button></>,
    //   width: "15%",
    // },
  ];


  const buttonarahin = (id) => {
    history.push(`/masterdata/detailsjlist/${id}`);
  };

  const handlePageChange = async (page) => {
    setPagination({ ...pagination, currentPage: page });
    await dataapi(page, search);
  };

  const onShowSizeChange = (page, pageSize) => {
    console.log(page, pageSize);
    dataapi(page)
  };

  const SMFilter = async () => {
    try {
      const data = await axios.get(`${Baseurl}sm/get-sm-filter`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      setJenisKodeCabang(data.data.cabang)
      setNamaMitraGlobalZustand(data.data.mitra)
      console.log(`ini smfilter`, data.data);
      console.log(`ini KodeCabang`, KodeCabang);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
      }
    }
  };


  const NamaMitraOptions = NamaMitraGlobalZustand.map((item) => ({
    value: item.mitraId,
    label: item.NamaMitra
  }))

  const handleMitraChange = (value) => {
    console.log(`selected ${value}`);
    setNamaMitraValue(value[0]);
    setNamaMitraValue2(value[1]) // memasukkan array pilihan ke dalam state
  }



  return (
    <div>
      <Card>
        {/* <h3>SJ List</h3> */}
        <Row>
          <Col sm={2}>
            <Form.Group>
              <Form.Label><strong>BU</strong></Form.Label>
              <Form.Select>
                <option>-</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <Form.Label><strong>CABANG</strong></Form.Label>
              <Form.Select
                value={KodeCabangValue}
                onChange={(e) => setKodeCabangValue(e.target.value)}
              >
                <option>-</option>
                {KodeCabang.map((item) => (
                  <option value={item.kodeCabang}>{item.kodeCabang}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <Form.Label><strong>MITRA</strong></Form.Label>
              {/* <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Pilih Mitra"
                onChange={(e)=>setNamaMitraValue(e.target.value)}
                options={NamaMitraOptions}
              /> */}
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Pilih mitra"
                defaultValue={[]}
                onChange={handleMitraChange}
                options={NamaMitraOptions}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <Form.Label><strong>MULAI & SELESAI</strong></Form.Label>
              <DatePicker.RangePicker />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group controlId="search">
              <Form.Label><strong>Cari No SJ</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Cari No SJ"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {(loading ? (<img src={LoadingElogGif} width="1500px"></img>) : (
              <DataTable
                columns={columns}
                data={isiData}
                title="SJ List"
              />
            ))}
            <div className="mt-3 d-flex justify-content-end">

              <Pagination
                showSizeChanger
                onChange={onShowSizeChange}
                defaultCurrent={1}
                total={pagination.totalPage}
              // disabled
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default SJ;
