import { Button, Card, Form, Input, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Select } from "antd";
import DataFormCreateAP from "./DataFormCreateAP";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { httpClient } from "../../../../../Api/Api";
import Baseurl from "../../../../../Api/BaseUrl";
import SJ from "../../../Purchasing/SP/SJ";
import Item from "antd/lib/list/Item";

function DetailAPList() {
  const [DataTambah, setDataTambah] = useState("");
  const [ViaData, setDataVia] = useState("");
  const [mitraId, setmitraId] = useState("");
  const [keywordSj, setKeywordSj] = useState("");
  const [SJList, setSJList] = useState([]);
  const [formData, setFormData] = useState(null);

  let nomor = 1;

  const fetchData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}ap/get-select-ap?mitraId=${mitraId}&keyword=${keywordSj}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", respons.data.data.sj);
      console.log("responssssscarismid", respons.data.data.sj);

      setDataTambah(respons.data.data);
      setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };
  const handleAdd = (e) => {
    httpClient
      .get(`${Baseurl}ap/get-data-sm?idSm=${e}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setFormData(data);
          console.log("hiiii", data);
        } else {
          console.log("Error: ", data.status.message);
        }
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  };

  const SJListOptions = Array.isArray(SJList)
    ? SJList.map((Item) => ({
        label: Item.sj,
        value: Item.smId,
      }))
    : [];

  useEffect(() => {
    fetchData();
  }, [mitraId]);

  const pindah = useHistory();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const tombolEdit = () => {
    pindah.push(`/akunting/editapplist`);
  };

  return (
    <div>
      <h3>Detail AP List</h3>

      <Card>
        {/* Tab Pertama */}
        <Row>
          <Col md={1}>
            <Button style={{ backgroundColor: "transparent", color: "black" }}>
              PT : {DataTambah.PT}
            </Button>
          </Col>
          <Col sm={2} style={{ marginRight: "30px" }}>
            <Button style={{ backgroundColor: "transparent", color: "black" }}>
              ID USER : {DataTambah.IdUser} ({DataTambah.namaUser})
            </Button>
          </Col>
          <Col sm={1} style={{ marginLeft: "4px" }}>
            <Button style={{ backgroundColor: "green", color: "white" }}>
              Update
            </Button>
          </Col>
          <Col sm={1} style={{ marginLeft: "-5px" }}>
            <Button style={{ backgroundColor: "#3c8dbc", color: "white" }}>
              Cetak AP
            </Button>
          </Col>
          <Col sm={2}>
            <Button
              style={{
                backgroundColor: "#dd4b39",
                borderColor: "#d73925",
                color: "white",
              }}
            >
              Export to Jurnal.id (ELOGS)
            </Button>
          </Col>
          <Col sm={2}>
            <Button
              style={{
                backgroundColor: "#00c0ef",
                color: "white",
                borderColor: "#00acd6",
              }}
            >
              Print Format Jurnal.id (ELOGS)
            </Button>
          </Col>
          {/* <Col
            sm={2}
            className="d-flex justify-content-end"
            style={{ marginLeft: "50px" }}
          >
            <Button style={{ backgroundColor: "green", color: "white" }}>
              Save
            </Button>
          </Col> */}
        </Row>

        {/* Tab Kedua */}
        <Row gutter={16}>
          <Col sm={5} style={{ marginLeft: "10px" }}>
            <Form.Item
              label="No AP :: "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Input.Group compact style={{ marginLeft: "10px" }}>
                <Input value={DataTambah.NoInvoice} style={{ width: "90%" }} />
                {/* <Button style={{ width: "15%" }} type="primary">
                  Show!
                </Button> */}
              </Input.Group>
            </Form.Item>
          </Col>
          <Col sm={3}>
            <Form.Item
              label="Invoice Date ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Input.Group compact style={{ marginLeft: "10px" }}>
                <DatePicker style={{ width: "100%" }} />
              </Input.Group>
            </Form.Item>
          </Col>
          <Col sm={3} style={{ marginLeft: "10px" }}>
            <Form.Item
              label="Receive Invoice ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Input.Group compact style={{ marginLeft: "20px" }}>
                <DatePicker style={{ width: "100%" }} />
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>

        {/* Tab KeTiga */}
        <Row gutter={16}>
          <Col sm={5} style={{ marginLeft: "10px" }}>
            <Form.Item
              label="Partner ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Select
                showSearch
                placeholder="-----"
                optionFilterProp="children"
                style={{ width: "90%", marginLeft: "10px" }}
                onChange={(e) => setmitraId(e)}
              >
                {DataTambah &&
                  DataTambah.mitra.map((MitraItem) => (
                    <Select.Option value={MitraItem.value}>
                      {MitraItem.mitra}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col sm={3} style={{ marginRight: "20px" }}>
            <Form.Item
              label="Via ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Select
                placeholder="Pilih Via"
                showSearch
                optionFilterProp="children"
                style={{ width: "100%", marginLeft: "10px" }}
                onChange={(e) => setDataVia(e)}
              >
                {DataTambah &&
                  DataTambah.via.map((ViaItem) => (
                    <option value={nomor++}>{ViaItem.via}</option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col sm={3}>
            <Form.Item
              label="Service ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Select
                placeholder="------"
                optionFilterProp="children"
                style={{ width: "100%", marginLeft: "10px" }}
              >
                {DataTambah &&
                  DataTambah.service.map((ServiceItem) => (
                    <Select.Option value={nomor++}>
                      {ServiceItem.service}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Tab Keempat */}
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col className="gutter-row" sm={2} style={{ marginLeft: "15px" }}>
            <Form.Item
              label="Mitra Invoice ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Input
                style={{ marginLeft: "10px" }}
                placeholder="Mitra Invoice"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={2} style={{ marginLeft: "20px" }}>
            <Form.Item
              label="ToP ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Input style={{ marginLeft: "10px" }} placeholder="ToP" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={2} style={{ marginLeft: "20px" }}>
            <Form.Item
              label="PPn % ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Select
                placeholder="PPn %"
                optionFilterProp="children"
                style={{ width: "100%", marginLeft: "10px" }}
              >
                {DataTambah &&
                  DataTambah.PPn.map((Item) => (
                    <Select.Option value={Item.Value}>{Item.PPn}</Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={2} style={{ marginLeft: "20px" }}>
            <Form.Item
              label="PPh 23 ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Input style={{ marginLeft: "10px" }} placeholder="PPh 23" />
            </Form.Item>
          </Col>
          <br />
          <Col className="gutter-row" sm={2} style={{ marginLeft: "20px" }}>
            <Form.Item
              label="Jenis PPh ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Select
                placeholder="PPn %"
                optionFilterProp="children"
                style={{ width: "100%", marginLeft: "10px" }}
              >
                {DataTambah &&
                  DataTambah.jenisPPh.map((JenisItem) => (
                    <Select.Option value={JenisItem.Value}>
                      {JenisItem.jenis}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Tab KeLima */}
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col className="gutter-row" sm={2} style={{ marginLeft: "15px" }}>
            <Form.Item
              label="No Faktur Pajak ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Input
                style={{ marginLeft: "10px" }}
                placeholder="No Faktur Pajak  "
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={2} style={{ marginLeft: "20px" }}>
            <Form.Item
              label="Memo ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Input
                style={{ marginLeft: "10px" }}
                placeholder="Create your memo"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={2} style={{ marginLeft: "20px" }}>
            <Form.Item
              label="Sumber ::  "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Select
                placeholder="Sumber"
                optionFilterProp="children"
                style={{ width: "100%", marginLeft: "10px" }}
              >
                {DataTambah &&
                  DataTambah.sumber.map((SumberItem) => (
                    <Select.Option value={nomor++}>
                      {SumberItem.sumber}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <br />
          <Col sm={2} style={{ marginLeft: "20px" }}>
            <Form.Item
              label="No Inv Mitra :: "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Input.Group compact style={{ marginLeft: "10px" }}>
                <Select
                  showSearch
                  optionFilterProp="children"
                  style={{ width: "70%" }}
                ></Select>
                <Button style={{ width: "30%" }} type="danger">
                  Add
                </Button>
              </Input.Group>
            </Form.Item>
          </Col>
          <Col sm={2} style={{ marginLeft: "20px" }}>
            <Form.Item
              label="No SM :: "
              labelCol={{ span: 24 }}
              style={{ fontWeight: "bold" }}
            >
              <Input.Group compact style={{ marginLeft: "10px" }}>
                <Select
                  showSearch
                  optionFilterProp="children"
                  style={{ width: "70%" }}
                  onChange={(e) => {
                    handleAdd(e);
                    console.log(e);
                  }}
                >
                  {SJListOptions &&
                    SJListOptions.map((SumberItem) => (
                      <Select.Option value={SumberItem.value}>
                        {SumberItem.label}
                      </Select.Option>
                    ))}
                </Select>
                <Button
                  style={{ width: "30%" }}
                  type="danger"
                  onClick={(e) => {
                    handleAdd(e);
                    console.log(e);
                  }}
                >
                  Add
                </Button>
              </Input.Group>
            </Form.Item>
          </Col>
          {<DataFormCreateAP formData={formData} />}
        </Row>

        {/* Table */}
        {/* <DataFormCreateAP /> */}
      </Card>
    </div>
  );
}

export default DetailAPList;
