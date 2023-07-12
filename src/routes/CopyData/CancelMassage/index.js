import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Space,
  Table,
  DatePicker,
  Modal,
  Form,
  Input,
  notification,
} from "antd";
import { httpClient } from "../../util/Api";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const { RangePicker } = DatePicker;

const SamplePage = () => {
  const [showTable, setShowTable] = useState(false);
  const [datas, setDatas] = useState([]);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    httpClient
      .get(`sp/get-select-do`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setShowTable(true);
          setDatas(data.data.company);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const handleCreate = () => {
    setCreateFormVisible(true);
  };

  const handleCreateOk = () => {
    form.validateFields().then((values) => {
      httpClient
        .post(`sp/create-massage-do`, {
          massage: values.massage,
        })
        .then((response) => {
          // Handle successful response
          console.log(response.data);
          setCreateFormVisible(false);
          notification.success({
            message: "Error",
            description: response.data.message,
          });
        })
        .catch((error) => {
          // Handle error
          notification.success({
            message: "Error",
            description: error.message,
          });
          console.log(error.message);
        });
    });
  };

  const handleCreateCancel = () => {
    setCreateFormVisible(false);
  };

  const handleUpdate = (id) => {
    setCurrentId(id);
    setUpdateFormVisible(true);
  };

  const handleUpdateOk = () => {
    form.validateFields().then((values) => {
      httpClient
        .put(`sp/update-massage-do`, {
          id: currentId,
          massage: values.massage,
        })
        .then((response) => {
          // Handle successful response
          console.log(response.data);
          setUpdateFormVisible(false);
        })
        .catch((error) => {
          // Handle error
          console.log(error.message);
        });
    });
  };

  const handleUpdateCancel = () => {
    setUpdateFormVisible(false);
  };

  const handleDelete = (id) => {
    httpClient
      .delete(`sp/del-massage-do`, { data: { id: id } })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.log(error.message);
      });
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "massage",
      dataIndex: "massage",
      key: "massage",
    },
    // {
    //   title: "Action",
    //   key: "no",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button onClick={() => handleUpdate(record.id)} type="primary">
    //         Update
    //       </Button>
    //       <Button onClick={() => handleDelete(record.id)} type="primary">
    //         Delete
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div>
      <Card style={{ marginBottom: "16px" }}>
        <Row>
          <Col md={1}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleCreate}
            >
              Create
            </Button>
          </Col>
        </Row>
        {showTable && (
          <Table
            dataSource={datas}
            columns={columns}
            style={{ marginTop: 10 }}
          />
        )}
      </Card>
      <Modal
        title="Create Massage"
        visible={createFormVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
      >
        <Form form={form}>
          <Form.Item
            name="massage"
            label="Massage"
            rules={[{ required: true, message: "Please enter a massage" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Update Modal */}
      <Modal
        title="Update Massage"
        visible={updateFormVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
      >
        <Form form={form}>
          <Form.Item
            name="massage"
            label="Massage"
            rules={[{ required: true, message: "Please enter a massage" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default SamplePage;
