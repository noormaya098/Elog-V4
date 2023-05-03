import React from "react";
import { Col, Row, Image, Form, Button, Table, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import Card from "antd/lib/card/Card";
import fotos from "./gojo_satoru_19784.jpg";
import DetailArmada from "./DetailArmada";
import IsiItungan from "./IsiItungan";
import DetailDelivery from "./DetailDelivery";
import { useParams } from "react-router-dom";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";

function DetailSP() {
  const [noSPK, setNoSPK] = useState("");
  const [nama, setNama] = useState("");
  const [foto, setFoto] = useState("");
  const { idmp } = useParams();
  const [data, setdata] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  ///data api
  const [sp, setSP] = useState("");
  const [via, setVia] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [destination, setDestination] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [kendaraan, setKendaraan] = useState("");
  const [item, setItem] = useState("");
  const [berat, setBerat] = useState("");
  const [service, setService] = useState("");
  const [pickupDate, setpickupDate] = useState("");
  const [qty, setQty] = useState("");
  const [exp, setExp] = useState("");

  console.log(`idmp`, idmp);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const fetchSpDetail = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}sp/get-SP-detail?idmp=${idmp}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      const dataSP = response.data.data;
      setdata(dataSP);

      console.log(`ini adlaah apa ya`, data);
    } catch (error) {
      console.error("There was a problem with the axios request:", error);
    }
  };
  const [mappedData, setMappedData] = useState([]);

  const postDataIDMP = ()=>{
    handleClose()
  }


  useEffect(() => {
    if (data && Array.isArray(data)) {
      const newData = data.map((item) => ({
        sp: item.sp,
        berat: item.berat,
      }));

      setMappedData(newData);
      console.log("Mapped data:", newData);

      if (data[0]) {
        setService(data[0].service);
        setSP(data[0].sp);
        setpickupDate(data[0].pickupDate);
        setVia(data[0].via);
        setPickupAddress(data[0].pickupAddress);
        setDestination(data[0].destination);
        setBerat(data[0].berat);
        setItem(data[0].item);
        setQty(data[0].qty);
        setExp(data[0].exp);
      }
    }
  }, [data]);

  useEffect(() => {
    fetchSpDetail();
  }, [idmp]);

  return (
    <div>
      <Card>
        <div className="d-flex justify-content-end">
          <Button
            className="end-0"
            style={{}}
            variant="primary"
            size="sm"
            onClick={handleShow}
          >
            Approve
          </Button>
        </div>
        <Form onSubmit={handleSubmit}>
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Approve SP</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Select Driver</Form.Label>
                <Form.Select>
                  <option>-</option>
                </Form.Select>
                <Form.Label>Select Supir</Form.Label>
                <Form.Select>
                  <option>-</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={()=>postDataIDMP()}>
                Approve
              </Button>
            </Modal.Footer>
          </Modal>

          <Row>
            <Col sm={6}>
              <Form.Group controlId="noSPK">
                <Form.Label>No.SPK</Form.Label>
                <Form.Control
                  type="text"
                  value={sp}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Service</Form.Label>
                <Form.Control
                  type="text"
                  value={service}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label>Via</Form.Label>
                <Form.Control
                  type="text"
                  value={via}
                  disabled
                  onChange={(event) => setNama(event.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Pickup Date</Form.Label>
                <Form.Control
                  type="text"
                  value={pickupDate}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
            </Col>

            {/* <Col sm={4}>
              <Form.Group controlId="foto">
                <Form.Label>Driver</Form.Label>
                <Card style={{ width: "250px" }}>
                  <Image src={fotos} alt="Foto Driver" fluid width="250px" />
                </Card>
              </Form.Group>
            </Col> */}
            <Col sm={12}>
              <Form.Group>
                <Form.Label>Pickup Address</Form.Label>
                <Form.Control
                  type="text"
                  value={pickupAddress}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
            </Col>
            <div className="mt-4" />
            <p style={{ fontWeight: "bold" }}>Destination 1 :</p>
            <IsiItungan
              destination={destination}
              via={via}
              berat={berat}
              item={item}
              qty={qty}
            />
            <DetailArmada />
            <DetailDelivery />
          </Row>
        </Form>
      </Card>
    </div>
  );
}
export default DetailSP;
