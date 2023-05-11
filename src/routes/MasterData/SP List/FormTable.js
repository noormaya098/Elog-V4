// FormTable.js
import React from "react";
import { Col, Row, Form, Button, Table, Modal } from "react-bootstrap";
import { Card } from "antd";
import { useState, useEffect } from "react";
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";
import Token from "../../../Api/Token";
import mobil from "../../redux toolkit/store/ZustandStore";
function FormTable({ isidata, totalPrice }) {
  const [types, setType] = useState([]);
  const [nomorpolisi, setNomorPolisi] = useState([]);
  const [selectnomor, setSelectnomor] = useState([]);
  const [selectDriver, setselectDriver] = useState([]);
  const { isidetail, setSpDetail } = mobil((state) => ({
    isidetail: state.isidetail,
    setSpDetail: state.setSpDetail,
  }));
  const {isiduit, setDuit} = mobil ((state) => ({
    isiduit : state.isiduit,
    setDuit : state.setDuit
  }))
  

  useEffect(() => {
    setType(isidetail.map((item) => item?.kendaraan));
  }, [isidetail]);
  console.log(`ini duit`, isiduit);
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
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        const nomorpolisis = sleet.data.data.vehicle;
        const drivernya = sleet.data.data.Driver;
        console.log(`test drivernya`, drivernya);
        setselectDriver(drivernya);
        setNomorPolisi(nomorpolisis);
      }
    };
    vehicle();
  }, [types, selectnomor]);
console.log(`isi duit` , totalPrice);
  useState(() => {}, []);
  return (
    <Card>
      <Row>
        <div className="d-flex justify-content-end">
          <Button size="sm" onClick={() => handleShow()}>
            Approve
          </Button>
          <Button size="sm" variant="danger">
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
            <Form.Select
              onChange={(e) => {
                console.log(e.target.value);
                setSelectnomor(e.target.value);
              }}
            >
              <option>Select Kode Kendaraan</option>
              {Array.isArray(nomorpolisi)
                ? nomorpolisi.map((item, index) => (
                    <option key={index} value={item.driverId}>
                      {item.no_polisi}
                    </option>
                  ))
                : null}
            </Form.Select>

            <Form.Label>Select Driver</Form.Label>
            <Form.Select disabled value={selectDriver[0]?.id}>
              <option value={selectDriver[0]?.id}>{selectDriver[0]?.name}</option>
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
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
                    <td>Price</td>
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
                    {/* <td>Koli </td> */}
                    <td>{isi.price}</td>
                  </tr>
                </tbody>
              </Table>
            ))}
          <p
            className="d-flex justify-content-end"
            style={{ fontWeight: "bold" }}
          >
            Total Price : {isiduit}
          </p>
        </Col>
      </Row>
    </Card>
  );
}

export default FormTable;
