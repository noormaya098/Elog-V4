import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Space,
  Table,
  Tag,
  DatePicker,
  Input,
  Row,
  Col,
  Pagination,
} from "antd";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { httpClient } from "../../util/Api";
import axios from "axios";
import Baseurl from "../../../../Api/BaseUrl";

const { RangePicker } = DatePicker;

const { Search } = Input;

const SamplePage = () => {
  const router = useHistory();

  const [nameFilter, setNameFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const [limit, setLimit] = useState(10);
  const [company, setCompany] = useState({ label: "", value: "" });
  const [companyOptions, setCompanyOptions] = useState([]);
  const [detailSp, setDetailSp] = useState([]);

  const handleView = (id) => {
    router.push(`/splist/detail/${id}`);
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
      title: "SP ID",
      dataIndex: "sp",
      key: "sp",
    },
    {
      title: "Perusahaan",
      dataIndex: "perusahaan",
      key: "perusahaan",
    },
    {
      title: "Marketing",
      dataIndex: "salesName",
      key: "salesName",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    // {
    //   title: "Vehicle",
    //   dataIndex: "address",
    //   key: "address",
    //   responsive: ["md"],
    // },
    {
      title: "Pickup Date",
      dataIndex: "pickupDate",
      key: "pickupDate",
      responsive: ["md"],
    },
    // {
    //   title: "Destination",
    //   dataIndex: "address",
    //   key: "address",
    //   responsive: ["md"],
    // },
    {
      title: "Act",
      render: (text, record) => (
        <Space size="middle">
          <Tag color={record.approveAct == "Y" ? "green" : "red"}>
            {record.approveAct == "Y" ? "Approved" : "Not Approved"}
            {record.dateApproveAct !== "Invalid date"
              ? record.dateApproveAct
              : ""}
          </Tag>
        </Space>
      ),
      key: "address",
      responsive: ["md"],
    },
    {
      title: "OPS",
      render: (text, record) => (
        <Space size="middle">
          <Tag color={record.approveOps == "Y" ? "green" : "red"}>
            {record.approveOps == "Y" ? "Approved" : "Not Approved"}
            {record.dateApproveOps !== "Invalid date"
              ? record.dateApproveOps
              : ""}
          </Tag>
        </Space>
      ),
      key: "address",
      responsive: ["md"],
    },

    {
      title: "Purch",
      key: "tags",
      render: (text, record) => (
        <Space size="middle">
          <Tag color={record.approvePurch == "Y" ? "green" : "red"}>
            {record.approvePurch == "Y" ? "Approved" : "Not Approved"}
            {record.dateApprovePurch !== "Invalid date"
              ? record.dateApprovePurch
              : ""}
          </Tag>
        </Space>
      ),
      responsive: ["md"],
    },
  ];

  function handleClick() {
    router.push("/splist/create");
  }

  const onSearch = async (value) => {
    setNameFilter(value.target.value);
    setLoadingState(true);

    const isi = await axios.get(
      `sp/get-SP-all?limit=${limit}&page=1&keyword=${value.target.value}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setLoadingState(false);
    setOrder(isi.data.data.order);
    setTotal(isi.data.data.totalData);
    // setLoading(false);
  };

  const onFilter = () => {
    if (dateFilter) {
      httpClient
        .get(
          `sp/get-SP-all?limit=${limit}&page=1&keyword=${nameFilter}${dateFilter[0]}`
        )
        .then(({ data }) => {
          if (data.status.code === 200) {
            setOrder(data.data.order);
            setTotal(data.data.totalData);
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };
  const test = async () => {
    const isi = await axios.get(
      `${Baseurl}sp/get-SP-all?limit=${limit}&page=1&keyword=`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setOrder(isi.data.data.order);
    setTotal(isi.data.data.totalData);
  };


  useEffect(() => { 
    test();
    alert("IOOo")
  }, []);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
    httpClient
      .get(`sp/get-SP-all?limit=${limit}&page=${pageNumber}&keyword=`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrder(data.data.order);
          setTotal(data.data.totalData);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

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

  const onSelectChange = (value, e) => {
    if (e.name === "marketing") {
      setCompany(value);
    }
  };

  const onChangePicker = (date, dateString) => {
    setDateFilter(dateString);
  };

  return (
    <div>
      <Card>
        <Row>
          <Col span={4}>
            <Button type="primary" onClick={handleClick}>
              New SP
            </Button>
          </Col>
          <Col span={4}>
            <Search
              placeholder="No. SPID"
              allowClear
              onSearch={onSearch}
              onChange={onSearch}
              loading={loadingState}
            />
          </Col>
          <Col span={7}>
            <RangePicker onChange={onChangePicker} />
          </Col>
          <Col span={5}>
            <Select
              options={companyOptions}
              value={company}
              isSearchable
              placeholder="Select status"
              name="marketing"
              styles={customStylesReactSelect}
              onChange={onSelectChange}
            />
          </Col>
          <Col span={4}>
            <Button onClick={onFilter}>Filter</Button>
          </Col>
        </Row>
        <Table
          dataSource={order}
          columns={columns}
          style={{ marginTop: 10 }}
          pagination={false}
          scroll={{
            x: 1300,
          }}
        />
        <Pagination
          style={{ marginTop: 10 }}
          defaultCurrent={1}
          total={total}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          onChange={onChange}
        />
      </Card>
    </div>
  );
};

export default SamplePage;
