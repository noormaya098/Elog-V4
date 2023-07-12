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
  const [customerOptions, setCustomerOptions] = useState([]);
  const [jenisKendaraanOptions, setJenisKendaraanOptions] = useState([]);
  const [dataCustomer, setDataCustomer] = useState(null);
  const [jenisLayanan, setJenisLayanan] = useState("");
  const [jenisKiriman, setJenisKiriman] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id_price: 
      dataCustomer && dataCustomer.id_price
      ? dataCustomer.id_price
      : "",
      id_muat_kota:
        dataCustomer && dataCustomer.id_muat_kota
          ? dataCustomer.id_muat_kota
          : "",
      id_tujuan_kota:
        dataCustomer && dataCustomer.id_tujuan_kota
          ? dataCustomer.id_tujuan_kota
          : "3211",
      id_kendaraan_jenis:
        dataCustomer && dataCustomer.id_kendaraan_jenis
          ? dataCustomer.id_kendaraan_jenis
          : "15",
      service_type:
        dataCustomer && dataCustomer.service_type
          ? dataCustomer.service_type
          : "",
      jenis_kiriman:
        dataCustomer && dataCustomer.jenis_kiriman
          ? dataCustomer.jenis_kiriman
          : "",
      tarif: dataCustomer && dataCustomer.tarif ? dataCustomer.tarif : "0",
      ritase: dataCustomer && dataCustomer.ritase ? dataCustomer.ritase : "0",
      uang_jalan:
        dataCustomer && dataCustomer.uang_jalan ? dataCustomer.uang_jalan : "0",
    },
    validationSchema: Yup.object({
      id_muat_kota: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("tarif/edit-tarifEureka", values)
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

  const optjenisKiriman = [
    {
      value: "1",
      label: "Retail",
    },
    {
      Value: "2",
      label: "Charter",
    },
  ];

  const optjenisLayanan = [
    {
      value: "1",
      label: "Expres",
    },
    {
      value: "2",
      label: "Reguler",
    },
  ];

  useEffect(() => {
    const url = window.location.href;
    const idMpFix = url.substring(url.lastIndexOf("/") + 1);

    const fetchData = async () => {
      try {
        const { data: tarifData } = await httpClient.get(
          `tarif/get-detail-tarifEureka?id_price=${idMpFix}`
        );
        if (tarifData.status.code === 200) {
          const { data } = tarifData;
          const order = data;
          console.log(order);
          setDataCustomer(order);

          const fetchOptions = async () => {
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
          };

          const setInitialOptions = () => {
            const selectedOption = kotaOptions.find(
              (option) => option.value === order.id_muat_kota
            );
            setKota(selectedOption);

            const selectedOptions = kotaOptions.find(
              (option) => option.value === order.id_tujuan_kota
            );
            setKotaTujuan(selectedOptions);

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
          };

          if (kotaOptions.length === 0) {
            fetchOptions().then(() => {
              setInitialOptions();
            });
          } else {
            setInitialOptions();
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [kotaOptions]);

  // useEffect(() => {
  //   const url = window.location.href;
  //   const idMpFix = url.substring(url.lastIndexOf("/") + 1);

  //   const fetchData = async () => {
  //     try {
  //       const { data: tarifData } = await httpClient.get(
  //         `tarif/get-detail-tarifEureka?id_price=${idMpFix}`
  //       );
  //       if (tarifData.status.code === 200) {
  //         const { data } = tarifData;
  //         const order = data;
  //         console.log(order);
  //         setDataCustomer(order);

  //         setTimeout(() => {
  //           const selectedOption = kotaOptions.find(
  //             (option) => option.value === order.id_muat_kota
  //           );
  //           setKota(selectedOption);

  //           const selectedOptions = kotaOptions.find(
  //             (option) => option.value === order.id_tujuan_kota
  //           );
  //           setKotaTujuan(selectedOptions);
  //         }, 1000);

  //         const selectedOptiond = jenisKendaraanOptions.find(
  //           (option) => option.value === order.id_kendaraan_jenis
  //         );
  //         setJenisKendaraan(selectedOptiond);

  //         const selectedOptiong = optjenisLayanan.find(
  //           (option) => option.value === order.service_type
  //         );
  //         setJenisLayanan(selectedOptiong);

  //         const selectedOptionu = optjenisKiriman.find(
  //           (option) => option.value === order.jenis_kiriman
  //         );
  //         setJenisKiriman(selectedOptionu);
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }

  //     try {
  //       const { data: kotaData } = await httpClient.get(
  //         "wilayah/get-kota?limit=10&page=1&keyword="
  //       );
  //       if (kotaData.status.code === 200) {
  //         setKotaOptions(
  //           kotaData.data.order.map((x) => ({
  //             label: x.kotaName,
  //             value: x.idKota,
  //           }))
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }

  //     try {
  //       const { data: jenisKendaraanData } = await httpClient.get(
  //         "vehicle/get-type?keyword="
  //       );
  //       if (jenisKendaraanData.status.code === 200) {
  //         setJenisKendaraanOptions(
  //           jenisKendaraanData.data.order.map((x) => ({
  //             label: x.type,
  //             value: x.id,
  //           }))
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }

  //     try {
  //       const { data: customerData } = await httpClient.get(
  //         "customer/get-customer?limit=10&page=1&keyword="
  //       );
  //       if (customerData.status.code === 200) {
  //         setCustomerOptions(
  //           customerData.data.order.map((x) => ({
  //             label: x.custName,
  //             value: x.custId,
  //           }))
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
    } else if (e.name === "jenis_kiriman") {
      console.log(value.value);
      formik.setFieldValue("jenis_kiriman", value.value);
      setJenisKiriman(value);
    } else if (e.name === "kecamatan") {
      formik.setFieldValue("id_kecamatan", value.value);
      setWilayah(value);
    } else if (e.name === "id_tujuan_kota") {
      setKotaTujuan(value);
      formik.setFieldValue("id_tujuan_kota", value.value);
    } else if (e.name === "id_muat_kota") {
      formik.setFieldValue("id_muat_kota", value.value);
      setKota(value);
    } else if (e.name === "id_kendaraan_jenis") {
      formik.setFieldValue("id_kendaraan_jenis", value.value);
      setJenisKendaraan(value);
    } else if (e.name === "service_type") {
      formik.setFieldValue("service_type", value.value);
      setJenisLayanan(value);
    }
  };

  
  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <h2>Update Tarif Eureka </h2>
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Button onClick={formik.handleSubmit} type="submit">Update Tarif Eureka</Button>
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
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Layanan</Form.Label>
                <InputGroup>
                  <Select
                    options={optjenisLayanan}
                    value={jenisLayanan}
                    name="service_type"
                    onChange={onSelectChange}
                    styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Kiriman</Form.Label>
                <InputGroup>
                  <Select
                    options={optjenisKiriman}
                    value={jenisKiriman}
                    isSearchable
                    placeholder="Select Jenis Kiriman"
                    name="jenis_kiriman"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
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
            </Col>

            <Col span={7}>
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
              <Form.Group style={{ marginBottom: "10px" }}>
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
