// FormTable.js
import React from "react";
import { Col, Row, Form, Button, Table, Modal } from "react-bootstrap";
import { Card } from "antd";
import { useState, useEffect } from "react";
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";
import Token from "../../../Api/Token";

function FormTable({ isidata, totalPrice }) {
  const [show, setShow] = useState(false);
  const [kendaraan, setKendaraanData] = useState([]); /// ini isi kendaraaan dari api idmp detail
  const [nampungno_poliiis, setnampungNopolice] = useState([]);
  const [valuenopolice, setvaluenopolice] = useState([]);
  const [driver, setDriverData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (isidata && isidata.length > 0) {
      const kendaraanList = isidata.map((item) => item.kendaraan);
      setKendaraanData(kendaraanList);
    }
  }, [isidata]);

  console.log(`value no police`,valuenopolice);
  ///select driver
  const vehicle = async (type) => {
    const sleet = await axios.get(
      `${Baseurl}sp/get-SP-select?vehicleType=${type}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    const namadriver = sleet.data.data.Driver
    console.log (`nama driver`,namadriver )
    if (Array.isArray(sleet.data.data.vehicle)) {
      const no_police = sleet.data.data.vehicle.map((item) => item.no_polisi);
      console.log(`ini nopolice`, no_police);
      setnampungNopolice(no_police);
    } else {
      console.error("Error: sleet.data.data.vehicle is not an array");
    }
  };

  useEffect(() => {
    if (kendaraan) {
      vehicle(kendaraan);
    }
  }, [kendaraan]);
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
            <Form.Control
              type="text"
              disabled
              value={kendaraan || "tidak tersedia"}
            />
            <Form.Label>Kode Kendaraan</Form.Label>
            <Form.Select
              onChange={(e) => {
                setvaluenopolice(e.target.value);
                vehicle(e.target.setvaluenopolice)
              }}
            >
              <option>Select Kode Kendaraan</option>
              {nampungno_poliiis.map((no_polisi, index) => (
                <option key={index} value={no_polisi}>
                  {no_polisi}
                </option>
              ))}
            </Form.Select>

            <Form.Label>Select Driver</Form.Label>
            <Form.Select >
              <option>Select Driver</option>
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
            Total Price : {totalPrice}
          </p>
        </Col>
      </Row>
    </Card>
  );
}

export default FormTable;
