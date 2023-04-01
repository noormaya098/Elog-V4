import React from "react";
import { Container } from "react-bootstrap";
import { Card } from "antd";
import { Space, Table, Tag } from "antd";
// import type { ColumnsType } from "antd/es/table";  

const Byunit = () => {
  // interface DataType {
  //   key: string;
  //   name: string;
  //   age: number;
  //   address: string;
  //   tags: string[];
  // }

  const columns= [
    {
      title: "No",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "volcano" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Driver",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Kode",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Plat Nomor",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Muatan",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Keterangan",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Posisi",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tujuan",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Update",
      dataIndex: "address",
      key: "address",
    },
    
    
  ];

  const data= [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["On Order"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["Stanby",],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["Stanby"],
    },
  ];

  return (
    <div>
      <div className="gx-d-flex justify-content-start">
        <h5>Monitoring</h5>
        <p>&nbsp; By unit</p>
    </div>

        <Container>
          <Card>
            <Table columns={columns} dataSource={data} />;
          </Card>
        </Container>
      </div>
  );
};

export default Byunit;
