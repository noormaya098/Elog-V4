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
import Base from "antd/lib/typography/Base";
import Swal from "sweetalert2";

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
  const [typeMobiles, setTypeMobiles] = useState([]);
  const [namaDriver, setNamaDriver] = useState([]);
  const [idVehicleType, setIdVehicleType] = useState("");
  const [idnamadriver, setidnamadriver] = useState("");
  const [idType, setIdType] = useState("");
  const [NamanamaDriver, setNamanamaDriver] = useState("");
  const [id, setId] = useState("");
  const [SupirCadangan, setSupirCadangan] = useState("");

  console.log(`idmp`, idmp);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const AmbilDriver = async (idType, id) => {
    try {
      handleShow();
      const res = await axios.get(
        `${Baseurl}sp/get-SP-select-2?vehicleType=${idType}&id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      const typeMobiless = res.data.data.type;
      const driverData = res.data.data.vehicle;
      const namanamaDriver = res.data.data.Driver;
      setTypeMobiles(typeMobiless);
      setNamaDriver(driverData);
      setNamanamaDriver(namanamaDriver);
      console.log(`ini log driverdata`, typeMobiles);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(`nama driver`, namaDriver);
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
      console.error(error);
    }
  };
  const [mappedData, setMappedData] = useState([]);

  const supirCadangan = async () => {
    try {
      const response = await axios.get(`${Baseurl}sp/another-driver`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });
      const SupirCadangan = response.data.data;
      setSupirCadangan(SupirCadangan);

      console.log(`ini adlaah apa ya`, data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const newData = data.map((item) => ({
        sp: item.sp,
        berat: item.berat === 0 ? "0" : item.berat,
        item: item.item === "" ? "-" : item.item,
        destination: item.destination,
        qyt: item.qty === 0 ? "0" : item.qty,
        exp: item.exp === 0 ? "0" : item.exp,
        via: item.via === "" ? "-" : item.via,
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
  console.log(`ini isian service`, destination);
  useEffect(() => {
    fetchSpDetail();
    // approve();
    supirCadangan();
  }, [idmp]);

  const approve = async () => {
    try {
      const response = await axios.post(
        `${Baseurl}sp/approve-SP`,
        {
          id_mp: idmp,
          id_supir: idType,
          id_unit: idnamadriver,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      handleClose();
      const dataApprove = response.status.message;
      console.log(`ini adlaah apa ya`, dataApprove);

      Swal.fire({
        title: "Success!",
        text: "Berhasil Approve!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Lengkapi Data!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const RejectBtn = () =>{
    Swal.fire({
      title: "Success!",
      text: "Berhasil Reject!",
      icon: "success",
      confirmButtonText: "OK",
    });
  }
  return (
    <div>
      <Card>
        <div className="d-flex justify-content-end">
          <Button
            className="end-0"
            variant="primary"
            size="sm"
            onClick={AmbilDriver}
          >
            Approve
          </Button>
          <Button size="sm" variant="danger" onClick={()=>RejectBtn()}>
            Reject Driver
          </Button>
        </div>
        <Form onSubmit={handleSubmit}>
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Approve SP</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setIdType(e.target.value);
                    AmbilDriver(e.target.value);
                  }}
                >
                  <option>Select Vehicle Type</option>
                  {typeMobiles &&
                    typeMobiles.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.tipe}
                        </option>
                      );
                    })}
                </Form.Select>
                <Form.Label>vehicle</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setId(e.target.value);
                    AmbilDriver(idType, e.target.value);
                  }}
                >
                  <option>Select vehicle</option>
                  {namaDriver &&
                    namaDriver.map((items) => {
                      return (
                        <option key={items.id} value={items.id}>
                          {items.no_polisi}
                        </option>
                      );
                    })}
                </Form.Select>
                <Form.Label>Select Driver</Form.Label>
                <Form.Select onChange={(e) => setidnamadriver(e.target.value)}>
                  <option>Select Driver</option>
                  {NamanamaDriver &&
                    NamanamaDriver.map((items) => {
                      return (
                        <option key={items.id} value={items.id}>
                          {items.name}
                        </option>
                      );
                    })}
                </Form.Select>
                <hr />
                <Form.Label>Driver Cadangan</Form.Label>
                <Form.Select onChange={(e) => setidnamadriver(e.target.value)}>
                  <option>Pilih Driver Cadangan</option>
                  {SupirCadangan &&
                    SupirCadangan.map((items) => {
                      return (
                        <option key={items.id} value={items.id}>
                          {items.name}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => approve()}>
                Approve
              </Button>
            </Modal.Footer>
          </Modal>

          <Row>
            <Col sm={6}>
              <Form.Group controlId="noSPK">
                <Form.Label>No.SPK</Form.Label>
                <Form.Control type="text" value={sp} disabled />
              </Form.Group>
              <Form.Group>
                <Form.Label>Service</Form.Label>
                <Form.Control type="text" value={service} disabled />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label>Via</Form.Label>
                <Form.Control type="text" value={via} disabled />
              </Form.Group>

              <Form.Group>
                <Form.Label>Pickup Date</Form.Label>
                <Form.Control type="text" value={pickupDate} disabled />
              </Form.Group>
            </Col>

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
            <IsiItungan
              destination={destination}
              via={via}
              berat={berat}
              item={item}
              qty={qty}
              data={mappedData}
              exp={exp}
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
