import axios from "axios";
import React, { useEffect , useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Baseurl from "../../../../../Api/BaseUrl";
import { Checkbox } from "antd";
function FormDataDetailMitra({ mitraId }) {
  const id_mitras = mitraId;
  const [datamiTraProfile, setDataMitraProfile] = useState([]);

  const datamitra = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}mitra/get-detail-mitra?id_mitra=${id_mitras}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const dataisi = response.data.data;
      setDataMitraProfile(dataisi);
      console.log("ini isi", dataisi);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    datamitra();
  },[]);

  return (
    <div>
      <br />
      <h5>
        NAMA DAN ALAMAT PERUSAHAAN{" "}
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
    </div>
  );
}

export default FormDataDetailMitra;
