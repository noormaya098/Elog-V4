import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  InputNumber,
  Row,
  Col,
  Card,
  Space,
  Table,
  Tag,
} from "antd";
import { httpClient } from "../../util/Api";

const { Option } = Select;
const { Column } = Table;

const SamplePage = () => {
  const data = [];
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <>
      <h1>AP Addon Update</h1>
      <Row>
        <Col md={24}>
          <Card>
            <Row>
              <Col md={3}>
                <Button>Cetak Biaya Bongkar</Button>
              </Col>
              <Col md={3}>
                <Button>ID USER: </Button>
              </Col>
              <Col md={3}>
                <Button type="primary">Update</Button>
              </Col>
              <Col md={6}>
                <Button>Edit Biaya Bongkar</Button>
              </Col>
              <Col md={3} style={{ alignSelf: "end" }}>
                <Button type="primary">Save</Button>
              </Col>
            </Row>
            <Form>
              <Row>
                <Col md={12}>
                  <Form.Item label="No AP :" name="layout">
                    <Space.Compact
                      style={{
                        width: "100%",
                      }}
                    >
                      <Input
                        placeholder="1765/AP/LOG/IV/2023"
                        style={{ height: 36 }}
                      />
                      <Button type="primary">Show !</Button>
                    </Space.Compact>
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item label="Invoice Date :" name="layout">
                    <DatePicker
                      onChange={onChange}
                      showTime={{ format: "HH:mm" }}
                    />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item label="Receive Invoice :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Item label="Partners :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item label="Via :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item label="Service :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Item label="Mitra Invoice :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
                <Col md={4}>
                  <Form.Item label="ToP :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
                <Col md={4}>
                  <Form.Item label="PPn % :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
                <Col md={4}>
                  <Form.Item label="PPh 23 :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
                <Col md={4}>
                  <Form.Item label="Jenis PPh :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Item label="No Faktur Pajak :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item label="Memo :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item label="Sumber" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item label="No SM :" name="layout">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Row>
              <Col md={24}>
                <Table dataSource={data}>
                  <Column title="No" dataIndex="age" key="age" />
                  <Column title="Customer" dataIndex="age" key="age" />
                  <Column title="Tujuan" dataIndex="address" key="address" />
                  <Column
                    title="Jenis Barang"
                    dataIndex="address"
                    key="address"
                  />
                  <Column title="Jumlah" dataIndex="address" key="address" />
                  <Column title="TD" dataIndex="address" key="address" />
                  <Column title="TA" dataIndex="address" key="address" />
                  <Column
                    title="Harga (Rp)"
                    dataIndex="address"
                    key="address"
                  />
                  <Column title="Operasi" dataIndex="address" key="address" />
                </Table>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SamplePage;
