import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { Row, Form, FormGroup, Col, Button } from "react-bootstrap";
import Baseurl from "../../../../../Api/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import mobil from "../../../../redux toolkit/store/ZustandStore";

function Index() {
    const { phZustand, setPHZustand } = mobil((state)=>({
        setPHZustand : state.setPHZustand,
        phZustand : state.phZustand
      }));
  const [getawalSP, setgetAwalSP] = useState([]);
  const [noPH, setnoPH] = useState("");
  const [noSPawal, setnogetAwalSP] = useState("");
  const [namaMarketing, setNamaMarketing] = useState("");
  const [namaPerusahaan, setnamaPerusahaan] = useState("");
  const [CompanyID, setCompanyID] = useState("");
  const [alamatInvoice, setAlamatInvoice] = useState([]);
  const [AlamatInvoiceValue, setAlamatInvoiceValue] = useState([]);
  const [diskonselect, setDiskonSelect] = useState("");
  const [diskonselectValue, setDiskonSelectValue] = useState("");
  const [serviceSelect, setServiceSelect] = useState("");
  const [insuranceSelect, setInsuranceSelect] = useState("");
  const [insuranceSelects, setInsuranceSelects] = useState("");
  const [packingValue, setpackingValue] = useState("");
  const [packingValues, setpackingValues] = useState("");
  const [tgl_pickup, setTgl_pickup] = useState("");
  const [tgl_bongkar, setTgl_bongkar] = useState("");
  const [memoValue, setMemoValue] = useState("");
  const [JenisBarang, setJenisBarang] = useState("");
  const history = useHistory();
  const dapetinnosp = async () => {
    const data = await axios.get(
      `${Baseurl}sp/get-SP-select-create?keyword=&companyId=${CompanyID}&kode_cabang=JKT&divisi=sales`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const noSP = data.data.data;
    setgetAwalSP(noSP);
    setnogetAwalSP(data.data.data.noSP);
    setnoPH(data.data.data.noPH);
    setPHZustand(data.data.data.noPH)
    setNamaMarketing(data.data.data.marketing);
    setnamaPerusahaan(data.data.data.company);
    setAlamatInvoice(data.data.data.address);
    setDiskonSelect(data.data.data.discount);
    setServiceSelect(data.data.data.service);
    setInsuranceSelect(data.data.data.insurance);
    setpackingValue(data.data.data.packing);
    console.log(`jenis barang`, JenisBarang);
    console.log(`dnoSP`, alamatInvoice);
  };
  useEffect(() => {
    dapetinnosp();
  }, [CompanyID]);

  const createspAwal = async () => {
    try {
      const response = await axios.post(
        `${Baseurl}sp/create-SP`,
        {
          ph: noPH,
          msp: noSPawal,
          memo: memoValue,
          id_customer: CompanyID,
          jenis_barang: JenisBarang,
          packing: packingValues,
          asuransi: insuranceSelects,
          tgl_pickup: tgl_pickup,
          tgl_bongkar: tgl_bongkar,
          service: AlamatInvoiceValue,
          alamat_invoice: AlamatInvoiceValue,
          diskon: diskonselectValue,
          asuransi_fee: 0,
          total_keseluruhan: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.data) {
        const idmp = response.data.idmp; // get the idmp from the response
        console.log(idmp); // log it or do whatever you want with it
        history.push(`/masterdata/edit-sp/${idmp}`); // redirect
      }
    } catch (error) {
      console.error(error); // handle the error
    }
  };

  return (
    <div>
      <Card>
        <h3>Buat SP</h3>
        <Form>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <Form.Label>No. SP</Form.Label>
                <Form.Control disabled value={noSPawal}></Form.Control>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Form.Label>Marketing</Form.Label>
                <Form.Select>
                  <option>Select Marketing</option>
                  {namaMarketing &&
                    namaMarketing.map((item) => (
                      <option>{item?.fullname}</option>
                    ))}
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm={6}>
              <FormGroup>
                <Form.Label>Nama Perusahaan</Form.Label>
                <Form.Select
                  placeholder="test"
                  onChange={(e) => {
                    const item = JSON.parse(e.target.value);
                    dapetinnosp(item.id);
                    setCompanyID(item.id);
                    setJenisBarang(item.companyStuff);
                    console.log(item.id);
                  }}
                >
                  <option>Select Nama Perusahaan</option>
                  {namaPerusahaan &&
                    namaPerusahaan.map((item) => (
                      <option value={JSON.stringify(item)} id={item.id}>
                        {item.companyName}
                      </option>
                    ))}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup>
                <Form.Label>Tanggal Pickup</Form.Label>
                <Form.Control
                  onChange={(e) => setTgl_pickup(e.target.value)}
                  type="date"
                ></Form.Control>
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup>
                <Form.Label>Tanggal Bongkar</Form.Label>
                <Form.Control
                  onChange={(e) => setTgl_bongkar(e.target.value)}
                  type="date"
                ></Form.Control>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm={6}>
              <FormGroup>
                <Form.Label>Alamat Invoice</Form.Label>
                <Form.Select
                  onChange={(e) => setAlamatInvoiceValue(e.target.value)}
                >
                  <option>Alamat Invoice</option>

                  {Array.isArray(alamatInvoice) &&
                    alamatInvoice.map((item) => (
                      <option value={item.address}>{item.address}</option>
                    ))}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormGroup>
                <Form.Label>Jenis Barang</Form.Label>
                <Form.Control
                  value={JenisBarang}
                  type="text"
                  disabled
                ></Form.Control>
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormGroup>
                <Form.Label>Diskon %</Form.Label>
                <Form.Select
                  onChange={(e) => setDiskonSelectValue(e.target.value)}
                  type="text"
                >
                  <option>Pilih discount</option>
                  {diskonselect &&
                    diskonselect.map((item) => (
                      <option value={item.value}>{item.discount}</option>
                    ))}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormGroup>
                <Form.Label>Diskon Amount</Form.Label>
                <Form.Control type="text"></Form.Control>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm={4}>
              <FormGroup>
                <Form.Label>Service</Form.Label>
                <Form.Select type="text">
                  <option>Pilih Service</option>
                  {serviceSelect &&
                    serviceSelect.map((item) => <option>{item.tipe}</option>)}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Form.Label>Insurance</Form.Label>
                <Form.Select
                  onChange={(e) => setInsuranceSelects(e.target.value)}
                  type="text"
                >
                  <option>Pilih Asuransi</option>
                  {insuranceSelect &&
                    insuranceSelect.map((item) => (
                      <option value={item.value}>{item.tipe}</option>
                    ))}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Form.Label>Packing Request</Form.Label>
                <Form.Select
                  onChange={(e) => setpackingValues(e.target.value)}
                  type="text"
                >
                  <option>Pilih Packing</option>
                  {packingValue &&
                    packingValue.map((item) => (
                      <option value={item.id}>{item.packing}</option>
                    ))}
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm={12}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>Isi Memo</Form.Label>
                <Form.Control
                  onChange={(e) => setMemoValue(e.target.value)}
                  type="text"
                  style={{ height: "100px" }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Button onClick={createspAwal} className="mt-5" size="md">
          Submit
        </Button>
      </Card>
    </div>
  );
}

export default Index;
