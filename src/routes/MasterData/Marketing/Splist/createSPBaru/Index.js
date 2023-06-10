import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { Row, Form, FormGroup, Col, Button } from "react-bootstrap";
import Baseurl from "../../../../../Api/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import mobil from "../../../../redux toolkit/store/ZustandStore";
import Select from 'react-select';
import { DatePicker } from 'antd';

function Index() {
  const { RangePicker } = DatePicker;
  // const { Item: FormItem } = Form;
  const { phZustand, setPHZustand } = mobil((state) => ({
    setPHZustand: state.setPHZustand,
    phZustand: state.phZustand
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
  const [serviceSelectValue, setServiceSelectValue] = useState("");
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
          service: serviceSelectValue,
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

  const handleDatesChange = (dates, dateStrings) => {
    setTgl_pickup(dateStrings[0]); // nilai pertama untuk tgl_pickup
    setTgl_bongkar(dateStrings[1]); // nilai kedua untuk tgl_bongkar
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
                <Form.Label>Nama Pelanggan</Form.Label>
                <Select
                  placeholder="Select Nama Perusahaan"
                  options={namaPerusahaan && namaPerusahaan.map(item => ({ label: item.companyName, value: item.id, item }))}
                  onChange={selectedOption => {
                    dapetinnosp(selectedOption.value);
                    setCompanyID(selectedOption.value);
                    setJenisBarang(selectedOption.item.companyStuff);
                    console.log(selectedOption.value);
                  }}
                />
              </FormGroup>
            </Col>

            <Col sm>
              <Form.Label>Tanggal Pickup - Tanggal Bongkar</Form.Label>
              <br/>
              <RangePicker onChange={handleDatesChange} />
            </Col>
            {/* <Col sm={3}>
        <Form.Label label="Tanggal Bongkar">
          <RangePicker onChange={handleBongkarChange} />
        </Form.Label>
      </Col> */}
          </Row>
          <Row className="mt-2">
            <Col sm={6}>
              <FormGroup>
                <Form.Label>Alamat Invoice</Form.Label>
                <Select
                  placeholder="Alamat Invoice"
                  options={Array.isArray(alamatInvoice) ? alamatInvoice.map(item => ({ label: item.address, value: item.address })) : []}
                  onChange={selectedOption => setAlamatInvoiceValue(selectedOption.value)}
                />
              </FormGroup>
            </Col>

            <Col sm>
              <FormGroup>
                <Form.Label>Jenis Barang</Form.Label>
                <Form.Control
                  value={JenisBarang}
                  type="text"
                  disabled
                ></Form.Control>
              </FormGroup>
            </Col>
            {/* <Col sm={2}>
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
                <Form.Control

                  type="text"></Form.Control>
              </FormGroup>
            </Col> */}
          </Row>
          <Row className="mt-2">
            <Col sm={4}>
              <FormGroup>
                <Form.Label>Service</Form.Label>
                <Form.Select onChange={(e) => setServiceSelectValue(e.target.value)} type="text">
                  <option>Pilih Service</option>
                  {serviceSelect &&
                    serviceSelect.map((item) => <option value={item.tipe}>{item.tipe}</option>)}
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
