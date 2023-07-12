import React, { useEffect, useState } from "react";
import { Table } from "antd";
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
      .get(`bu/get-bu-employee-position?limit=${limit}&page=${page}`)
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
      title: "CODE",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "POSITION",
      dataIndex: "position",
      key: "position",
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
    code: item.code,
    position: item.position,
    status: item.status === 1 ? "aktif" : "tidak aktif",
  }));

  const handleAdd = (id) => {
    router.push(`/buemployeposition/add`);
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
