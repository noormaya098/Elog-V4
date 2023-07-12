import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification } from "antd";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { httpClient } from "../../util/Api";
import { InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const { RangePicker } = DatePicker;

const onSearch = (value) => console.log(value);

const SamplePage = () => {
  const router = useHistory();

  const [data, setData] = useState([]);
  const [orderDataTable, setOrderDataTable] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [provinsi, setProvinsi] = useState("");
  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kota, setKota] = useState("");
  const [kotaTujuan, setKotaTujuan] = useState("");
  const [kotaOptions, setKotaOptions] = useState([]);
  const [wilayah, setWilayah] = useState("");
  const [wilayahOptions, setWilayahOptions] = useState([]);
  const [dataCustomer, setDataCustomer] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id_bu_brench: dataCustomer?.id_bu_brench || "12",
      code_bu_brench: dataCustomer?.code_bu_brench || "sss",
      id_bu: dataCustomer?.id_bu || "21",
      alamat: dataCustomer?.alamat || "21",
      no_telp: dataCustomer?.no_telp || "21",
      status: dataCustomer?.status || "21",
    },
    validationSchema: Yup.object({
      id_bu_brench: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("bu/edit-bu-brench", values)
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/bubrench"), 1000);
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
      .get(`bu/get-bu-brench-detail?id_bu_brench=${idMpFix}`)
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
  }, []);

  const customStylesReactSelect = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      width: "100%",
      minWidth: "100%",
    }),
  };

  const onSelectChange = (value, e) => {
    if (e.name === "provinsi") {
      formik.setFieldValue("id_provinsi", value.value);
      setProvinsi(value);
      httpClient
        .get(`wilayah/get-kota?provinsi=${value.value}`)
        .then(({ data }) => {
          if (data.status.code === 200) {
            setKotaOptions(
              data.data.order.map((x) => ({
                label: x.kotaName,
                value: x.idKota,
              }))
            );
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else if (e.name === "kota") {
      formik.setFieldValue("id_kota", value.value);
      setKota(value);
      httpClient
        .get(
          `wilayah/get-kecamatan?limit=10&page=1&keyword=&provinsi=${provinsi?.value}&idkota=${value.value}`
        )
        .then(({ data }) => {
          if (data.status.code === 200) {
            setWilayahOptions(
              data.data.order.map((x) => ({
                label: x.kecamatanName,
                value: x.idKecamatan,
              }))
            );
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else if (e.name === "kecamatan") {
      formik.setFieldValue("id_kecamatan", value.value);
      setWilayah(value);
    }
  };

  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <h2>Update BU Brench</h2>
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Button type="submit">Update BU Brench</Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Kota Muat</Form.Label>
                <InputGroup>
                  <Select
                    options={kotaOptions}
                    value={kota}
                    isSearchable
                    placeholder="Select Kota Muat"
                    name="id_muat_kota"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Kota Tujuan</Form.Label>
                <InputGroup>
                  <Select
                    options={kotaOptions}
                    value={kotaTujuan}
                    isSearchable
                    placeholder="Select Kota Tujuan"
                    name="id_tujuan_kota"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Customer</Form.Label>
                <InputGroup>
                  <Select
                    name="id_customer"
                    value={formik.values.id_customer}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.id_customer}
                  >
                    {/* Add options here */}
                  </Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis kendaraan </Form.Label>
                <InputGroup>
                  <Select
                    name="id_kendaraan_jenis"
                    value={formik.values.id_kendaraan_jenis}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.id_kendaraan_jenis}
                  >
                    {/* Add options here */}
                  </Select>
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Layanan</Form.Label>
                <InputGroup>
                  <Select
                    name="service_type"
                    value={formik.values.service_type}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.service_type}
                  >
                    {/* Add options here */}
                  </Select>
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Kiriman</Form.Label>
                <InputGroup>
                  <Select
                    name="jenis_kiriman"
                    value={formik.values.jenis_kiriman}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_kiriman}
                  >
                    {/* Add options here */}
                  </Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Diskon</Form.Label>
                <InputGroup>
                  <Select
                    name="diskon"
                    value={formik.values.diskon}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.diskon}
                  >
                    {/* Add options here */}
                  </Select>
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Diskon</Form.Label>
                <InputGroup>
                  <Select
                    name="diskon_type"
                    value={formik.values.diskon_type}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.diskon_type}
                  >
                    {/* Add options here */}
                  </Select>
                </InputGroup>
              </Form.Group>

              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Biaya Jalan</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="biaya_jalan"
                    value={formik.values.biaya_jalan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.biaya_jalan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Form.Group>
                <Form.Label>Biaya Muat</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="biaya_muat"
                    value={formik.values.biaya_muat}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.biaya_muat}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={12}>
              <Form.Group>
                <Form.Label>Biaya Bongkar</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="biaya_bongkar"
                    value={formik.values.biaya_bongkar}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.biaya_bongkar}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label>Biaya Overtonase</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="biaya_overtonase"
                    value={formik.values.biaya_overtonase}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.biaya_overtonase}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label>Biaya Multi Muat</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="biaya_multimuat"
                    value={formik.values.biaya_multimuat}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.biaya_multimuat}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label>Biaya Multi Drop</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="biaya_multidrop"
                    value={formik.values.biaya_multidrop}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.biaya_multidrop}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label>Biaya Tambahan</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="biaya_tambahan"
                    value={formik.values.biaya_tambahan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.biaya_tambahan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label>Biaya Mel</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="biaya_mel"
                    value={formik.values.biaya_mel}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.biaya_mel}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label>Biaya Lain</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="biaya_lain"
                    value={formik.values.biaya_lain}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.biaya_lain}
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
