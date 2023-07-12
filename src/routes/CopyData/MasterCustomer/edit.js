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
  const [jenisPembayaran, setJenisPembayaran] = useState("");
  const [mataUang, setMataUang] = useState("");

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

  const jenisPembayaranOptions = [
    { value: "cash", label: "Cash" },
    { value: "credit", label: "Credit" },
  ];

  const mataUangOptions = [
    { value: "rupiah", label: "Rupiah" },
    { value: "dollar", label: "Dollar US" },
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
    if (e.name === "jenis_pembayaran") {
      formik.setFieldValue("jenis_pembayaran", value.value);
      setJenisPembayaran(value);
    } else if (e.name === "mata_uang") {
      formik.setFieldValue("mata_uang", value.value);
      setMataUang(value);
    }
  };

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
            <Button type="submit">Save and load photo customer</Button>
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
              <Form.Label> Code</Form.Label>
              <InputGroup>
                <Form.Control
                  name="kode"
                  value={formik.values.kode_customer}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.kode_customer}
                  disabled
                />
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label> QR Code</Form.Label>
              <InputGroup>
                <Form.Control
                  name="qrcode"
                  value={formik.values.kode_customer}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.kode_customer}
                  disabled
                />
              </InputGroup>
            </Form.Group>
            {/* <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label>Office Number</Form.Label>
              <InputGroup>
                <Form.Control
                  name="officer_number"
                  value={formik.values.officer_number}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.officer_number}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label>Type Of Business</Form.Label>
              <InputGroup>
                <Form.Control
                  name="typeof"
                  value={formik.values.typeof}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.typeof}
                />
              </InputGroup>
            </Form.Group> */}
          </Col>
          <Col span={9}>
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label>Customer Name</Form.Label>
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
              <Form.Label>Title</Form.Label>
              <InputGroup>
                <Form.Control
                  name="title"
                  value={formik.values.nama_perusahaan}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.nama_perusahaan}
                />
              </InputGroup>
            </Form.Group>
            {/* <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label>Fax</Form.Label>
              <InputGroup>
                <Form.Control
                  name="fax"
                  value={formik.values.fax}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.fax}
                />
              </InputGroup>
            </Form.Group> */}
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label>
                Type Of Goods (Ex :Sepatu/Shoes, Kertas/Paper, etc)
              </Form.Label>
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
          <Col span={7}>
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label>Company Name</Form.Label>
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
            <Form.Group>
              <Form.Label>Jenis </Form.Label>
              <InputGroup>
                <Form.Control
                  name="jenis"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.email}
                />
              </InputGroup>
            </Form.Group>
           
          </Col>
          <Col span={12}>
            <Form.Group>
              <Form.Label>Type Of Payment</Form.Label>
              <InputGroup>
                <Select
                  options={jenisPembayaranOptions}
                  value={jenisPembayaran}
                  isSearchable
                  placeholder="Select Jenis Pembayaran"
                  name="jenis_pembayaran"
                  styles={customStylesReactSelect}
                  onChange={onSelectChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Jenis Usaha </Form.Label>
              <InputGroup>
                <Form.Control
                  name="jenis_usaha"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.email}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: "10px" }}>
          <Col span={8}>
            <Form.Group>
              <Form.Label>Bank Name</Form.Label>
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
              <Form.Label>Account Name</Form.Label>
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
              <Form.Label>Account Number</Form.Label>
              <InputGroup>
                <Form.Control
                  name="accountnumber"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
                />
              </InputGroup>

              <Form.Group>
              <Form.Label>NPWP Nomor</Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp_nomor"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>NPWP RT</Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp_rt"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
                />
              </InputGroup>
            </Form.Group>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: "10px" }}>
          <Col span={8}>
            <Form.Group>
              <Form.Label>Currency </Form.Label>
              <InputGroup>
                <Select
                  options={mataUangOptions}
                  value={mataUang}
                  isSearchable
                  placeholder="Select Mata Uang"
                  name="mata_uang"
                  styles={customStylesReactSelect}
                  onChange={onSelectChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>NPWP Address </Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp_address"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>NPWP Jalan </Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp_jalan"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>NPWP Kelurahan </Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp_kelurahan"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>NPWP Kota </Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp_kota"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>NPWP Kode Pos </Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp_kode_pos"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
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
            <Form.Group>
              <Form.Label>NPWP Name</Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp-name"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>NPWP RW</Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp_rw"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>NPWP Kecamatan</Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp_kecamatan"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>NPWP Provinsi</Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp_provinsi"
                  value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.accountnumber}
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
