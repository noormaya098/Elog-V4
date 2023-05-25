import { Form, Input, Select, DatePicker, Button, Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Option } = Select;

const SamplePage = () => {
  const onFinish = (values) => {
    console.log("Form submitted with values:", values);
  };

  const handleNext = () => {
    const blobUrl = "https://imgur.com/fd684d9d-0285-4cdb-b98b-39e4f0e368e6";
    const win = window.open(blobUrl, "_blank");
    win.focus();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          size="large"
          onClick={handleNext}
        >
          Next Order
        </Button>
      </div>
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginBottom: "24px",
        }}
      >
        SALES ORDER
      </div>
      <Form onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="ID Sales Order" name="salesOrder">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Service" name="service">
              <Select style={{ width: "100%" }}>
                <Option value="">--Select Service--</Option>
                <Option value="Service 1">Service 1</Option>
                <Option value="Service 2">Service 2</Option>
                <Option value="Service 3">Service 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Marketing" name="marketing">
              <Select style={{ width: "100%" }}>
                <Option value="">--Select Marketing--</Option>
                <Option value="Marketing 1">Marketing 1</Option>
                <Option value="Marketing 2">Marketing 2</Option>
                <Option value="Marketing 3">Marketing 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Tanggal Muat" name="tanggalMuat">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Tanggal Bongkar" name="tanggalBongkar">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Alamat Invoice" name="alamatInvoice">
              <Select style={{ width: "100%" }}>
                <Option value="">--Select Alamat Invoice--</Option>
                <Option value="Alamat 1">Alamat 1</Option>
                <Option value="Alamat 2">Alamat 2</Option>
                <Option value="Alamat 3">Alamat 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Jenis Barang" name="jenisBarang">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Packing" name="packing">
              <Select style={{ width: "100%" }}>
                <Option value="">--Select Packing--</Option>
                <Option value="Packing 1">Packing 1</Option>
                <Option value="Packing 2">Packing 2</Option>
                <Option value="Packing 3">Packing 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label="Memo" name="memo">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/** add the next step section */}
      <div
        style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            width: "50%",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>Next Steps</h2>
          <p style={{ fontSize: "18px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
            mauris placerat, interdum ipsum eu, pharetra nisi. Vestibulum id
            tortor id tellus vestibulum tristique.
          </p>
          <Button type="primary" size="large" style={{ marginTop: "20px" }}>
            Go to Next Step
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
