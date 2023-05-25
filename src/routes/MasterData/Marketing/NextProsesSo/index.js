import React from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";

const { Option } = Select;

const SamplePage = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1>Form Example</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nama Lengkap"
              name="nama"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukkan nama lengkap Anda",
                },
              ]}
            >
              <Input placeholder="Masukkan nama lengkap" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukkan email Anda",
                },
                {
                  type: "email",
                  message: "Masukkan email yang valid",
                },
              ]}
            >
              <Input placeholder="Masukkan email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nomor Telepon"
              name="telepon"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukkan nomor telepon Anda",
                },
              ]}
            >
              <Input placeholder="Masukkan nomor telepon" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Alamat"
              name="alamat"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukkan alamat Anda",
                },
              ]}
            >
              <Input placeholder="Masukkan alamat" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Kota"
              name="kota"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukkan kota Anda",
                },
              ]}
            >
              <Input placeholder="Masukkan kota" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Provinsi"
              name="provinsi"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukkan provinsi Anda",
                },
              ]}
            >
              <Input placeholder="Masukkan provinsi" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Kode Pos"
              name="kodePos"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukkan kode pos Anda",
                },
              ]}
            >
              <Input placeholder="Masukkan kode pos" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Negara"
              name="negara"
              rules={[
                {
                  required: true,
                  message: "Silahkan pilih negara Anda",
                },
              ]}
            >
              <Select placeholder="--Pilih Negara--">
                <Option value="indonesia">Indonesia</Option>
                <Option value="singapura">Singapura</Option>
                <Option value="malaysia">Malaysia</Option>
                <Option value="thailand">Thailand</Option>
                <Option value="vietnam">Vietnam</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Kode Pos"
              name="kodePos"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukkan kode pos Anda",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} md={12}>
            <Form.Item
              label="Alamat Pengiriman"
              name="alamatPengiriman"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukkan alamat pengiriman Anda",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Negara"
              name="negaraPengiriman"
              rules={[
                {
                  required: true,
                  message: "Silahkan pilih negara pengiriman Anda",
                },
              ]}
            >
              <Select placeholder="--Pilih Negara--">
                <Option value="indonesia">Indonesia</Option>
                <Option value="singapura">Singapura</Option>
                <Option value="malaysia">Malaysia</Option>
                <Option value="thailand">Thailand</Option>
                <Option value="vietnam">Vietnam</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SamplePage;
