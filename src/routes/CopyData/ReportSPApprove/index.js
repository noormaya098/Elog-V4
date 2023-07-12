import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Space,
  Table,
  Tag,
  DatePicker,
  Input,
  Tooltip,
  Select,
} from "antd";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../util/Api";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const { RangePicker } = DatePicker;

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};

const SamplePage = () => {
  const router = useHistory();

  const [showTable, setShowTable] = useState(false);
  const [datas, setDatas] = useState([]);

  const handleView = (id) => {
    router.push(`/losesales/detail/${id}`);
  };

  const columns = [
    {
      title: "Action",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleView(record.idmp)} type="primary">
            View
          </Button>
        </Space>
      ),
    },
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "sp",
      dataIndex: "sp",
      key: "sp",
    },
    {
      title: "idmp",
      dataIndex: "idmp",
      key: "idmp",
    },
    {
      title: "massage",
      dataIndex: "massage",
      key: "massage",
    },
  ];

  useEffect(() => {
    httpClient
      .get(`sp/get-list-cancel-do?limit=10&page=1&keyword=`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setShowTable(true);
          setDatas(data.data.order);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const handlePrint = () => {
    console.log("ha");
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write("<div>Your content to be printed</div>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <Card style={{ marginBottom: "16px" }}>
        {showTable && (
          <Table
            dataSource={datas}
            columns={columns}
            style={{ marginTop: 10 }}
          />
        )}
      </Card>
    </div>
  );
};
export default SamplePage;
/**
 * Sets the state of isModalOpen to true, which opens the modal dialog box.
 * @returns None
 */
