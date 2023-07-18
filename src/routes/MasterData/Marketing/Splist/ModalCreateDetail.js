import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Select, message, Alert } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Col, Row, Table } from 'react-bootstrap';
import Baseurl from '../../../../Api/BaseUrl';
import axios from 'axios';
import Swal from 'sweetalert2';

function ModalCreateDetail({ AlamatInvoiceOptions, DetailSemua, idmp, DetailSP, JenisBarangFormik }) {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [selectVia, setSelectVia] = useState("");
    const [SelectTypeMobil, setSelectTypeMobil] = useState("");
    const [SelectShipment, setSelectShipment] = useState("");
    const [shipmentOptions, setShipmentOptions] = useState([]);
    const [Loding, setLoding] = useState(false)
    const [DetailSemuaTemp, setDetailSemuaTemp] = useState("")
    const [DetaillSJall, setDetaillSJall] = useState("")
    console.log(`JenisBarangFormik`, JenisBarangFormik);
    const formik = useFormik({
        initialValues: {
            alamatmuat: '',
            alamatbongkar: "",
            kendaraan: "",
            via: "",

        },
        validationSchema: Yup.object({
            alamatmuat: Yup.string().required('Alamat Muat Harus Di Isi'),
            alamatbongkar: Yup.string().required('Alamat Bongkar Harus Di Isi'),
            kendaraan: Yup.string().required('Kendaraan Harus Di Isi'),
            via: Yup.string().required('Via Harus Di Isi'),

        }),
        onSubmit: (values) => {
            console.log(values);
            setModal1Open(false)
            if (DetailSemuaTemp?.idmpd == null) {
                CreateDetailSP()
            } else {
                EditSJ()
            }
        },
    });
    var counter = 1
    // Create Detail SP
    const CreateDetailSP = async () => {
        try {
            setLoding(true)
            const data = await axios.post(`${Baseurl}sp/create-SP-detail`,
                {
                    idMp: idmp,
                    idcustomer: DetailSemua?.idcustomer,
                    ph: DetailSemua?.sp,
                    via: formik.values.via,
                    shipment: formik.values.shipment,
                    kendaraan: formik.values.kendaraan,
                    id_almuat: formik.values.IDalamatmuat,
                    id_albongkar: formik.values.IDalamatbongkar,
                    // nama_barang: formik.values.namabarang,
                    nama_barang: JenisBarangFormik,
                    berat: formik.values.berat,
                    qty: formik.values.qyt,
                    koli: formik.values.koli,
                    harga: HasilTarif + Hitung()
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            DetailSP()
            message.success('Data berhasil ditambahkan!');
        } catch (error) {
            message.error('Terjadi kesalahan saat menambahkan data');
        } finally {
            setLoding(false); // akan dipanggil baik ada error maupun tidak
        }
    }



    // cek tarif
    const [HasilTarif, setasilTarif] = useState("")
    const tarifalamat = async () => {
        try {
            const data = await axios.post(`${Baseurl}sp/get-tarif-alamat`,
                {
                    id_muat_kota: formik.values.IdKotaMuat,
                    id_tujuan_kota: parseInt(formik.values.IDKotaBongkar),
                    id_customer: DetailSemua?.idcustomer,
                    id_kendaraan_jenis: parseInt(formik.values.idkendaraan),
                    service_type: DetailSemua?.service,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            setasilTarif(data.data.data.order.biaya_jalan)
            if (data.data.data.order === null) {
                <Alert
                    message="Warning"
                    description="This is a warning notice about copywriting."
                    type="warning"
                    showIcon
                    closable
                />
                message.error('Tarif Tidak Ditemukan , ');
            } else {
                message.success('Tarif Ditemukan');
            }

        } catch (error) {
            message.error(`Terjadi kesalahan: ${error.message}`);
        }
    }





    const getDetailModal = async () => {
        try {
            const response = await axios.get(
                `${Baseurl}sp/get-SP-select-detail?keyword=&companyId=${DetailSemua?.idcustomer}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            // setDetailModal(response.data.data);
            // setDestinationDetail(response.data.data.destination);
            // setKendaraanModal(response.data.data.type);
            // setShipmentModal(response?.data?.data?.shipment);
            // setMarketing(response.data.data.marketing)
            console.log(`ini dari modal SelectShipment`, SelectShipment);
            setSelectVia(response.data.data.via)
            setSelectTypeMobil(response.data.data.type)
            setSelectShipment(response.data.data.shipment)

        } catch (error) {
            console.error("Failed to fetch detail data:", error);
            // handle error appropriately
        }
    };
    useEffect(() => {

        getDetailModal();
        // DetailSP()
    }, [DetailSemua]);
    useEffect(() => (
        formik.setValues({
            via: DetailSemuaTemp?.via,
            alamatmuat: DetailSemuaTemp?.pickup,
            alamatbongkar: DetailSemuaTemp?.destination,
            IDalamatmuat: DetailSemuaTemp?.destinationId,
            IDalamatbongkar: DetailSemuaTemp?.pickupId,
            kendaraan: DetailSemuaTemp?.kendaraan,
            shipment: DetailSemuaTemp?.shipmentName,
            berat: DetailSemuaTemp?.berat,
            qyt: DetailSemuaTemp?.qty,
            koli: DetailSemuaTemp?.koli == null ? 0 : DetailSemuaTemp?.koli,
            namabarang: DetailSemuaTemp?.item,
            panjang: DetailSemuaTemp?.panjang,
            lebar: DetailSemuaTemp?.lebar,
            tinggi: DetailSemuaTemp?.tinggi,
            bongkar: DetailSemuaTemp?.harga_bongkar,
            biayamultimuat: DetailSemuaTemp?.harga_muat,
            biayamultidrop: DetailSemuaTemp?.harga_multidrop,
            biayamel: DetailSemuaTemp?.biayamel,
            total: DetailSemuaTemp?.Price,
            shipmentID: DetailSemuaTemp?.shipmentID,

        })
    ), [DetailSemuaTemp])


    console.log(`DetailSemuaTemp DetailSemuaTemp`, DetailSemuaTemp);
    useEffect(() => {
        if (formik.values.via) {
            const filteredShipments = SelectShipment.filter(
                (item) => item?.via === formik.values.via
            );
            console.log(`filteredShipments`, filteredShipments);
            setShipmentOptions(filteredShipments);
        }
        else {
            setShipmentOptions([]);
        }
    }, [formik.values.via, SelectShipment]);
    console.log(`ini modal dari SelectShipment`, SelectShipment);


    // const onFinish = (values) => {
    //     console.log('Success:', values);
    //     CreateDetailSP()
    //     setModal1Open(false)
    // };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    console.log(`modal DetailSemua`, DetailSemua);

    // Edit sj
    const EditSJ = async () => {
        try {
            const data = await axios.post(`${Baseurl}sp/edit-SP-detail`,
                {
                    id_mpd: DetailSemuaTemp?.idmpd,
                    via: formik.values.via,
                    shipment: formik.values.shipmentID,
                    kendaraan: formik.values.kendaraan,
                    id_almuat: formik.values.IDalamatmuat,
                    id_albongkar: formik.values.IDalamatbongkar,
                    nama_barang: formik.values.namabarang,
                    volume: formik.values.shipment,
                    berat: formik.values.berat,
                    qty: formik.values.qyt,
                    koli: formik.values.koli,
                    harga_muat: formik.values.shipment,
                    harga_bongkar: formik.values.bongkar,
                    harga: HasilTarif,
                    total: formik.values.total

                },

                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            DetailSP()
            message.success('Data berhasil Diubah!');
        } catch (error) {
            message.error('Terjadi kesalahan saat Edit data');

        }
    }

    // delete sj
    const deltebutton = async (idmpd) => {
        Swal.fire({
            title: "Ingin Menghapus SJ?",
            showDenyButton: true,
            denyButtonText: `Tidak`,
            confirmButtonText: "Iya?",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = await axios.post(
                    `${Baseurl}sp/delete-SP-detail`,
                    {
                        id: idmpd,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                );
                // refresh();
                // handleClose();
                Swal.fire("Data Berhasil Di hapus", "success");
                DetailSP()
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const Hitung = () => {
        let total = 0;

        // Daftar semua field yang ingin dijumlahkan
        const fields = ['biayamel', 'biayamultidrop', 'biayamultimuat', 'biayamuat', 'bongkar'];

        for (let field of fields) {
            let value = formik.values[field];

            // Jika value tidak ada atau bukan angka, anggap sebagai 0
            if (!value || isNaN(value)) {
                value = 0;
            }

            total += Number(value);
        }

        return total;
    }



    return (
        <div className='mt-3'>
            <div className='d-flex justify-content-end'>
                <Button type='primary' onClick={() => {
                    setModal1Open(true);
                    formik.resetForm();
                }}>Create Detail SP</Button>
            </div>


            <Modal
                title="Create Detail SP"
                style={{
                    top: 20,
                }}
                open={modal1Open}
                onOk={formik.handleSubmit}
                onCancel={() => setModal1Open(false)}
                width="800px"
                confirmLoading={Loding}
            >

                <Form
                    onFinish={formik.handleSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    name="Edit Detail SP"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Row>
                        <Col sm={12}>
                            <Form.Item
                                required
                                label="Alamat Muat"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    showSearch
                                    optionFilterProp="children"
                                    id="alamatmuat"
                                    name="alamatmuat"
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatmuat", option.children); // set alamatmuat state to option's children
                                        formik.setFieldValue("IDalamatmuat", option.key); // set IDalamatmuat state to option's value
                                        formik.setFieldValue("IdKotaMuat", value); // set IDalamatmuat state to option's value
                                        console.log(`key`, option.key);
                                    }}
                                    value={formik.values.alamatmuat}
                                    onBlur={formik.handleBlur}
                                >
                                    {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.id_kota}>
                                            {item.address}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                required
                                label="Alamat Bongkar"
                                help={formik.touched.alamatbongkar && formik.errors.alamatbongkar}
                                validateStatus={
                                    formik.touched.alamatbongkar && formik.errors.alamatbongkar
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    showSearch
                                    optionFilterProp="children"
                                    id="alamatbongkar"
                                    name="alamatbongkar"
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatbongkar", option.children); // set alamatbongkar state to option's children
                                        formik.setFieldValue("IDKotaBongkar", value); // set IDalamatbongkar state to option's value
                                        formik.setFieldValue("IDalamatbongkar", option.key); // set IDalamatbongkar state to option's value
                                    }}
                                    value={formik.values.alamatbongkar}
                                    onBlur={formik.handleBlur}
                                >
                                    {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.id_kota}>
                                            {item.address}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <br />
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                required
                                label="Kendaraan"
                                help={formik.touched.kendaraan && formik.errors.kendaraan}
                                validateStatus={
                                    formik.touched.kendaraan && formik.errors.kendaraan
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="noSP"
                                    name="kendaraan"
                                    type="kendaraan"
                                    labelInValue
                                    onChange={(e) => {
                                        formik.setFieldValue("kendaraan", e.value)
                                        formik.setFieldValue("idkendaraan", e.key)
                                        console.log(`ini id kendaraan`, e.key);
                                    }}
                                    value={formik.values.kendaraan}
                                    onBlur={formik.handleBlur}
                                >
                                    {SelectTypeMobil && SelectTypeMobil.map((item) => (
                                        <Select.Option key={item.id} value={item.type}>
                                            {item.address}
                                        </Select.Option>

                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                required
                                label="Via"
                                help={formik.touched.via && formik.errors.via}
                                validateStatus={
                                    formik.touched.via && formik.errors.via
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="via"
                                    name="via"
                                    type="via"
                                    onChange={(e) => formik.setFieldValue("via", e)}
                                    value={formik.values.via}
                                    onBlur={formik.handleBlur}
                                >
                                    {selectVia && selectVia.map((item) => (
                                        <Select.Option value={item.via}>{item.via}</Select.Option>
                                    ))}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                required
                                label="Shipment"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="shipment"
                                    name="shipment"
                                    type="text"
                                    onChange={(e) => {
                                        formik.setFieldValue("shipment", e)
                                        formik.setFieldValue("shipmentID", e)
                                    }}
                                    value={formik.values.shipment}
                                    onBlur={formik.handleBlur}
                                >
                                    {shipmentOptions && shipmentOptions.map((item) => (
                                        <Select.Option value={item.id}>{item.shipment + " - " + formik.values.via}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <Form.Item
                                label="Berat"
                                help={formik.touched.berat && formik.errors.berat}
                                validateStatus={
                                    formik.touched.berat && formik.errors.berat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="berat"
                                    name="berat"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.berat}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Qty"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="qyt"
                                    name="qyt"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.qyt}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Koli"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="koli"
                                    name="koli"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.koli}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Nama Barang"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="namabarang"
                                    name="namabarang"
                                    type="text"
                                    placeholder={JenisBarangFormik}
                                    onChange={formik.handleChange}
                                    value={formik.values.namabarang === null ? JenisBarangFormik : formik.values.namabarang}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Panjang"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="panjang"
                                    name="panjang"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.panjang}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Lebar"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="lebar"
                                    name="lebar"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.lebar}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Tinggi"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="tinggi"
                                    name="tinggi"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.tinggi}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Item

                                label="Tarif"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="tarif"
                                    name="tarif"
                                    type="number"
                                    onChange={formik.handleChange}
                                    // value={formik.values.tarif === null ? true : false}
                                    value={HasilTarif}
                                    onBlur={formik.handleBlur}
                                />
                                <Button onClick={tarifalamat} className='mt-2' type='primary'>Cek Tarif</Button>
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Bongkar"
                                help={formik.touched.tarif && formik.errors.tarif}
                                validateStatus={
                                    formik.touched.tarif && formik.errors.tarif
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="bongkar"
                                    name="bongkar"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.bongkar === undefined ? '0' : formik.values.bongkar}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Muat"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamuat"
                                    name="biayamuat"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.biayamuat}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Multimuat"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamultimuat"
                                    name="biayamultimuat"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.biayamultimuat === undefined ? 0 : formik.values.biayamultimuat}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Multidrop"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="noSP"
                                    name="biayamultidrop"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.biayamultidrop === undefined ? 0 : formik.values.biayamultidrop}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Mel"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="noSP"
                                    name="biayamel"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.biayamel === undefined ? 0 : formik.values.biayamel}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                label="TOTAL"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    disabled
                                    id="total"
                                    name="total"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={HasilTarif + Hitung()}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Table responsive bordered >
                <thead></thead>
                <tbody>
                    {DetailSemua &&
                        DetailSemua.detail &&
                        DetailSemua.detail.map((data, index) => (
                            <>
                                <tr style={{ fontWeight: "bold" }}>
                                    <td colSpan={10}>
                                        <hr />
                                        <br />{" "}
                                    </td>
                                </tr>
                                <tr
                                    style={{
                                        fontWeight: "bold",
                                        backgroundColor: "#dff0d8",
                                    }}
                                >
                                    <td> </td>
                                    <td colSpan={10}>Alamat Muat</td>
                                </tr>

                                <tr key={index}>
                                    <td>
                                        {/* {index + 1}
                            <span>
                              <Button
                                size="md"
                                variant="danger"
                                onClick={() => deltebutton(data.idmpd)}
                                className="mt-2"
                              >
                                X
                              </Button>
                            </span> */}
                                    </td>
                                    <td colSpan={9}>{data.pickup}</td>
                                </tr>
                                {DetailSemua &&
                                    DetailSemua.detail[index].tujuan &&
                                    DetailSemua.detail[index].tujuan.map((data, index2) => (
                                        <>
                                            <tr
                                                style={{
                                                    fontWeight: "bold",
                                                    backgroundColor: "#dff0d8",
                                                }}
                                            >
                                                <td>No {counter++}</td>
                                                <td>Alamat Bongkar</td>
                                                <td width="100px">SJ ID</td>
                                                <td>Kendaraan</td>
                                                <td>Via</td>
                                                <td>Item</td>
                                                <td>Berat</td>
                                                <td>Qty</td>
                                                <td width="150px">Biaya Kirim</td>
                                                <td width="150px">Biaya Bongkar</td>
                                                <td width="150px">Total</td>
                                            </tr>

                                            <tr key={index}>
                                                <td>

                                                    <span >
                                                        <Button
                                                            size="md"
                                                            type="danger"
                                                            onClick={() => deltebutton(data.idmpd)}
                                                            className="mt-2"
                                                        >
                                                            X
                                                        </Button>
                                                        <Button
                                                            size="md"
                                                            type="primary"
                                                            onClick={() => {
                                                                //   setIdmpdPerstate(data.idmpd);
                                                                //   handleShowSP(data.idmpd, data.noSJ);
                                                                setDetailSemuaTemp(data)
                                                                setModal1Open(true, data)
                                                            }}
                                                            className="mt-2"
                                                        >
                                                            Edit
                                                        </Button>

                                                    </span>
                                                </td>
                                                <td>{data.destination}</td>
                                                <td>{data.noSJ}</td>
                                                <td>{data.kendaraan}</td>
                                                <td>{data?.via}</td>
                                                <td>{data.item}</td>
                                                <td>{data.berat}</td>
                                                <td>{data.qty}</td>
                                                <td>-</td>
                                                {/* <td>{data.Price?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            })}</td> */}
                                                <td>{data.harga_bongkar?.toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}</td>
                                                <td>{data.Price?.toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}</td>
                                            </tr>
                                        </>
                                    ))}
                            </>
                        ))}
                </tbody>
                <tfoot>
                    <tr style={{ fontWeight: "bold" }}>
                        <td colSpan={10} width="150px" className="text-right">
                            Sub Total
                        </td>
                        <td width="150px">{DetailSemua?.subTotal?.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        })}</td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}

export default ModalCreateDetail