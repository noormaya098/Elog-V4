import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Table } from "antd";
import { httpClient } from "../../util/Api";

const SamplePage = () => {
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [form] = Form.useForm();

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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  const handleEdit = (record) => {
    form.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    // Lakukan operasi penghapusan data menggunakan API
    const { id } = record;
    httpClient
      .delete(`customer/delete-customer-address?id=${id}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          // Setelah sukses menghapus data, dapatkan ulang data alamat
          fetchData();
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      // Lakukan operasi penyimpanan/update data menggunakan API
      const { id } = values;
      const apiUrl = id
        ? `customer/update-customer-address?id=${id}`
        : "customer/add-customer-address";
      const method = id ? "put" : "post";

      httpClient[method](apiUrl, values)
        .then(({ data }) => {
          if (data.status.code === 200) {
            // Setelah sukses menyimpan/update data, dapatkan ulang data alamat
            fetchData();
            form.resetFields();
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    });
  };

  return (
    <div>
      <Card>
        <Table dataSource={customerAddresses} columns={columns} />
  
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 16 }}>
          <Form.Item label="Alamat" name="alamat" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Alamat Detail" name="alamat_detail" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Kecamatan" name="kecamatan" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Kota" name="kota" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Kode Wilayah" name="kode_wilayah" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Kode Provinsi" name="kode_provinsi" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
  
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default SamplePage;

  
