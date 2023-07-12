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
  const [kotaTujuan, setKotaTujuan] = useState("");
  const [kotaOptions, setKotaOptions] = useState([]);
  const [wilayah, setWilayah] = useState("");
  const [wilayahOptions, setWilayahOptions] = useState([]);
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [jenisKendaraanOptions, setJenisKendaraanOptions] = useState([]);
  const [customer, setCustomer] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [jenisLayanan, setJenisLayanan] = useState("");
  const [jenisKiriman, setJenisKiriman] = useState("");
  const [via, setVia] = useState("");
  const [IdMitra, setIdMitra] = useState("");
  const [Tarif, setTarif] = useState("");
  const [Ritase, setRitase] = useState("");
  const [UangJalan, setUangJalan] = useState("");
  const [viaOptions, setViaOptions] = useState([]);
  const [jenisDiskon, setJenisDiskon] = useState("");
  const optjenisLayanan = [
    {
      value: 1,
      label: "Retail",
    },
    {
      Value: 2,
      label: "Charter",
    },
  ];
  const optjenisKiriman = [
    {
      value: 1,
      label: "Express",
    },
    {
      Value: 2,
      label: "Reguler",
    },
  ];
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
    initialValues: {
      id_muat_kota: kota?.value,
      id_tujuan_kota: kotaTujuan?.value,
      id_kendaraan_jenis: jenisKendaraan?.value,
      id_mitra: IdMitra?.value,
      service_type: jenisLayanan,
      jenis_kiriman: jenisKiriman,
      via: via?.label,
      tarif: Tarif,
      ritase: Ritase,
      uang_jalan: UangJalan,
    },
    validationSchema: Yup.object({
      id_customer: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post(
          "tarif/create-tarifEureka",
          {
            ...values,
            service_type: jenisLayanan,
            jenis_kiriman: jenisKiriman.label,
            tarif: Tarif,
            ritase: Ritase,
            uang_jalan: UangJalan,
          }
          // values,
          // service_type: jenisLayanan,
          // ,
        )
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/tarif_eureka"), 1000);
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
    // const url = window.location.href;
    // const idMpFix = url.substring(url.lastIndexOf("/") + 1);
    // httpClient
    //   .get(`sp/get-SP-massage?id_mp=${idMpFix}`)
    //   .then(({ data }) => {
    //     if (data.status.code === 200) {
    //       setData(data.data);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
    // // Fetch province options
    httpClient
      .get("wilayah/get-kota")
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
    httpClient
      .get("vehicle/get-type?keyword=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setJenisKendaraanOptions(
            data.data.order.map((x) => ({
              label: x.type,
              value: x.id,
            }))
          );
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });

    httpClient
      .get("customer/get-customer?limit=10&page=1&keyword=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setCustomerOptions(
            data.data.order.map((x) => ({
              label: x.custName,
              value: x.custId,
            }))
          );
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });

    httpClient
      .get("sp/get-SP-select-detail?keyword=&companyId=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setViaOptions(
            data.data.via.map((x) => ({
              label: x.via,
              value: x.id,
            }))
          );
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
    } else if (e.name === "id_kendaraan_jenis") {
      formik.setFieldValue("id_kendaraan_jenis", value.value);
      setJenisKendaraan(value);
    } else if (e.name === "id_customer") {
      formik.setFieldValue("id_customer", value.value);
      setCustomer(value);
    } else if (e.name === "id_muat_kota") {
      formik.setFieldValue("id_muat_kota", value.value);
      setKota(value);
    } else if (e.name === "id_tujuan_kota") {
      setKotaTujuan(value);
      formik.setFieldValue("id_tujuan_kota", value.value);
    } else if (e.name === "via") {
      setVia(value);
      formik.setFieldValue("via", value.label);
    } else if (e.name === "id_mitra") {
      setIdMitra(value);
      formik.setFieldValue("id_mitra", value.value);
    } else if (e.name === "tarif") {
      // setIdMitra(value);
      formik.setFieldValue("tarif", value);
    } else if (e.name === "jenis_kiriman") {
      // setIdMitra(value);
      formik.setFieldValue("jenis_kiriman", value);
    } else if (e.name === "ritase") {
      // setIdMitra(value);
      formik.setFieldValue("ritase", value);
    }
  };

  console.log("ini dia muat kota", jenisLayanan);

  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <h2>Buat Tarif Eureka Baru</h2>
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Button type="submit">Simpan Tarif</Button>
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
                <Form.Label>id Mitra</Form.Label>
                <InputGroup>
                  <Select
                    options={customerOptions}
                    value={IdMitra}
                    isSearchable
                    placeholder="Select Mitra"
                    name="id_mitra"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
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
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Layanan</Form.Label>
                <InputGroup>
                  <Select
                    options={optjenisLayanan}
                    name="service_type"
                    value={jenisLayanan}
                    onChange={(e) => setJenisLayanan(e.label)}
                    isInvalid={!!formik.errors.service_type}
                    styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Via</Form.Label>
                <InputGroup>
                  <Select
                    options={viaOptions}
                    value={via}
                    isSearchable
                    placeholder="Select Via"
                    name="via"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>
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
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Tarif</Form.Label>
                <InputGroup>
                  <Form.Control
                    // name="tarif"
                    type="number"
                    value={Tarif}
                    onChange={(e) => setTarif(e.target.value)}
                    isInvalid={!!formik.errors.tarif}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Ritase</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ritase"
                    type="number"
                    value={Ritase}
                    onChange={(e) => setRitase(e.target.value)}
                    isInvalid={!!formik.errors.ritase}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Uang Jalan</Form.Label>
                <InputGroup>
                  <Form.Control
                    // name="uang_jalan"
                    type="number"
                    value={UangJalan}
                    onChange={(e) => setUangJalan(e.target.value)}
                    isInvalid={!!formik.errors.uang_jalan}
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
