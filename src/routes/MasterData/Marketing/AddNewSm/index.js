import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Button, InputNumber } from "antd";
import { httpClient } from "../../util/Api";

const { Option } = Select;

const SamplePage = () => {
  const [order, setOrder] = useState([]);

  const onFinish = (values) => {
    console.log("Form submitted with values:", values);
  };

  useEffect(() => {
    httpClient
      .get("sp/get-SP?limit=10&page=1&keyword=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrder(data.data.order);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  return (
    <form onFinish={onFinish} layout="vertical">
      <Form.Item label="No.SP">
        <Select>
          <Option value="">--Select No.SP--</Option>
          {order.map((item) => (
            <Option value="No.SP 1">{order.sp}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Pickup Date" name="pickupDate">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Customer" name="customer">
        <Input />
      </Form.Item>

      <Form.Item label="DO/SJ" name="doSj">
        <Input />
      </Form.Item>

      <Form.Item label="Service" name="service">
        <Select>
          <Option value="">--Select Service--</Option>
          <Option value="Service 1">Service 1</Option>
          <Option value="Service 2">Service 2</Option>
          <Option value="Service 3">Service 3</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Via" name="via">
        <Input />
      </Form.Item>

      <Form.Item label="No SM" name="noSM">
        <Input />
      </Form.Item>

      <Form.Item label="Destination Address" name="destinationAddress">
        <Select>
          <Option value="">--Select Destination Address--</Option>
          <Option value="Address 1">Address 1</Option>
          <Option value="Address 2">Address 2</Option>
          <Option value="Address 3">Address 3</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Packing" name="packing">
        <Select>
          <Option value="">--Select Packing--</Option>
          <Option value="Packing 1">Packing 1</Option>
          <Option value="Packing 2">Packing 2</Option>
          <Option value="Packing 3">Packing 3</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Items" name="items">
        <Input />
      </Form.Item>

      <Form.Item label="Weight" name="weight">
        <Input />
      </Form.Item>

      <Form.Item label="Qoli" name="qoli">
        <Input />
      </Form.Item>

      <Form.Item label="Qty" name="qty">
        <Input />
      </Form.Item>

      <Form.Item label="Kendaraan Pickup" name="kendaraanPickup">
        <Select>
          <Option value="">--Select Kendaraan Pickup--</Option>
          <Option value="Kendaraan 1">Kendaraan 1</Option>
          <Option value="Kendaraan 2">Kendaraan 2</Option>
          <Option value="Kendaraan 3">Kendaraan 3</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Mitra 1" name="mitra1">
        <Select>
          <Option value="">--Select Mitra 1--</Option>
          <Option value="Mitra A">Mitra A</Option>
          <Option value="Mitra B">Mitra B</Option>
          <Option value="Mitra C">Mitra C</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Mitra 2" name="mitra2">
        <Select>
          <Option value="">--Select Mitra 2--</Option>
          <Option value="Mitra D">Mitra D</Option>
          <Option value="Mitra E">Mitra E</Option>
          <Option value="Mitra F">Mitra F</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Vehicle Pickup" name="vehiclePickup">
        <Select>
          <Option value="">--Select Vehicle Pickup--</Option>
          <Option value="Vehicle 1">Vehicle 1</Option>
          <Option value="Vehicle 2">Vehicle 2</Option>
          <Option value="Vehicle 3">Vehicle 3</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Vehicle 1" name="vehicle1">
        <Select>
          <Option value="">--Select Vehicle 1--</Option>
          <Option value="Vehicle A">Vehicle A</Option>
          <Option value="Vehicle B">Vehicle B</Option>
          <Option value="Vehicle C">Vehicle C</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Vehicle 2" name="vehicle2">
        <Select>
          <Option value="">--Select Vehicle 2--</Option>
          <Option value="Vehicle D">Vehicle D</Option>
          <Option value="Vehicle E">Vehicle E</Option>
          <Option value="Vehicle F">Vehicle F</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Kontainer 1" name="kontainer1">
        <Select>
          <Option value="">--Select Kontainer 1--</Option>
          <Option value="Kontainer A">Kontainer A</Option>
          <Option value="Kontainer B">Kontainer B</Option>
          <Option value="Kontainer C">Kontainer C</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Kontainer 2" name="kontainer2">
        <Select>
          <Option value="">--Select Kontainer 2--</Option>
          <Option value="Kontainer D">Kontainer D</Option>
          <Option value="Kontainer E">Kontainer E</Option>
          <Option value="Kontainer F">Kontainer F</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Nopol Pickup" name="nopolPickup">
        <Input placeholder="Masukkan Nopol Pickup" />
      </Form.Item>

      <Form.Item label="Nopol 1" name="nopol1">
        <Input placeholder="Masukkan Nopol 1" />
      </Form.Item>

      <Form.Item label="Nopol 2" name="nopol2">
        <Input placeholder="Masukkan Nopol 2" />
      </Form.Item>

      <Form.Item label="Supir Pickup" name="supirPickup">
        <Input placeholder="Masukkan Nama Supir Pickup" />
      </Form.Item>

      <Form.Item label="Supir 1" name="supir1">
        <Input placeholder="Masukkan Nama Supir 1" />
      </Form.Item>

      <Form.Item label="Supir 2" name="supir2">
        <Input placeholder="Masukkan Nama Supir 2" />
      </Form.Item>

      <Form.Item label="HP Supir Pickup" name="hpSupirPickup">
        <InputNumber placeholder="Masukkan HP Supir Pickup" />
      </Form.Item>

      <Form.Item label="HP Supir 1" name="hpSupir1">
        <InputNumber placeholder="Masukkan HP Supir 1" />
      </Form.Item>

      <Form.Item label="HP Supir 2" name="hpSupir2">
        <InputNumber placeholder="Masukkan HP Supir 2" />
      </Form.Item>

      <Form.Item label="Seal" name="seal">
        <Input placeholder="Masukkan Seal" />
      </Form.Item>

      <Form.Item label="Memo" name="memo">
        <Input placeholder="Masukkan Memo" />
      </Form.Item>
    </form>
  );
};

export default SamplePage;
