import React from "react";
import { Col, Row, Image, Form, Button, Table } from "react-bootstrap";
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

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const newData = data.map((item) => ({
        sp: item.sp,
        berat: item.berat,
      }));

      setMappedData(newData);
      console.log("Mapped data:", newData);

      // Set noSPK with sp value from API
      if (data[0]) {
        setNoSPK(data[0].sp);
      }
    }
  }, [data]);

  useEffect(() => {
    fetchSpDetail();
  }, [idmp]);

  return (
    <div>
      <Card>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="noSPK">
                <Form.Label>No.SPK</Form.Label>
                <Form.Control
                  type="text"
                  value={data && data[0] ? data[0].sp : "error"}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Service</Form.Label>
                <Form.Control
                  type="text"
                  value={data && data[0] ? data[0].service : "error"}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group controlId="nama">
                <Form.Label>Via</Form.Label>
                <Form.Control
                  type="text"
                  value={data && data[0] ? data[0].via : "error"}
                  disabled
                  onChange={(event) => setNama(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="nama">
                <Form.Label>Pickup Date</Form.Label>
                <Form.Control
                  type="text"
                  value={data && data[0] ? data[0].pickupDate : "error"}
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
              <Form.Group controlId="foto">
                <Form.Label>Pickup Address</Form.Label>
                <Form.Control
                  type="text"
                  value={data && data[0] ? data[0].pickupAddress : "error"}
                  disabled
                  onChange={(event) => setNoSPK(event.target.value)}
                />
              </Form.Group>
            </Col>
            <div className="mt-4" />
            <p style={{fontWeight: 'bold'}}>Destination 1 :</p>
            <IsiItungan />
            <DetailArmada />
            <DetailDelivery />
          </Row>
        </Form>
      </Card>
    </div>
  );
}
export default DetailSP;
