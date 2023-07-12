import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import axios from "axios";
import Baseurl from "../../../../Api/BaseUrl";
import { Col, Row } from "react-bootstrap";

function DataProfile({ mitraId, onSubmit }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Success:', values);

    try {
      const response = await axios.post(
        `${Baseurl}mitra/edit-mitra-pic`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem(`token`),
          },
        }
      )
    } catch (error) {
      console.error('Failed to edit mitra:', error);
    }
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const DetailMitra = async () => {
      const data = await axios.get(`${Baseurl}mitra/get-detail-mitra?id_mitra=${mitraId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem(`token`),
          },
        })
      console.log(data.data.data.jenis);
      form.setFieldsValue({
        jenis: data.data.data.jenis,
        kode_mitra: data.data.data.kode_mitra
      })
    }
    DetailMitra()
  }, [])

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col sm={2}>
            <Form.Item
              label="Kode Mitra"
              name="kode_mitra"

              rules={[{ required: false, message: 'Please input your password!' }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col sm={2}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: false, message: 'Please input your jenis!' }]}
            >
              <Select />
            </Form.Item>
          </Col>
          <Col sm={4}>
            <Form.Item
              label="jenis"
              name="jenis"
              rules={[{ required: false, message: 'Please input your jenis!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={4}>
            <Form.Item
              label="Kode Perusahaan (Singkatan Mitra Name)"
              name="jenis"
              rules={[{ required: false, message: 'Please input your jenis!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>




        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default DataProfile;
