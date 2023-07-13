import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification } from "antd";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { httpClient } from "../../../Api/Api";
import { InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const { RangePicker } = DatePicker;

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
  const [kotaTujuan, setKotaTujuan] = useState("");
  const [kotaOptions, setKotaOptions] = useState([]);
  const [wilayah, setWilayah] = useState("");
  const [wilayahOptions, setWilayahOptions] = useState([]);
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [jenisKendaraanOptions, setJenisKendaraanOptions] = useState([]);
  const [customer, setCustomer] = useState("");
  const [dataCustomer, setDataCustomer] = useState(null);
  const [jenisLayanan, setJenisLayanan] = useState("");
  const [jenisKiriman, setJenisKiriman] = useState("");
  const [jenisDiskon, setJenisDiskon] = useState("");
  const optjenisDiskon = [
    {
      value: "Amount",
      label: "Amount",
    },
    {
      Value: "Persen",
      label: "Persen",
    },
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id_price: dataCustomer?.id_price || "",
      id_muat_kota: dataCustomer?.id_muat_kota || "",
      id_tujuan_kota: dataCustomer?.id_tujuan_kota || "",
      id_customer: dataCustomer?.id_customer || "",
      id_kendaraan_jenis: dataCustomer?.id_kendaraan_jenis || "15",
      service_type: dataCustomer?.service_type || "",
      jenis_kiriman: dataCustomer?.jenis_kiriman || "",
      diskon: dataCustomer?.diskon || "",
      diskon_type: dataCustomer?.diskon_type || "",
      biaya_jalan: dataCustomer?.biaya_jalan || "",
      biaya_muat: dataCustomer?.biaya_muat || "0",
      biaya_bongkar: dataCustomer?.biaya_bongkar || "0",
      biaya_overtonase: dataCustomer?.biaya_overtonase || "0",
      biaya_multimuat: dataCustomer?.biaya_multimuat || "0",
      biaya_multidrop: dataCustomer?.biaya_multidrop || "0",
      biaya_tambahan: dataCustomer?.biaya_tambahan || "0",
      biaya_lain: dataCustomer?.biaya_lain || "0",
    },
    validationSchema: Yup.object({
      id_customer: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("tarif/edit-tarifCustomer", values)
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/pelanggantarif"), 1000);
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

  const optjenisLayanan = [
    {
      value: "charter",
      label: "retail",
    },
    {
      value: "charter",
      label: "retail",
    },
  ];

  useEffect(() => {
    const url = window.location.href;
    const idMpFix = url.substring(url.lastIndexOf("/") + 1);

    const fetchData = async () => {
      try {
        const { data: tarifData } = await httpClient.get(
          `tarif/get-detail-tarifCustomer?id_price=${idMpFix}`
        );
        if (tarifData.status.code === 200) {
          const { order } = tarifData;
          setDataCustomer(order);

          setTimeout(() => {
            const selectedOption = kotaOptions.find(
              (option) => option.value === order.id_muat_kota
            );
            setKota(selectedOption);

            const selectedOptions = kotaOptions.find(
              (option) => option.value === order.id_tujuan_kota
            );
            setKotaTujuan(selectedOptions);
          }, 1000);

          const selectedOptiond = jenisKendaraanOptions.find(
            (option) => option.value === order.id_kendaraan_jenis
          );
          setJenisKendaraan(selectedOptiond);

          const selectedOptiong = optjenisLayanan.find(
            (option) => option.value === order.service_type
          );
          setJenisLayanan(selectedOptiong);

          const selectedOptionu = optjenisKiriman.find(
            (option) => option.value === order.jenis_kiriman
          );
          setJenisKiriman(selectedOptionu);
        }
      } catch (error) {
        console.log(error.message);
      }

      try {
        const { data: kotaData } = await httpClient.get(
          "wilayah/get-kota?limit=10&page=1&keyword="
        );
        if (kotaData.status.code === 200) {
          setKotaOptions(
            kotaData.data.order.map((x) => ({
              label: x.kotaName,
              value: x.idKota,
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }

      try {
        const { data: jenisKendaraanData } = await httpClient.get(
          "vehicle/get-type?keyword="
        );
        if (jenisKendaraanData.status.code === 200) {
          setJenisKendaraanOptions(
            jenisKendaraanData.data.order.map((x) => ({
              label: x.type,
              value: x.id,
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }

      try {
        const { data: customerData } = await httpClient.get(
          "customer/get-customer?limit=10&page=1&keyword="
        );
        if (customerData.status.code === 200) {
          setCustomerOptions(
            customerData.data.order.map((x) => ({
              label: x.custName,
              value: x.custId,
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const optjenisKiriman = [
    {
      value: "Expres",
      label: "Expres",
    },
    {
      Value: "Reguler",
      label: "Reguler",
    },
  ];

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
              <h3>Update Tarif Customer </h3>
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={10} className="d-flex justify-content-end">
              <Button type="submit">Update Tarif Pelanggan</Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Customer</Form.Label>
                <InputGroup>
                  <Select
                    options={customerOptions}
                    value={customer}
                    isSearchable
                    placeholder="Select Customer"
                    name="id_customer"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
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
            </Col>
            <Col span={8}>
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
            </Col>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis kendaraan </Form.Label>
                <InputGroup>
                  <Select
                    options={jenisKendaraanOptions}
                    value={jenisKendaraan}
                    isSearchable
                    placeholder="Select Jenis Kendaraan"
                    name="id_kendaraan_jenis"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Layanan</Form.Label>
                <InputGroup>
                  <Select
                    options={optjenisLayanan}
                    name="jenis_layanan"
                    value={jenisLayanan}
                    onChange={(e) => setJenisLayanan(e)}
                    isInvalid={!!formik.errors.service_type}
                    styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Kiriman</Form.Label>
                <InputGroup>
                  <Select
                    options={optjenisKiriman}
                    name="jenis_kiriman"
                    value={jenisKiriman}
                    onChange={(e) => setJenisKiriman(e)}
                    isInvalid={!!formik.errors.jenis_kiriman}
                    styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Diskon</Form.Label>
                <InputGroup>
                  <Select
                    options={optjenisDiskon}
                    name="jenis_diskon"
                    value={jenisDiskon}
                    onChange={(e) => setJenisDiskon(e)}
                    isInvalid={!!formik.errors.service_type}
                    styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Diskon</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="diskon"
                    value={formik.values.diskon}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.diskon}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
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
          <br />
          <hr />
          <h4>
            Biaya Tambahan
          </h4>
          <Row style={{ marginBottom: "10px", width: "80%" }}>
            <Col span={6}>
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
            <Col span={6}>
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
            <Col span={6}>
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
            <Col span={6}>
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
          </Row>
          <Row style={{ marginBottom: "10px", width: "80%" }}>
           
           
           
            <Col span={6}>
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
            <Col span={6}>
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
            <Col span={6}>
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
