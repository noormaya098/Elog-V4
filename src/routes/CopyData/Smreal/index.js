import React, { useState } from "react";
import { Button, Card, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";

const tabList = [
  {
    key: "",
    tab: "",
  },
  {
    key: "",
    tab: "",
  },
];

const contentList = {
  tab1: (
    <div>
      <p>Upload File Here (Format file Must (xls,csv) And No More 1000 kb)</p>
      <Upload>
        <Button icon={<UploadOutlined />} type="primary">
          Click to Upload
        </Button>
      </Upload>
    </div>
  ),
  tab2: <p></p>,
};

const tabListNoTitle = [
  {
    key: "comparison",
    tab: "Comparison",
  },
  {
    key: "list_sm_real",
    tab: "List SM Real",
  },
  {
    key: "sm_not_entry",
    tab: "SM Not Entry",
  },
  {
    key: "sm_double",
    tab: "SM Double",
  },
];

const contentListNoTitle = {
  comparison: (
    <Table
      dataSource={[
        { id: 1, name: "John Doe", age: 25 },
        { id: 2, name: "Jane Doe", age: 30 },
        { id: 3, name: "Bob Smith", age: 40 },
      ]}
      columns={[
        { title: "ID", dataIndex: "id" },
        { title: "Name", dataIndex: "name" },
        { title: "Age", dataIndex: "age" },
      ]}
      pagination={false}
      bordered
    />
  ),
  list_sm_real: (
    <Table
      dataSource={[
        { id: 1, name: "Product A", price: 10 },
        { id: 2, name: "Product B", price: 20 },
        { id: 3, name: "Product C", price: 30 },
      ]}
      columns={[
        { title: "NO.", dataIndex: "id" },
        { title: "SM", dataIndex: "name" },
        { title: "Perusahaan", dataIndex: "price" },
        { title: "Tanggal Kirim", dataIndex: "price" },
        { title: "Destination", dataIndex: "price" },
      ]}
      pagination={false}
      bordered
    />
  ),
  sm_not_entry: (
    <Table
      dataSource={[
        { id: 1, name: "User A", email: "usera@example.com" },
        { id: 2, name: "User B", email: "userb@example.com" },
        { id: 3, name: "User C", email: "userc@example.com" },
      ]}
      columns={[
        { title: "NO.", dataIndex: "id" },
        { title: "SM", dataIndex: "name" },
        { title: "Perusahaan", dataIndex: "price" },
        { title: "Tanggal Kirim", dataIndex: "price" },
        { title: "Destination", dataIndex: "price" },
      ]}
      pagination={false}
      bordered
    />
  ),
  sm_double: (
    <Table
      dataSource={[
        { id: 1, name: "Item A", price: 10 },
        { id: 2, name: "Item B", price: 20 },
        { id: 3, name: "Item C", price: 30 },
      ]}
      columns={[
        { title: "NO.", dataIndex: "id" },
        { title: "No.SM", dataIndex: "name" },
        { title: "Bulan", dataIndex: "price" },
        { title: "Jumlah", dataIndex: "price" },
      ]}
      pagination={false}
      bordered
    />
  ),
};

const SamplePage = () => {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  return (
    <div>
      <Card
        style={{ width: "100%" }}
        title="SM Real"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
      <br />
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey="comparison"
      >
        {contentListNoTitle["comparison"]}
      </Card>
      <br />
    </div>
  );
};

export default SamplePage;
