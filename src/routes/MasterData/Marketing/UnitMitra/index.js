import React from "react";
import { Table } from "antd";

const SamplePage = () => {
  // contoh data untuk tabel
  const data = [
    {
      id: 1,
      no: "001",
      tanggal_ketersediaan: "2022-03-08",
      mitra: "PT. ABC",
      jml_unit: 5,
      jenis_unit: "Truck",
      wilayah: "Jakarta",
      batas_ketersediaan: "2022-03-15",
      jml_unit_tersedia: 3,
    },
    {
      id: 2,
      no: "002",
      tanggal_ketersediaan: "2022-03-09",
      mitra: "PT. XYZ",
      jml_unit: 10,
      jenis_unit: "Bus",
      wilayah: "Bandung",
      batas_ketersediaan: "2022-03-16",
      jml_unit_tersedia: 6,
    },
  ];

  // kolom untuk tabel
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Tanggal Ketersediaan",
      dataIndex: "tanggal_ketersediaan",
      key: "tanggal_ketersediaan",
    },
    {
      title: "Mitra",
      dataIndex: "mitra",
      key: "mitra",
    },
    {
      title: "Jumlah Unit",
      dataIndex: "jml_unit",
      key: "jml_unit",
    },
    {
      title: "Jenis Unit",
      dataIndex: "jenis_unit",
      key: "jenis_unit",
    },
    {
      title: "Wilayah",
      dataIndex: "wilayah",
      key: "wilayah",
    },
    {
      title: "Batas Ketersediaan",
      dataIndex: "batas_ketersediaan",
      key: "batas_ketersediaan",
    },
    {
      title: "Jumlah Unit Tersedia",
      dataIndex: "jml_unit_tersedia",
      key: "jml_unit_tersedia",
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default SamplePage;
