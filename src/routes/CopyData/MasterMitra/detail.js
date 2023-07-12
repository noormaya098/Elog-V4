import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification, Modal } from "antd";
import { useHistory } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { httpClient } from "../../../Api/Api";
import { InputGroup, Form, Button } from "react-bootstrap";
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
  const [customerData, setCustomerData] = useState(null);

  const formik = useFormik({
    initialValues: {
      id_customer: "",
      kode_customer: "",
      nama_perusahaan: "",
      jenis_barang: "",
      tgl_berdiri: "",
      tahun_berdiri: "",
      npwp: "",
      alamat_npwp: "",
      alamat_kantor: "",
      telepon: "",
      hp: "",
      mata_uang: "",
      jenis_pembayaran: "",
      officer_number: "",
      typeof: "",
      fax: "",
      email: "",
      paymentoftype: "",
      bankname: "",
      accountname: "",
      accountnumber: "",
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
          setTimeout(() => router.push("/mastermitra"), 1000);
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
      .get(`mitra/get-detail-mitra?id_mitra=${idMpFix}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setCustomerData(data.data);
          setJenisBrngPerusahaan(data.data.jenis_barang);
          setOrderDataTable(data.detail);
          setOrder(data);
          setTimeout(() => {
           
                    formik.setFieldValue("order_date", data.data.order_date);
                    formik.setFieldValue("pickupDate", data.data.pickup_date);
                    formik.setFieldValue("kode_mitra", data.data.kode_mitra);
                    formik.setFieldValue("kode", data.data.kode);
                    formik.setFieldValue("qrcode", data.data.qrcode);
                    formik.setFieldValue("nama_mitra", data.data.nama_mitra);
                    formik.setFieldValue("title", data.data.title);
                    formik.setFieldValue("jenis", data.data.jenis);
                    formik.setFieldValue("jenis_usaha", data.data.jenis_usaha);
                    formik.setFieldValue("kepemilikan", data.data.kepemilikan);
                    formik.setFieldValue("jumlah_armada", data.data.jumlah_armada);
                    formik.setFieldValue("jumlah_sdm_operasional", data.data.jumlah_sdm_operasional);
                    formik.setFieldValue("cabang", data.data.cabang);
                    formik.setFieldValue("jenis_kiriman", data.data.jenis_kiriman);
                    formik.setFieldValue("wilayah", data.data.wilayah);
                    formik.setFieldValue("tujuan", data.data.tujuan);
                    formik.setFieldValue("tahun_awal_kontrak", data.data.tahun_awal_kontrak);
                    formik.setFieldValue("awal_kontrak", data.data.awal_kontrak);
                    formik.setFieldValue("akhir_kontrak", data.data.akhir_kontrak);
                    formik.setFieldValue("kontrak", data.data.kontrak);
                    formik.setFieldValue("direktur", data.data.direktur);
                    formik.setFieldValue("tahun_berdiri", data.data.tahun_berdiri);
                    formik.setFieldValue("npwp_id", data.data.npwp_id);
                    formik.setFieldValue("npwp_name", data.data.npwp_name);
                    formik.setFieldValue("npwp_address", data.data.npwp_address);
                    formik.setFieldValue("npwp_jalan", data.data.npwp_jalan);
                    formik.setFieldValue("npwp_blok", data.data.npwp_blok);
                    formik.setFieldValue("npwp_nomor", data.data.npwp_nomor);
                    formik.setFieldValue("npwp_rt", data.data.npwp_rt);
                    formik.setFieldValue("npwp_rw", data.data.npwp_rw);
                    formik.setFieldValue("npwp_kelurahan", data.data.npwp_kelurahan);
                    formik.setFieldValue("npwp_kecamatan", data.data.npwp_kecamatan);
                    formik.setFieldValue("npwp_kota", data.data.npwp_kota);
                    formik.setFieldValue("npwp_provisin", data.data.npwp_provisin);
                    formik.setFieldValue("npwp_kodepos", data.data.npwp_kodepos);
                    formik.setFieldValue("is_taxable", data.data.is_taxable);
                    formik.setFieldValue("telepon", data.data.telepon);
                    formik.setFieldValue("contact_person", data.data.contact_person);
                    formik.setFieldValue("telp", data.data.telp);
                    formik.setFieldValue("fax", data.data.fax);
                    formik.setFieldValue("email", data.data.email);
                    formik.setFieldValue("alamat", data.data.alamat);
                    formik.setFieldValue("homepage", data.data.homepage);
                    formik.setFieldValue("pembayaran", data.data.pembayaran);
                    formik.setFieldValue("nama_bank", data.data.nama_bank);
                    formik.setFieldValue("nama_akun", data.data.nama_akun);
                    formik.setFieldValue("no_rek", data.data.no_rek);
                    formik.setFieldValue("currency", data.data.currency);
                    formik.setFieldValue("po_legalitas", data.data.po_legalitas);
                    formik.setFieldValue("ktp_legalitas", data.data.ktp_legalitas);
                    formik.setFieldValue("akta_pendirian", data.data.akta_pendirian);
                    formik.setFieldValue("akta_perubahan_dasar", data.data.akta_perubahan_dasar);
                    formik.setFieldValue("akta_susunan_direksi", data.data.akta_susunan_direksi);
                    formik.setFieldValue("surat_domisili", data.data.surat_domisili);
                    formik.setFieldValue("npwp_legalitas", data.data.npwp_legalitas);
                    formik.setFieldValue("skt_legalitas", data.data.skt_legalitas);
                    formik.setFieldValue("nppkp_legalitas", data.data.nppkp_legalitas);
                    formik.setFieldValue("siup_legalitas", data.data.siup_legalitas);
                    formik.setFieldValue("ijin_pendirian", data.data.ijin_pendirian);
                    formik.setFieldValue("ppmd_legalitas", data.data.ppmd_legalitas);
                    formik.setFieldValue("ijin_usaha", data.data.ijin_usaha);
                    formik.setFieldValue("tdp_legalitas", data.data.tdp_legalitas);
                    formik.setFieldValue("surat_kuasa", data.data.surat_kuasa);
                    formik.setFieldValue("lama_bekerja", data.data.lama_bekerja);
                    formik.setFieldValue("jenis_kartu_kredit", data.data.jenis_kartu_kredit);
                    formik.setFieldValue("bank_penerbit", data.data.bank_penerbit);
                    formik.setFieldValue("laporan_keuangan", data.data.laporan_keuangan);
                    formik.setFieldValue("status_usaha", data.data.status_usaha);
                    formik.setFieldValue("lama_usaha", data.data.lama_usaha);
                    formik.setFieldValue("omset_bulanan", data.data.omset_bulanan);
                    formik.setFieldValue("asset_tanah", data.data.asset_tanah);
                    formik.setFieldValue("asset_bangunan", data.data.asset_bangunan);
                    formik.setFieldValue("asset_kendaraan", data.data.asset_kendaraan);
                    formik.setFieldValue("asset_mesin", data.data.asset_mesin);
                    formik.setFieldValue("affiliasi", data.data.affiliasi);
                    formik.setFieldValue("jumlah_unit", data.data.jumlah_unit);
                    formik.setFieldValue("periode_sewa", data.data.periode_sewa);
                    formik.setFieldValue("nilai_sewa", data.data.nilai_sewa);
                    formik.setFieldValue("nilai_ruu", data.data.nilai_ruu);
                    formik.setFieldValue("top", data.data.top);
                    formik.setFieldValue("metode_pembayaran", data.data.metode_pembayaran);
                    formik.setFieldValue("qty_motor", data.data.qty_motor);
                    formik.setFieldValue("rp_motor", data.data.rp_motor);
                    formik.setFieldValue("qty_grandmax", data.data.qty_grandmax);
                    formik.setFieldValue("rp_grandmax", data.data.rp_grandmax);
                    formik.setFieldValue("qty_l300", data.data.qty_l300);
                    formik.setFieldValue("rp_l300", data.data.rp_l300);
                    formik.setFieldValue("qty_traga", data.data.qty_traga);
                    formik.setFieldValue("rp_traga", data.data.rp_traga);
                    formik.setFieldValue("qty_cde", data.data.qty_cde);
                    formik.setFieldValue("rp_cde", data.data.rp_cde);
                    formik.setFieldValue("qty_cdd", data.data.qty_cdd);
                    formik.setFieldValue("rp_cdd", data.data.rp_cdd);
                    formik.setFieldValue("qty_fuso", data.data.qty_fuso);
                    formik.setFieldValue("rp_fuso", data.data.rp_fuso);
                    formik.setFieldValue("qty_wingbox", data.data.qty_wingbox);
                    formik.setFieldValue("rp_wingbox", data.data.rp_wingbox);
                    formik.setFieldValue("qty_trailer20", data.data.qty_trailer20);
                    formik.setFieldValue("rp_trailer20", data.data.rp_trailer20);
                    formik.setFieldValue("qty_trailer40", data.data.qty_trailer40);
                    formik.setFieldValue("rp_trailer40", data.data.rp_trailer40);
                    formik.setFieldValue("pic_id", data.data.pic_id);
                    formik.setFieldValue("type", data.data.type);
                    formik.setFieldValue("memo", data.data.memo);            
        
          }, 1000);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
    httpClient
      .get(`customer/get-customer-address?id_customer=${idMpFix}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setData(data.data);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const handleDelete = (custId) => {
    confirm({
      title: "Are you sure you want to delete this customer?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id_customer: custId,
        };
        httpClient
          .post(`customer/del-customer`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              router.push("/mastercustomer");
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}></Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Button
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => handleDelete(idMpFix)}
              >
                Delete
              </Button>
            </Col>
            <Col span={3}>
              <Button type="submit">Save and load photo customer</Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
            <Form.Group style={{ marginBottom: "10px" }}>
                 <Form.Label style={{fontWeight: "bold"}}>Kode Mitra :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="kode_mitra"
                    value={formik.values.kode_mitra}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.kode_mitra}
                    disabled
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                 <Form.Label style={{fontWeight: "bold"}}>Kode :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="kode"
                    value={formik.values.kode}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.kode}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                 <Form.Label style={{fontWeight: "bold"}}>QRCode :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="qrcode"
                    value={formik.values.qrcode}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qrcode}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                 <Form.Label style={{fontWeight: "bold"}}>Nama Mitra :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nama_mitra"
                    value={formik.values.nama_mitra}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nama_mitra}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                 <Form.Label style={{fontWeight: "bold"}}>Title :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.title}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                 <Form.Label style={{fontWeight: "bold"}}>Jenis :</Form.Label>
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
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                 <Form.Label style={{fontWeight: "bold"}}>Jenis Usaha :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_usaha"
                    value={formik.values.jenis_usaha}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_usaha}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                 <Form.Label style={{fontWeight: "bold"}}>Kepemilikan :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="kepemilikan"
                    value={formik.values.kepemilikan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.kepemilikan}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                 <Form.Label style={{fontWeight: "bold"}}>Jumlah Armada :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jumlah_armada"
                    value={formik.values.jumlah_armada}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jumlah_armada}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Jumlah SDM Operasional : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jumlah_sdm_operasional"
                    value={formik.values.jumlah_sdm_operasional}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jumlah_sdm_operasional}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={12}>
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Cabang : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="cabang"
                    value={formik.values.cabang}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.cabang}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Jenis Kiriman :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_kiriman"
                    value={formik.values.jenis_kiriman}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_kiriman}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Wilayah :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="wilayah"
                    value={formik.values.wilayah}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.wilayah}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Tujuan :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tujuan"
                    value={formik.values.tujuan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tujuan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Tahun Awal Kontrak :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tahun_awal_kontrak"
                    value={formik.values.tahun_awal_kontrak}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tahun_awal_kontrak}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Awal Kontrak :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="awal_kontrak"
                    value={formik.values.awal_kontrak}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.awal_kontrak}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Akhir Kontrak :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="akhir_kontrak"
                    value={formik.values.akhir_kontrak}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akhir_kontrak}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Kontrak :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="kontrak"
                    value={formik.values.kontrak}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.kontrak}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Direktur : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="direktur"
                    value={formik.values.direktur}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.direktur}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Tahun Berdiri : </Form.Label>
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
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP ID : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_id"
                    value={formik.values.npwp_id}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_id}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP Name : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_name"
                    value={formik.values.npwp_name}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_name}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP Address : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_address"
                    value={formik.values.npwp_address}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_address}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP Jalan :  </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_jalan"
                    value={formik.values.npwp_jalan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_jalan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP Blok :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_blok"
                    value={formik.values.npwp_blok}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_blok}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP Nomor :</Form.Label>
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
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP RT : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_rt"
                    value={formik.values.npwp_rt}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_rt}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP RW : </Form.Label>
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
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP Kelurahan : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_kelurahan"
                    value={formik.values.npwp_kelurahan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_kelurahan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP Kecamatan : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_kecamatan"
                    value={formik.values.npwp_kecamatan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_kecamatan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP Kota : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_kota"
                    value={formik.values.npwp_kota}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_kota}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP Provinsi :  </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_provisin"
                    value={formik.values.npwp_provisin}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_provisin}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP Kode Pos : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp_kodepos"
                    value={formik.values.npwp_kodepos}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp_kodepos}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Is Taxable : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="is_taxable"
                    value={formik.values.is_taxable}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.is_taxable}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label type='number' style={{fontWeight: "bold"}}>Telepon : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="telepon"
                    value={formik.values.telepon}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.telepon}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Contact Person : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="contact_person"
                    value={formik.values.contact_person}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.contact_person}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Telp : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="telp"
                    value={formik.values.telp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.telp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>FAX : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="fax"
                    value={formik.values.fax}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.fax}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Email : </Form.Label>
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
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Alamat : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="alamat"
                    value={formik.values.alamat}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>HomePage : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="homepage"
                    value={formik.values.homepage}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.homepage}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Pembayaran : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pembayaran"
                    value={formik.values.pembayaran}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pembayaran}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Nama Bank : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nama_bank"
                    value={formik.values.nama_bank}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nama_bank}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Nama Akun : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nama_akun"
                    value={formik.values.nama_akun}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nama_akun}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>No. Rekening : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="no_rek"
                    value={formik.values.no_rek}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.no_rek}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Currency : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="currency"
                    value={formik.values.currency}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.currency}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>PO Legalitas : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="po_legalitas"
                    value={formik.values.po_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.po_legalitas}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>KTP Legalitas </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ktp_legalitas"
                    value={formik.values.ktp_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ktp_legalitas}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Akta Pendirian : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="akta_pendirian"
                    value={formik.values.akta_pendirian}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akta_pendirian}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Akta Perubahan Dasar : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="akta_perubahan_dasar"
                    value={formik.values.akta_perubahan_dasar}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akta_perubahan_dasar}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Akta Susunan Direksi : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="akta_susunan_direksi"
                    value={formik.values.akta_susunan_direksi}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akta_susunan_direksi}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Surat Domisili : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="surat_domisili"
                    value={formik.values.surat_domisili}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.surat_domisili}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPWP Legalitas : </Form.Label>
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
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>SKT Legalitas : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="skt_legalitas"
                    value={formik.values.skt_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.skt_legalitas}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>NPPKP Legalitas : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nppkp_legalitas"
                    value={formik.values.nppkp_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nppkp_legalitas}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Siup Legalitas : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="siup_legalitas"
                    value={formik.values.siup_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.siup_legalitas}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Ijin Pendirian : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ijin_pendirian"
                    value={formik.values.ijin_pendirian}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ijin_pendirian}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>PPMD Legalitas : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ppmd_legalitas"
                    value={formik.values.ppmd_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ppmd_legalitas}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Ijin Usaha : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ijin_usaha"
                    value={formik.values.ijin_usaha}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ijin_usaha}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>TDP Legalitas : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tdp_legalitas"
                    value={formik.values.tdp_legalitas}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tdp_legalitas}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Surat Kuasa : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="surat_kuasa"
                    value={formik.values.surat_kuasa}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.surat_kuasa}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Lama Bekerja : </Form.Label>
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
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Jenis Kartu Kredit : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_kartu_kredit"
                    value={formik.values.jenis_kartu_kredit}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_kartu_kredit}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Bank Penerbit : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="bank_penerbit"
                    value={formik.values.bank_penerbit}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_penerbit}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Laporan Keuangan : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="laporan_keuangan"
                    value={formik.values.laporan_keuangan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.laporan_keuangan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Status Usaha : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="status_usaha"
                    value={formik.values.status_usaha}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.status_usaha}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Lama Usaha : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="lama_usaha"
                    value={formik.values.lama_usaha}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.lama_usaha}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Omset Bulanan : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="omset_bulanan"
                    value={formik.values.omset_bulanan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.omset_bulanan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Asset Tanah : </Form.Label>
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
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Asset Bangunan : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="asset_bangunan"
                    value={formik.values.asset_bangunan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.asset_bangunan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Asset Kendaraan : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="asset_kendaraan"
                    value={formik.values.asset_kendaraan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.asset_kendaraan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Asset Mesin : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="asset_mesin"
                    value={formik.values.asset_mesin}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.asset_mesin}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Affiliasi : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="affiliasi"
                    value={formik.values.affiliasi}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.affiliasi}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Jumlah Unit : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jumlah_unit"
                    value={formik.values.jumlah_unit}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jumlah_unit}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Periode Sewa : </Form.Label>
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
            <Col span={8} className="mt-2">
              <Form.Group>
                 <Form.Label style={{fontWeight: "bold"}}>Nilai Sewa : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nilai_sewa"
                    value={formik.values.nilai_sewa}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nilai_sewa}
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
