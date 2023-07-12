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
  Image,
  Modal,
  notification,
} from "antd";
import Select from "react-select";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { httpClient } from "../../util/Api";
import { InputGroup, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const { RangePicker } = DatePicker;

const { Search } = Input;

const onSearch = (value) => console.log(value);

const SamplePage = () => {
  const { idMp } = useParams();

  const router = useHistory();

  const [data, setData] = useState([]);
  const [orderDataTable, setOrderDataTable] = useState([]);
  const [order, setOrder] = useState([]);
  const [company, setCompany] = useState({ label: "", value: "" });
  const [dataSelect, setDataSelect] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onEditField, setOnEditField] = useState(true);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState(0);
  const [limit, setLimit] = useState(10);
  const [detailSp, setDetailSp] = useState([]);
  const [packing, setPacking] = useState("");
  const [packingOptions, setPackingOptions] = useState([]);
  const [biayaMuat, setBiayaMuat] = useState(0);
  const [biayaBongkar, setBiayaBongkar] = useState(0);
  const [biayaMultidrop, setBiayaMultidrop] = useState(0);
  const [biayaLainnya, setBiayaLainnya] = useState(0);
  const [biayaOvertonase, setBiayaOvertonase] = useState(0);

  const totalBiayaKeseluruhan =
    biayaMuat + biayaBongkar + biayaMultidrop + biayaLainnya + biayaOvertonase;

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

  const formik = useFormik({
    initialValues: {
      memo: "",
      id_customer: "",
      jenis_barang: "",
      packing: "",
      asuransi: "",
      tgl_pickup: "",
      tgl_bongkar: "",
      alamat_invoice: "",
      biaya_muat: "",
      biaya_muat_bongkar: "",
      overtonase: "",
      biaya_multi_drop: "",
      biaya_lain: "",
      diskon: "",
      total_keseluruhan: "",
      service: order ? order.service : "",
      order_date: order ? order.order_date : "",
      pickupDate: order ? order.pickup_date : "",
    },
    validationSchema: Yup.object({
      ph: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      if (onEdit && !onEditField) {
        const url = window.location.href;
        const idMpFix = url.substring(url.lastIndexOf("/") + 1);
        const data = {
          id_mp: idMpFix,
          id_massage_do: category ? category[0].value : "1",
          keterangan: "test",
        };
        Object.assign(values, data);
        httpClient
          .post(`sp/edit-SP`, values)
          .then(({ data }) => {
            if (data.status.message) {
              notification.success({
                message: "Success",
                description: data.status.message,
              });
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      } else {
        const url = window.location.href;
        const idMpFix = url.substring(url.lastIndexOf("/") + 1);
        const data = {
          id_mp: idMpFix,
          id_massage_do: category ? category[0].value : "1",
          keterangan: "test",
        };
        Object.assign(values, data);
        httpClient
          .post(`sp/cancel-sp`, values)
          .then(({ data }) => {
            if (data.status.message) {
              notification.success({
                message: "Success",
                description: data.status.message,
              });
              httpClient
                .get(`sp/get-select-cancel-sp`)
                .then(({ data }) => {
                  if (data.status.code === 200) {
                    setDataSelect(data.data);
                  }
                })
                .catch(function (error) {
                  console.log(error.message);
                });
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      }
    },
  });

  const onSelectChange = (value, e) => {
    if (e.name === "category") {
      setCategory(value);
    } else if (e.name === "id_customer") {
      setCompany(value);
      formik.setFieldValue("id_customer", value.value);
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const idMpFix = url.substring(url.lastIndexOf("/") + 1);
    httpClient
      .get(`sp/get-SP-all-detail?idmp=${idMpFix}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrderDataTable(data.detail);
          setOrder(data);
          setTimeout(() => {
            formik.setFieldValue("memo", data.memo);
            formik.setFieldValue("id_customer", data.customer);
            formik.setFieldValue("jenis_barang", data.jenisBarang);
            // formik.setFieldValue("packing", data.memo);
            formik.setFieldValue("asuransi", data.asuransi);
            formik.setFieldValue("tgl_pickup", data.pickup_date);
            // formik.setFieldValue("tgl_bongkar", data.memo);
            formik.setFieldValue("alamat_invoice", data.alamatInvoice);
            // formik.setFieldValue("biaya_muat", data.memo);
            // formik.setFieldValue("biaya_muat_bongkar", data.memo);
            // formik.setFieldValue("overtonase", data.memo);
            // formik.setFieldValue("biaya_multi_drop", data.memo);
            // formik.setFieldValue("biaya_lain", data.memo);
            // formik.setFieldValue("diskon", data.memo);
            // formik.setFieldValue("total_keseluruhan", data.memo);
            formik.setFieldValue("service", data.service);
            formik.setFieldValue("order_date", data.order_date);
            formik.setFieldValue("pickupDate", data.pickup_date);
          }, 1000);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
    httpClient
      .get(`sp/get-SP-massage?id_mp=${idMpFix}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setData(data.data);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });

    httpClient
      .get(`sp/get-select-do`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setDataSelect(
            data.data.company.map((x) => ({
              label: x.massage,
              value: x.id,
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
          // setInsuranceOptions(
          //   data.data.insurance.map((x) => ({
          //     label: x.tipe,
          //     value: x.value,
          //   }))
          // );
          // setServiceOptions(
          //   data.data.service.map((x) => ({
          //     label: x.tipe,
          //     value: x.tipe,
          //   }))
          // );
          // setKodeSalesOptions(
          //   data.data.marketing.map((x) => ({
          //     label: x.fullname,
          //     value: x.id,
          //   }))
          // );
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const onCancelDO = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    formik.handleSubmit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const testOptions = [
    { value: "Tidak ada unit", label: "Tidak ada unit" },
    { value: "Tarif mitra tidak masuk", label: "Tarif mitra tidak masuk" },
    { value: "Double input SP", label: "Double input SP" },
    {
      value: "Ganti tanggal muat/bongkar",
      label: "Ganti tanggal muat/bongkar",
    },
    { value: "Ganti lokasi muat/bongkar", label: "Ganti lokasi muat/bongkar" },
    { value: "Perubahan Harga", label: "Perubahan Harga" },
    { value: "Cancel by Customer", label: "Cancel by Customer" },
  ];

  const handleEdit = () => {
    if (onEdit) {
      formik.handleSubmit();
    }
    setTimeout(() => {
      setOnEdit(!onEdit);
      setOnEditField(!onEditField);
    }, 1000);
  };

  return (
    <div>
      <Card>
        <Row>
          <Col span={14}></Col>
          <Col span={3}>
            <Button>Asuransi</Button>
          </Col>
          <Col span={3}>
            <Button onClick={onCancelDO} disabled={onEdit}>
              Cancel DO
            </Button>
          </Col>
          <Col span={3}>
            <Button onClick={handleEdit}>{onEdit ? "Update" : "Edit"}</Button>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Group>
              <Form.Label>No.SPK</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={order ? order.spk : ""}
                  disabled={onEditField}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>No.SP</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={order ? order.sp : ""}
                  disabled={onEditField}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>No.Request</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={order ? "" : ""}
                  disabled={onEditField}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Customer</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={order ? order.customer : ""}
                  disabled={onEditField}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Alamat Invoice</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={order ? order.alamatInvoice : ""}
                  disabled={onEditField}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </Form.Group>
            {onEdit ? (
              <>
                <Form.Group>
                  <Form.Label>Nama Perusahaan</Form.Label>
                  <InputGroup>
                    <Select
                      options={companyOptions}
                      value={company}
                      isSearchable
                      placeholder="Select company"
                      name="id_customer"
                      styles={customStylesReactSelect}
                      onChange={onSelectChange}
                    />
                  </InputGroup>
                </Form.Group>
              </>
            ) : null}
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label>Marketing</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={order ? order.marketing : ""}
                  disabled={onEditField}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Service</Form.Label>
              <InputGroup>
                <Form.Control
                  name="service"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.service}
                  isInvalid={!!formik.errors.service}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Order Date</Form.Label>
              <InputGroup>
                <Form.Control
                  name="order_date"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.order_date}
                  isInvalid={!!formik.errors.order_date}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pickup Date</Form.Label>
              <InputGroup>
                <Form.Control
                  name="pickupDate"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.pickupDate}
                  isInvalid={!!formik.errors.pickupDate}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Telp. Customer</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={order ? order.telp_customer : ""}
                  disabled={onEditField}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </Form.Group>
            {onEdit ? (
              <>
                <Form.Group>
                  <Form.Label>Memo</Form.Label>
                  <InputGroup>
                    <Form.Control
                      required
                      name="memo"
                      value={formik.values.memo}
                      onChange={formik.handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </>
            ) : null}
          </Col>
          <Col span={8}>
            <Card>
              <Form.Group>
                <Form.Label>Driver</Form.Label>
                <InputGroup>
                  <Image src="https://elogs.eurekalogistics.co.id/assets/upload/driver/employee.png" />
                </InputGroup>
              </Form.Group>
            </Card>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          {/* <Col span={20}>
            <Form.Group>
              <Form.Label>Pickup Address</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={order?.detail?.[0]?.pickupAddress ?? ""}
                  disabled={onEditField}
                />
              </InputGroup>
            </Form.Group>
          </Col> */}
          {/* <Col>
            <Button style={{ backgroundColor: "blue", color: "white" }}>
              Add Destination
            </Button>
          </Col>  */}
        </Row>
        <Row>
          <Col span={24}>
            <table class="table table-condensed">
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
                {orderDataTable.length > 0 ? (
                  orderDataTable.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        {item.pickupAddress ? item.pickupAddress : ""}
                      </td>
                      <td className="text-center">{item.destination}</td>
                      <td className="text-center">{item.via}</td>
                      <td className="text-center">{item.item}</td>
                      <td className="text-center">{item.berat}</td>
                      <td className="text-center">{item.service}</td>
                      <td className="text-center">{item.qty}</td>
                      <td className="text-center">{item.Price}</td>
                      <td className="text-center">{item.kendaraan}</td>
                      <td className="text-center">{item.Price}</td>
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
                  <th className="text-center">
                    {order ? order.Totalprice : "0"}
                  </th>
                  <th className="text-center">-</th>
                </tr>
                <tr>
                  <th colSpan="10" className="text-left">
                    Biaya Muat
                  </th>
                  <th className="text-center">
                    <input
                      type="number"
                      value={biayaMuat}
                      onChange={(e) => setBiayaMuat(parseFloat(e.target.value))}
                    />
                  </th>
                </tr>
                <tr>
                  <th colSpan="10" className="text-left">
                    Biaya Bongkar
                  </th>
                  <th className="text-center">
                    <input
                      type="number"
                      value={biayaBongkar}
                      onChange={(e) =>
                        setBiayaBongkar(parseFloat(e.target.value))
                      }
                    />
                  </th>
                </tr>
                <tr>
                  <th colSpan="10" className="text-left">
                    Biaya Multidrop
                  </th>
                  <th className="text-center">
                    <input
                      type="number"
                      value={biayaMultidrop}
                      onChange={(e) =>
                        setBiayaMultidrop(parseFloat(e.target.value))
                      }
                    />
                  </th>
                </tr>
                <tr>
                  <th colSpan="10" className="text-left">
                    Biaya Lainnya
                  </th>
                  <th className="text-center">
                    <input
                      type="number"
                      value={biayaLainnya}
                      onChange={(e) =>
                        setBiayaLainnya(parseFloat(e.target.value))
                      }
                    />
                  </th>
                </tr>
                <tr>
                  <th colSpan="10" className="text-left">
                    Biaya Overtonase
                  </th>
                  <th className="text-center">
                    <input
                      type="number"
                      value={biayaOvertonase}
                      onChange={(e) =>
                        setBiayaOvertonase(parseFloat(e.target.value))
                      }
                    />
                  </th>
                </tr>
                <tr>
                  <th colSpan="10" className="text-left">
                    Total Biaya Keseluruhan
                  </th>
                  <th className="text-center">{totalBiayaKeseluruhan}</th>
                </tr>
              </tfoot>
            </table>
          </Col>
          <Col span={24}>
            <table
              id="tb1"
              class="table table-striped table-bordered table-hover"
            >
              <thead>
                <tr>
                  <th colspan="5">Detail Armada</th>
                </tr>
                <tr>
                  <th width="5%">No.</th>
                  <th>Armada</th>
                  <th>Vehicle</th>
                  <th>Driver</th>
                  <th>Tujuan</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </Col>
          <Col span={24}>
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
                  <td align="center">1</td>
                  <td width="40%" align="left">
                    {" "}
                    Jl. Imam Bonjol No. 245 BaliSM:{" "}
                  </td>
                  <td width="20%" align="left">
                    {" "}
                    Murtadho{" "}
                  </td>
                </tr>
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
                  </td>{" "}
                </tr>
              </tbody>
            </table>
          </Col>
          <Col span={24}>
            <h6>Comments :</h6>
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Coment</th>
                  <th>User</th>
                  <th>Tgl Coment</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr>
                    <td>{item.id_chat}</td>
                    <td>{item.chat}</td>
                    <td>{item.user}</td>
                    <td>{item.tgl_chat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col>History</Col>
        </Row>
        <Row>
          <Col>Unit</Col>
        </Row>
      </Card>
      <Modal
        title="Cancel DO"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Row gutter={16}>
          <Col span={24} style={{ marginBottom: "10px" }}>
            <Select
              options={dataSelect}
              value={category}
              isSearchable
              placeholder="Select Category"
              name="category"
              styles={customStylesReactSelect}
              onChange={onSelectChange}
              autoFocus
              isMulti
            />
          </Col>
          <Col span={24}>
            <InputGroup>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Enter keterangan cancel"
              />
            </InputGroup>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default SamplePage;
