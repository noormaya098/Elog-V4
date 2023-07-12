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
  const [jenisLayanan, setJenisLayanan] = useState("");
  const [jenisKiriman, setJenisKiriman] = useState("");
  const [jenisDiskon, setJenisDiskon] = useState("");
  const [via, setVia] = useState("");
  const [viaOptions, setViaOptions] = useState([]);
  const [jenisKendaraanOptions, setJenisKendaraanOptions] = useState([]);
  const [customer, setCustomer] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [diskon, setDiskon] = useState([]);
  const [diskonType, setDiskonType] = useState([]);
  const [biayaJalan, setBiayaJalan] = useState([]);
  const [biayaMuat, setBiayaMuat] = useState([]);
  const [biayaBongkar, setBiayaBongkar] = useState([]);
  const [biayaOvertonase, setBiayaTonase] = useState([]);
  const [biayaMultimuat, setBiayaMultimuat] = useState([]);
  const [biayaMultidrop, setBiayaMultidrop] = useState([]);
  const [biayaTambahan, setBiayaTambahan] = useState([]);
  const [biayaMel, setBiayaMel] = useState([]);
  const [biayaLain, setBiayaLain] = useState([]);
  const [Tarif, setTarif] = useState("");
  const [Ritase, setRitase] = useState("");
  const [UangJalan, setUangJalan] = useState("");
  const [serviceType, setServiceType] = useState("");
  const serviceTypeOptions = [
    {
      value: "Retail",
      label: "Retail",
    },
    {
      value: "Charter",
      label: "Charter",
    },
  ];
  const optjenisKiriman = [
    {
      value: "1",
      label: "Expres",
    },
    {
      Value: "2",
      label: "Reguler",
    },
  ];
  const optjenisDiskon = [
    {
      value: "1",
      label: "Amount",
    },
    {
      Value: "2",
      label: "Persen",
    },
  ];

  const formik = useFormik({
    initialValues: {
      id_muat_kota: kota?.value,
      id_tujuan_kota: kotaTujuan?.value,
      id_customer: customer?.value,
      id_kendaraan_jenis: jenisKendaraan?.value,
      service_type: jenisLayanan?.label,
      jenis_kiriman: jenisKiriman,
      diskon: diskon,
      diskon_type: diskonType,
      biaya_jalan: biayaJalan,
      biaya_muat: biayaMuat,
      biaya_bongkar: biayaBongkar,
      biaya_overtonase: biayaOvertonase,
      biaya_multimuat: biayaMultimuat,
      biaya_multidrop: biayaMultidrop,
      biaya_tambahan: biayaTambahan,
      biaya_mel: biayaMel,
      biaya_lain: biayaLain,
      via: via?.label,
      // tarif: Tarif,
      // ritase: Ritase,
      // uang_jalan: UangJalan,
    },
    validationSchema: Yup.object({
      id_customer: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("tarif/create-tarifCustomer", {
          ...values,
          // service_type: jenisLayanan,
          jenis_kiriman: jenisKiriman.label,
          // tarif: Tarif,
          // ritase: Ritase,
          // uang_jalan: UangJalan,
          service_type: serviceType?.value,
        })
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
      .get("customer/get-customer")
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

  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <h4>Buat Tarif Customer Baru</h4>
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Button onClick={formik.handleSubmit} type="submit">
                Simpan Tarif
              </Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>

            <Col span={6}>
              
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
            <Col span={6}>
              
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
                <Form.Label>Jenis Layanan</Form.Label>
                <InputGroup>
                  {/* <Select
                    options={optjenisLayanan}
                    name="service_type"
                    value={jenisLayanan}
                    onChange={(e) => setJenisLayanan(e.label)}
                    isInvalid={!!formik.errors.service_type}
                    styles={customStylesReactSelect}
                  /> */}

                  <Select
                    options={serviceTypeOptions}
                    value={serviceType}
                    isSearchable
                    placeholder="Select Service Type"
                    name="service_type"
                    styles={customStylesReactSelect}
                    onChange={(value) => setServiceType(value)}
                  />
                </InputGroup>
              </Form.Group>
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
            <Col span={6}>

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
              <Col span={6}>
                
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
                  <Form.Label>Tarif Katalog</Form.Label>
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
                  <Form.Label>Tarif Customer</Form.Label>
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
          <Row style={{ marginBottom: "10px", borderTop:'solid', borderColor:'#000' }}>
            <><hr/></> 
            
            <Col span={8} className="mt-2">
              <h5>Biaya Tambahan</h5>
            </Col>
          </Row>


          <Row style={{ marginBottom: "10px",   borderColor:'#000' }}>
            
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
