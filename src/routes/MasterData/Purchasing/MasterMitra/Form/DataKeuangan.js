import React from "react";
import { Col, Row, Form } from "react-bootstrap";
import mobil from "../../../../redux toolkit/store/ZustandStore";
function DataKeuangan({mitraId}) {
  const mitra_id = mitraId

  const {detailmitra , setDetailMitra} = mobil((state)=>({
    detailmitra: state.detailmitra,
    setDetailMitra: state.setDetailMitra
  }))

  console.log(`ini adlaahhh`, detailmitra);

  return (
    <div>
      <b>DATA KEUANGAN (Accounting Information)</b>
      <br />
      <br />
      <b>A. PERORANGAN</b>
      <br />
      <br />
      <Row className="align-items-center mb-2">
        <Col sm={4}>
          <Form.Label>
            <b>LAMANYA BEKERJA :</b>
          </Form.Label>
          <Form.Control value={detailmitra?.lama_bekerja} aria-label="Default select example"></Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>JENIS KARTU KREDIT :</b>
          </Form.Label>
          <Form.Select aria-label="Default select example">
            <option>{detailmitra?.jenis_kartu_kredit}</option>
            <option>VISA</option>
            <option>MASTER CARD</option>
            <option>AMERICAN STANDARD</option>
          </Form.Select>
        </Col>
        <Col sm={4}>
          <Form.Label>
            <b>BANK PENERBIT :</b>
          </Form.Label>
          <Form.Select aria-label="Default select example">
            <option>{detailmitra?.bank_penerbit}</option>
            <option>BCA</option>
            <option>BRI</option>
            <option>BNI</option>
            <option>MANDIRI</option>
            <option>PERMATA</option>
          </Form.Select>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <b>B. BADAN USAHA</b>
        </Col>
      </Row>
      <Row className="align-items-center mb-2">
        <Col sm={3}>
          <Form.Label>
            <b>LAPORAN KEUANGAN :</b>
          </Form.Label>
          <Form.Control value={detailmitra?.laporan_keuangan} aria-label="Default select example"></Form.Control>
        </Col>
        <Col sm={3}>
          <Form.Label>
            <b>LAMA USAHA (TAHUN/YEAR) :</b>
          </Form.Label>
          <Form.Select aria-label="Default select example">
            <option>{detailmitra?.lama_usaha}</option>
            <option>TIDAK ADA</option>
            <option>VISA</option>
            <option>MASTER CARD</option>
            <option>AMERICAN STANDARD</option>
          </Form.Select>
        </Col>
        <Col sm={3}>
          <Form.Label>
            <b>STATUS USAHA :</b>
          </Form.Label>
          <Form.Select aria-label="Default select example">
            <option>{detailmitra?.status_usaha}</option>
            <option>TIDAK ADA</option>
            <option>BCA</option>
            <option>BRI</option>
            <option>BNI</option>
            <option>MANDIRI</option>
            <option>PERMATA</option>
          </Form.Select>
        </Col>
        <Col sm={3}>
          <Form.Label>
            <b>OMSET BULANAN :</b>
          </Form.Label>
          <Form.Select aria-label="Default select example">
            <option>{detailmitra?.omset_bulanan}</option>
            <option>TIDAK ADA</option>
            <option>BCA</option>
            <option>BRI</option>
            <option>BNI</option>
            <option>MANDIRI</option>
            <option>PERMATA</option>
          </Form.Select>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={3}>
          <Form.Label>
            <b>PERUSAHAAN AFFILIASI YANG PERNAH MENYEWA DI EUREKA :</b>
          </Form.Label>
          <Form.Control value={detailmitra?.affiliasi} aria-label="Default select example"></Form.Control>
        </Col>
      </Row>
      <br />
      <hr />
      <br />
      <b>DATA UNIT (Unit Data)</b>
      <br />
      <br />
      <Row className="align-items-center">
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>QTY MOTOR :</b>
          </Form.Label>
          <Form.Control
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
            value={detailmitra?.qty_motor}
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>QTY GRANDMAX :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.qty_grandmax}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>QTY L300 :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.qty_l300}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>QTY TRAGA :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.qty_traga}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>QTY CDE :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.qty_cde}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>QTY CDD :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.qty_cdd}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>QTY FUSO :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.qty_fuso}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>QTY WINGBOX :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.qty_wingbox}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>QTY TRAILER 20" :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.qty_trailer20}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>QTY TRAILER 40" :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.qty_trailer40}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
      </Row>
      <br />
      <hr />
      <br />
      <b>DATA SEWA (Order Data)</b>
      <br />
      <br />
      <Row className="align-items-center">
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>BIAYA MOTOR :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.rp_motor}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>BIAYA GRANDMAX :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.rp_grandmax}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>BIAYA L300 :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.rp_l300}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>BIAYA TRAGA :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.rp_traga}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>BIAYA CDE :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.rp_cde}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>BIAYA CDD :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.rp_cdd}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>BIAYA FUSO :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.rp_fuso}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>BIAYA WINGBOX :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.rp_wingbox}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>BIAYA TRAILER 20" :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.rp_trailer20}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
        <Col>
          <Form.Label style={{ fontSize: "10px" }}>
            <b>BIAYA TRAILER 40" :</b>
          </Form.Label>
          <Form.Control
          value={detailmitra?.rp_trailer40}
            style={{ fontSize: "10px" }}
            aria-label="Default select example"
          />
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col sm={3}>
          <Form.Label>
            <b>NILAI RUU (%)</b>
          </Form.Label>
          <Form.Control value={detailmitra?.nilai_ruu} aria-label="Default select example"></Form.Control>
        </Col>
        <Col sm={3}>
          <Form.Label>
            <b>JUMLAH WAKTU PEMBAYARAN (ToP)</b>
          </Form.Label>
          <Form.Control aria-label="Default select example"></Form.Control>
        </Col>
        <Col sm={3}>
          <Form.Label>
            <b>METODE PEMBAYARAN</b>
          </Form.Label>
          <Form.Select aria-label="Default select example">

            <option>TRANSFER</option>
            <option>TUNAI MUKA</option>
            <option>TUNAI / CASH</option>
            <option>CHECK / GIRO</option>
            <option>CREDIT CARD</option>
          </Form.Select>
        </Col>
        <Col sm={3}>
          <Form.Label>
            <b>PERIODE SEWA (BULAN/MONTH)</b>
          </Form.Label>
          <Form.Control aria-label="Default select example"></Form.Control>
        </Col>
      </Row>
    </div>
  );
}

export default DataKeuangan;
