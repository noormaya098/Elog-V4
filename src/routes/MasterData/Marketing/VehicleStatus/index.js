import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { httpClient } from "../../util/Api";

const SamplePage = () => {
  const [order, setOrder] = useState([]);
  // contoh data untuk tabel

  // kolom untuk tabel
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Vehicle",
      dataIndex: "vehicleMerk",
      key: "vehicleMerk",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        let color = "red";
        if (text === "Pending") {
          color = "orange";
        } else if (text === "Completed") {
          color = "green";
        }
        return <span style={{ color }}>{text}</span>;
      },
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      render: (text) => {
        let color = "red";
        if (text === "Pending") {
          color = "orange";
        } else if (text === "Completed") {
          color = "green";
        }
        return <span style={{ color }}>{text}</span>;
      },
    },
    {
      title: "Driver",
      dataIndex: "driverId",
      key: "driverId",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
