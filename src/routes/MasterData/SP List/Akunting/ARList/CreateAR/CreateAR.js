import { Button, Card, Form, Input, DatePicker, Select } from 'antd';
import React from 'react'
import dayjs from 'dayjs';
import { Row, Col, Table } from 'react-bootstrap'
import TextArea from 'antd/lib/input/TextArea';
import { SaveOutlined } from '@ant-design/icons';


function CreateAR() {
  return (
    <div>
      <Card>
        <Col className='d-flex justify-content-end'>
          <Button style={{ backgroundColor: "#00a65a", color: "white" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <SaveOutlined style={{fontSize: "15px", marginRight: "5px" }} /> Save
          </span>
          </Button>
        </Col>

        <Row style={{ marginTop: "-30px" }}>
          <Col sm={4}>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Form.Item
                label="No AR :"
                name="username"

              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Customer :"
                name="username"

              >
                <Select />
              </Form.Item>
              <Form.Item
                label="Partner :"
                name="username"

              >
                <Select />
              </Form.Item>
            </Form>
          </Col>
          <Col sm={4}>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Form.Item
                label="Pilih Cabang :"
                name="username"

              >
                <Select />
              </Form.Item>
              <Form.Item
                label="PIC : (kosongkan jika tidak perlu) :"
                name="username"

              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Via :"
                name="username"

              >
                <Select />
              </Form.Item>
            </Form>
          </Col>
          <Col sm={4}>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Form.Item

                label="Date AR :"
                name="username"

              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD HH:mm:ss"
                  // disabledDate={disabledDate}
                  // disabledTime={disabledDateTime}
                  showTime={{
                    defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Alamat Invoice :"
                name="username"

              >
                <Select />
              </Form.Item>
              <Row>
                <Col sm={6}>
                  <Form.Item
                    label="No SM :"
                    name="username"

                  >
                    <Select />
                  </Form.Item>
                </Col>
                <Col sm={6}>
                  <Form.Item
                    label="No SM-XTRA :"
                    name="username"

                  >
                    <Select />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Row>
            <Col sm={3}>
              <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Form.Item
                  label="ToP :"
                  name="username"

                >
                  <Input />
                </Form.Item>
              </Form>
            </Col>
            <Col sm={3}>
              <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Form.Item
                  label="PPN (%) :"
                  name="username"

                >
                  <Select />
                </Form.Item>
              </Form>
            </Col>
            <Col sm={3}>
              <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Form.Item
                  label="PPH 23 :"
                  name="username"

                >
                  <Input />
                </Form.Item>
              </Form>
            </Col>
            <Col sm={3}>
              <Form
                style={{ height: '200px' }}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Form.Item
                  style={{ height: "300px" }}
                  label="Memo :"
                  name="username"

                >
                  <TextArea rows={4} />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>SM Number</th>
              <th>Item</th>
              <th>TD</th>
              <th>TA</th>
              <th>SJ/DO</th>
              <th>Koli</th>
              <th>Exp</th>
              <th>Berat</th>
              <th>Harga</th>
              <th>Operasi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  )
}

export default CreateAR