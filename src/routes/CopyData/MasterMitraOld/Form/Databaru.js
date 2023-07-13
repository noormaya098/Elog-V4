import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
  message,
  Card
} from "antd";
import axios from "axios";
import Baseurl from "../../../../Api/BaseUrl";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";

function DataBaru({ mitraId, onSubmit }) {
  // const [datamiTraProfile, setDataMitraProfile] = useState([]);
  const [form] = Form.useForm();
  const router = useHistory();

  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      const response = await axios.post(
        `${Baseurl}mitra/edit-mitra-pic`,
        {
          ...values,
          id_mitra_pic: 1,
          id_mitra: mitraId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem(`token`),
          },
        }
      );
      message.success("Mitra successfully edited"); // Menampilkan pesan sukses
      DetailMitra();
    } catch (error) {
      console.error("Failed to edit mitra:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const DetailMitra = async () => {
    const data = await axios.get(
      `${Baseurl}mitra/get-detail-mitra?id_mitra=${mitraId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    console.log(data.data.data.jenis);
    form.setFieldsValue({
      jenis: data.data.data?.jenis,
      kode_mitra: data.data.data?.kode_mitra,
      nama_mitra: data.data.data?.nama_mitra,
      kode_mitra: data.data.data?.kode_mitra,
      kode: data.data.data?.kode,
      qrcode: data.data.data?.qrcode,
      title: data.data.data?.title,
      jenis_usaha: data.data.data?.jenis_usaha,
      kepemilikan: data.data.data?.kepemilikan,
      jumlah_armada: data.data.data?.jumlah_armada,
      jumlah_sdm_operasional: data.data.data?.jumlah_sdm_operasional,
      cabang: data.data.data?.cabang,
      jenis_kiriman: data.data.data?.jenis_kiriman,
      wilayah: data.data.data?.wilayah,
      tujuan: data.data.data?.tujuan,
      tahun_awal_kontrak: data.data.data?.tahun_awal_kontrak,
      awal_kontrak: data.data.data?.awal_kontrak,
      akhir_kontrak: data.data.data?.akhir_kontrak,
      kontrak: data.data.data?.kontrak,
      direktur: data.data.data?.direktur,
      tahun_berdiri: data.data.data?.tahun_berdiri,
      npwp_id: data.data.data?.npwp_id,
      npwp_name: data.data.data?.npwp_name,
      npwp_address: data.data.data?.npwp_address,
      npwp_jalan: data.data.data?.npwp_jalan,
      npwp_blok: data.data.data?.npwp_blok,
      npwp_nomor: data.data.data?.npwp_nomor,
      npwp_rt: data.data.data?.npwp_rt,
      npwp_rw: data.data.data?.npwp_rw,
      npwp_kelurahan: data.data.data?.npwp_kelurahan,
      npwp_kecamatan: data.data.data?.npwp_kecamatan,
      npwp_kota: data.data.data?.npwp_kota,
      npwp_provinsi: data.data.data?.npwp_provinsi,
      npwp_kodepos: data.data.data?.npwp_kodepos,
      is_taxable: data.data.data?.is_taxable,
      telepon: data.data.data?.telepon,
      contact_person: data.data.data?.contact_person,
      telp: data.data.data?.telp,
      fax: data.data.data?.fax,
      email: data.data.data?.email,
      alamat: data.data.data?.alamat,
      homepage: data.data.data?.homepage,
      pembayaran: data.data.data?.pembayaran,
      nama_bank: data.data.data?.nama_bank,
      nama_akun: data.data.data?.nama_akun,
      no_rek: data.data.data?.no_rek,
      currency: data.data.data?.currency,
      po_legalitas: data.data.data?.po_legalitas,
      ktp_legalitas: data.data.data?.ktp_legalitas,
      akta_pendirian: data.data.data?.akta_pendirian,
      akta_perubahan_dasar: data.data.data?.akta_perubahan_dasar,
      akta_susunan_direksi: data.data.data?.akta_susunan_direksi,
      surat_domisili: data.data.data?.surat_domisili,
      npwp_legalitas: data.data.data?.npwp_legalitas,
      skt_legalitas: data.data.data?.skt_legalitas,
      nppkp_legalitas: data.data.data?.nppkp_legalitas,
      siup_legalitas: data.data.data?.siup_legalitas,
      ijin_pendirian: data.data.data?.ijin_pendirian,
      ppmd_legalitas: data.data.data?.ppmd_legalitas,
      ijin_usaha: data.data.data?.ijin_usaha,
      tdp_legalitas: data.data.data?.tdp_legalitas,
      surat_kuasa: data.data.data?.surat_kuasa,
      lama_bekerja: data.data.data?.lama_bekerja,
      jenis_kartu_kredit: data.data.data?.jenis_kartu_kredit,
      bank_penerbit: data.data.data?.bank_penerbit,
      laporan_keuangan: data.data.data?.laporan_keuangan,
      status_usaha: data.data.data?.status_usaha,
      lama_usaha: data.data.data?.lama_usaha,
      omset_bulanan: data.data.data?.omset_bulanan,
      asset_tanah: data.data.data?.asset_tanah,
      asset_bangunan: data.data.data?.asset_bangunan,
      asset_kendaraan: data.data.data?.asset_kendaraan,
      asset_mesin: data.data.data?.asset_mesin,
      affiliasi: data.data.data?.affiliasi,
      jumlah_unit: data.data.data?.jumlah_unit,
      periode_sewa: data.data.data?.periode_sewa,
      nilai_sewa: data.data.data?.nilai_sewa,
      nilai_ruu: data.data.data?.nilai_ruu,
      top: data.data.data?.top,
      metode_pembayaran: data.data.data?.metode_pembayaran,
      qty_motor: data.data.data?.qty_motor,
      rp_motor: data.data.data?.rp_motor,
      qty_grandmax: data.data.data?.qty_grandmax,
      rp_grandmax: data.data.data?.rp_grandmax,
      qty_l300: data.data.data?.qty_l300,
      rp_l300: data.data.data?.rp_l300,
      qty_traga: data.data.data?.qty_traga,
      rp_traga: data.data.data?.rp_traga,
      qty_cde: data.data.data?.qty_cde,
      rp_cde: data.data.data?.rp_cde,
      qty_cdd: data.data.data?.qty_cdd,
      rp_cdd: data.data.data?.rp_cdd,
      qty_fuso: data.data.data?.qty_fuso,
      rp_fuso: data.data.data?.rp_fuso,
      qty_wingbox: data.data.data?.qty_wingbox,
      rp_wingbox: data.data.data?.rp_wingbox,
      qty_trailer20: data.data.data?.qty_trailer20,
      rp_trailer20: data.data.data?.rp_trailer20,
      qty_trailer40: data.data.data?.qty_trailer40,
      rp_trailer40: data.data.data?.rp_trailer40,
      pic_id: data.data.data?.pic_id,
      type: data.data.data?.type,
      memo: data.data.data?.memo,
    });
  };
  useEffect(() => {
    DetailMitra();
  }, []);

  return (
    
    <>
    <Card>
    <h3>
           Detail Master Mitra
        </h3>
    </Card>
    
      <Card>
     
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          // style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h5>NAMA DAN ALAMAT PERUSAHAAN(Sold to Party )</h5>
          <Row className="mt-4">
            <Col sm={2} style={{ padding: "0px" }}>
              <Form.Item
                label="Kode Mitra :"
                style={{ fontWeight: "bold" }}
                name="kode_mitra"
                rules={[
                  { required: false, message: "Please input your password!" },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ padding: "0px" }}>
              <Form.Item
                label="Title :"
                style={{ fontWeight: "bold" }}
                name="title"
                rules={[
                  { required: false, message: "Please input your jenis!" },
                ]}
              >
                <Select />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Mitra Name :"
                style={{ fontWeight: "bold" }}
                name="nama_mitra"
                rules={[
                  { required: false, message: "Please input your nama mitra!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Kode Perusahaan (Singkatan Mitra Name)"
                style={{ fontWeight: "bold" }}
                name="nama_mitra"
                rules={[
                  { required: false, message: "Please input your jenis!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jenis Usaha :"
                style={{ fontWeight: "bold" }}
                name="jenis_usaha"
                rules={[
                  { required: false, message: "Please input your jenis!" },
                ]}
              >
                <Select />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jenis Kepemilikan :"
                style={{ fontWeight: "bold" }}
                name="kepemilikan"
                rules={[
                  { required: false, message: "Please input your jenis!" },
                ]}
              >
                <Select />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Home Page (Website) :"
                style={{ fontWeight: "bold" }}
                name="homepage"
                rules={[
                  { required: false, message: "Please input your jenis!" },
                ]}
              >
                <Select />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={8} style={{ padding: "0px" }}>
              <Form.Item
                label="Alamat :"
                style={{ fontWeight: "bold" }}
                name="Alamat"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="PIC Purchasing :"
                style={{ fontWeight: "bold" }}
                name="-"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Select />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Direktur :"
                style={{ fontWeight: "bold" }}
                name="direktur"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jumlah Armada :"
                style={{ fontWeight: "bold" }}
                name="jumlah_armada"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jumlah SDM Operasional :"
                style={{ fontWeight: "bold" }}
                name="jumlah_sdm_operasional"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Cabang :"
                style={{ fontWeight: "bold" }}
                name="cabang"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jenis Kiriman :"
                style={{ fontWeight: "bold" }}
                name="jenis_kiriman"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Status Usaha :"
                style={{ fontWeight: "bold" }}
                name="-"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Telp. Kantor :"
                style={{ fontWeight: "bold" }}
                name="telp"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Fax. Kantor :"
                style={{ fontWeight: "bold" }}
                name="fax"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jenis Mitra :"
                style={{ fontWeight: "bold" }}
                name="jenis_usaha"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Wilayah :"
                style={{ fontWeight: "bold" }}
                name="wilayah"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Tujuan :"
                style={{ fontWeight: "bold" }}
                name="tujuan"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Tahun Berdiri :"
                style={{ fontWeight: "bold" }}
                name="tahun_berdiri"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Kontrak Awal :"
                style={{ fontWeight: "bold" }}
                name="awal_kontrak"
              >
                <Input.Group compact>
                  <DatePicker style={{ width: "100%" }} />
                </Input.Group>
              </Form.Item>
            </Col>
            <Col sm={4}>
              <Form.Item
                label="Kontrak Akhir :"
                style={{ fontWeight: "bold" }}
                name="akhir_kontrak"
              >
                <Input.Group compact>
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="akhir_kontrak"
                  />
                </Input.Group>
                <br />
                <Checkbox>Berlaku perpanjang otomatis</Checkbox>
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Tahun Register :"
                style={{ fontWeight: "bold" }}
                name="tahun_awal_kontrak"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={12} style={{ padding: "0px" }}>
              <Form.Item
                label="Memo :"
                name="memo"
                style={{ fontWeight: "bold", height: "138px" }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <hr></hr>
          <br />
          <br />
          <hr></hr>
          <h5>DATA PERPAJAKAN (Tax Information)</h5>
          <Row className="mt-5">
            <Col sm={6} style={{ padding: "0px" }}>
              <Form.Item
                label="No. NPWP :"
                style={{ fontWeight: "bold" }}
                name="npwp_nomor"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={6} style={{ padding: "0px" }}>
              <Form.Item
                label="Nama NPWP :"
                style={{ fontWeight: "bold" }}
                name="npwp_name"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={12} style={{ padding: "0px" }}>
              <Form.Item
                label="Alamat NPWP:"
                style={{ fontWeight: "bold" }}
                name="npwp_address"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={12} style={{ padding: "0px" }}>
              <Form.Item
                label="Jalan NPWP:"
                style={{ fontWeight: "bold" }}
                name="npwp_jalan"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={2} style={{ width: "10%", padding: "0px" }}>
              <Form.Item
                label="Blok :"
                style={{ fontWeight: "bold" }}
                name="npwp_blok"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ width: "10%", padding: "0px" }}>
              <Form.Item
                label="Nomor :"
                style={{ fontWeight: "bold" }}
                name="npwp_nomor"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ width: "10%", padding: "0px" }}>
              <Form.Item
                label="RT :"
                style={{ fontWeight: "bold" }}
                name="npwp_rt"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ width: "10%", padding: "0px" }}>
              <Form.Item
                label="RW :"
                style={{ fontWeight: "bold" }}
                name="npwp_rw"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="Provinsi :"
                style={{ fontWeight: "bold" }}
                name="npwp_provisin"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="Kota :"
                style={{ fontWeight: "bold" }}
                name="npwp_kota"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="Kecamatan :"
                style={{ fontWeight: "bold" }}
                name="npwp_kecamatan"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="Kelurahan :"
                style={{ fontWeight: "bold" }}
                name="npwp_kelurahan"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Kode Pos :"
                style={{ fontWeight: "bold" }}
                name="npwp_kodepos"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <hr />
          <br />
          <h6>DATA ACCOUNTING (Accounting Information)</h6>
          <Row className="mt-4">
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Bank :"
                style={{ fontWeight: "bold" }}
                name="nama_bank"
              >
                <Select />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Account Name :"
                style={{ fontWeight: "bold" }}
                name="nama_akun"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Account Number :"
                style={{ fontWeight: "bold" }}
                name="no_rek"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <hr />
          <br />
          <Row className="mt-4">
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Currency :"
                style={{ fontWeight: "bold" }}
                name="currency"
              >
                <Select />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Type Of Payment :"
                style={{ fontWeight: "bold" }}
                name="pembayaran"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Status :"
                style={{ fontWeight: "bold" }}
                name="-"
              >
                <Select />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Contact Person :"
                style={{ fontWeight: "bold" }}
                name="contact_person"
              >
                <Select />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Email :"
                style={{ fontWeight: "bold" }}
                name="email"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Telp :"
                style={{ fontWeight: "bold" }}
                name="telp"
              >
                <Select />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <hr />
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default DataBaru;
