import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../util/Api";

const SamplePage = () => {
  const router = useHistory();
  const [order, setOrder] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    httpClient
      .get(`bu/get-bu-brench?limit=${limit}&page=${page}`)
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
      title: "BU BRENCH ID",
      dataIndex: "bubrenchId",
      key: "bubrenchId",
    },
    {
      title: "BU CODE",
      dataIndex: "buCode",
      key: "buCode",
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
    {
      title: "Action",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record.bubrenchId)} type="primary">
            Edit
          </Button>
          {/* <Button onClick={() => handleDelete(record.id)} type="primary">
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  const handleEdit = (id) => {
    router.push(`/bubrench/edit/${id}`);
  };

  const dataSource = order.map((item, index) => ({
    key: index + 1,
    no: item.no,
    bubrenchId: item.bubrenchId,
    buCode: item.buCode,
    namaPerusahaan: item.buName,
    idBu: item.buCode,
    kodePerusahaan: item.cbu,
    namaPerusahaan: item.buName,
    status: item.status === 1 ? "aktif" : "tidak aktif",
  }));

  const handleAdd = (id) => {
    router.push(`/bubrench/add`);
  };

  return (
    <div>
      <Row>
        <Col span={4}>
          <Button type="primary" onClick={handleAdd}>
            New
          </Button>
        </Col>
      </Row>
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
