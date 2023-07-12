import React, { useEffect, useState } from "react";
import { Button, Card, Input, Space, Table, Modal } from "antd";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";

const { confirm } = Modal;

const SamplePage = () => {
  const router = useHistory();
  const [customerAddresses, setCustomerAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get("customer/get-customer-address");
        const data = response.data;

        if (data.status.code === 200) {
          setCustomerAddresses(data.data);
        } else {
          console.log("Error: ", data.status.message);
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
    },
    {
      title: "Alamat Detail",
      dataIndex: "alamat_detail",
      key: "alamat_detail",
    },
    {
      title: "Kecamatan",
      dataIndex: "kecamatan",
      key: "kecamatan",
    },
    {
      title: "Kota",
      dataIndex: "kota",
      key: "kota",
    },
    {
      title: "Kode Wilayah",
      dataIndex: "kode_wilayah",
      key: "kode_wilayah",
    },
    {
      title: "Kode Provinsi",
      dataIndex: "kode_provinsi",
      key: "kode_provinsi",
    },
  ];

  return (
    <Table dataSource={customerAddresses} columns={columns} />
  );
};

export default SamplePage;
