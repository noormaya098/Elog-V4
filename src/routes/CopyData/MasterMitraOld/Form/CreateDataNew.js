import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Checkbox, notification } from "antd";
import * as Yup from "yup";
import { httpClient } from "../../../../Api/Api";
import { useFormik } from "formik";
function DataProfile({ mitraId, onSubmit }) {
  const id_mitras = mitraId;
  const [datamiTraProfile, setDataMitraProfile] = useState([]);
  const router = useHistory();
  const formik = useFormik({
    initialValues: {
      id_mitra: id_mitras || "",
      kode_mitra: "EM00298",
      kode: "NL",
      qrcode: "EM00297.png",
      nama_mitra: "NOO LOGISTICS",
      title: "PT",
      jenis: "Vendor Darat",
      jenis_usaha: "EXPRESS DAN LOGISTIK",
      kepemilikan: "SWASTA NASIONAL",
      jumlah_armada: "650",
      jumlah_sdm_operasional: "538",
      cabang: "Jakarta",
      jenis_kiriman: "TRUCKING",
      wilayah: "Indonesia",
      tujuan: "Indonesia",
      tahun_awal_kontrak: "2023",
      awal_kontrak: "2023-05-20",
      akhir_kontrak: "2025-05-19",
      kontrak: "2",
      direktur: "Vivi Noviana",
      tahun_berdiri: "2019",
      npwp_id: "01.300.326.4-046.000",
      npwp_name: "PT. NOO Logistics",
      npwp_address: "Jl. Raya Cakung Cilincing Km. 1.5 Cakung Barat Cakung",
      npwp_jalan: "Jl. Raya Cakung Cilincing Km. 1.5 Cakung Barat Cakung",
      npwp_blok: "-",
      npwp_nomor: "18",
      npwp_rt: "17",
      npwp_rw: "7",
      npwp_kelurahan: "Cakung Barat",
      npwp_kecamatan: "Cakung ",
      npwp_kota: "Jakarta Timur",
      npwp_provinsi: "Dki Jakarta",
      npwp_kodepos: "13221",
      is_taxable: "1",
      telepon: "(021) 460-2278",
      contact_person: "Noo Putra",
      telp: " +62 812-8335-9535",
      fax: "(021) 460-2278",
      email: "Nopu@gmail.com",
      alamat: " elief.pratama@puninar.com",
      homepage: " https://www.puninar.com/",
      pembayaran: "30",
      nama_bank: "BANK MANDIRI",
      nama_akun: "PT. PUNINAR JAYA",
      no_rek: "156-000-484-7499",
      currency: "Rupiah (Rp.)",
      po_legalitas: "ADA",
      ktp_legalitas: "ADA",
      akta_pendirian: "ADA",
      akta_perubahan_dasar: "TIDAK",
      akta_susunan_direksi: "TIDAK",
      surat_domisili: "ADA",
      npwp_legalitas: "ADA",
      skt_legalitas: "",
      nppkp_legalitas: "ADA",
      siup_legalitas: "ADA",
      ijin_pendirian: "TIDAK",
      ppmd_legalitas: "TIDAK",
      ijin_usaha: "TIDAK",
      tdp_legalitas: "TIDAK",
      surat_kuasa: "TIDAK",
      lama_bekerja: "1",
      jenis_kartu_kredit: "TIDAK ADA",
      bank_penerbit: "TIDAK ADA",
      laporan_keuangan: "TIDAK",
      status_usaha: "MENENGAH",
      lama_usaha: "2019",
      omset_bulanan: "0",
      asset_tanah: "MILIK SENDIRI",
      asset_bangunan: "MILIK SENDIRI",
      asset_kendaraan: "MILIK SENDIRI",
      asset_mesin: "MILIK SENDIRI",
      affiliasi: "",
      jumlah_unit: "0",
      periode_sewa: "0",
      nilai_sewa: "0",
      nilai_ruu: "0",
      top: 0,
      metode_pembayaran: "TRANSFER",
      qty_motor: 7,
      rp_motor: 0,
      qty_grandmax: 0,
      rp_grandmax: 0,
      qty_l300: 0,
      rp_l300: 200,
      qty_traga: 0,
      rp_traga: 0,
      qty_cde: 500,
      rp_cde: 0,
      qty_cdd: 100,
      rp_cdd: 200,
      qty_fuso: 0,
      rp_fuso: 0,
      qty_wingbox: 0,
      rp_wingbox: 0,
      qty_trailer20: 0,
      rp_trailer20: 0,
      qty_trailer40: 0,
      rp_trailer40: 0,
      pic_id: 273,
      type: "elogs",
      memo: "",
    },
    validationSchema: Yup.object({
      id_customer: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("mitra/create-mitra-pic", values)
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/mastermitraold"), 1000);
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
    const datamitra = async () => {
      try {
        httpClient
          .get(`mitra/get-detail-mitra?id_mitra=${id_mitras}`)
          .then(({ data }) => {
            if (data.status.code === 200) {
              setDataMitraProfile(data.data);
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      } catch (error) {
        console.error(error);
      }
    };
    datamitra();
  }, []);
  const handleSubmit = () => {
    // Perform submit action here
    console.log("Form submitted");
    onSubmit(formik.values);
  };
  return (
    <div>
      <br />
      <h5>
        NAMA DAN ALAMAT PERUSAHAAN
        <span>
          <i>(Sold to Party )</i>
        </span>
      </h5>
      <br />
      <Row className="align-items-center">
        <Col sm={2}>
          <Form.Label>
            <b>MITRA CODE</b>
          </Form.Label>
          <Form.Control
            disabled
            value={datamiTraProfile.kode_mitra}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={2}>
          <Form.Label>
            <b>TITLE</b>
          </Form.Label>
          <Form.Select
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option>-</option>
            <option>PT</option>
            <option>PT</option>
            <option>KOPERASI</option>
            <option>CV</option>
            <option>PD</option>
            <option>UD</option>
            <option>YAYASAN</option>
            <option>PERUM</option>
            <option>LEMBAGA</option>
            <option>KPPA</option>
            <option>Rep Office</option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss.</option>
          </Form.Select>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>MITRA NAME :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.nama_mitra}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>KODE PERUSAHAAN (Singkatan Mitra Name) :</b>
          </Form.Label>
          <Form.Control
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={4}>
          <Form.Label>
            <b>JENIS USAHA :</b>
          </Form.Label>
          <Form.Select
            defaultValue={datamiTraProfile.jenis_usaha}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option>-</option>
            <option>PT</option>
            <option>PT</option>
          </Form.Select>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>KEPEMILIKAN :</b>
          </Form.Label>
          <Form.Select
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option>-</option>
            <option>PT</option>
            <option>PT</option>
          </Form.Select>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>HOMEPAGE (Website) :</b>
          </Form.Label>
          <Form.Select
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option>-</option>
            <option>PT</option>
            <option>PT</option>
          </Form.Select>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={8}>
          <Form.Label>
            <b>ALAMAT KANTOR :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.alamat}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>PIC PURCHASING :</b>
          </Form.Label>
          <Form.Select
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option>-</option>
            <option>PT</option>
            <option>PT</option>
          </Form.Select>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={4}>
          <Form.Label>
            <b>DIREKTUR :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.direktur}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <br />
        <Col sm={4}>
          <Form.Label>
            <b>JUMLAH ARMADA :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.jumlah_armada}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>JUMLAH SDM OPERASIONAL :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.jumlah_sdm_operasional}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={4}>
          <Form.Label>
            <b>CABANG :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.cabang}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>JENIS KIRIMAN</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.jenis_kiriman}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>STATUS USAHA :</b>
          </Form.Label>
          <Form.Control
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={4}>
          <Form.Label>
            <b>TELP. KANTOR :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.telp}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>FAX. KANTOR :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.fax}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>JENIS MITRA :</b>
          </Form.Label>
          <Form.Control
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={4}>
          <Form.Label>
            <b>WILAYAH :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.wilayah}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>TUJUAN</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.tujuan}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <br />
        <Col sm={4}>
          <Form.Label>
            <b>TAHUN BERDIRI :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.tahun_berdiri}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={4}>
          <Form.Label>
            <b>KONTRAK AWAL :</b>
          </Form.Label>
          <Form.Control
            type="date"
            defaultValue={datamiTraProfile.awal_kontrak}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>KONTRAK AKHIR :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.akhir_kontrak}
            type="date"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
          <br />
          <Checkbox>Berlaku perpanjang otomatis</Checkbox>
        </Col>
        <br />
        <Col sm={4}>
          <Form.Label>
            <b>TAHUN REGISTER :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.tahun_awal_kontrak}
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <Col sm={12}>
        <Form.Label>
          <b>Memo :</b>
        </Form.Label>
        <Form.Control
          as="textarea"
          defaultValue={datamiTraProfile.memo}
          rows={3}
          style={{ height: "139px" }}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        ></Form.Control>
      </Col>
      <hr />
      <br />
      <hr />
      <br />
      <Row>
        <Col>
          <b>
            DATA PERPAJAKAN{" "}
            <span>
              <i>(Tax Information)</i>
            </span>
          </b>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Form.Label>
            <b>NO NPWP :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.npwp_id}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col>
          <Form.Label>
            <b>NAMA NPWP :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.npwp_name}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Form.Label>
            <b>ALAMAT NPWP :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.npwp_address}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Form.Label>
            <b>JALAN :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.npwp_jalan}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={1}>
          <Form.Label>
            <b>BLOK :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.npwp_blok}
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={1}>
          <Form.Label>
            <b>Nomor :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.npwp_nomor}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={1}>
          <Form.Label>
            <b>RT :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.npwp_rt}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={1}>
          <Form.Label>
            <b>RW :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.npwp_rw}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={2}>
          <Form.Label>
            <b>Provinsi :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.npwp_provinsi}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col>
          <Form.Label>
            <b>Kota :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.npwp_kota}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col>
          <Form.Label>
            <b>Kecamatan :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.npwp_kecamatan}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col>
          <Form.Label>
            <b>Kelurahan :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.npwp_kelurahan}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <Col sm={2}>
        <Form.Label>
          <b>Kodepost :</b>
        </Form.Label>
        <Form.Control
          defaultValue={datamiTraProfile.npwp_kodepos}
          type="text"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        ></Form.Control>
      </Col>
      <br />
      <hr />
      <br />
      <Row>
        <p>
          <span>
            <b>DATA ACCOUNTING</b>{" "}
          </span>
          <i>(Accounting Information)</i>
        </p>
        <Col sm={4}>
          <Form.Label>
            <b>Bank :</b>
          </Form.Label>
          <Form.Control
            type="text"
            disabled
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
          <Form.Select
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option>Pilih Bank</option>
          </Form.Select>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>Account Name :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.nama_akun}
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>Account Number :</b>
          </Form.Label>
          <Form.Control
            defaultValue={datamiTraProfile.no_rek}
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <hr />
      <br />
      <Row>
        <Col sm={4}>
          <Form.Label>
            <b>Currency :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.currency}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>Type Of Payment :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.top}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>Status</b>
          </Form.Label>
          <Form.Select
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option>Pilih Status</option>
          </Form.Select>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={4}>
          <Form.Label>
            <b>Contact Person :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.contact_person}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>Email :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.email}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>Telp :</b>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={datamiTraProfile.telp}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <br />
      <hr />
      <br />
      <Button variant="primary" onClick={handleSubmit}>
        Save Changes
      </Button>
    </div>
  );
}

export default DataProfile;
