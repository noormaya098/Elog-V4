import React from "react";
import { Table, Button } from "antd";

const SamplePage = () => {
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Muat",
      dataIndex: "muat",
      key: "muat",
    },
    {
      title: "Bongkar",
      dataIndex: "bongkar",
      key: "bongkar",
    },
    {
      title: "Jenis Kendaraan",
      dataIndex: "jenisKendaraan",
      key: "jenisKendaraan",
    },
    {
      title: "Biaya Kirim",
      dataIndex: "biayaKirim",
      key: "biayaKirim",
    },
    {
      title: "Biaya Muat",
      dataIndex: "biayaMuat",
      key: "biayaMuat",
    },
    {
      title: "Biaya Bongkar",
      dataIndex: "biayaBongkar",
      key: "biayaBongkar",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
    },
  ];

  const data = [
    {
      key: "1",
      no: "1",
      customer: "PT ABC",
      muat: "Jakarta",
      bongkar: "Surabaya",
      jenisKendaraan: "Truk",
      biayaKirim: "Rp. 10.000.000",
      biayaMuat: "Rp. 2.000.000",
      biayaBongkar: "Rp. 2.000.000",
      keterangan: "Pengiriman barang elektronik",
    },
    {
      key: "2",
      no: "2",
      customer: "PT XYZ",
      muat: "Bandung",
      bongkar: "Semarang",
      jenisKendaraan: "Mobil Box",
      biayaKirim: "Rp. 5.000.000",
      biayaMuat: "Rp. 1.000.000",
      biayaBongkar: "Rp. 1.000.000",
      keterangan: "Pengiriman buku-buku",
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Button type="primary">Add Price</Button>
        <Button type="default">Cari Pricelist</Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default SamplePage;
