// FormTable.js
import React from "react";
import { Col, Row, Form, Button, Table, Modal } from "react-bootstrap";
import { Card, Checkbox } from "antd";
import { useState, useEffect } from "react";
import Baseurl from "../../../Api/BaseUrl";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";
import Token from "../../../Api/Token";
import mobil from "../../redux toolkit/store/ZustandStore";
function FormTable({ isidata, totalPrice, idmp }) {
  const [types, setType] = useState([]);
  const [nomorpolisi, setNomorPolisi] = useState([]);
  const [selectnomor, setSelectnomor] = useState([]);
  const [approved, setApproved] = useState([]);
  const [selectDriver, setselectDriver] = useState([]);
  const [idsupir, setIdsupir] = useState([]);
  const [idUnit, setIdunit] = useState([]);
  const [bukaanother, setBukaanother] = useState(false);
  const [driveranother, setDriveranother] = useState([]);
  const [selectanotherrvalue, setSelectanotherrvalue] = useState([]);
  const { isidetail, setSpDetail } = mobil((state) => ({
    isidetail: state.isidetail,
    setSpDetail: state.setSpDetail,
  }));
  const { isiduit, setDuit } = mobil((state) => ({
    isiduit: state.isiduit,
    setDuit: state.setDuit,
  }));
  const { custumer, setCustumer } = mobil((state) => ({
    custumer: state.custumer,
    setCustumer: state.setCustumer,
  }));
  const { jenisBarang, setjenisBarang } = mobil((state) => ({
    jenisBarang: state.jenisBarang,
    setjenisBarang: state.setjenisBarang,
  }));
  const { orderdate, setOrderdate, asuransi, setAsuransi } = mobil();
  // console.log(`test idmp`, orderdate, asuransi);
  useEffect(() => {
    setType(isidetail.map((item) => item?.kendaraan));
  }, [isidetail]);
  // console.log(`ini duit`, isiduit);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  ///select driver
  useEffect(() => {
    const vehicle = async () => {
      if (types.length > 0) {
        const sleet = await axios.get(
          `${Baseurl}sp/get-SP-select-2?vehicleType=${types[0]}&id=${selectnomor}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const nomorpolisis = sleet.data.data.vehicle;
        const drivernya = sleet.data.data.Driver;
        const idsupir = sleet.data.data.vehicle.map((item) => ({
          id: item.id,
          driverId: item.driverId,
        }));
        // console.log(`id supir`, idsupir[0]?.id);
        setIdsupir(idsupir[0]?.id);
        setselectDriver(drivernya);
        setNomorPolisi(nomorpolisis);
      }
    };
    vehicle();
  }, [types, selectnomor]);
  // console.log(`isi duit`, totalPrice);
  useState(() => {}, []);

  useEffect(() => {
    const anotherdriver = async () => {
      const another = await axios.get(`${Baseurl}sp/another-driver`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
      });
      const driveranotders = another.data.data;
      setDriveranother(driveranotders);
      // console.log(`test`, driveranother);
    };

    anotherdriver();
  }, []);

  ///tombol approve
  const HandleApproveOPS = () => {
    const body = {
      id_mp: idmp,
      id_unit: selectDriver[0]?.idUnit,
      id_supir: selectnomor,
      id_mitra: ``,
      id_mitra_pickup: ``,
      id_mitra_2: ``,
    };

    axios
      .post(`${Baseurl}sp/approve-SP`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const isidata = response.data.status;
        setApproved(isidata);
        console.log(`data approve`, approved);

        // Display success alert
        Swal.fire({
          icon: "success",
          title: "Approval Successful",
          text: "The approval process has been completed successfully.",
        });
        handleClose();
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const handleAnotherDriverClick = () => {
    setBukaanother(true);
    setBukaanother(!bukaanother);
  };

  const rejectsp = async () => {
    try {
      const body = {
        id_mp: idmp,
      };
      const data = await axios.post(`${Baseurl}sp/decline-SP`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data telah di reject",
      });
    } catch (error) {
      // Menampilkan SweetAlert gagal
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan dalam memproses data.",
      });
      console.error(error);
    }
  };

  const nomorpolisiOptions = nomorpolisi.map((item) => ({
    value: item.driverId,
    label: item.no_polisi,
  }));

  return (
    <>
      <Row>
        <div className="d-flex justify-content-end">
          <Button size="sm" onClick={() => handleShow()}>
            Approve
          </Button>
          <Button size="sm" variant="danger" onClick={() => rejectsp()}>
            Reject Driver
          </Button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Approve Driver</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Select
              type="text"
              disabled
              value={types[0] || ""}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            >
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>

            <Form.Label>Kode Kendaraan</Form.Label>
            <Select
              options={nomorpolisiOptions}
              onChange={(selectedOption) => {
                console.log(`kode kendaraan`, selectedOption.value);
                setSelectnomor(selectedOption.value);
              }}
            />

            <Form.Label>Select Driver</Form.Label>
            <Form.Select
              disabled
              value={selectDriver[0]?.id}
              onChange={(e) => {
                console.log(`awo`, e.target.value);
                setIdunit(e.target.value);
              }}
            >
              <option value={selectDriver[0]?.id}>
                {selectDriver[0] && selectDriver[0]?.name}
              </option>
            </Form.Select>
            <Checkbox className="justify-content-end d-flex">Multi</Checkbox>
            <br />
            <hr />
            <Button size="sm" onClick={() => handleAnotherDriverClick()}>
              another driver
            </Button>
            <br />
            {bukaanother && (
              <>
                <Form.Label>Select Driver</Form.Label>
                <Form.Select onChange={(e) => setIdunit()}>
                  <option>Select Driver</option>
                  {driveranother &&
                    driveranother.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item?.name}
                      </option>
                    ))}
                </Form.Select>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => HandleApproveOPS()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Col sm={6}>
          <Form>
            <Form.Group>
              <Form.Label>No.SPK</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? isidata[0].sp : ""}
              />

              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Service</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? isidata[0].kendaraan : ""}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Jenis Barang</Form.Label>
              <Form.Control type="text" disabled value={jenisBarang} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Customer</Form.Label>
              <Form.Control type="text" disabled value={custumer} />
            </Form.Group>
          </Form>
        </Col>
        <Col sm={6}>
          <Form>
            <Form.Group>
              <Form.Label>Via</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? isidata[0].via : ""}
              />
              <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pickup Date</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? isidata[0].pickupDate : ""}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Order Date</Form.Label>
              <Form.Control type="text" disabled value={orderdate} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Asuransi</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={
                  asuransi === "Y"
                    ? "Menggunakan Asuransi"
                    : "Tidak Menggunakan Asuransi"
                }
              />
            </Form.Group>
          </Form>
        </Col>

        <Form.Group>
          <Form.Label>Pickup Address</Form.Label>
          <Form.Control
            type="email"
            disabled
            value={isidata[0] ? isidata[0].pickupAddress : ""}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </Row>
      <br />
      <Row>
        <Col>
          {isidata &&
            isidata.map((isi, index) => (
              <Table responsive key={index}>
                <thead>
                  <tr
                    style={{ fontWeight: "bold", backgroundColor: "#dff0d8" }}
                  >
                    <td>No</td>
                    <td>Destination {index + 1}</td>
                    <td>Via</td>
                    <td>Item</td>
                    <td>Berat</td>
                    <td>Qyt</td>
                    {/* <td>Exp</td> */}
                    {/* <td>Price</td> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{isi.destination}</td>
                    <td>{isi.via}</td>
                    <td>{isi.item}</td>
                    <td>{isi.berat}</td>
                    <td>{isi.qty}</td>
                    {/* <td>custumer </td> */}
                    {/* <td>{isi.price}</td> */}
                  </tr>
                </tbody>
              </Table>
            ))}
          <p
            className="d-flex justify-content-end"
            style={{ fontWeight: "bold" }}
          >
            {/* Total Price : {isiduit} */}
          </p>
        </Col>
      </Row>
    </>
  );
}

export default FormTable;
