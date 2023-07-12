import React, { useEffect, useState } from "react";
import {
  Card,
  DatePicker,
  Input,
  Row,
  Col,
  notification,
  Modal,
  Button,
} from "antd";
import { useHistory } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { httpClient } from "../../../Api/Api";
import { InputGroup, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const { confirm } = Modal;

const { RangePicker } = DatePicker;

const { Search } = Input;

const onSearch = (value) => console.log(value);

const SamplePage = () => {
  const router = useHistory();

  const url = window.location.href;
  const idMpFix = url.substring(url.lastIndexOf("/") + 1);

  const [data, setData] = useState([]);
  const [jenisBrngPerusahaan, setJenisBrngPerusahaan] = useState("");
  const [orderDataTable, setOrderDataTable] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [detailSp, setDetailSp] = useState([]);
  const [TarifMitraaDetail, setTarifMitraaDetail] = useState(null);

  const formik = useFormik({
    initialValues: {
      id_price_mitra: "",
      id_muat_kota: "",
      id_tujuan_kota: "",
      id_mitra: "",
      id_kendaraan_jenis: "",
      service_type: "",
      via: "",
      jenis_kiriman: "",
      tarif: "",
      status: "",
      date_created: "",
      id_user: "",
    },
    validationSchema: Yup.object({
      nama_perusahaan: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("tarif/update-tarifMitra", values)
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/tarifmitra"), 1000);
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
    httpClient
      .get(`tarif/get-detail-tarifMitra?id_price=${idMpFix}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setTarifMitraaDetail(data.data);
          console.log('ini', data.order);
          setOrder(data);
          setTimeout(() => {
            formik.setFieldValue("id_price_mitra", data.order.id_price_mitra);
            formik.setFieldValue("id_muat_kota", data.order.id_muat_kota);
            formik.setFieldValue("id_tujuan_kota", data.order.id_tujuan_kota);
            formik.setFieldValue("id_mitra", data.order.id_mitra);
            formik.setFieldValue("id_kendaraan_jenis", data.order.id_kendaraan_jenis);
            formik.setFieldValue("service_type", data.order.service_type);
            formik.setFieldValue("via", data.order.via);
            formik.setFieldValue("jenis_kiriman", data.order.jenis_kiriman);
            formik.setFieldValue("tarif", data.order.tarif);
            formik.setFieldValue("status", data.order.status);
            formik.setFieldValue("date_created", data.order.date_created);
            formik.setFieldValue("id_user", data.order.id_user);

            setDetailSp(data.detail_sp);
          }, 1000);
        }
      })
      .catch(function (error) {
        notification.error({
          message: "Error",
          description: error.message,
        });
        console.log(error.message);
      });

    // httpClient
    //   .get(`customer/get-customer-address?id_customer=${idMpFix}`)
    //   .then(({ data }) => {
    //     if (data.status.code === 200) {
    //       setData(data.data);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  }, []);

//   const handleDelete = (custId) => {
//     confirm({
//       title: "Are you sure you want to delete this customer?",
//       icon: <ExclamationCircleOutlined />,
//       content: "This action cannot be undone.",
//       onOk() {
//         const datas = {
//           id_customer: custId,
//         };
//         httpClient
//           .post(`customer/del-customer`, datas)
//           .then(({ data }) => {
//             if (data.status.code === 200) {
//               router.push("/masteralamat");
//             }
//           })
//           .catch(function (error) {
//             console.log(error.message);
//           });
//       },
//       onCancel() {},
//     });
//   };

  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}></Col>
            <Col span={6}></Col>
            <Col span={10} className="d-flex justify-content-end">
              {/* <Button
                style={{ color: "white" }}
                onClick={() => handleDelete(idMpFix)}
                type="danger"
              >
                Delete
              </Button> */}
              <Button onClick={formik.handleSubmit} type="primary">
                Save and load photo customer
              </Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>ID Price Mitra</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="id_price_mitra"
                    value={formik.values.id_price_mitra}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.id_price_mitra}
                    disabled
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> ID Muat Kota</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="id_muat_kota"
                    value={formik.values.id_muat_kota}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.id_muat_kota}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>ID Tujuan Kota</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="id_tujuan_kota"
                    value={formik.values.id_tujuan_kota}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.id_tujuan_kota}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Status</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="status"
                    value={formik.values.status === "Y" ? "Aktif" : "Tidak Aktif"}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.status}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>ID Mitra</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="id_mitra"
                    value={formik.values.id_mitra}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.id_mitra}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>ID Kendaraan Jenis</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="id_kendaraan_jenis"
                    value={formik.values.id_kendaraan_jenis}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.id_kendaraan_jenis}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  Service Type
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="service_type"
                    value={formik.values.service_type}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.service_type}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  Date Created
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="date_created"
                    value={formik.values.date_created}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.date_created}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Via</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="via"
                    value={formik.values.via}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.via}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Kiriman</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_kiriman"
                    value={formik.values.jenis_kiriman}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_kiriman}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Tarif</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tarif"
                    value={formik.values.tarif}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tarif}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>ID User</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="id_user"
                    value={formik.values.id_user}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.id_user}
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
