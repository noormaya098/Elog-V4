import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification } from "antd";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { httpClient } from "../../../Api/Api";
import { InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useMitraStore from "../../../zustand/Store/MitraStore";

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
  const [jenisDiskon, setJenisDiskon] = useState("");
  const [dataCustomer, setDataCustomer] = useState("");
  const {NamaMitra, fetchMitra} = useMitraStore((item)=>({
    NamaMitra : item.NamaMitra,
    fetchMitra: item.fetchMitra
  }))
  const optionMitra = NamaMitra && NamaMitra.map((item) => ({
    label : item.NamaMitra,
    value : item.mitraId
  }))
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
      value: "expres",
      label: "Expres",
    },
    {
      Value: "reguler",
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
    enableReinitialize: true,
    initialValues: {
      id_muat_kota: dataCustomer?.id_muat_kota || "",
      id_price_mitra: dataCustomer?.id_price_mitra || "",
      id_tujuan_kota: dataCustomer?.id_tujuan_kota || "",
      id_kendaraan_jenis: dataCustomer?.id_kendaraan_jenis || "",
      service_type: dataCustomer?.service_type || "",
      jenis_kiriman: dataCustomer?.jenis_kiriman || "",
      id_mitra: dataCustomer?.id_mitra || "",
      tarif: dataCustomer?.tarif || "",
      ritase: dataCustomer?.ritase || "",
      uang_jalan: dataCustomer?.uang_jalan || "",
    },
    validationSchema: Yup.object({
      id_customer: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("tarif/update-tarifMitra",
        {
          ...values,
          service_type: jenisLayanan.label,
        })
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
    const fetchData = async () => {
      try {
        const url = window.location.href;
        const idMpFix = url.substring(url.lastIndexOf("/") + 1);

        const {
          data: { status, order },
        } = await httpClient.get(
          `tarif/get-detail-tarifMitra?id_price=${idMpFix}`
        );

        if (status.code !== 200) {
          return;
        }
        console.log(order, "ini");
        setDataCustomer(order);
        setKota("ini", order.id_muat_kota);

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

        if (order.id_user) {
          const selectedOptiona = customerOptions.find(
            (option) => option.value === order.id_user
          );
          setCustomer(selectedOptiona);
        }

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
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchVehicleTypes = async () => {
      try {
        const {
          data: { status, data },
        } = await httpClient.get("vehicle/get-type?keyword=");
        if (status.code === 200) {
          setJenisKendaraanOptions(
            data.order.map((x) => ({
              label: x.type,
              value: x.id,
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchKotaOptions = async () => {
      try {
        const {
          data: { status, data },
        } = await httpClient.get("wilayah/get-kota");
        if (status.code === 200) {
          setKotaOptions(
            data.order.map((x) => ({
              label: x.kotaName,
              value: x.idKota,
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
    fetchVehicleTypes();
    fetchKotaOptions();
    fetchMitra()
  }, []);
  // kotaOptions

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
    }
  };

  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <h3> Detail & Edit Tarif Mitra</h3>
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={10} className="d-flex justify-content-end">
              <Button type="submit">Simpan Tarif</Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Nama Mitra</Form.Label>
                <InputGroup>
                  <Select
                    options={optionMitra}
                    value={customer}
                    isSearchable
                    placeholder="Select Customer"
                    name="id_mitra"
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
                <Form.Label>Jenis Kendaraan</Form.Label>
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
                <Form.Label>Jenis Service</Form.Label>
                <InputGroup>
                  <Select
                    options={optjenisLayanan}
                    name="service_type"
                    value={jenisLayanan}
                    onChange={(e) => {setJenisLayanan(e)
                    console.log(`ini jenis`,e);
                    }}
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
                    isInvalid={!!formik.handleChange}
                    styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <hr />
          <h4>
            Biaya Penanganan
          </h4>
          <Row style={{ marginBottom: "10px",marginTop: "20px" }}>
            <Col span={8}>
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
            </Col>
            <Col span={8}>
            <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Ritase</Form.Label>
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
            <Col span={8}>
              <Form.Group>
                <Form.Label>Uang Jalan</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="uang_jalan"
                    value={formik.values.uang_jalan}
                    onChange={formik.handleChange}
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
