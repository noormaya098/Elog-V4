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

  /**
   * A hook that initializes state variables for a data table component.
   * @returns An array of state variables and their corresponding setter functions:
   * - data: an array of data to be displayed in the table
   * - setData: a function to set the data array
   * - orderDataTable: an array representing the order of the columns in the table
   * - setOrderDataTable: a function to set the orderDataTable array
   * - order: an array representing the order in which the data is sorted
   * - setOrder: a function to set the order array
   * - dataSelect: an array of selected data from the table
   * - setDataSelect: a function to set the dataSelect array
   * - isModalOpen:
   */
  const [data, setData] = useState([]);
  const [orderDataTable, setOrderDataTable] = useState([]);
  const [order, setOrder] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState(0);
  const [limit, setLimit] = useState(10);
  const [detailSp, setDetailSp] = useState([]);

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
      // ph: "",
      service: order ? order.service : "",
      order_date: order ? order.order_date : "",
      pickupDate: order ? order.pickup_date : "",
    },
    validationSchema: Yup.object({
      ph: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      const url = window.location.href;
      const idMpFix = url.substring(url.lastIndexOf("/") + 1);
      console.log(category);
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
    },
  });

  /**
   * Handles the change event when a new value is selected from a dropdown menu.
   * @param {any} value - The new value that was selected.
   * @param {object} e - The event object that triggered the change.
   * @returns None
   */
  const onSelectChange = (value, e) => {
    if (e.name === "category") {
      setCategory(value);
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
  }, []);

  const onCancelDO = () => {
    setIsModalOpen(true);
  };

  /**
   * Handles the "Ok" button click event in a modal dialog.
   * Submits the form using Formik's handleSubmit method and closes the modal.
   * @returns None
   */
  const handleOk = () => {
    formik.handleSubmit();
    setIsModalOpen(false);
  };
  /**
   * Closes the modal by setting the isModalOpen state to false.
   * @returns None
   */
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

  return (
    <div>
      <Card>
        <Row>
          <Col span={14}></Col>
          <Col span={3}>
            <Button>Asuransi</Button>
          </Col>
          <Col span={3}>
            <Button onClick={onCancelDO}>Cancel DO</Button>
          </Col>
          <Col span={3}>
            <Button>Save</Button>
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
                  disabled
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>No.SP</Form.Label>
              <InputGroup>
                <Form.Control required value={order ? order.sp : ""} disabled />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>No.Request</Form.Label>
              <InputGroup>
                <Form.Control required value={order ? "" : ""} disabled />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Customer</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={order ? order.customer : ""}
                  disabled
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Alamat Invoice</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={order ? order.alamatInvoice : ""}
                  disabled
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label>Marketing</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={order ? order.marketing : ""}
                  disabled
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
                  disabled
                />
              </InputGroup>
            </Form.Group>
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
                  disabled
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
                  <th>No </th>
                  <th> Pickup</th>
                  <th className="text-center">Destination</th>
                  <th className="text-center">Shipment</th>
                  <th className="text-center">Alamat Bongkar</th>
                  <th className="text-center">Item</th>
                  <th className="text-right">Berat</th>
                  <th className="text-right">Exp</th>
                  <th className="text-right">Koli</th>
                  <th className="text-right">Harga </th>
                  <th className="text-right">Biaya Bongkar </th>
                  <th className="text-right">Total</th>
                </tr>
                {orderDataTable.map((item) => (
                  <tr>
                    <td>1</td>
                    <td></td>
                    <td>{item.destination}</td>
                    <td>{item.via}</td>
                    <td>{item.item}</td>
                    <td>{item.berat}</td>
                    <td>{item.service}</td>
                    <td>{item.qty}</td>
                    <td>{item.Price}</td>
                    <td>{item.pickupAddress ? item.pickupAddress : ""}</td>
                    <td>{item.kendaraan}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colspan="5" class="text-right">
                    {" "}
                    Total
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>

                  <th>{order ? order.Totalprice : ""}</th>
                  <th>-</th>
                  <th> </th>
                </tr>
                <tr>
                  <th colspan="10" class="text-right">
                    {" "}
                    Biaya Muat
                  </th>
                  <th></th>
                </tr>
                <tr>
                  <th colspan="10" class="text-right">
                    {" "}
                    Biaya Bongkar
                  </th>
                  <th></th>
                </tr>
                <tr>
                  <th colspan="10" class="text-right">
                    {" "}
                    Biaya Multidrop
                  </th>
                  <th></th>
                </tr>
                <tr>
                  <th colspan="10" class="text-right">
                    {" "}
                    Biaya Lainnya
                  </th>
                  <th></th>
                </tr>
                <tr>
                  <th colspan="10" class="text-right">
                    {" "}
                    Biaya Overtonase
                  </th>
                  <th></th>
                </tr>
                <tr>
                  <th colspan="10" class="text-right">
                    {" "}
                    Total Biaya Keseluruhan
                  </th>
                  <th>{order ? order.Totalprice : ""}</th>
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
