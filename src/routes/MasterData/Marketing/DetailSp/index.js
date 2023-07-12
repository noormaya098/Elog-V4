import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  Table,
} from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

const SamplePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickupAddress, setPickupAddress] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = (values) => {
    // do something with the form data
    console.log(values);
    setIsModalVisible(false);
  };

  const handleAddAddress = () => {
    // add a new pickup address to the list
    setPickupAddress([...pickupAddress, ""]);
  };

  const handleAddressChange = (index, value) => {
    // update the pickup address at the given index
    const updatedAddress = [...pickupAddress];
    updatedAddress[index] = value;
    setPickupAddress(updatedAddress);
  };

  const handleRemoveAddress = (index) => {
    // remove the pickup address at the given index
    const updatedAddress = [...pickupAddress];
    updatedAddress.splice(index, 1);
    setPickupAddress(updatedAddress);
  };

  const handleCancelDO = () => {
    // display an alert to confirm cancellation of DO
    const confirmation = window.confirm(
      "Are you sure you want to cancel this DO?"
    );
    if (confirmation) {
      // do something if user confirms cancellation
      console.log("DO cancelled");
    }
  };
  const AddAddressModal = ({ visible, onCancel, onSave }) => {
    const [form] = Form.useForm();

    const handleAddAddressModalOk = () => {
      form.submit();
    };

    const handleFormFinish = (values) => {
      onSave(values);
    };
  };

  return (
    <>
      <Modal
        title="Add Address"
        visible={visible}
        onCancel={onCancel}
        onOk={handleAddAddress}
      >
        <Form form={Form} onFinish={handleFormFinish}>
          <Form.Item
            label="Destination Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Vehicle"
            name="vehicle"
            rules={[{ required: true, message: "Please select a vehicle" }]}
          >
            <Select>
              <Option value="vehicle-1">Vehicle 1</Option>
              <Option value="vehicle-2">Vehicle 2</Option>
              <Option value="vehicle-3">Vehicle 3</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <div>
        <Button type="primary" onClick={showModal}>
          Edit Form
        </Button>
        <div style={{ float: "right" }}>
          <Button type="primary" style={{ background: "blue", marginRight: 8 }}>
            Insurance
          </Button>
          <Button
            type="primary"
            style={{ background: "red", marginRight: 8 }}
            onClick={handleCancelDO}
          >
            Cancel DO
          </Button>
          <Button
            type="primary"
            style={{ background: "green" }}
            onClick={() => handleSave()}
          >
            Save Form
          </Button>
        </div>

        <Modal
          title="Edit Form"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="save" type="primary" onClick={() => form.submit()}>
              Save
            </Button>,
          ]}
        >
          <Form
            onFinish={handleSave}
            initialValues={{
              "no-spk": "",
              marketing: "",
              "foto-driver": "",
              "no-sp": "",
              service: "",
              "no-request": "",
              "order-date": "",
              customer: "",
              "pickup-date": "",
              "alamat-invoice": "",
              "telp-customer": "",
            }}
          >
            <Form.Item label="No. SPK" name="no-spk">
              <Input />
            </Form.Item>
            <Form.Item label="Marketing" name="marketing">
              <Input />
            </Form.Item>
            <Form.Item label="Foto Driver" name="foto-driver">
              <Input />
            </Form.Item>
            <Form.Item label="No. SP" name="no-sp">
              <Input />
            </Form.Item>
            <Form.Item label="Service" name="service">
              <Select>
                <Option value="service-1">Service 1</Option>
                <Option value="service-2">Service 2</Option>
                <Option value="service-3">Service 3</Option>
              </Select>
            </Form.Item>
            <Form.Item label="No. Request" name="no-request">
              <Input />
            </Form.Item>
            <Form.Item label="Order Date" name="order-date">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Customer" name="customer">
              <Input />
            </Form.Item>
            <Form.Item label="Pickup Date" name="pickup-date">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Alamat Invoice" name="alamat-invoice">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Telp. Customer" name="telp-customer">
              <Input />
            </Form.Item>
          </Form>

          <div style={{ marginTop: 16 }}>
            <Card title="Pickup Address">
              {pickupAddress.map((address, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Input
                    value={address}
                    onChange={(e) => handleAddressChange(index, e.target.value)}
                  />
                  {pickupAddress.length > 1 && (
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleRemoveAddress(index)}
                      style={{ marginLeft: 8 }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="primary"
                onClick={handleAddAddress}
                style={{ marginTop: 8 }}
              >
                Add Address
              </Button>
            </Card>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default SamplePage;
