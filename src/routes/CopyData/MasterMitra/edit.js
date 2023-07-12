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
  const [dataCustomer, setDataCustomer] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id_customer: dataCustomer?.id_customer || "",
      kode_customer: dataCustomer?.kode_customer || "",
      nama_perusahaan: dataCustomer?.nama_perusahaan || "",
      jenis_barang: dataCustomer?.jenis_barang || "",
      tgl_berdiri: dataCustomer?.tgl_berdiri || "",
      tahun_berdiri: dataCustomer?.tahun_berdiri || "",
      npwp: dataCustomer?.npwp || "",
      alamat_npwp: dataCustomer?.alamat_npwp || "",
      alamat_kantor: dataCustomer?.alamat_kantor || "",
      telepon: dataCustomer?.telepon || "",
      hp: dataCustomer?.hp || "",
      mata_uang: dataCustomer?.mata_uang || "",
      jenis_pembayaran: dataCustomer?.jenis_pembayaran || "",
    },
    validationSchema: Yup.object({
      nama_perusahaan: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("customer/edit-customer", values)
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/mastercustomer"), 1000);
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
      .get(`customer/get-detail-customer?id_customer=${idMpFix}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setDataCustomer(data.data);
          // setOrderDataTable(data.detail);
          // setOrder(data);
          // setTimeout(() => {
          //   formik.setFieldValue("service", data.service);
          //   formik.setFieldValue("order_date", data.order_date);
          //   formik.setFieldValue("pickupDate", data.pickup_date);
          // }, 1000);
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
              <Button type="submit">Update customer</Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Customer Code</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="kode_customer"
                    value={formik.values.kode_customer}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.kode_customer}
                    disabled
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>nama_perusahaan</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nama_perusahaan"
                    value={formik.values.nama_perusahaan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nama_perusahaan}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>jenis_barang</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_barang"
                    value={formik.values.jenis_barang}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_barang}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>tgl_berdiri</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tgl_berdiri"
                    value={formik.values.tgl_berdiri}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tgl_berdiri}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>tahun_berdiri</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tahun_berdiri"
                    value={formik.values.tahun_berdiri}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tahun_berdiri}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>npwp</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp"
                    value={formik.values.npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>alamat_npwp</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="alamat_npwp"
                    value={formik.values.alamat_npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat_npwp}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>alamat_kantor</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="alamat_kantor"
                    value={formik.values.alamat_kantor}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat_kantor}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>telepon</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="telepon"
                    value={formik.values.telepon}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.telepon}
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
                <Form.Label>mata_uang </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="mata_uang"
                    value={formik.values.mata_uang}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.mata_uang}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label>jenis_pembayaran</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_pembayaran"
                    value={formik.values.jenis_pembayaran}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_pembayaran}
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
