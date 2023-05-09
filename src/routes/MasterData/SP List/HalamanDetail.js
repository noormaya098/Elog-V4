import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button, Table } from "react-bootstrap";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import axios from "axios";
function HalamanDetail() {
  const { idmp } = useParams();
  const [isidata, setIsidata] = useState([]);

  const detail = async (idmp) => {
    const isi = await axios.get(`${Baseurl}sp/get-SP-detail?idmp=${idmp}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    });

    const semua = isi.data.data;

    const isidetail = isi.data.data.map((item) => ({
      berat: item.berat,
      sp: item.sp,
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
    setIsidata(semua);
    console.log(`ini idmp ${idmp}`, isidetail);
  };

  useEffect(() => {
    detail(idmp);
  }, [idmp]);


  return (
    <div>
      <Card>
        <Row>
          <div className="d-flex justify-content-end">
            <Button size="sm">Approve</Button>
            <Button size="sm" variant="danger">
              Reject Driver
            </Button>
          </div>

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
        <br/>
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
                      <td>Exp</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{isi.destination}</td>
                      <td>{isi.via}</td>
                      <td>{isi.item}</td>
                      <td>{isi.berat}</td>
                      <td>{isi.qyt}</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </Table>
              ))}
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default HalamanDetail;
