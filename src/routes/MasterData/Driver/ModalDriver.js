import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import {Form, Col , Row, InputGroup} from "react-bootstrap/";
import Modal from "react-bootstrap/Modal";

const ModalDriver = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title size="sm">Driver Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <b>Photo :</b>
              </Form.Label>
              <InputGroup>
                <Form.Control input type="file" />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>
                <b>Nama Supir</b>
              </Form.Label>
              <Form.Control
                value={`s`}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     nama: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>
                <b>Vehicle Tipe </b>
              </Form.Label>
              <Form.Control
                defaultValue={"Truck"}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     vehicle_type: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group className="mb-3" as={Col} controlId="formGridAddress1">
              <Form.Label>
                <b>Jenis SIM </b>:
              </Form.Label>
              <Form.Control
                defaultValue={``}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     jenis_sim: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Col} controlId="formGridAddress2">
              <Form.Label>
                <b>No Sim :</b>
              </Form.Label>
              <Form.Control
                defaultValue={``}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     no_sim: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>
                <b>No KTP :</b>
              </Form.Label>
              <Form.Control
                // defaultValue={no_ktp}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     no_kkp: e.target.value,
                //   });
                // }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>
                <b>Tempat Lahir :</b>
              </Form.Label>
              <Form.Control
                // defaultValue={tempat_lahir}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     tempat_lahir: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <b>Tanggal Lahir :</b>
              </Form.Label>
              <Form.Control
                // defaultValue={no_ktp}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     no_kkp: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <b>Alamat :</b>
              </Form.Label>
              <Form.Control
                // defaultValue={alamat}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     alamat: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <b>Email :</b>
              </Form.Label>
              <Form.Control
                // defaultValue={email}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     email: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <b>Agama :</b>
              </Form.Label>
              <Form.Control
                // defaultValue={agama}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     email: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <b>No Telp 1 :</b>
              </Form.Label>
              <Form.Control
                // defaultValue={no_telp}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     no_telp: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <b>No Telp 2 :</b>
              </Form.Label>
              <Form.Control
                defaultValue={`no_telp2`}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     no_telp2: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <b>Tanggal Masuk :</b>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  defaultValue={`tanggal_masuk`}
                //   onChange={(e) => {
                //     // setGanti=(true);
                //     setInputdata({
                //       ...inputdata,
                //       tanggal_masuk: e.target.value,
                //     });
                //   }}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <b>Keteragan :</b>
              </Form.Label>
              <Form.Control
                defaultValue={`keterangan`}
                // onChange={(e) => {
                //   // setGanti=(true);
                //   setInputdata({
                //     ...inputdata,
                //     keterangan: e.target.value,
                //   });
                // }}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleShow}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDriver;
