import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { httpClient } from "../../util/Api";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SamplePage = () => {
  const router = useHistory();
  const [order, setOrder] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    httpClient
      .get(`bu/get-bu-employee?limit=${limit}&page=${page}`)
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
      title: "NO",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Employe Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "JOB LEVEL",
      dataIndex: "levelJob",
      key: "levelJob",
    },
    {
      title: "DESIGNATION",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "BU",
      dataIndex: "BU",
      key: "BU",
    },
    {
      title: "BU BRENCH",
      dataIndex: "BuBrench",
      key: "BuBrench",
    },
    {
      title: "GI",
      dataIndex: "idGl",
      key: "idGl",
    },
    {
      title: "ASM",
      dataIndex: "idAsm",
      key: "idAsm",
    },
    {
      title: "MGR",
      dataIndex: "idMgr",
      key: "idMgr",
    },
    {
      title: "KACAB",
      dataIndex: "idKacab",
      key: "idKacab",
    },
    {
      title: "ADM",
      dataIndex: "idAmd",
      key: "idAmd",
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
          <Button onClick={() => handleEdit(record.idEmploye)} type="primary">
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
    router.push(`/buemploye/edit/${id}`);
  };

  const dataSource = order.map((item, index) => ({
    key: index + 1,
    no: item.no,
    employeeName: item.employeeName,
    levelJob: item.levelJob,
    designation: item.designation,
    BU: item.BU,
    BuBrench: item.BuBrench,
    idGl: item.idGl,
    idAsm: item.idAsm,
    idMgr: item.idMgr,
    idKacab: item.idKacab,
    idAmd: item.idAmd,
    status: item.status === 1 ? "aktif" : "tidak aktif",
    idEmploye: item.idEmploye,
  }));

  const handleAdd = (id) => {
    router.push(`/buemploye/add`);
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
