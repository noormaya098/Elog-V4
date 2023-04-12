import React from "react";
import { Col, Row, Image, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Card from "antd/lib/card/Card";
function DetailSP() {
  const [noSPK, setNoSPK] = useState("");
  const [nama, setNama] = useState("");
  const [foto, setFoto] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`No SPK: ${noSPK}, Nama: ${nama}, Foto: ${foto}`);
  };
  return (
    <div>
      <Card>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={4}>
              <Form.Group controlId="noSPK">
                <Form.Label>No.SPK</Form.Label>
                <Form.Control
                  type="text"
                  value={noSPK}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="noSPK">
                <Form.Label>No.SP</Form.Label>
                <Form.Control
                  type="text"
                  value={noSPK}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="noSPK">
                <Form.Label>No.Request</Form.Label>
                <Form.Control
                  type="text"
                  value={noSPK}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="noSPK">
                <Form.Label>Customer</Form.Label>
                <Form.Control
                  type="text"
                  value={noSPK}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="noSPK">
                <Form.Label>Alamat Invoice</Form.Label>
                <Form.Control
                  type="text"
                  value={noSPK}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
            </Col>

            <Col sm={4}>
              <Form.Group controlId="nama">
                <Form.Label>Marketing</Form.Label>
                <Form.Control
                  type="text"
                  value={nama}
                  disabled
                  onChange={(event) => setNama(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="nama">
                <Form.Label>Service</Form.Label>
                <Form.Control
                  type="text"
                  value={nama}
                  onChange={(event) => setNama(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="nama">
                <Form.Label>Order Date</Form.Label>
                <Form.Control
                  type="text"
                  value={nama}
                  disabled
                  onChange={(event) => setNama(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="nama">
                <Form.Label>Pickup Date</Form.Label>
                <Form.Control
                  type="text"
                  value={nama}
                  disabled
                  onChange={(event) => setNama(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="nama">
                <Form.Label>Telp Customer</Form.Label>
                <Form.Control
                  type="text"
                  value={nama}
                  disabled
                  onChange={(event) => setNama(event.target.value)}
                />
              </Form.Group>
            </Col>

            <Col sm={4}>
              <Form.Group controlId="foto">
                <Form.Label>Driver</Form.Label>
                <Form.Control
                  type="file"
                  value={foto}
                  onChange={(event) => setFoto(event.target.value)}
                />
              </Form.Group>
            </Col>
            <hr className="mt-4" />
            <Col sm={12}>
              <Form.Group controlId="foto">
                <Form.Label>Pickup Address</Form.Label>
                <Form.Control
                  type="text"
                  value={foto}
                  disabled
                  onChange={(event) => setFoto(event.target.value)}
                />
              </Form.Group>
            </Col>
            <hr className="mt-4" />
          </Row>
        </Form>
      </Card>
    </div>
  );
}
export default DetailSP;
