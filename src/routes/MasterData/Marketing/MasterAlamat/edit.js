import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification } from "antd";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { httpClient } from "../../util/Api";
import { InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const { RangePicker } = DatePicker;

const { Search } = Input;

const onSearch = (value) => console.log(value);

const SamplePage = () => {
  const router = useHistory();

  const [data, setData] = useState([]);
  const [orderDataTable, setOrderDataTable] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [detailSp, setDetailSp] = useState([]);

  const formik = useFormik({
    initialValues: {
      id_customer: "104",
      pic: "",
      jabatan: "",
      email: "",
      alamat: "",
      kecamatan: "",
      kota: "",
      kode_wilayah: "",
      ritase: "",
      hp: "",
      lat: "",
      lon: "",
    },
    validationSchema: Yup.object({
      id_customer: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("customer/edit-alamat", values)
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/masteralamat"), 1000);
        })
        .catch(function (error) {
          notification.error({
            message: "Error",
            description: error.message,
          });
          console.log(error.message);
        });
    },
  });

  useEffect(() => {
    const url = window.location.href;
    const idMpFix = url.substring(url.lastIndexOf("/") + 1);
    httpClient
      .get(`sp/get-SP-all-detail?idmp=${idMpFix}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrderDataTable(data.detail);
          setOrder(data);
          setTimeout(() => {
            formik.setFieldValue("service", data.service);
            formik.setFieldValue("order_date", data.order_date);
            formik.setFieldValue("pickupDate", data.pickup_date);
          }, 1000);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
    httpClient
      .get(`sp/get-SP-massage?id_mp=${idMpFix}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setData(data.data);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Button type="submit">Save </Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>ID Customer</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="id_customer"
                    value={formik.values.id_customer}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.id_customer}
                    disabled
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>PIC</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic"
                    value={formik.values.pic}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jabatan</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jabatan"
                    value={formik.values.jabatan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jabatan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.email}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>alamat</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="alamat"
                    value={formik.values.alamat}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>kecamatan</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="kecamatan"
                    value={formik.values.kecamatan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.kecamatan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>kota</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="kota"
                    value={formik.values.kota}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.kota}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>kode_wilayah</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="kode_wilayah"
                    value={formik.values.kode_wilayah}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.kode_wilayah}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>ritase</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ritase"
                    value={formik.values.ritase}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ritase}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Form.Group>
                <Form.Label>hp </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="hp"
                    value={formik.values.hp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.hp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={12}>
              <Form.Group>
                <Form.Label>lat </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="lat"
                    value={formik.values.lat}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.lat}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label>lon</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="lon"
                    value={formik.values.lon}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.lon}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default SamplePage;
