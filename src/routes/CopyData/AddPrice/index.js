import React, { useState } from "react";
import { Card, Input, Button, Select, Table, Space } from "antd";
import { DeleteOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const SamplePage = () => {
  const [customer, setCustomer] = useState("");
  const [wilMuat, setWilMuat] = useState("");
  const [wilBongkar, setWilBongkar] = useState("");
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [biayaKirim, setBiayaKirim] = useState("");
  const [biayaMuat, setBiayaMuat] = useState("");
  const [biayaBongkar, setBiayaBongkar] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tarifList, setTarifList] = useState([]);

  const handleAddTarif = () => {
    const newTarif = {
      customer,
      wilMuat,
      wilBongkar,
      jenisKendaraan,
      biayaKirim,
      biayaMuat,
      biayaBongkar,
      keterangan,
    };
    setTarifList([...tarifList, newTarif]);
    setCustomer("");
    setWilMuat("");
    setWilBongkar("");
    setJenisKendaraan("");
    setBiayaKirim("");
    setBiayaMuat("");
    setBiayaBongkar("");
    setKeterangan("");
  };

  const handleDeleteTarif = (index) => {
    const newTarifList = [...tarifList];
    newTarifList.splice(index, 1);
    setTarifList(newTarifList);
  };

  const columns = [
    {
      title: "Wil Muat",
      dataIndex: "wilMuat",
    },
    {
      title: "Wil Bongkar",
      dataIndex: "wilBongkar",
    },
    {
      title: "Jenis Kendaraan",
      dataIndex: "jenisKendaraan",
    },
    {
      title: "Biaya Kirim",
      dataIndex: "biayaKirim",
    },
    {
      title: "Biaya Muat",
      dataIndex: "biayaMuat",
    },
    {
      title: "Biaya Bongkar",
      dataIndex: "biayaBongkar",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record, index) => (
        <Space size="middle">
          <Button
            icon={<DeleteOutlined />}
            type="text"
            danger
            onClick={() => handleDeleteTarif(index)}
          />
        </Space>
      ),
    },
  ];

  const dataSource = tarifList.map((tarif, index) => ({
    ...tarif,
    key: index,
  }));

  return (
    <div>
      <Card title="Form Input Card">
        <div style={{ marginBottom: "16px" }}>
          <span style={{ marginRight: "8px" }}>Customer:</span>
          <Select
            value={customer}
            style={{ width: "200px" }}
            onChange={(value) => setCustomer(value)}
          >
            <Option value="customer1">Customer 1</Option>
            <Option value="customer2">Customer 2</Option>
            <Option value="customer3">Customer 3</Option>
          </Select>
          <div style={{ marginBottom: "16px" }}>
            <Input
              placeholder="Wil Muat"
              value={wilMuat}
              style={{ marginRight: "8px", width: "200px" }}
              onChange={(e) => setWilMuat(e.target.value)}
            />
            <Input
              placeholder="Wil Bongkar"
              value={wilBongkar}
              style={{ marginRight: "8px", width: "200px" }}
              onChange={(e) => setWilBongkar(e.target.value)}
            />
            <Input
              placeholder="Jenis Kendaraan"
              value={jenisKendaraan}
              style={{ marginRight: "8px", width: "200px" }}
              onChange={(e) => setJenisKendaraan(e.target.value)}
            />
            <Input
              placeholder="Biaya Kirim"
              value={biayaKirim}
              style={{ marginRight: "8px", width: "200px" }}
              onChange={(e) => setBiayaKirim(e.target.value)}
            />
            <Input
              placeholder="Biaya Muat"
              value={biayaMuat}
              style={{ marginRight: "8px", width: "200px" }}
              onChange={(e) => setBiayaMuat(e.target.value)}
            />
            <Input
              placeholder="Biaya Bongkar"
              value={biayaBongkar}
              style={{ marginRight: "8px", width: "200px" }}
              onChange={(e) => setBiayaBongkar(e.target.value)}
            />
            <Input
              placeholder="Keterangan"
              value={keterangan}
              style={{ marginRight: "8px", width: "200px" }}
              onChange={(e) => setKeterangan(e.target.value)}
            />
            <Button type="primary" onClick={handleAddTarif}>
              Tambah Tarif
            </Button>
          </div>
          <Table columns={columns} dataSource={dataSource} />
          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <Button type="primary" icon={<SaveOutlined />}>
              Simpan Tarif Baru
            </Button>
            <Button style={{ marginLeft: "8px" }} icon={<CloseOutlined />}>
              Batal
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SamplePage;
