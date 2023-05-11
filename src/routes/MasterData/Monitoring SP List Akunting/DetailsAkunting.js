import { Card } from "antd";
import { Col, Row, Form, Modal, Button, Table } from "react-bootstrap";
import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import mobil from "../../redux toolkit/store/ZustandStore";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
function DetailsAkunting() {
  const [detailData, setDetailData] = useState([]);
  const { isicombinedData, setisiCombinedData } = mobil((item) => ({
    sp: item.sp,
  }));
  const { idmp } = useParams();
  console.log(idmp);
  useEffect(() => {
    const getDetail = async () => {
      const response = await axios.get(
        `${Baseurl}sp/get-SP-all-detail?keyword=&idmp=${idmp}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      setDetailData(response.data);
      console.log(response.data);
    };
    getDetail();
  }, [idmp]);

  console.log(isicombinedData);
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];
  const isiapi = () => {};
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

          <Modal>
            <Modal.Header closeButton>
              <Modal.Title>Approve Driver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Select></Form.Select>

              <Form.Label>Kode Kendaraan</Form.Label>
              <Form.Select></Form.Select>

              <Form.Label>Select Driver</Form.Label>
              <Form.Select></Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save Changes</Button>
            </Modal.Footer>
          </Modal>

          <Col sm={6}>
            <Form>
              <Form.Group>
                <Form.Label>No.SPK</Form.Label>
                <Form.Control disabled value={detailData?.sp} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Service</Form.Label>
                <Form.Control disabled value={detailData?.service} />
              </Form.Group>
            </Form>
          </Col>
          <Col sm={6}>
            <Form>
              <Form.Group>
                <Form.Label>Via</Form.Label>
                <Form.Control disabled value={detailData?.detail?.[0]?.via} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Pickup Date</Form.Label>
                <Form.Control disabled value={detailData?.pickup_date} />
              </Form.Group>
            </Form>
          </Col>
          <Form.Group>
            <Form.Label>Pickup Address</Form.Label>
            <Form.Control
              disabled
              value={detailData?.detail?.[0]?.pickupAddress}
            />
          </Form.Group>
        </Row>
        <br />
        <Row>
          <Col>
            <Table responsive>
              <thead>
                <tr style={{ fontWeight: "bold", backgroundColor: "#dff0d8" }}>
                  <td>No</td>
                  <td>Destination</td>
                  <td>Via</td>
                  <td>Item</td>
                  <td>Berat</td>
                  <td>Qty</td>
                  <td>Price</td>
                </tr>
              </thead>
              <tbody>
                {detailData &&
                  detailData.detail &&
                  detailData.detail.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.destination}</td>
                      <td>{data.via}</td>
                      <td>{data.item}</td>
                      <td>{data.berat}</td>
                      <td>{data.qty}</td>
                      <td>{data.Price}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Total Price :{detailData?.Totalprice}
            </p>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default DetailsAkunting;
