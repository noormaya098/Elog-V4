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
  const [detailSp, setDetailSp] = useState([]);
  const [provinsi, setProvinsi] = useState("");
  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kota, setKota] = useState("");
  const [kotaOptions, setKotaOptions] = useState([]);
  const [wilayah, setWilayah] = useState("");
  const [wilayahOptions, setWilayahOptions] = useState([]);
  const [dataCustomer, setDataCustomer] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id_employee: dataCustomer?.id_employee || "17",
      code_employee: dataCustomer?.code_employee || "P2090",
      fullname: dataCustomer?.fullname || "hans barre",
      job_level: dataCustomer?.job_level || "21",
      designation: dataCustomer?.designation || "status",
      code_employee_position: dataCustomer?.code_employee_position || "M1001",
      id_bu: dataCustomer?.id_bu || 12,
      id_bu_brench: dataCustomer?.id_bu_brench || 1106,
      id_gl: dataCustomer?.id_gl || "G1009",
      id_asm: dataCustomer?.id_asm || "A1002",
      id_mgr: dataCustomer?.id_mgr || "M1001",
      id_kacab: dataCustomer?.id_kacab || "K1001",
      id_amd: dataCustomer?.id_amd || "D1001",
      no_telp: dataCustomer?.no_telp || "",
      email: dataCustomer?.email || "",
      photo: dataCustomer?.photo || "",
    },
    validationSchema: Yup.object({
      id_employee: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("bu/edit-bu-employee", values)
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/buemploye"), 1000);
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
      .get(`bu/get-bu-employee-detail?id_employee=${idMpFix}`)
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
              <h2>Update BU Employee</h2>
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Button type="submit">Update BU Employee</Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>KODE EMPLOYE</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="biaya_jalan"
                    value={formik.values.biaya_jalan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.biaya_jalan}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>EMPLOYE POSITION</Form.Label>
                <InputGroup>
                  <Select
                    name="diskon_type"
                    value={formik.values.diskon_type}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.diskon_type}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>FULL NAME</Form.Label>
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
                <Form.Label>JOB LEVEL</Form.Label>
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
                <Form.Label>DESIGNATION</Form.Label>
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
                <Form.Label>CODE EMPLOYE POSITION</Form.Label>
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
              {/* <Form.Group>
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
              </Form.Group> */}
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default SamplePage;
