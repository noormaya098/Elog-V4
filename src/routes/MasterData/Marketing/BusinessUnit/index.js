import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { httpClient } from "../../util/Api";

const SamplePage = () => {
  const [order, setOrder] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    httpClient
      .get(`bu/get-bu?limit=${limit}&page=${page}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrder(data.data.order);
          setTotal(data.data.totalData);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [limit, page]);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "ID BU",
      dataIndex: "idBu",
      key: "idBu",
    },
    {
      title: "Kode Perusahaan",
      dataIndex: "kodePerusahaan",
      key: "kodePerusahaan",
    },
    {
      title: "Nama Perusahaan",
      dataIndex: "namaPerusahaan",
      key: "namaPerusahaan",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "aktif" ? "green" : "red";
        return <span style={{ color }}>{status}</span>;
      },
    },
  ];

  const dataSource = order.map((item, index) => ({
    key: index + 1,
    no: item.no,
    idBu: item.buCode,
    kodePerusahaan: item.cbu,
    namaPerusahaan: item.buName,
    status: item.status === 1 ? "aktif" : "tidak aktif",
  }));

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ total, current: page, pageSize: limit }}
        onChange={(pagination) => setPage(pagination.current)}
      />
    </div>
  );
};

export default SamplePage;
