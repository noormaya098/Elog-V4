import React from 'react';
import { Form, Input, Button, Select, DatePicker, Upload } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const SamplePage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Form Klaim</h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ pengajuan: 'klaim', divisi: 'IT' }}
      >
        <Form.Item label="PT">
          <Input.Group compact>
            <Select style={{ width: '40%' }}>
              <Option value="pt-a">PT A</Option>
              <Option value="pt-b">PT B</Option>
            </Select>
            <Input style={{ width: '60%' }} placeholder="Nomor Pengajuan" />
          </Input.Group>
        </Form.Item>
        <Form.Item label="Pemohon">
          <Select defaultValue="pemohon-a">
            <Option value="pemohon-a">Pemohon A</Option>
            <Option value="pemohon-b">Pemohon B</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Divisi">
          <Select defaultValue="IT">
            <Option value="IT">IT</Option>
            <Option value="HRD">HRD</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Nomor Surat">
          <Input.Group compact>
            <Input style={{ width: '35%' }} />
            <Input style={{ width: '35%' }} />
            <DatePicker style={{ width: '30%' }} />
          </Input.Group>
        </Form.Item>
        <Form.Item label="Perihal">
          <Input.Group compact>
            <Input style={{ width: '70%' }} />
            <DatePicker style={{ width: '30%' }} />
          </Input.Group>
        </Form.Item>
        <Form.Item label="Judul Surat">
          <Input />
        </Form.Item>
        <Form.Item label="Isi Surat">
          <TextArea rows={10} />
        </Form.Item>
        <Form.Item label="Hasil Biaya">
          <Input.Group>
            <Select defaultValue="DPP">
              <Option value="DPP">DPP</Option>
              <Option value="PPN">PPN</Option>
            </Select>
            <Input placeholder="Jumlah" style={{ width: '30%' }} />
            <Button type="primary" style={{ marginLeft: '1rem' }}>
              Add
            </Button>
          </Input.Group>
          <div style={{ marginTop: '1rem' }}>
            <Input.Group compact>
              <Input style={{ width: '30%' }} />
              <Input style={{ width: '30%' }} />
              <Input style={{ width: '30%' }} disabled />
            </Input.Group>
          </div>
        </Form.Item>
        <Form.Item label="Otorisasi">
          <Select defaultValue="otoritas-a">
            <Option value="otoritas-a">Otoritas A</Option>
            <Option value="otoritas-b">Otoritas B</Option>
          </Select>
          <Button type="primary" style={{ marginLeft: '1rem' }}>
            Add
          </Button>
        </Form.Item>
        <Form.Item label="Lampiran">
          <Upload>
            <Button type="primary" icon={<UploadOutlined />}>
            Upload
            </Button>
            </Upload>
            </Form.Item>
            </Form>
            </div>
);
};

export default SamplePage;
