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
      id_user: "",
      id_customer: "",
      task_type: "",
      prospect: "",
      memo: "",
      datetask: "",
      nama_perusahaan: "",
      hp: "",
      tahun_berdiri: "",
      alamat_npwp: "",
      email: "",
      jenis_pembayaran: "",
      bankname: "",
      accountname: "",
      accountnumber: "",
      mata_uang: "",
      npwp: ""
    },
    validationSchema: Yup.object({
      id_customer: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("marketing/create-task-planing", values)
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/marketingschedule"), 1000);
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
  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Button type="submit">Save and load photo customer</Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>User</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="id_user"
                    value={formik.values.id_user}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.id_user}
                    disabled
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Customer</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="id_customer"
                    value={formik.values.id_customer}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.id_customer}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Task</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="task_type"
                    value={formik.values.task_type}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.task_type}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Prospect</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="prospect"
                    value={formik.values.prospect}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.prospect}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Memo</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="memo"
                    value={formik.values.memo}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.memo}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Tanggal Task</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="datetask"
                    value={formik.values.datetask}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.datetask}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Nama Perusahaan</Form.Label>
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
                <Form.Label>Mobile Number</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="hp"
                    value={formik.values.hp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.hp}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Thn Berdiri</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tahun_berdiri"
                    value={formik.values.tahun_berdiri}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tahun_berdiri}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Form.Group>
                <Form.Label>Alamat </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="alamat_npwp"
                    value={formik.values.alamat_npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat_npwp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={12}>
              <Form.Group>
                <Form.Label>Email </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.email}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label>Jenis Pembayaran</Form.Label>
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
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group>
                <Form.Label>Nama Bank</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="bankname"
                    value={formik.values.bankname}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bankname}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label>Nama Akun</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="accountname"
                    value={formik.values.accountname}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.accountname}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label>Nomor Akun</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="accountnumber"
                    value={formik.values.accountnumber}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.accountnumber}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group>
                <Form.Label>Mata Uang </Form.Label>
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
            <Col span={8}>
              <Form.Group>
                <Form.Label>NPWP </Form.Label>
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
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Button type="submit">Save and load photo customer</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default SamplePage;
