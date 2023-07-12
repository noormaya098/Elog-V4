import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification } from "antd";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { httpClient } from "../../util/Api";
import { InputGroup, Form, Button } from "react-bootstrap";
import Select from "react-select";
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
  const [jenisPembayaran, setJenisPembayaran] = useState("");
  const [mataUang, setMataUang] = useState("");

  const formik = useFormik({
    initialValues: {
      id_mitra: 671,
      kode_mitra: "",
      kode: "",
      qrcode: "",
      title: "",
      nama_mitra: "",
      jenis: "",
      jenis_usaha: "",
      kepemilikan: "",
      jumlah_armada: 600,
      jumlah_sdm_operasional: 538,
      cabang: "",
      jenis_kiriman: "",
      wilayah: "",
      tujuan: "",
      tahun_awal_kontrak: "",
      awal_kontrak: "",
      akhir_kontrak: "",
      kontrak: "2",
      direktur: "",
      tahun_berdiri: "",
      npwp_id: "",
      npwp_name: "",
      npwp_address: "",
      npwp_jalan: "",
      npwp_blok: "-",
      npwp_nomor: "",
      npwp_rt: "",
      npwp_rw: "",
      npwp_kelurahan: "",
      npwp_kecamatan: "",
      npwp_kota: "",
      npwp_provinsi: "",
      npwp_kodepos: 13910,
      is_taxable: true,
      telepon: "",
      contact_person: "",
      telp: "",
      fax: "",
      email: "",
      alamat: "",
      homepage: "",
      pembayaran: "",
      nama_bank: "",
      nama_akun: "",
      no_rek: "",
      currency: "",
      po_legalitas: "",
      ktp_legalitas: "",
      akta_pendirian: "",
      akta_perubahan_dasar: "",
      akta_susunan_direksi: "",
      surat_domisili: "",
      npwp_legalitas: "",
      skt_legalitas: null,
      nppkp_legalitas: "",
      siup_legalitas: "",
      ijin_pendirian: "",
      ppmd_legalitas: "",
      ijin_usaha: "",
      tdp_legalitas: "",
      surat_kuasa: "",
      lama_bekerja: 1,
      jenis_kartu_kredit: "",
      bank_penerbit: "",
      laporan_keuangan: "",
      lama_usaha: 1969,
      status_usah: "",
      omset_bulanan: 0,
      asset_tanah: "",
      asset_bangunan: "",
      asset_kendaraan: "",
      asset_mesin: "",
      affiliasi: "",
      jumlah_unit: 0,
      periode_sewa: 0,
      nilai_sewa: 0,
      nilai_ruu: 0,
      top: 0,
      metode_pembayaran: "",
      qty_motor: 7,
      rp_motor: 0,
      qty_grandmax: 0,
      rp_grandmax: 0,
      qty_l300: 0,
      rp_l300: 0,
      qty_traga: 5,
      rp_traga: 0,
      qty_cde: 5,
      rp_cde: 0,
      qty_cdd: 15,
      rp_cdd: 0,
      qty_fuso: 0,
      rp_fuso: 0,
      qty_wingbox: 154,
      rp_wingbox: 0,
      qty_trailer20: 159,
      rp_trailer20: 0,
      qty_trailer40: 206,
      rp_trailer40: 0,
      status: 1,
      status_pph: 0,
      pph_ap: 1,
      elogs: "Y",
      race: "Y",
      note: "",
      pic_id: 273,
      type: "",
      memo: "",
      id_sales: 1,
      nama_perusahaan: "PT. hahahoho ddGroup",
      jenis_barang: "Elektronik",
      tgl_berdiri: "0000-00-00",
      npwp: 12209181291,
      alamat_npwp: "Jl.reok Dipenogoro II Blok ABC2 RT009/RW008",
      alamat_kantor: "Jl.Adipati Panarukan IX Blok H9",
      hp: 19839183101,
      mata_uang: "Rupiah (Rp.)",
      jenis_pembayaran: "cash",
      ktp: "test",
      tdp: "test",
      siup: "test",
      pkp: "test",
      tax_pic: "test",
      tax_position: "test",
      tax_email: "test",
      tax_phone_office: "test",
      tax_mobile: "test",
      invoice_pic: "test",
      invoice_address: "test",
      invoice_position: "test",
      invoice_phone_office: "test",
      invoice_mobile: "test",
      invoice_email: "test",
      pic_office: "test",
      pic_position: "test",
      pic_phone: "test",
      pic_number: "test",
      pic_fax: "test",
      pic_email: "test",
      pic_birth: "test",
      bank_pic: "test",
      bank_position: "test",
      bank_phone_office: "test",
      bank_mobile: "test",
      bank_email: "test",
      jenis_angkutan: "test",
      kemasan: "test",
      unique_cus: "test",
      foto_kantor: "test",
      foto_pic: "test",
      foto_ktp: "test",
      foto_npwp: "test",
      manager: "test",
      manager_memo: "test",
      manager_date: "test",
      akunting: "test",
      akunting_memo: "test",
      akunting_date: "test",
      direktur_memo: "test",
      direktur_date: "test",
      mou_file: "test",
      tgl_bergabung: "test",
    },
    validationSchema: Yup.object({
      nama_perusahaan: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("customer/create-customer", values)
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

  useEffect(() => {
    const url = window.location.href;
    const idMpFix = url.substring(url.lastIndexOf("/") + 1);
    httpClient
      .get(`sp/get-SP-all-detail?idmp=${idMpFix}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrderDataTable(data.detail);
          setOrder(data);
          setTimeout(() => {
            formik.setFieldValue("service", data.service);
            formik.setFieldValue("order_date", data.order_date);
            formik.setFieldValue("pickupDate", data.pickup_date);
          }, 1000);
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
                    value={formik.values.jenis}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis}
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
                    value={formik.values.jenis_usaha}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_usaha}
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
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label>NPW Legalitas</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_legalitas"
                    value={formik.values.npwp_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_legalitas}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label>NPWP Nomor</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_nomor"
                    value={formik.values.npwp_nomor}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_nomor}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label>NPWP RT</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_rt"
                    value={formik.values.npwp_rt}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_rt} />
  
                </InputGroup>
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
                <Form.Label>NPWP Kelurahan </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_kelurahan"
                    value={formik.values.npwp_kelurahan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_kelurahan}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>NPWP Kota </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_kota"
                    value={formik.values.npwp_kota}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_kota}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>NPWP Kode Pos </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_kode_pos"
                    value={formik.values.npwp_kodepos}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_kodepos}
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
                <Form.Label>NPWP Kecamatan</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_kecamatan"
                    value={formik.values.npwp_kecamatan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_kecamatan}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>NPWP Provinsi</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_provinsi"
                    value={formik.values.npwp_provinsi}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_provinsi}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label>NPWP Address </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_address"
                    value={formik.values.npwp_address}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_address}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>NPWP Jalan </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_jalan"
                    value={formik.values.npwp_jalan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_jalan}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>NPWP Name</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp-name"
                    value={formik.values.npwp_name}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_name}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>NPWP RW</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_rw"
                    value={formik.values.npwp_rw}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_rw}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>PO Legalitas</Form.Label>
                <InputGroup>
                  <Form.Control
                  name="po_legalitas"
                    value={formik.values.po_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.po_legalitas}
                    
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> KTP Legalitas</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ktp_legalitas"
                    value={formik.values.ktp_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ktp_legalitas}
                    
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> Akta Pendrian</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="akta_pendirian"
                    value={formik.values.akta_pendirian}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akta_pendirian}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> AKta Perubahan Dasar</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="akta_perubahan_dasar"
                    value={formik.values.akta_perubahan_dasar}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akta_perubahan_dasar}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> Akta Susunan Direksi</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="akta_susunan_direksi"
                    value={formik.values.akta_susunan_direksi}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akta_susunan_direksi}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> Surat Domisili</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="surat_domisili"
                    value={formik.values.surat_domisili}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.surat_domisili}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>TDP Legalitas </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tdp_legalitas"
                    value={formik.values.tdp_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tdp_legalitas} />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Surat Kuasa</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="surat_kuasa"
                    value={formik.values.surat_kuasa}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.surat_kuasa}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Lama Bekerja</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="lama_bekerja"
                    value={formik.values.lama_bekerja}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.lama_bekerja}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>SKT Legalitas</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="skt_legalitas"
                    value={formik.values.skt_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.skt_legalitas}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>NPPKP Legalitas</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nppkp_legalitas"
                    value={formik.values.nppkp_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nppkp_legalitas}
                  />
                </InputGroup>
              </Form.Group>
           
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  SIUP Legalitas
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="siup_legalitas"
                    value={formik.values.siup_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.siup_legalitas}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                 Jenis Kartu Kredit 
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_kartu_kredit"
                    value={formik.values.jenis_kartu_kredit}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_kartu_kredit}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  Laporan Keuangan
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="laporan_keuangan"
                    value={formik.values.laporan_keuangan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.laporan_keuangan}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  Status Usaha
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="status_usah"
                    value={formik.values.status_usah}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.status_usah}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  Omset Bulanan
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="omset_bulanan"
                    value={formik.values.omset_bulanan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.omset_bulanan}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  Aset Bangunan
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="asset_bangunan"
                    value={formik.values.asset_bangunan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.asset_bangunan}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  Aset Tanah
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="asset_tanah"
                    value={formik.values.asset_tanah}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.asset_tanah}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Izin Pendirian </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ijin_pendirian"
                    value={formik.values.ijin_pendirian}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ijin_pendirian} />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>PPMD Legalitas</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ppmd_legalitas"
                    value={formik.values.ppmd_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ppmd_legalitas}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Izin Usaha</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ijin_usaha"
                    value={formik.values.ijin_usaha}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ijin_usaha}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Aset Mesin</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="aset_mesin"
                    value={formik.values.asset_mesin}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.asset_mesin}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Aset Kendaraan</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="asset_kendaraan"
                    value={formik.values.asset_kendaraan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.asset_bangunan}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jumlah Unit</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jumlah_unit"
                    value={formik.values.jumlah_unit}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jumlah_unit}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Periode Sewa</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="periode_sewa"
                    value={formik.values.periode_sewa}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.periode_sewa}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
            <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Affiliasi</Form.Label>
                <InputGroup>
                  <Form.Control
                  name="affiliasi"
                    value={formik.values.affiliasi}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.affiliasi}
                    
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> Jumlah Unit</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jumlah_unit"
                    value={formik.values.jumlah_unit}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jumlah_unit}
                    
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> Jumlah Armada</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jumlah_armada"
                    value={formik.values.jumlah_armada}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jumlah_armada}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> Jumlah SDM Operasional</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jumlah_sdm_operasional"
                    value={formik.values.jumlah_sdm_operasional}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jumlah_sdm_operasional}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> Periode Sewa</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="periode_sewa"
                    value={formik.values.periode_sewa}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.periode_sewa}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> Nilai Sewa</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nilai_seaw"
                    value={formik.values.nilai_sewa}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nilai_sewa}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Nilai RUU </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nilai_ruu"
                    value={formik.values.nilai_ruu}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nilai_ruu} />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>TOP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="top"
                    value={formik.values.top}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.top}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Metode Pembayaran</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="metode_pembayaran"
                    value={formik.values.metode_pembayaran}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.metode_pembayaran}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>PPH AP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pph_ap"
                    value={formik.values.pph_ap}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pph_ap} 
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>TDP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tdp"
                    value={formik.values.tdp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tdp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>QTY Motor</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_motor"
                    value={formik.values.qty_motor}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_motor}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>RP Motor</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_motor"
                    value={formik.values.rp_motor}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_motor}
                  />
                </InputGroup>
              </Form.Group>
           
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  QTY Grandmax
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_grandmax"
                    value={formik.values.qty_grandmax}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_grandmax} 
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                 RP Grandmax 
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_grandmax"
                    value={formik.values.rp_grandmax} 
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_grandmax}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  Qty CDD
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_cdd"
                    value={formik.values.qty_cdd}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_cdd}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  RP CDD
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_cdd"
                    value={formik.values.rp_cdd}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_cdd}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  QTY CDE
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_cde"
                    value={formik.values.qty_cde}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_cde}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  RP CDE
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_cde"
                    value={formik.values.rp_cde}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_cde}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  QTY Fuso
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_fuso"
                    value={formik.values.qty_fuso}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_fuso}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  STATUS
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.status}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  STATUS PPH
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name=""
                    value={formik.values.status_pph}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.status_pph}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>RP Fuso </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_fuso"
                    value={formik.values.rp_fuso}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_fuso} />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>QTY L300</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_l300"
                    value={formik.values.qty_l300}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_l300}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>RP L300</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_l300"
                    value={formik.values.rp_l300}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_l300}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>QTY Traga</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_traga"
                    value={formik.values.qty_traga}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_traga}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>RP Traga</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_traga"
                    value={formik.values.rp_traga}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_traga}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>QTY Trailer 20</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_trailer20"
                    value={formik.values.qty_trailer20}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_trailer20}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>RP Trailer 20</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_trailer20"
                    value={formik.values.rp_trailer20}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_trailer20}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>QTY Wingbox</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_wingbox"
                    value={formik.values.qty_wingbox}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_wingbox}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>RP Wingbox</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_wingbox"
                    value={formik.values.rp_wingbox}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_wingbox}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>QTY Trailer 40</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_trailer40"
                    value={formik.values.qty_trailer40}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_trailer40}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>RP Trailer 40</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_trailer40"
                    value={formik.values.rp_trailer40}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_trailer40}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>KTP</Form.Label>
                <InputGroup>
                  <Form.Control
                  name="ktp"
                    value={formik.values.ktp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ktp}
                    
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>SIUP </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="siup"
                    value={formik.values.siup}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.siup}
                    
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>PKP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pkp"
                    value={formik.values.pkp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pkp}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> TAX PIC</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tax_pic"
                    value={formik.values.tax_pic}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tax_pic}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>TAX Position</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tax_position"
                    value={formik.values.tax_position}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tax_position}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> TAX EMAIL</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tax_email"
                    value={formik.values.tax_email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tax_email}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Tax Phone Office </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tax_phone_office"
                    value={formik.values.tax_phone_office}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tax_phone_office}
                   />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>TAX Mobile</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tax_mobile"
                    value={formik.values.tax_mobile}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tax_mobile}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Invoice PIC</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="invoice_pic"
                    value={formik.values.invoice_pic}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.invoice_pic}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Invoice Address</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="invoice_address"
                    value={formik.values.invoice_address}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.invoice_address}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Invoice Email</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="invoice_email"
                    value={formik.values.invoice_email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.invoice_email}
                  />
                </InputGroup>
              </Form.Group>
           
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  Invoice Mobile
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="invoice_mobile"
                    value={formik.values.invoice_mobile}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.invoice_mobile}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                 Invoice Phone Office 
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="invoice_phone_office"
                    value={formik.values.invoice_phone_office}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.invoice_phone_office}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  PIC Number
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_number"
                    value={formik.values.pic_number}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_number}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  PIC Office
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_number"
                    value={formik.values.pic_number}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_number}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  PIC Phone
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_phone"
                    value={formik.values.pic_phone}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_phone}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  PIC Position 
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_position"
                    value={formik.values.pic_position}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_position}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  PIC Email
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_email"
                    value={formik.values.pic_email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_email}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>PIC FAX </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_fax"
                    value={formik.values.pic_fax}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_fax} />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>PIC Birth</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_birth"
                    value={formik.values.pic_birth}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_birth}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Bank PIC</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="bank_pic"
                    value={formik.values.bank_pic}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_pic}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Bank Position</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="bank_position"
                    value={formik.values.bank_position}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_position}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Bank Phone Office</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="bank_phone_office"
                    value={formik.values.bank_phone_office}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_phone_office}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Bank Mobile</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="bank_mobile"
                    value={formik.values.bank_mobile}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_mobile}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Bank Email</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="bank_email"
                    value={formik.values.bank_email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_email}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
            <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Bank Email</Form.Label>
                <InputGroup>
                  <Form.Control
                  name="bank_email"
                    value={formik.values.bank_email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_email}
                    
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> Jenis Angkutan</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_angkutan"
                    value={formik.values.jenis_angkutan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_angkutan} 
                    
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label> Kemasan</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="kemasan"
                    value={formik.values.kemasan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.kemasan}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Unique Cus</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="unique_cus"
                    value={formik.values.unique_cus}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.unique_cus}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Foto Kantor</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="foto_kantor"
                    value={formik.values.foto_kantor}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.foto_kantor}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Foto PIC</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="foto_pic"
                    value={formik.values.foto_pic}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.foto_pic}
                  
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Foto KTP </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="foto_ktp"
                    value={formik.values.foto_ktp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.foto_ktp} />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Foto NPWP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="foto_npwp"
                    value={formik.values.foto_npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.foto_npwp}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Manager</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="manager"
                    value={formik.values.manager}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.manager}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Manager Date</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="manager_date"
                    value={formik.values.manager_date}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.manager_date} 
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Akunting</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="akunting"
                    value={formik.values.akunting}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akunting}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Akunting Date</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="akunting_date"
                    value={formik.values.akunting_date}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akunting_date}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Direktur Date</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="direktur_date"
                    value={formik.values.direktur_date}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.direktur_date}
                  />
                </InputGroup>
              </Form.Group>
           
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  Tanggal Bergabung
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tgl_bergabung"
                    value={formik.values.tgl_bergabung}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tgl_bergabung} 
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  ELOGS
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="elogs"
                    value={formik.values.elogs} 
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.elogs}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  RACE
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="race"
                    value={formik.values.race}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.race}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  ----
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_cdd"
                    value={formik.values.rp_cdd}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_cdd}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  ----
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_cde"
                    value={formik.values.qty_cde}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_cde}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  ----
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_cde"
                    value={formik.values.rp_cde}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_cde}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  ----
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_fuso"
                    value={formik.values.qty_fuso}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_fuso}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  ----
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.status}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>
                  ----
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name=""
                    value={formik.values.status_pph}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.status_pph}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>---- </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_fuso"
                    value={formik.values.rp_fuso}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_fuso} />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>----</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_l300"
                    value={formik.values.qty_l300}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_l300}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>----</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_l300"
                    value={formik.values.rp_l300}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_l300}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>----</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_traga"
                    value={formik.values.qty_traga}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_traga}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>----</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_traga"
                    value={formik.values.rp_traga}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_traga}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>----</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_trailer20"
                    value={formik.values.qty_trailer20}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_trailer20}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>----</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_trailer20"
                    value={formik.values.rp_trailer20}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_trailer20}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>----</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_wingbox"
                    value={formik.values.qty_wingbox}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_wingbox}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>----</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_wingbox"
                    value={formik.values.rp_wingbox}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_wingbox}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>----</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qty_trailer40"
                    value={formik.values.qty_trailer40}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_trailer40}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>----</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="rp_trailer40"
                    value={formik.values.rp_trailer40}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_trailer40}
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

