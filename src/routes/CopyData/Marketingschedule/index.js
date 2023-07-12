import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
  Calendar,
  notification,
  Modal as AntdModal,
  Upload,
  message,
} from "antd";
import { CSVLink } from "react-csv";
import { httpClient } from "../../../Api/Api";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, useFormikContext } from "formik";
import Select from "react-select";
import { format } from "date-fns";
import { Modal, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { UploadOutlined } from '@ant-design/icons';
import { useAuth } from "../../authentication";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import moment from "moment";
import { useSelector } from "react-redux";

const { RangePicker } = DatePicker;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const SamplePage = () => {
  const { userSignOut, authUser } = useAuth();
  const [order, setOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [calendarState, setCalendarState] = useState(null);
  const [showModalReport, setShowModalReport] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [customer, setCustomer] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [kodeSalesOptions, setKodeSalesOptions] = useState([]);
  const [kodeSales, setKodeSales] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  
const [showReport, setShowReport] = useState(false);
const [reportContent, setReportContent] = useState('');
  // const [authUser, setAuthUser] = useState(null);
  const [jenisKategori, setJenisKategori] = useState({
    value: "kategori1",
    label: "Kategori 1",
  });
  const [selectTaskId, setSelectTaskId] = useState(null);
  const [fileList, setFileList] = useState([]);

  console.log(authUser)
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files);

    // Add newly selected images to the existing selectedImages state
    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      ...imagesArray,
    ]);
  };
  const handleDeleteImage = (index) => {
    setSelectedImages((prevSelectedImages) => {
      const updatedImages = [...prevSelectedImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onPanelChange = (value, mode) => {
    setCalendarState({ value, mode });
    console.log(value.format("YYYY-MM-DD"), mode);
    const date = value.format("YYYY-MM-DD");
    httpClient
      .get(
        `marketing/get-Schedule?limit=10&page=1&id_user=${authUser.id}&datetask=${date}`
      )
      .then(({ data }) => {
        if (data.status.code === 200) {
          // const filteredOrder = data.data.order.filter((item) => {
          //   // Assuming `item.dateCreated` is in the format "YYYY-MM-DD HH:mm:ss"
          //   const itemDate = item.dateCreated.split(" ")[0]; // Extract the date part

          //   return itemDate === date;
          // });

          setOrder(data.data.order);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const initialValues = {
    tanggal: dayjs().format("YYYY-MM-DD"),
    sales: null,
    kategori: null,
    customer: null,
    memo: "",
    id_user: "",
    id_customer: "",
    task_type: "",
    prospect: "",
    datetask: "",
    id_task: "",
    bertemu: "",
    jabatan: "",
    tagihan: "",
    dapat: "",
    aktivitas: "",
    positif: "",
    negatif: "",
    peluang: "",
    hambatan: "",
    img_a: "",
    img_b: "",
    img_c: "",
  };

  const salesOptions = [
    { value: "sales1", label: "Sales 1" },
    { value: "sales2", label: "Sales 2" },
    // gunain API di folder Marketing (get select)
  ];

  const kategoriOptions = [
    { value: "kategori1", label: "Kategori 1" },
    { value: "kategori2", label: "Kategori 2" },
    // Add more kategori options as needed
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpClient.defaults.headers.common["Authorization"] = token;
    }

    httpClient
      .get("auth/get-profile")
      .then(({ data }) => {
        if (data.data) {
          // setAuthUser(data.data);
          console.log(data.data.fullname);
          const filteredSales = kodeSalesOptions.filter(
            (item) => item.label === data.data.fullname
          );
          console.log(filteredSales);
          setKodeSales(filteredSales);
        }
      })
      .catch(function () {
        localStorage.removeItem("token");
        httpClient.defaults.headers.common["Authorization"] = "";
        // setLoadingUser(false);
      });
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "marketing",
      dataIndex: "marketing",
      key: "marketing",
    },
    // {
    //   title: "memo",
    //   dataIndex: "memo",
    //   key: "memo",
    // },
    {
      title: "customer",
      dataIndex: "customer",
      key: "customer",
    },
    // {
    //   title: "dateTask",
    //   dataIndex: "dateTask",
    //   key: "dateTask",
    // },
    {
      title: "divisi",
      dataIndex: "divisi",
      key: "divisi",
    },
    {
      title: "typeTask",
      dataIndex: "typeTask",
      key: "typeTask",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record, index) => (
        <Space size="middle">
          <Button
            onClick={() => handleShowModalReport(record.taskId)}
            type="primary"
          >
            Report
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddReport = (values) => {
    let updatedCustomer = { ...customer, ...values };
    console.log(selectedImages[0]?.name);
    updatedCustomer.id_user = authUser.id;
    updatedCustomer.id_customer = customer.value;
    updatedCustomer.datetask = moment(values.tanggal).format("YYYY-MM-DD");
    updatedCustomer.id_task = selectTaskId ?? 1;
    if (selectedImages) {
      updatedCustomer.img_a = selectedImages[0]?.name;
      updatedCustomer.img_b = selectedImages[1]?.name;
      updatedCustomer.img_c = selectedImages[2]?.name;
    }
    httpClient
      .post("marketing/create-task-result", updatedCustomer)
      .then(({ data }) => {
        notification.success({
          message: "Success",
          description: data.message,
        });
        setReportContent(updatedCustomer.report); // If the report is stored in the updatedCustomer variable
        setShowReport(true); // Show the report after it is submitted
        setTimeout(() => router.push("/marketingschedule"), 1000);
      })
      .catch(function (error) {
        notification.error({
          message: "Error",
          description: error.message,
        });
        console.log(error.message);
      });
  };
  

  const handleAdd = (values) => {
    // Replace with your desired logic for handling form submission
    // console.log(values);
    let updatedCustomer = { ...customer, ...values };
    console.log(kodeSales, customer);
    updatedCustomer.id_user = authUser.id;
    updatedCustomer.id_customer = customer.value;
    updatedCustomer.datetask = moment(values.tanggal).format("YYYY-MM-DD");
    httpClient
      .post("marketing/create-task-planing", updatedCustomer)
      .then(({ data }) => {
        notification.success({
          message: "Success",
          description: data.message,
        });
        setTimeout(() => router.push("/marketingschedule"), 1000);
        // marketing/create-task-result
        httpClient
          .post("marketing/create-task-result", values)
          .then(({ data }) => { })
          .catch(function (error) {
            notification.error({
              message: "Error",
              description: error.message,
            });
            console.log(error.message);
          });
      })
      .catch(function (error) {
        notification.error({
          message: "Error",
          description: error.message,
        });
        console.log(error.message);
      });
  };

  useEffect(() => {
    // if (authUser) {
    const date = dayjs().format("YYYY-MM-DD");
    httpClient
      .get(
        `marketing/get-Schedule?limit=10&page=1&id_user=${authUser.id}&datetask=${date}`
      )
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrder(data.data.order);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
    httpClient
      .get("customer/get-customer")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setCustomerOptions(
            data.data.order.map((x) => ({
              label: x.custName,
              value: x.custId,
            }))
          );
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
    httpClient
      .get(
        "sp/get-SP-select-create?keyword=&companyId=&divisi=sales&kode_cabang=JKT"
      )
      .then(({ data }) => {
        if (data.status.code === 200) {
          setKodeSalesOptions(
            data.data.marketing.map((x) => ({
              label: x.fullname,
              value: x.id,
            }))
          );

          // setTimeout(() => {
          //   const token = localStorage.getItem("token");
          //   if (token) {
          //     httpClient.defaults.headers.common["Authorization"] = token;
          //   }

          //   httpClient
          //     .get("auth/get-profile")
          //     .then(({ data }) => {
          //       if (data.data) {
          //         setAuthUser(data.data);
          //         console.log(data.data.fullname);
          //         const filteredSales = kodeSalesOptions.filter(
          //           (item) => item.label === data.data.fullname
          //         );
          //         console.log(filteredSales);
          //         setKodeSales(filteredSales);
          //       }
          //     })
          //     .catch(function () {
          //       localStorage.removeItem("token");
          //       httpClient.defaults.headers.common["Authorization"] = "";
          //       // setLoadingUser(false);
          //     });
          // }, 1000);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
    // }
  }, []);

  const handleDetail = (id) => {
    router.push(`/marketingschedule/detail/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/marketingschedule/edit/${id}`);
  };
  const router = useHistory();
  const handleSubmit = (values) => {
    console.log(values); // Replace with your desired logic for form submission
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  // const handleShowModalReport = (id) => {
  //   setSelectTaskId(id);
  //   setShowModalReport(true);
  // };
  const handleShowModalReport = (taskId) => {
    httpClient
      .get(`marketing/get-Detail-Schedule?id_task=${taskId}`)
      .then(({ data }) => {
        setReportContent(data.report);
        setShowReport(true);
      })
      .catch(function (error) {
        notification.error({
          message: "Error",
          description: error.message,
        });
        console.log(error.message);
      });
  };
  
  const handleCloseModalReport = () => {
    setShowModalReport(false);
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
  const handleUpload = (info) => {
    // Get the uploaded files from the info object
    const { fileList } = info;

    // Update the state with the selected files
    setFileList(fileList);
  };
  const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: handleUpload, // Pass the handleUpload function as the onChange handler
  };
  return (
    <div>
      <Row>
        <Col md={11}>
          <Calendar
            onPanelChange={onPanelChange}
            style={{ marginBottom: 10 }}
            onChange={onPanelChange}
          />
        </Col>
        <Col md={13}>
          <Card style={{ marginBottom: "16px" }}>
            <Row gutter={[16, 16]}>
              <Col span={4}>
                <RangePicker format="DD-MM-YYYY" showToday />
              </Col>
              <Col span={16}>
                <Button
                  type="primary"
                  style={{ marginRight: 16 }}
                  onClick={handleShowModal}
                >
                  Add
                </Button>
                <CSVLink data={order} filename={"data.csv"}>
                  <Button icon={<DownloadOutlined />} type="primary">
                    Export
                  </Button>
                </CSVLink>
              </Col>

              <Col span={4}>
                <Input.Search
                  placeholder="Search"
                  allowClear
                  enterButton={<SearchOutlined />}
                />
              </Col>
            </Row>
          </Card>
          <Table columns={columns} dataSource={order} scroll={{ x: 800 }} />
        </Col>
      </Row>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValues} onSubmit={handleAdd}>
            <Form>
              <div className="mb-3">
                <label htmlFor="tanggal" className="form-label">
                  Tanggal:
                </label>
                <Field
                  type="date"
                  className="form-control"
                  id="tanggal"
                  name="tanggal"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sales" className="form-label">
                  Sales:
                </label>
                <Select
                  options={kodeSalesOptions}
                  value={kodeSales}
                  isSearchable
                  placeholder="Select Sales"
                  name="sales"
                  styles={customStylesReactSelect}
                  onChange={(e) => setKodeSales(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="kategori" className="form-label">
                  Kategori:
                </label>
                <Select
                  options={kategoriOptions}
                  name="kategori"
                  value={jenisKategori}
                  onChange={(e) => setJenisKategori(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customer" className="form-label">
                  Customer:
                </label>
                <Select
                  options={customerOptions}
                  value={customer}
                  isSearchable
                  placeholder="Select Customer"
                  name="customer"
                  styles={customStylesReactSelect}
                  onChange={(e) => setCustomer(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="memo" className="form-label">
                  Memo:
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="memo"
                  name="memo"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModalReport}
        onHide={handleCloseModalReport}
        className="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              bertemu: "",
              doSp: "",
              jabatan: "",
              tagihan: "",
              dapat: 0,
              aktivitas: "",
              peluang: "",
              positif: "",
              hambatan: "",
              negatif: "",
              dokumentasi: "",
              img_a: "",
              img_b: "",
              img_c: "",
            }}
            onSubmit={handleAddReport}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel>Bertemu dengan</FormLabel>
                  <FormControl
                    name="bertemu"
                    value={values.bertemu}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>DO/SP</FormLabel>
                  <FormControl
                    name="doSp"
                    value={values.doSp}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Jabatan</FormLabel>
                  <FormControl
                    name="jabatan"
                    value={values.jabatan}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Tagihan</FormLabel>
                  <FormControl
                    name="tagihan"
                    value={values.tagihan}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Aktivitas</FormLabel>
                  <FormControl
                    name="aktivitas"
                    value={values.aktivitas}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Peluang</FormLabel>
                  <FormControl
                    name="peluang"
                    value={values.peluang}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Respon Positif</FormLabel>
                  <FormControl
                    name="positif"
                    value={values.positif}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Hambatan</FormLabel>
                  <FormControl
                    name="hambatan"
                    value={values.hambatan}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Respon Negatif</FormLabel>
                  <FormControl
                    name="negatif"
                    value={values.negatif}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Dokumentasi</FormLabel>
                  <FormControl
                    type="file" multiple onChange={handleImageUpload}
                  />
                </FormGroup>
                <div className="selected-images">
        {selectedImages.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded image ${index}`}
              className="uploaded-image"
            />
            <Button variant="danger" onClick={() => handleDeleteImage(index)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModalReport}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SamplePage;
