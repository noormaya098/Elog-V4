import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const SamplePage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    // lakukan aksi submit form di sini
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Formulir</h1>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item label="SP" name="sp">
          <Input placeholder="Masukkan nomor SP" />
        </Form.Item>
        <Form.Item label="Sales" name="sales">
          <Input placeholder="Masukkan nama sales" />
        </Form.Item>
        <Form.Item label="PH" name="ph">
          <Input placeholder="Masukkan nama PH" />
        </Form.Item>
        <Form.Item label="Customer" name="customer">
          <Input placeholder="Masukkan nama customer" />
        </Form.Item>
        <Form.Item label="Service" name="service">
          <Input placeholder="Masukkan jenis service" />
        </Form.Item>
        <Form.Item label="Tgl Pickup" name="tgl_pickup">
          <Input type="date" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Daftar
          </Button>
          <Button htmlType="button">Reset</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SamplePage;
