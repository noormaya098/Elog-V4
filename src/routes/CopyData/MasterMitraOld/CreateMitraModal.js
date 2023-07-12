import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import DataProfile from "./Form/DataProfile";
import {notification } from "antd";
import { httpClient } from "../../../Api/Api";
function SamplePage() {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (values) => {
    httpClient
      .post("mitra/create-mitra-pic", values)
      .then((response) => {
        const { data } = response;
        notification.success({
          message: "Success",
          description: data.message,
        });
        setTimeout(() => history.push("/tarifmitra"), 1000);
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: error.message,
        });
        console.log(error.message);
      });
  };

  const halamantambahmitra = () => {
    history.push(`/mastermitraold/tambahmitra/`);
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Tambah Mitra
      </Button>

      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Tambah Mitra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataProfile onSubmit={handleSubmit} />
        </Modal.Body>
       <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> 
      </Modal>
    </>
  );
}

export default SamplePage;