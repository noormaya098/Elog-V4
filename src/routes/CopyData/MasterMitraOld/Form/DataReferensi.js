import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
// import { httpClient } from "../../../util/Api";
import { httpClient } from "../../../../Api/Api";

function DataReferensi({ mitraId }) {
  const id_mitras = mitraId;
  const [datareverensis, setDataReference] = useState([]);
  const [detailmitra, setDetailMitra] = useState({});

  useEffect(() => {
    const datareverensi = async () => {
      httpClient
        .get(`mitra/get-detail-mitra?id_mitra=${id_mitras}`)
        .then(({ data }) => {
          if (data.status.code === 200) {
            setDataReference(data.data);
            setDetailMitra(data.data);
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    datareverensi();
  }, []);

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
                <option value="1">
                  {datareverensis?.akta_perubahan_dasar}
                </option>
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
                <option value="1">
                  {datareverensis?.akta_susunan_direksi}
                </option>
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
                <option value="1">{datareverensis?.surat_domisili}</option>
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
                <option value="1">{datareverensis?.npwp_legalitas}</option>
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
                <option value="1">{datareverensis?.skt_legalitas}</option>
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
                <option value="1">{datareverensis?.nppkp_legalitas}</option>
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
                <option value="1">{datareverensis?.siup_legalitas}</option>
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
                <option value="1">{datareverensis?.ijin_pendirian}</option>
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
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>IJIN USAHA TETAP DARI BPKM</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.ijin_usaha}</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>TDP</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.tdp_legalitas}</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>SURAT KUASA (PENANDATANGAN KONTRAK BUKAN DIREKSI)</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.surat_kuasa}</option>
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
