import React from "react";
import { Container } from "react-bootstrap/";
import { Card } from "antd";
// import { Button } from "antd";
import Token from "../../../Api/Token";
import BaseUrl from "../../../Api/BaseUrl";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
import { Form, Col, Row, InputGroup, Modal, Button } from "react-bootstrap/";
const Driver = () => {
  const [get, setGet] = useState([]);
  const [editapi, setEditapi] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async (driverId) => setShow(true);
  const [isidriver, setIsiDriver] = useState("");

  const columns = [
    {
      name: "No",
      selector: (row) => row.no + 1,
    },
    {
      name: "Foto",
      cell: (row) => <img src={row.driverImage} width="50px" />,
    },

    {
      name: "Kiriman (SM)",
      selector: (row) => row.driverName,
    },
    {
      name: "Penjualan",
      selector: (row) => row.totalPenjualan,
    },
    {
      name: "Edit",
      selector: (row) => (
        <>
          <Button
            size="sm"
            variant="warning"
            className="mt-3"
            onClick={() => handleShow(row.driverId)}
          >
            Edit
          </Button>
          {/* <Button size="sm" variant="danger" className="mt-3" onClick={() => handleShow(row.driverId)}>
          Delete
        </Button> */}
        </>
      ),
    },
  ];
  const getapi = async () => {
    axios
      .get(`${Baseurl}driver/get-driver?limit=10&page=1&keyword=`, {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((res) => {
        setGet(res.data.data.order);
        console.log(res.data.data.order);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const editdriver = async (driverId) => {
    axios
      .post(
        `${BaseUrl}driver/update-driver`,
        {
          id: `${driverId}`,
          nama: `tashya test`,
          nik: "p2693",
          divisi: "p2693",
          no_ktp: 12801938121,
          no_sim: 12411241,
          jenis_sim: "B",
          alamat: "lajkdajksdjhsakdsa",
          tgl_lahir: "1979-01-12",
          agama: "islam",
          no_telp: 12801938121,
          no_telp2: 12801938121,
          email: "tasyauyeahhh2@gmail.com",
          tanggal_masuk: "2022-01-12",
        },
        {
          headers: {
            Authorization: `token ${Token}`,
          },
        }
      )
      .then((res) => {
        setEditapi(res);
        setIsiDriver(driverId);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getapi();
    editdriver();
  }, []);

  return (
    <>
      <div className="gx-d-flex justify-content-start">
        <h5>List Driver</h5>
        <p>&nbsp;Operasional</p>
      </div>
      <Container>
        <Card>
          <Button variant="primary" onClick={handleShow}>
            Add Karyawan{" "}
          </Button>
          <Button variant="danger">Trial Send Mail</Button>
          <DataTable columns={columns} data={get} pagination />
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
                      <Form.Control type="file" />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>
                      <b>Nama Supir</b>
                    </Form.Label>
                    <Form.Control
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
                      defaultValue={setIsiDriver.nama}
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
                  <Form.Group
                    className="mb-3"
                    as={Col}
                    controlId="formGridAddress1"
                  >
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
                  <Form.Group
                    className="mb-3"
                    as={Col}
                    controlId="formGridAddress2"
                  >
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
              <Button variant="primary" onClick={() => editdriver()}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>
      </Container>
    </>
  );
};

export default Driver;
