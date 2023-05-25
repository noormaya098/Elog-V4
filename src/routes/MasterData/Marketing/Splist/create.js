import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Space,
  Card,
  notification,
  Modal,
  Alert,
} from "antd";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { httpClient } from "../../../../Api/Api";
import * as Yup from "yup";
import moment from "moment";
import EditSP from "./EditSP";

const SamplePage = () => {
  /**
   * useHistory is a hook provided by React Router that returns the router history object.
   * The router history object allows you to manipulate the browser history and navigate to different
   * pages in your application.
   * @returns The router history object.
   */
  const router = useHistory();

  /* The above code is written in JavaScript and is using the useState hook from the React library. It
  is declaring a state variable called customerData and initializing it to null. The setCustomerData
  function can be used to update the value of customerData. This code is likely part of a React
  component and is used to manage the state of customer data within that component. */
  const [customerData, setCustomerData] = useState(null);
  const [idMp, setIdMp] = useState(null);
  const [idCust, setIdCust] = useState(null);
  const [jenisBrngPerusahaan, setJenisBrngPerusahaan] = useState("");
  const [jenisBrng, setJenisBrng] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noSP, setNoSP] = useState("");
  const [proses, setProses] = useState(1);
  const [company, setCompany] = useState({ label: "", value: "" });
  const [companyOptions, setCompanyOptions] = useState([]);
  const [alamat, setAlamat] = useState({ label: "", value: "" });
  const [alamatInvoiceOptions, setAlamatInvoiceOptions] = useState([]);
  const [marketing, setMarketing] = useState("");
  const [marketingOptions, setMarketingOptions] = useState([]);
  const [insurance, setInsurance] = useState("");
  const [insuranceOptions, setInsuranceOptions] = useState([]);
  const [service, setService] = useState("");
  const [serviceOptions, setServiceOptions] = useState([]);
  const [packing, setPacking] = useState("");
  const [packingOptions, setPackingOptions] = useState([]);
  const [sjdo, setSjDo] = useState("");
  const [sjDoOptions, setsjDoOptions] = useState([]);
  const [dataDestiTable, setDataDestiTable] = useState([]);
  const [destination, setDestination] = useState("");
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [destinationAdd, setDestinationAdd] = useState("");
  const [destinationAddOptions, setDestinationAddOptions] = useState([]);
  const [vehicle, setVehicle] = useState("");
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [via, setVia] = useState("");
  const [viaOptions, setViaOptions] = useState([]);
  const [shipment, setShipment] = useState("");
  const [shipmentOptions, setShipmentOptions] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [dataComment, setDataComment] = useState([]);
  const [fixPickup, setFixPickup] = useState("");
  const [fixDesti, setFixDesti] = useState("");
  const [kodeSalesOptions, setKodeSalesOptions] = useState([]);
  const [kodeSales, setKodeSales] = useState("");

  /**
   * Destructures the useForm hook from the antd library and initializes a new form instance.
   * @returns An instance of the Form class that can be used to create and manage forms.
   */
  const [form] = Form.useForm();
  const testOptions = [{ value: "0", label: "test" }];

  /**
   * Two React refs used to reference the input and form elements in a component.
   * @param {null} inputRef - A reference to the input element in a component.
   * @param {null} formRef - A reference to the form element in a component.
   * @returns None
   */
  const inputRef = useRef(null);
  const formRef = useRef(null);

  /* The above code is using the `useEffect` hook in React to focus on an input element if it has a
  required rule. It checks if the input element exists, has props, and has rules that include a
  required rule. If all conditions are met, it calls the `focus` method on the input element with
  the option to prevent scrolling. */
  useEffect(() => {
    const input = inputRef.current;
    if (
      input &&
      input.props &&
      input.props.rules &&
      input.props.rules.some((rule) => rule.required)
    ) {
      input.focus({ preventScroll: true });
    }
  }, []);

  /**
   * Initializes a Formik form with the given initial values, validation schema, and onSubmit function.
   * @param {Object} initialValues - The initial values for the form fields.
   * @param {Yup.ObjectSchema} validationSchema - The validation schema for the form fields.
   * @param {Function} onSubmit - The function to call when the form is submitted.
   * @returns A Formik form object with the specified initialValues, validationSchema, and onSubmit function.
   */
  const formik = useFormik({
    initialValues: {
      kodesales: "",
      ph: "",
      msp: noSP,
      memo: "",
      id_customer: "",
      jenis_barang: jenisBrng,
      packing: "",
      asuransi: "",
      tgl_pickup: "",
      tgl_bongkar: "",
      service: "",
      alamat_invoice: "",
      idMp: idMp,
      idcustomer: "",
      via: "",
      shipment: "",
      kendaraan: "",
      id_almuat: "1",
      id_albongkar: "1",
      nama_barang: "",
      berat: "0",
      qty: "0",
      koli: "0",
      ikat: "0",
      km: "0",
      diskon: "0",
      harga: "0",
      panjang: 0,
      lebar: 0,
      tinggi: 0,
      volume: 0,
      divisi: "",
      cabang: "",
      marketing: "",
    },
    validationSchema: Yup.object({
      ph: Yup.string().max(30, "Must be 30 characters or less"),
      msp: Yup.string().max(30, "Must be 30 characters or less"),
      via: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      const volume = values.panjang * values.lebar * values.tinggi;
      const updatedValues = {
        ...values,
        volume: volume,
        asuransi_fee: 0,
        total_keseluruhan: 0,
        is_multi:0,
      };
      setTimeout(() => {
        const input = inputRef.current;
        if (
          input &&
          input.props &&
          input.props.rules &&
          input.props.rules.some((rule) => rule.required)
        ) {
          input.focus({ preventScroll: true });
        }
      }, 0);
      if (proses === 1) {
        httpClient
          .post("sp/create-SP", updatedValues)
          .then(({ data }) => {
            notification.success({
              message: "Success",
              description: data.message,
            });
            setProses(2);
            httpClient
              .get("sp/get-SP-select-detail?keyword=&companyId=")
              .then(({ data }) => {
                if (data.status.code === 200) {
                  if (data.data.destination) {
                    if (Array.isArray(data.data.destination)) {
                      setDestinationOptions(
                        data.data.destination.map((x) => ({
                          label: x.address,
                          value: x.id,
                        }))
                      );
                      setDestinationAddOptions(
                        data.data.destination.map((x) => ({
                          label: x.address,
                          value: x.id,
                        }))
                      );
                    }
                  }
                  setVehicleOptions(
                    data.data.type.map((x) => ({
                      label: x.type,
                      value: x.id,
                    }))
                  );
                  setViaOptions(
                    data.data.via.map((x) => ({
                      label: x.via,
                      value: x.id,
                    }))
                  );
                  setShipmentOptions(
                    data.data.shipment
                    // .filter(x => { 
                    //   return x.via  === via
                    // })
                    .map(x => ({
                      label:  x.via + "-" + x.shipment ,
                      value: x.id,
                    }))
                  );
                  if (data.data.spNumber) {
                    setIdMp(data.data.spNumber[0].idmp);
                    formik.setFieldValue("idMp", data.data.spNumber[0].idmp);
                    form.setFieldsValue({ idMp: data.data.spNumber[0].idmp });
                  }
                }
              })
              .catch(function (error) {
                console.log(error.message);
              });
            const daya = {
              id_customer: idCust,
            };
            httpClient
              .get("customer/get-detail-customer", { params: daya })
              .then(({ data }) => {
                if (data.status.code === 200) {
                  setCustomerData(data.data);
                  form.setFieldsValue({ email: data.data.email });
                  form.setFieldsValue({ telpon: data.data.telepon });
                  form.setFieldsValue({ kota: data.data.alamat_kantor });
                  form.setFieldsValue({ jenis_barang: data.data.jenis_barang });
                  form.setFieldsValue({ nama_barang: data.data.nama_barang });
                  setJenisBrngPerusahaan(data.data.jenis_barang);
                  setJenisBrng(data.data.jenis_barang);
                }
              })
              .catch(function (error) {
                console.log(error.message);
              });
            // setTimeout(() => router.push("/splist"), 1000);
          })
          .catch(function (error) {
            notification.error({
              message: "Error",
              description: error.message,
            });
            console.log(error.message);
          });
      } else if (proses === 2) {
        httpClient
          .post("sp/create-SP-detail", updatedValues)
          .then(({ data }) => {
            notification.success({
              message: "Success",
              description: data.message,
            });
            setProses(3);
            setDataDestiTable([updatedValues]);
            router.push(`/masterdata/edit-sp/${idMp}`);
            // httpClient
            //   .post("sp/create-SP", updatedValues)
            //   .then(({ data }) => {
            //     notification.success({
            //       message: "Success",
            //       description: data.message,
            //     });
            //   })
            //   .catch(function (error) {
            //     notification.error({
            //       message: "Error",
            //       description: error.message,
            //     });
            //     console.log(error.message);
            //   });
            // httpClient
            //   .get("sp/get-SP-select-detail?keyword=&companyId=")
            //   .then(({ data }) => {
            //     if (data.status.code === 200) {
            //     }
            //   })
            //   .catch(function (error) {
            //     console.log(error.message);
            //   });
            // setTimeout(() => router.push("/splist"), 1000);
          })
          .catch(function (error) {
            notification.error({
              message: "Error",
              description: error.message,
            });
            console.log(error.message);
          });
      } else {
        setTimeout(() => router.push(`/masterdata/edit-sp/${idMp}`), 1000);
      }
    },
  });

  useEffect(() => {
    httpClient
      .get(
        "sp/get-SP-select-create?keyword=&companyId=&divisi=sales&kode_cabang=JKT"
      )
      // .get("sp/get-SP-select-create?keyword=&companyId=")
      // .get("customer/get-customer-address")
      .then(({ data }) => {
        if (data.status.code === 200) {
          formik.setFieldValue("msp", data.data.noSP);
          formik.setFieldValue("ph", data.data.noPH);
          form.setFieldsValue({ msp: data.data.noSP, ph: data.data.noPH });
          setNoSP(data.data.noSP);
          setMarketingOptions(testOptions);
          setsjDoOptions(testOptions);
          setCompanyOptions(
            data.data.company.map((x) => ({
              label: x.companyName,
              value: x.id,
              companyStuff: x.companyStuff,
            }))
          );
          setPackingOptions(
            data.data.packing.map((x) => ({
              label: x.packing,
              value: x.id,
            }))
          );
          setInsuranceOptions(
            data.data.insurance.map((x) => ({
              label: x.tipe,
              value: x.value,
            }))
          );
          setServiceOptions(
            data.data.service.map((x) => ({
              label: x.tipe,
              value: x.tipe,
            }))
          );
          setKodeSalesOptions(
            data.data.marketing.map((x) => ({
              label: x.fullname,
              value: x.id,
            }))
          );
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
    httpClient
      .get("sp/get-SP-select-detail?keyword=&companyId=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          if (data.data.destination) {
            if (Array.isArray(data.data.destination)) {
              setDestinationOptions(
                data.data.destination.map((x) => ({
                  label: x.address,
                  value: x.id,
                }))
              );
              setDestinationAddOptions(
                data.data.destination.map((x) => ({
                  label: x.address,
                  value: x.id,
                }))
              );
            }
          }
          setVehicleOptions(
            data.data.type.map((x) => ({
              label: x.type,
              value: x.id,
            }))
          );
          setViaOptions(
            data.data.via.map((x) => ({
              label: x.via,
              value: x.id,
            }))
          );
          setShipmentOptions(
            data.data.shipment.map((x) => ({
              label: x.shipment,
              value: x.id,
            }))
          );
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  /**
   * The function handles changes in select input fields and updates the form values accordingly.
   * @param value - The selected value from the dropdown menu.
   * @param e - The `e` parameter is an event object that contains information about the event that
   * triggered the function. It is likely an object that has a `name` property that is used to
   * determine which action to take within the function.
   */
  const onSelectChange = (value, e) => {
    if (e.name === "id_customer") {
      setFixDesti(value.label);
      formik.setFieldValue("jenis_barang", value.companyStuff);
      formik.setFieldValue("nama_barang", value.companyStuff);
      form.setFieldsValue({ jenis_barang: value.companyStuff });
      form.setFieldsValue({ nama_barang: value.companyStuff });
      form.setFieldsValue({ namaPerusahaan: value.label });
      setJenisBrng(value.companyStuff);
      setCompany(value);
      setIdCust(value.value);
      formik.setFieldValue("id_customer", value.value);
      formik.setFieldValue("idcustomer", value.value);
      httpClient
        // .get(`sp/get-SP-select-create?keyword=&companyId=${value.value}`)
        .get(
          `sp/get-SP-select-create?keyword=&companyId=${value.value}&divisi=sales&kode_cabang=JKT`
        )
        .then(({ data }) => {
          if (data.status.code === 200) {
            if (data.data.address) {
              setAlamatInvoiceOptions(
                data.data.address.map((x) => ({
                  label: x.address,
                  value: x.addressId,
                  address: x.address,
                }))
              );
              setDestinationAddOptions(
                data.data.address.map((x) => ({
                  label: x.address,
                  value: x.addressId,
                  address: x.address,
                }))
              );
            }
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else if (e.name === "alamat_invoice") {
      setAlamat(value);
      formik.setFieldValue("alamat_invoice", value.address);
    } else if (e.name === "service") {
      setService(value);
      formik.setFieldValue("service", value.value);
    } else if (e.name === "asuransi") {
      setInsurance(value);
      formik.setFieldValue("asuransi", value.value);
    } else if (e.name === "packing") {
      setPacking(value);
      formik.setFieldValue("packing", value.value);
    } else if (e.name === "marketing") {
      setMarketing(value);
    } else if (e.name === "sjDo") {
      setSjDo(value);
    } else if (e.name === "companyName") {
      setDestination(value);
      formik.setFieldValue("companyName", value.value);
    } else if (e.name === "kendaraan") {
      setVehicle(value);
      formik.setFieldValue("kendaraan", value.label);
    } else if (e.name === "via") {
      setVia(value);
      formik.setFieldValue("via", value.value);
      setAlamat(value);
    } else if (e.name === "shipment") {
      setShipment(value);
      formik.setFieldValue("shipment", value.value);
    } else if (e.name === "id_albongkar") {
      // setFixPickup(value);
      setAlamat(value);
      // if (value && value.length > 0) {
      //   const selectedValues = value.map((option) => option.value);
      //   formik.setFieldValue("id_almuat", selectedValues);
      // } else {
      //   formik.setFieldValue("id_almuat", []);
      // }
      formik.setFieldValue("id_albongkar", value.value);
      // formik.setFieldValue("id_almuat", value);
      // formik.setFieldValue("id_almuat", value.value);
    } else if (e.name === "id_almuat") {
      setAlamat(value);
        formik.setFieldValue("id_almuat", value.value);
      // if (value && value.length > 0) {
      //   const selectedValues = value.map((option) => option.value);
      //   formik.setFieldValue("id_almuat", selectedValues.value);
      // } else {
      //   formik.setFieldValue("id_almuat", []);
      // }
    } else if (e.name === "idcustomer") {
      setDestinationAdd(value);
      // formik.setFieldValue("id_albongkar", value.value);
      formik.setFieldValue("idcustomer", value.value);
    } else if (e.name === "kodesales") {
      setKodeSales(value);
      formik.setFieldValue("kodesales", value.value);
    }
  };

  const customStylesReactSelect = {
    /* The above code is defining a function that takes an object as an argument and returns a modified
    version of that object. Specifically, it modifies the `width` property of the object to be
    `"100%"`. This code is written in JavaScript and the ` */
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

  /**
   * Sets the state of the modal to open, displaying the modal on the screen.
   * @returns None
   */
  const showModal = () => {
    setIsModalOpen(true);
  };
  /**
   * Handles the "Ok" button click event in a modal form.
   * Submits the form using Formik's handleSubmit method and checks if there are any errors.
   * If there are no errors, closes the modal.
   * @returns None
   */
  const handleOk = () => {
    formik.handleSubmit();
    if (Object.keys(formik.errors).length === 0) {
      setIsModalOpen(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeInputComment = (e) => {
    setCommentInput(e.target.value);
  };

  const sendComment = () => {
    setDataComment([...dataComment, commentInput]);
    setCommentInput("");
  };

  const onFinishFailed = ({ errorFields }) => {
    const errorMessages = errorFields.map((field) => field.errors.join(", "));
    const errorMessage = errorMessages.join(". ");

    notification.error({
      message: "Form Submission Failed",
      description: errorMessage,
    });
  };

  return (
    <div>
      <Card>
      <h2>Buat SP</h2>
        <Form
          onFinish={formik.handleSubmit}
          initialValues={{
            msp: noSP,
            namaPerusahaan: company.label,
            jenis_barang: jenisBrng,
            email: customerData ? customerData.email : "",
            telpon: customerData ? customerData.telpon : "",
            kota: customerData ? customerData.kota : "",
            berat: "0",
            koli: "0",
            volume: "0",
            qty: "0",
          }}
          form={form}
          layout="vertical"
          ref={formRef}
          scrollToFirstError
          onFinishFailed={onFinishFailed}
        >
          {proses === 1 ? (
            <>

              <Row>
                <Col md={6}>
                  <Form.Item
                    label="No. SP"
                    name="msp"
                    rules={[{ required: true, message: "Mohon isi No. SP" }]}
                  >
                    <Input onChange={formik.handleChange} disabled />
                  </Form.Item>
                </Col>
                <Col md={6} >
                  <Form.Item
                    label="No. PH"
                    name="ph"
                    style={{display:'none'}}
                    rules={[{ required: true, message: "Mohon isi No. PH" }]}
                  >
                    <Input onChange={formik.handleChange} disabled />
                  </Form.Item> 
                  <Form.Item
                    label="Marketing"
                    name="kodesales"
                    rules={[
                      {
                        required: true,
                        message: "Pilih Marketing",
                      },
                    ]}
                  >
                    <Select
                      options={kodeSalesOptions}
                      value={kodeSales}
                      isSearchable
                      placeholder="Pilih Marketing"
                      name="kodesales"
                      styles={customStylesReactSelect}
                      onChange={onSelectChange}
                    />
                  </Form.Item>
                </Col> 
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Item
                    label="Nama Perusahaan"
                    name="id_customer"
                    rules={[
                      {
                        required: true,
                        message: "Mohon pilih Nama Perusahaan",
                      },
                    ]}
                  >
                    <Select
                      options={companyOptions}
                      value={company}
                      isSearchable
                      placeholder="Select company"
                      name="id_customer"
                      styles={customStylesReactSelect}
                      onChange={onSelectChange}
                      ref={inputRef}
                      autoFocus
                    />
                  </Form.Item>
                </Col>
                <Col md={3}>
                  <Form.Item
                    label="Tanggal Pickup"
                    name="tgl_pickup"
                    rules={[
                      { required: true, message: "Mohon pilih Tanggal Pickup" },
                    ]}
                  >
                    <DatePicker
                      onChange={(date, dateString) =>
                        formik.setFieldValue("tgl_pickup", dateString)
                      }
                      
                    />
                  </Form.Item>
                </Col>
                <Col md={3}>
                  <Form.Item
                    label="Tanggal Bongkar"
                    name="tgl_bongkar"
                    rules={[
                      {
                        required: true,
                        message: "Mohon pilih Tanggal Bongkar",
                      },
                    ]}
                  >
                    <DatePicker
                      onChange={(date, dateString) =>
                        formik.setFieldValue("tgl_bongkar", dateString)
                      }
                      // showTime
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <Form.Item
                    label="Alamat Invoice"
                    name="invoiceAddress"
                    rules={[
                      { required: true, message: "Mohon isi Alamat Invoice" },
                    ]}
                  >
                    <Select
                      options={alamatInvoiceOptions}
                      value={alamat}
                      isSearchable
                      placeholder="Select alamat"
                      name="alamat_invoice"
                      styles={customStylesReactSelect}
                      onChange={onSelectChange}
                    />
                  </Form.Item>
                </Col>
                
              <Col md={4}>
                  <Form.Item
                    label="Jenis Barang"
                    name="jenis_barang"
                    rules={[
                      { required: true, message: "Mohon isi Jenis Barang" },
                    ]}
                  >
                    <Input
                      onChange={formik.handleChange}
                      ref={inputRef}
                      autoFocus
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                {/* <Col md={12}>
                  <Form.Item
                    label="Marketing"
                    name="marketing"
                    rules={[
                      { required: true, message: "Mohon pilih Marketing" },
                    ]}
                  >
                    <Select
                      options={marketingOptions}
                      value={marketing}
                      isSearchable
                      placeholder="Select marketing"
                      name="id_customer"
                      styles={customStylesReactSelect}
                      onChange={onSelectChange}
                    />
                  </Form.Item>
                </Col> */}
                {/* <Col md={24}>
                  <Form.Item
                    label="SJ/DO"
                    name="sjDo"
                    rules={[{ required: true, message: "Mohon pilih SJ/DO" }]}
                  >
                    <Select
                      options={sjDoOptions}
                      value={sjdo}
                      isSearchable
                      placeholder="Select SJ/DO"
                      name="sjDo"
                      styles={customStylesReactSelect}
                      onChange={onSelectChange}
                    />
                  </Form.Item>
                </Col> */}
              </Row>
              <Row>
                
                <Col md={4}>
                  <Form.Item
                    label="Service"
                    name="service"
                    rules={[{ required: true, message: "Mohon pilih Service" }]}
                  >
                    <Select
                      options={serviceOptions}
                      value={service}
                      isSearchable
                      placeholder="Select service"
                      name="service"
                      styles={customStylesReactSelect}
                      onChange={onSelectChange}
                    />
                  </Form.Item>
                </Col>
                <Col md={4}>
                  <Form.Item
                    label="Insurance"
                    name="asuransi"
                    rules={[
                      { required: true, message: "Mohon pilih Insurance" },
                    ]}
                  >
                    <Select
                      options={insuranceOptions}
                      value={insurance}
                      isSearchable
                      placeholder="Select insurance"
                      name="asuransi"
                      styles={customStylesReactSelect}
                      onChange={onSelectChange}
                    />
                  </Form.Item>
                </Col>
                <Col sm={4}>
                <Form.Item
                label="Packing Request"
                name="packing"
                rules={[{ required: true, message: "Mohon pilih Packing" }]}
              >
                <Select
                  options={packingOptions}
                  value={packing}
                  isSearchable
                  placeholder="Select packing"
                  name="packing"
                  styles={customStylesReactSelect}
                  onChange={onSelectChange}
                />
              </Form.Item></Col>
              </Row>

             

              <Form.Item label="Memo" name="memo">
                <Input.TextArea rows={4} onChange={formik.handleChange} />
              </Form.Item>
              <Space direction="vertical" style={{ width: "100%" }}>
                {formik.errors.via && (
                  <Alert message={formik.errors.via} type="warning" />
                )}
                {formik.errors.msp && (
                  <Alert message={formik.errors.msp} type="warning" />
                )}
                {formik.errors.ph && (
                  <Alert message={formik.errors.ph} type="warning" />
                )}
              </Space>
            </>
          ) : (
            <>
              <Row>
                <Col md={6}>
                  <Form.Item
                    label="No. SP"
                    name="msp"
                    rules={[{ required: true, message: "Mohon isi No. SP" }]}
                  >
                    <Input onChange={formik.handleChange} disabled />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item label="Nama Perusahaan" name="namaPerusahaan">
                    <Input onChange={formik.handleChange} disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col md={6} style={{display:'none'}}>
                  <Form.Item label="Email" name="email">
                    <Input onChange={formik.handleChange} disabled />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item label="Kota" name="kota">
                    <Input onChange={formik.handleChange} disabled />
                  </Form.Item>
                </Col> 
                <Col md={6}>
                  <Form.Item label="Telpon" name="telpon">
                    <Input onChange={formik.handleChange} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <h3>Masukan Alamat</h3>
                  <Button type="primary" onClick={showModal}>
                    Add Destination
                  </Button>
                  <Modal
                    title="Masukan Alamat"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={900}
                  >
                    <Row>
                      <Col md={6}>
                        <h5>Alamat Muat</h5>
                        <Form.Item
                          label="Alamat Muat"
                          name="id_almuat"
                          rules={[
                            {
                              required: true,
                              message: "Mohon pilih Nama Perusahaan",
                            },
                          ]}
                        >
                          <Select
                            options={alamatInvoiceOptions}
                            value={alamat}
                            isSearchable
                            placeholder="Select Alamat Muat"
                            name="id_almuat"
                            styles={customStylesReactSelect}
                            onChange={onSelectChange}
                            // isMulti
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <hr/>
                    <Row>
                      <Col md={12}>
                        <h5>Alamat Bongkar</h5>
                        <Form.Item
                          label="Alamat Bongkar"
                          name="id_albongkar"
                          required
                        >
                          <Select
                            options={destinationAddOptions}
                            value={destinationAdd}
                            isSearchable
                            placeholder="Select Destination"
                            name="id_albongkar"
                            styles={customStylesReactSelect}
                            onChange={onSelectChange}
                            
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Item label="Vehicle " name="kendaraan" required>
                          <Select
                            options={vehicleOptions}
                            value={vehicle}
                            isSearchable
                            placeholder="Select Vehicle"
                            name="kendaraan"
                            styles={customStylesReactSelect}
                            onChange={onSelectChange}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={6}>
                        <Form.Item
                          label="Via "
                          name="via"
                          style={{ marginLeft: 10 }}
                          required
                        >
                          <Select
                            options={viaOptions}
                            value={via}
                            isSearchable
                            placeholder="Select Via"
                            name="via"
                            styles={customStylesReactSelect}
                            onChange={onSelectChange}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Item label="Shipment " name="shipment" required>
                          <Select
                            options={shipmentOptions}
                            value={shipment}
                            isSearchable
                            placeholder="Select Shipment"
                            name="shipment"
                            styles={customStylesReactSelect}
                            onChange={onSelectChange}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={6}>
                        <Form.Item 
                          label="Jenis Barang"
                          name="jenis_barang"
                          style={{ marginLeft: 10 }}
                          required
                        >
                          <Input disabled onChange={formik.handleChange} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Form.Item label="Berat" name="berat" required>
                          <Input onChange={formik.handleChange} />
                        </Form.Item>
                      </Col>
                      <Col md={4}>
                        <Form.Item
                          label="Qty "
                          name="qty"
                          style={{ marginLeft: 10 }}
                          required
                        >
                          <Input onChange={formik.handleChange} />
                        </Form.Item>
                      </Col>
                      <Col md={4}>
                        <Form.Item
                          label="Koli "
                          name="koli"
                          style={{ marginLeft: 10 }}
                          required
                        >
                          <Input onChange={formik.handleChange} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Form.Item label="Panjang " name="panjang" required>
                          <Input onChange={formik.handleChange} />
                        </Form.Item>
                      </Col>
                      <Col md={4}>
                        <Form.Item label="Lebar " name="lebar" required>
                          <Input onChange={formik.handleChange} />
                        </Form.Item>
                      </Col>
                      <Col md={4}>
                        <Form.Item label="Tinggi " name="tinggi" required>
                          <Input onChange={formik.handleChange} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <Form.Item
                          label="Tarif"
                          name="harga"
                          style={{ marginLeft: 10 }}
                          required
                        >
                          <Input disabled onChange={formik.handleChange} />
                        </Form.Item>
                      </Col>
                      <Col sm={4}>
                        <Form.Item
                          label="Biaya Bongkar"
                          name="hargaBongkar"
                          style={{ marginLeft: 10 }}
                          required
                        >
                          <Input disabled onChange={formik.handleChange} />
                        </Form.Item>
                      </Col>
                      <Col sm={4}>
                        <Form.Item
                          label="Biaya Muat"
                          name="hargaMuat"
                          style={{ marginLeft: 10 }}
                          required
                        >
                          <Input disabled onChange={formik.handleChange} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Modal>
                  <table className="table table-condensed">
                    <tbody>
                      <tr>
                        <th className="text-center">No </th>
                        <th className="text-center">Pickup</th>
                        <th className="text-center">Destination</th>
                        <th className="text-center">Shipment</th>
                        <th className="text-center">Item</th>
                        <th className="text-center">Berat</th>
                        <th className="text-center">Exp</th>
                        <th className="text-center">Koli</th>
                        <th className="text-center">Harga </th>
                        <th className="text-center">Biaya Bongkar</th>
                        <th className="text-center">Total</th>
                      </tr>
                      {dataDestiTable.length > 0 ? (
                        dataDestiTable.map((item, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{fixPickup}</td>
                            <td className="text-center">{fixDesti}</td>
                            <td className="text-center">{item.shipment}</td>
                            <td className="text-center"></td>
                            <td className="text-center">{item.berat}</td>
                            <td className="text-center"></td>
                            <td className="text-center">{item.koli}</td>
                            <td className="text-center">
                              {item.harga ? item.harga : "0"}
                            </td>
                            <td className="text-center"></td>
                            <td className="text-center">
                              {item.harga ? item.harga : "0"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="text-center" colSpan={11}>
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="5" className="text-left">
                          Total
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th className="text-center">-</th>
                        <th className="text-center">-</th>
                      </tr>
                      <tr>
                        <th colSpan="10" className="text-left">
                          Biaya Muat
                        </th>
                        <th className="text-center">0</th>
                      </tr>
                      <tr>
                        <th colSpan="10" className="text-left">
                          Biaya Bongkar
                        </th>
                        <th className="text-center">0</th>
                      </tr>
                      <tr>
                        <th colSpan="10" className="text-left">
                          Biaya Multidrop
                        </th>
                        <th className="text-center">0</th>
                      </tr>
                      <tr>
                        <th colSpan="10" className="text-left">
                          Biaya Lainnya
                        </th>
                        <th className="text-center">0</th>
                      </tr>
                      <tr>
                        <th colSpan="10" className="text-left">
                          Biaya Overtonase
                        </th>
                        <th className="text-center">0</th>
                      </tr>
                      <tr>
                        <th colSpan="10" className="text-left">
                          Total Biaya Keseluruhan
                        </th>
                        <th className="text-center">0</th>
                      </tr>
                    </tfoot>
                  </table>
                  <table
                    id="tb1"
                    class="table table-striped table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th colspan="5">Detail Armada</th>
                      </tr>
                      <tr>
                        <th>No.</th>
                        <th>Armada</th>
                        <th>Vehicle</th>
                        <th>Driver</th>
                        <th>Tujuan</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                  <table
                    id="tb1"
                    class="table table-striped table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th colspan="5">Detail Delivery</th>
                      </tr>
                      <tr>
                        <th width="5%">No.</th>
                        <th width="5%">Alamat</th>
                        <th>Penerima</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="3">
                          <table
                            id="tb1"
                            class="table table-striped table-bordered table-hover"
                          >
                            <thead>
                              <tr>
                                <th colspan="5">Status Pengiriman</th>
                              </tr>
                              <tr>
                                <th width="5%">No.</th>
                                <th width="5%">Status</th>
                                <th>Waktu</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    id="example1"
                    class="table table-striped table-bordered table-hover"
                  >
                    <thead>
                      <tr class="odd gradeX">
                        <th>No. </th>
                        <th>Coment</th>
                        <th>User</th>
                        <th>Tgl Coment</th>
                      </tr>
                    </thead>
                    <tbody id="tampil">
                      {dataComment.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item}</td>
                          <td>-</td>
                          <td>{moment().format("YYYY-MM-DD")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Row>
                    <Col>
                      <Input
                        onChange={onChangeInputComment}
                        value={commentInput}
                      />
                    </Col>
                    <Col>
                      <Button onClick={sendComment} type="primary">
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {proses === 1 ? "Next Process" : "Save"}
              </Button>
              {proses === 1 ? null : <Button>Cancel</Button>}
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SamplePage;
