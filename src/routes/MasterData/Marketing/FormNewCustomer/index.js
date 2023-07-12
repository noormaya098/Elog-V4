import React from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';

const { Option } = Select;

const SamplePage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button type="primary">Save and Load Photo Customer</Button>
      </div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Customer Code" name="customerCode">
              <Input placeholder="Enter customer code" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Customer Name" name="customerName">
              <Input placeholder="Enter customer name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Company Name" name="companyName">
              <Input placeholder="Enter company name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Type of Business" name="businessType">
              <Select placeholder="Select type of business">
                <Option value="shoes">Shoes</Option>
                <Option value="paper">Paper</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Office Number" name="officeNumber">
              <Input placeholder="Enter office number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Type of Goods" name="goodsType">
              <Select placeholder="Select type of goods">
                <Option value="shoes">Shoes</Option>
                <Option value="paper">Paper</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Fax" name="fax">
              <Input placeholder="Enter fax number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tahun Berdiri" name="establishmentYear">
              <Input placeholder="Enter establishment year" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Mobile Number" name="mobileNumber">
              <Input placeholder="Enter mobile number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Alamat" name="address">
              <Input placeholder="Enter address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Type of Payment" name="paymentType">
              <Select placeholder="Select type of payment">
                <Option value="credit">Credit</Option>
                <Option value="debit">Debit</Option>
              </Select>
            </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Bank Name" name="bankName">
          <Input placeholder="Enter bank name" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Account Name" name="accountName">
          <Input placeholder="Enter account name" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Account Number" name="accountNumber">
          <Input placeholder="Enter account number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Currency" name="currency">
          <Select placeholder="Select currency">
            <Option value="usd">USD</Option>
            <Option value="idr">IDR</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="NPWP" name="npwp">
          <Input placeholder="Enter NPWP" />
        </Form.Item>
      </Col>
    </Row>
    <div style={{ textAlign: 'center' }}>
      <Button type="primary" htmlType="submit">Save</Button>
    </div>
    </Form>
    </div>
);
};

export default SamplePage;