import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { httpClient } from "../../util/Api";

const SamplePage = () => {
  const [order, setOrder] = useState([]);
  // kolom untuk tabel
  const columns = [
    {
      title: "Vehicle",
      dataIndex: "vehicleMerk",
      key: "vehicleMerk",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Driver",
      dataIndex: "driverId",
      key: "driverId",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Date",
      dataIndex: "buyDate",
      key: "buyDate",
    },
  ];

  useEffect(() => {
    httpClient
      .get("vehicle/get-vehicle?limit=10&page=1&keyword=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrder(data.data.order);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  return <Table dataSource={order} columns={columns} />;
};

export default SamplePage;
