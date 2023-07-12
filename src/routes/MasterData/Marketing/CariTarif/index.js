// import { useState } from 'react';
// import { Card, Input, Select, Table } from 'antd';

// const { Option } = Select;

// const SamplePage = () => {
//   // State untuk form input
//   const [wilMuat, setWilMuat] = useState('');
//   const [wilBongkar, setWilBongkar] = useState('');
//   const [customer, setCustomer] = useState('');
//   const [vendor, setVendor] = useState('');

//   // State untuk tabel kontrak customer
//   const [kontrakList, setKontrakList] = useState([]);

//   // State untuk tabel penawaran mitra
//   const [penawaranList, setPenawaranList] = useState([]);

//   // Kolom-kolom tabel kontrak customer
//   const kontrakColumns = [
//     {
//       title: 'No',
//       dataIndex: 'no',
//       key: 'no',
//     },
//     {
//       title: 'Customer',
//       dataIndex: 'customer',
//       key: 'customer',
//     },
//     {
//       title: 'Jenis Kendaraan',
//       dataIndex: 'jenisKendaraan',
//       key: 'jenisKendaraan',
//     },
//     {
//       title: 'Tarif Kirim',
//       dataIndex: 'tarifKirim',
//       key: 'tarifKirim',
//     },
//     {
//       title: 'Tarif Muat',
//       dataIndex: 'tarifMuat',
//       key: 'tarifMuat',
//     },
//     {
//       title: 'Tarif Bongkar',
//       dataIndex: 'tarifBongkar',
//       key: 'tarifBongkar',
//     },
//     {
//       title: 'Keterangan',
//       dataIndex: 'keterangan',
//       key: 'keterangan',
//     },
//   ];

//   // Kolom-kolom tabel penawaran mitra
//   const penawaranColumns = [
//     {
//       title: 'No',
//       dataIndex: 'no',
//       key: 'no',
//     },
//     {
//       title: 'Customer',
//       dataIndex: 'customer',
//       key: 'customer',
//     },
//     {
//       title: 'Jenis Kendaraan',
//       dataIndex: 'jenisKendaraan',
//       key: 'jenisKendaraan',
//     },
//     {
//       title: 'Tarif Kirim',
//       dataIndex: 'tarifKirim',
//       key: 'tarifKirim',
//     },
//     {
//       title: 'Tarif Muat',
//       dataIndex: 'tarifMuat',
//       key: 'tarifMuat',
//     },
//     {
//       title: 'Tarif Bongkar',
//       dataIndex: 'tarifBongkar',
//       key: 'tarifBongkar',
//     },
//     {
//       title: 'Keterangan',
//       dataIndex: 'keterangan',
//       key: 'keterangan',
//     },
//   ];

//   // Handler untuk tombol "Tambah Kontrak Customer"
//   const handleAddKontrak = () => {
//     // Menambahkan kontrak baru ke kontrakList
//     const newKontrak = {
//       no: kontrakList.length + 1,
//       customer,
//       jenisKendaraan: vendor,
//       tarifKirim: '',
//       tarifMuat: '',
//       tarifBongkar: '',
//       keterangan: '',
//     };
//     setKontrakList([...kontrakList, newKontrak]);

//     // Reset form input
//     setWilMuat('');
//     setWilBongkar('');
//     setCustomer('');
//     setVendor('');
//   };

//   // Handler untuk tombol "Tambah Penawaran Mitra"
//   const handleAddPenawaran =() => {
//     // Menambahkan penawaran baru ke penawaranList
//     const newPenawaran = {
//     no: penawaranList.length + 1,
//     customer,
//     jenisKendaraan: vendor,
//     tarifKirim: '',
//     tarifMuat: '',
//     tarifBongkar: '',
//     keterangan: '',
//     };
//     setPenawaranList([...penawaranList, newPenawaran]);
//     // Reset form input
//         setWilMuat('');
//         setWilBongkar('');
//         setCustomer('');
//         setVendor('');
//         };

// return (
// <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// {/* Card input */}
// <Card style={{ flexBasis: '30%' }}>
// <div style={{ marginBottom: 16 }}>
// <Select
// value={wilMuat}
// onChange={(value) => setWilMuat(value)}
// style={{ width: '100%', marginBottom: 8 }}
// placeholder="Wilayah Muat"
// >
// <Option value="wilayah1">Wilayah 1</Option>
// <Option value="wilayah2">Wilayah 2</Option>
// </Select>
// <Select
// value={wilBongkar}
// onChange={(value) => setWilBongkar(value)}
// style={{ width: '100%', marginBottom: 8 }}
// placeholder="Wilayah Bongkar"
// >
// <Option value="wilayah1">Wilayah 1</Option>
// <Option value="wilayah2">Wilayah 2</Option>
// </Select>
// <Select
// value={customer}
// onChange={(value) => setCustomer(value)}
// style={{ width: '100%', marginBottom: 8 }}
// placeholder="Customer"
// >
// <Option value="customer1">Customer 1</Option>
// <Option value="customer2">Customer 2</Option>
// </Select>
// <Select
// value={vendor}
// onChange={(value) => setVendor(value)}
// style={{ width: '100%', marginBottom: 8 }}
// placeholder="Vendor"
// >
// <Option value="vendor1">Vendor 1</Option>
// <Option value="vendor2">Vendor 2</Option>
// </Select>
// <button onClick={handleAddKontrak}>Tambah Kontrak Customer</button>
// <button onClick={handleAddPenawaran}>Tambah Penawaran Mitra</button>
// </div>
// </Card>
//   {/* Card tabel kontrak customer */}
//   <Card style={{ flexBasis: '30%' }}>
//     <Table dataSource={kontrakList} columns={kontrakColumns} />
//   </Card>

//   {/* Card tabel penawaran mitra */}
//   <Card style={{ flexBasis: '30%' }}>
//     <Table dataSource={penawaranList} columns={penawaranColumns} />
//   </Card>
// </div>
// );
// };

// export default SamplePage;

import React, { useState } from 'react';
import { Card, Select, Button, Table } from 'antd';

const { Option } = Select;

const SamplePage = () => {
  const [customer, setCustomer] = useState('');
  const [muat, setMuat] = useState('');
  const [bongkar, setBongkar] = useState('');
  const [resultData, setResultData] = useState([]);

  const onSearch = () => {
    // Proses pencarian data dan simpan ke setResultData
  };

  const columns = [
    { title: 'No', dataIndex: 'no' },
    { title: 'Customer', dataIndex: 'customer' },
    { title: 'Jenis Kendaraan', dataIndex: 'jenis_kendaraan' },
    { title: 'Tarif Kirim', dataIndex: 'tarif_kirim' },
    { title: 'Tarif Muat', dataIndex: 'tarif_muat' },
    { title: 'Tarif Bongkar', dataIndex: 'tarif_bongkar' },
    { title: 'Keterangan', dataIndex: 'keterangan' },
  ];

  return (
    <div>
      <Card title="Form">
        <Select
          placeholder="Pilih wilayah muat"
          style={{ width: 200, marginBottom: 16 }}
          onChange={(value) => setMuat(value)}
        >
          <Option value="wilayah-muat-1">Wilayah Muat 1</Option>
          <Option value="wilayah-muat-2">Wilayah Muat 2</Option>
        </Select>
        <Select
          placeholder="Pilih wilayah bongkar"
          style={{ width: 200, marginBottom: 16 }}
          onChange={(value) => setBongkar(value)}
        >
          <Option value="wilayah-bongkar-1">Wilayah Bongkar 1</Option>
          <Option value="wilayah-bongkar-2">Wilayah Bongkar 2</Option>
        </Select>
        <Select
          placeholder="Pilih customer"
          style={{ width: 200, marginBottom: 16 }}
          onChange={(value) => setCustomer(value)}
        >
          <Option value="customer-1">Customer 1</Option>
          <Option value="customer-2">Customer 2</Option>
        </Select>
        <Button type="primary" onClick={onSearch}>
          Cari Tarif
        </Button>
      </Card>
      <Card title="Kontrak Customer">
        <Table dataSource={resultData} columns={columns} />
      </Card>
      <Card title="Penawaran Mitra">
        <Table dataSource={resultData} columns={columns} />
      </Card>
    </div>
  );
};

export default SamplePage;
