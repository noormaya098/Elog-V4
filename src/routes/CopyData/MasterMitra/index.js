import React, { useEffect, useState } from "react";
import { Button, Card, Input, Space, Table, Modal, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";

const { confirm } = Modal;

const SamplePage = () => {
  const router = useHistory();

  const handleAdd = (id) => {
    router.push(`/mastermitraadd`);
  };

  const handleDetail = (mitraId) => {
    router.push(`/mastermitradetaill/${mitraId}`);
  };

  const handleEdit = (id) => {
    router.push(`/mastermitra/edit/${id}`);
  };

  const [order, setOrder] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [nameFilter, setNameFilter] = useState(null);


  const handleDelete = (mitraId) => {
    confirm({
      title: "Are you sure you want to delete this customer?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id: mitraId,
        };
        httpClient
          .post(`mitra/del-mitra`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = order.filter(
                (item) => item.mitraId !== mitraId
              );
              setOrder(newOrder);
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      },
      onCancel() {},
    });
  };

  // const handleDelete = (mitraId) => {
  //   confirm({
  //     title: "Are you sure you want to delete this mitra?",
  //     icon: <ExclamationCircleOutlined />,
  //     content: "This action cannot be undone.",
  //     onOk() {
  //       const datas = {
  //         id: mitraId,
  //       };
  //       httpClient
  //         .post(`mitra/del-mitra`, datas)
  //         .then(({ data }) => {
  //           if (data.status.code === 200) {
  //             const newOrder = order.filter((item) => item.mitraId !== mitraId);
  //             setOrder(newOrder);
  //             // Simpan data terbaru ke Local Storage
  //             localStorage.setItem("order", JSON.stringify(newOrder));
  //             // Reload halaman setelah menghapus data mitra
  //             window.location.reload();
  //           }
  //         })
  //         .catch(function (error) {
  //           console.log(error.message);
  //         });
  //     },
  //     onCancel() {},
  //   });
  // };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let tagColor = "";
        let tagText = "";
  
        if (status === "aktif") {
          tagColor = "green";
          tagText = "Aktif";
        } else if (status === "tidak aktif") {
          tagColor = "red";
          tagText = "Tidak Aktif";
        } else if (status === "habis kontrak") {
          tagColor = "yellow";
          tagText = "Habis Kontrak";
        }
  
        return (
          <Tag color={tagColor}>{tagText}</Tag>
        );
      },
    },
    {
      title: "Code",
      dataIndex: "mitraCode",
      key: "mitraCode",
    },
    {
      title: "Nama Mitra",
      dataIndex: "mitraName",
      key: "mitraName",
    },
    {
      title: "Alamat Mitra",
      dataIndex: "mitraAddress",
      key: "mitraAddress",
    },
    {
      title: "Awal Kontrak",
      dataIndex: "awalKontrak",
      key: "awalKontrak",
    },
    {
      title: "Kontrak",
      dataIndex: "kontrak",
      key: "kontrak",
    },
    {
      title: "Berlaku Perpanjangan Otomatis",
      dataIndex: "perpanjangOtomatis",
      key: "perpanjangOtomatis",
    },
    {
      title: "Pic",
      dataIndex: "pic",
      key: "pic",
    },
    {
      title: "Memo",
      dataIndex: "memo",
      key: "memo",
    },
    {
      title: "Action",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleDetail(record.mitraId)} type="primary">
            View
          </Button>
          {/* <Button onClick={() => handleEdit(record.custId)} type="primary">
            Edit
          </Button> */}
          <Button onClick={() => handleDelete(record.mitraId)} type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    httpClient
      .get("mitra/get-mitra?limit=10&page=1")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrder(data.data.order);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const onSearch = (value) => {
    setNameFilter(value.target.value);
    setLoadingState(true);
    httpClient
      .get(`mitra/get-mitra?limit=10&page=1&keyword=${value.target.value}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setLoadingState(false);
          setOrder(data.data.order);
        }
      })
      .catch(function (error) {
        setLoadingState(false);
        console.log(error.message);
      });
  };

  return (
    <div>
      <Card>
        <h3>
          Data Tabel Master Mitra
        </h3>
      </Card>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={handleAdd}>
            New Mitra
          </Button>
          <Input.Search
            placeholder="Search by company name"
            onSearch={onSearch}
            onChange={onSearch}
            loading={loadingState}
          />
        </Space>
        <Table
          columns={columns}
          dataSource={order}
          scroll={{
            x: 1300,
          }}
        />
      </Card>
    </div>
  );
};

export default SamplePage;
