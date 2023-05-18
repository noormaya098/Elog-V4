import React from "react";
import { Form, Row, Col } from "react-bootstrap";

function DataReferensi() {
  return (
    <div>
      <br />
      <h5>
        <b>DATA REFERENSI PELANGGAN (Customer Reference Data)</b>
      </h5>
      <br />
      <hr />
      <br />
      <Row>
        <Col sm={6}>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>PURCHASE ORDER</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>KTP PENANDATANGAN</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA PENDIRIAN</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA PENDIRIAN</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA PERUBAHAN DASAR TERBARU</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA SUSUNAN DIREKSI TERBARU</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>SURAT DOMISILI</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>NPWP</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>SKT</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>NPPKP / SPPKP</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>NIB (SIUP/SIUB/SIUJK/SIUPAL)</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>IJIN PENDIRIAN KPPA</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
           <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>PERSETUJUAN PENANAMAN MODAL DARI BPKM</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>-</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default DataReferensi;
