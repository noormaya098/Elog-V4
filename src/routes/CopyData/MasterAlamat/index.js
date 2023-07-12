import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  Space,
  Table,
  Modal,
  Row,
  Col,
  Tag,
  Select,
  Pagination,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";
import DataTable from "react-data-table-component";

const { confirm } = Modal;

const SamplePage = () => {
  let nomor = 1;
  const router = useHistory();
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [DetailAddress, setDetailAddress] = useState([]);
  const [customer, setCustomer] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [customerOptionSelect, setCustomerOptionsSelect] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keywordData, setKeywordData] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get(
          "customer/get-customer-address?id_customer="
        );
        const data = response.data;
        // setCustomerOptionsSelect (response.data)

        if (data.status.code === 200) {
        } else {
          console.log("Error: ", data.status.message);
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    };

    fetchData();

    httpClient
      .get(`customer/get-customer?limit=${limit}&page=${page}&keyword=${customer}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setCustomerAddresses(data.data.order);
          setDetailAddress(data.data.order[0].custAddress);
          console.log("haiiii", data.data.order[0].custAddress);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });

    httpClient
      .get("customer/get-select-create-address?idProv=11&idKota=1101")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setCustomerOptionsSelect(data.customer);
          console.log(data.customer);
        } else {
          console.log("Error: ", data.status.message);
        }
      });
  }, [limit, page, customer]);

  const handleEdit = (custId) => {
    router.push(`/editcustomer/${custId}`);
  };

  const handleDetail = (custId) => {
    router.push(`/detailcustomer/${custId}`);
  };

  const handleAdd = (id) => {
    router.push(`/masteralamatadd`);
  };

  const handleDelete = (custId) => {
    confirm({
      title: "Are you sure you want to delete this customer?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id_customer: custId,
        };
        httpClient
          .post(`customer/del-customer`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = customerAddresses.filter(
                (item) => item.custId !== custId
              );
              setCustomerAddresses(newOrder);
              window.location.reload(); // Menambahkan reload windows setelah pembaruan daftar pelanggan
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: "70px",
    },
    {
      title: "Code",
      dataIndex: "custCode",
      key: "custCode",
    },
    {
      title: "Name",
      dataIndex: "custName",
      key: "custName",
    },
    {
      title: "Telfon",
      dataIndex: "custTelephone",
      key: "custTelephone",
    },
    Table.EXPAND_COLUMN,
    {
      title: "Address",
      dataIndex: "custAddress",
      key: "custAddress",

      render: (custAddress) => custAddress[0]?.address,
    },
    // {
    //   title: "Alamat",
    //   dataIndex: "address",
    //   key: "address",
    // },
    // {
    //   title: "Kode Wilayah",
    //   dataIndex: "kode_wilayah",
    //   key: "kode_wilayah",
    // },
    // {
    //   title: "Kode Provinsi",
    //   dataIndex: "kode_provinsi",
    //   key: "kode_provinsi",
    // },

    {
      title: "Action",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button onClick={() => handleEdit(record.custId)} type="primary">
            Edit
          </Button> */}
          <Button onClick={() => handleDetail(record.custId)} type="primary">
            Edit Detail
          </Button>
          <Button onClick={() => handleDelete(record.custId)} type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const customStylesReactSelect = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      width: "100%",
      minWidth: "100%",
    }),
  };

  const onSelectChange = async (value) => {
    if (value) {
      const customer = value.customer; // Mengambil nilai customer dari objek value
      setCustomer(customer); // Mengatur state customer dengan nilai yang dipilih
      const fetchData = async () => {
        try {
          const response = await httpClient.get(
            `customer/get-customer-address?id_customer=${customer}`
          );
          const data = response.data;
  
          if (data.status.code === 200 && data.data) {
            setCustomerAddresses(data.data);
          } else {
            console.log("Error: ", data.status.message);
          }
        } catch (error) {
          console.log("Error: ", error.message);
        }
      };
  
      fetchData();
    }
  };

  return (
    <>
      <Card>
        <h3>Tabel Data Alamat</h3>
      </Card>
      <Card>
        <Row>
          <Col span={6}>
            <Select
              value={customer}
              name="customer"
              showSearch
              optionFilterProp="children"
              placeholder="Select Customer"
              style={{ width: "100%" }}
              onChange={(e) => setCustomer(e)}
            >
              {customerOptionSelect.map((item, index) => (
          
                <Select.Option key={item.id} value={item.id}>
                  {item.customer}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={handleAdd}>
              New Customer
            </Button>
          </Col>
        </Row>

        <Table
          style={{ width: "100%", overflow: "auto" }}
          dataSource={customerAddresses}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.custAddress.map((item, index) => (
                  <React.Fragment key={item.idAddress}>
                    {item.address}
                    {index !== record.custAddress.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            ),
          }}
          columns={columns}
          pagination={{ total, current: page, pageSize: limit }}
          onChange={(pagination) => setPage(pagination.current)}
        />
      </Card>
    </>
  );
};

export default SamplePage;
