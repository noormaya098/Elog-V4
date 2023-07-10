import { Button, Card, Form, Input, Select, DatePicker } from 'antd'
import { Table } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import moment from 'moment';
import Baseurl from '../../../../Api/BaseUrl';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import Swal from 'sweetalert2';
import ModalCreateDetail from './ModalCreateDetail';
function EditSPNew() {
    const { idmp } = useParams();
    const [NomorSP, setNoSP] = useState("")
    const [DetailSemua, setDetailSemua] = useState("")
    const [AlamatInvoiceOptions, setAlamatInvoiceOptions] = useState("")
    const [AsuransiSelect, setAsuransiSelect] = useState('')
    const [JenisBarangSelection, setJenisBarangSelection] = useState("")
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    var counter = 1
    const DetailSP = async () => {
        try {
            const data = await axios.get(`${Baseurl}sp/get-SP-all-detail?keyword=&idmp=${idmp}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                })
            setNoSP(data.data.sp)
            setDetailSemua(data.data)
            console.log(`idPerusahaan`, DetailSemua);
            formik.setValues({
                noSP: data.data.sp,
                service: data.data.service,
                jenisBarang: data.data.jenisBarang,
                customer: data.data.customer,
                pickup_date: data.data.pickup_date,
                order_date: data.data.order_date,
                bongkar_date: data.data.bongkar_date,
                asuransi: data.data.asuransi,
                alamatInvoice: data.data.alamatInvoice,
                idPerusahaan: data.data.idcustomer,
                marketing: data.data.marketing,
                telpCustomer: data.data.telpCustomer
            })
            console.log(NomorSP)

        } catch (error) {

        }
    }

    const [NamaMarketing, setNamaMarketing] = useState("")
    const DetailSPSelect = async () => {
        try {
            const data = await axios.get(`${Baseurl}sp/get-SP-select-create?keyword=&companyId=${DetailSemua.idcustomer}&divisi=sales&kode_cabang=JKT`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                })
            setAlamatInvoiceOptions(data.data.data.address)
            setAsuransiSelect(data.data.data.insurance)
            setJenisBarangSelection(data.data.data.service)
            console.log(`dari edit`, data.data.data)
            setNamaMarketing(data.data.data?.marketing)
        } catch (error) {

        }
    }

    useEffect(() => {
        DetailSP()
        DetailSPSelect()
    }, [DetailSemua.idcustomer])


    const formik = useFormik({
        initialValues: {
            noSP: '',
            marketing: '',
            service: '',
            jenisbarang: '',
        },
        validationSchema: Yup.object({
            noSP: Yup.string().required('Kode Kendaraan is required'),
            marketing: Yup.string(),
            service: Yup.string(),
            jenisbarang: Yup.string(),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const EditSp = async () => {
        Swal.fire({
            title: 'Anda yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, edit!',
            cancelButtonText: 'Tidak, batalkan!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${Baseurl}sp/edit-SP`, {
                        id_mp: idmp,
                        memo: "",
                        id_customer: DetailSemua.idcustomer,
                        jenis_barang: formik.values.jenisBarang,
                        packing: "",
                        marketing : formik.values.marketing,
                        asuransi: formik.values.asuransi,
                        tgl_pickup: formik.values.pickup_date,
                        tgl_bongkar: formik.values.bongkar_date,
                        service: formik.values.service,
                        alamat_invoice: formik.values.alamatInvoice,
                        biaya_muat: "",
                        biaya_muat_bongkar: "",
                        overtonase: "",
                        biaya_multi_drop: "",
                        biaya_lain: "",
                        diskon: "",
                        total_keseluruhan: ""
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token"),
                        },
                    });
                    DetailSP()
                    Swal.fire(
                        'Berhasil!',
                        'Data telah diedit.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Permintaan gagal',
                    });
                }
            }
        });
    }



    return (
        <div>
            {/* <Card> */}
            <div className='d-flex justify-content-end'>
                <Button type='primary' size='default' onClick={EditSp}>Save Edit SP</Button>
            </div>
            <Row>
                <Col sm={6}>
                    <Form
                        onFinish={formik.handleSubmit}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        name="Edit Detail SP"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Form.Item
                            label="No SP"
                            help={formik.touched.noSP && formik.errors.noSP}
                            validateStatus={
                                formik.touched.noSP && formik.errors.noSP
                                    ? 'error'
                                    : 'success'
                            }
                            style={{ marginBottom: 2 }}
                        >
                            <Input
                                disabled
                                id="noSP"
                                name="noSP"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.noSP}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            label="Marketing"
                            help={formik.touched.noSP && formik.errors.noSP}
                            validateStatus={
                                formik.touched.noSP && formik.errors.noSP
                                    ? 'error'
                                    : 'success'
                            }
                        >
                            <Select
                                id="marketing"
                                name="marketing"
                                showSearch
                                optionFilterProp='children'
                                value={formik.values.marketing == null ? "-" : formik.values.marketing}
                                onChange={(value) => formik.setFieldValue("marketing", value)}
                                onBlur={formik.handleBlur}
                            >
                                {NamaMarketing &&
                                    NamaMarketing.map((item) => (
                                        <Select.Option key={item.address} value={item.id}>
                                            {item.fullname}
                                        </Select.Option>
                                    ))}
                            </Select>
                            {/* <Input
                                id="marketing"
                                name="marketing"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.marketing == null ? "-" : formik.values.marketing}
                                onBlur={formik.handleBlur}
                            /> */}
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            label="Service"
                            help={formik.touched.service && formik.errors.service}
                            validateStatus={
                                formik.touched.service && formik.errors.service
                                    ? 'error'
                                    : 'success'
                            }
                        >
                            <Select
                                id="service"
                                name="service"
                                type="text"
                                onChange={(value) => formik.setFieldValue("service", value)}
                                value={formik.values.service}
                                onBlur={formik.handleBlur}
                            >
                                {JenisBarangSelection && JenisBarangSelection.map((item) => (
                                    <Select.Option value={item.tipe}>{item.tipe}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            label="Jenis Barang"
                            help={formik.touched.jenisBarang && formik.errors.jenisBarang}
                            validateStatus={
                                formik.touched.jenisBarang && formik.errors.jenisBarang
                                    ? 'error'
                                    : 'success'
                            }
                        >
                            <Input
                                id="jenisBarang"
                                name="jenisBarang"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.jenisBarang}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Item>

                    </Form>
                </Col>
                <Col sm={6}>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }} m
                        style={{ marginBottom: 0 }}
                        label="Customer"
                        help={formik.touched.jenisBarang && formik.errors.jenisBarang}
                        validateStatus={
                            formik.touched.jenisBarang && formik.errors.jenisBarang
                                ? 'error'
                                : 'success'
                        }
                    >
                        <Input
                            id="customer"
                            disabled
                            name="customer"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.customer}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }} m
                        style={{ marginBottom: 0 }}
                        label="No Telp Customer"
                        help={formik.touched.telpCustomer && formik.errors.telpCustomer}
                        validateStatus={
                            formik.touched.telpCustomer && formik.errors.telpCustomer
                                ? 'error'
                                : 'success'
                        }
                    >
                        <Input
                            id="customer"
                            disabled
                            name="telpCustomer"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.telpCustomer}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>
                    <Row>
                        <Col sm={6}>
                            <Form.Item
                                label="PickUp Date"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }} m
                                style={{ marginBottom: 0 }}
                                help={formik.touched.jenisBarang && formik.errors.jenisBarang}
                                validateStatus={
                                    formik.touched.jenisBarang && formik.errors.jenisBarang
                                        ? 'error'
                                        : 'success'
                                }
                            >
                                {/* <Input
                                id="pickup_date"
                                name="pickup_date"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.pickup_date}
                                onBlur={formik.handleBlur}
                            /> */}
                                <DatePicker
                                    id="pickup_date"
                                    name="pickup_date"
                                    format="DD-MM-YYYY HH:mm:ss"
                                    onChange={(date) => {
                                        formik.setFieldValue(
                                            'pickup_date',
                                            date ? date.format("DD-MM-YYYY HH:mm:ss") : ''
                                        );
                                    }}
                                    value={formik.values.pickup_date ? moment(formik.values.pickup_date, "DD-MM-YYYY HH:mm:ss") : null}
                                />
                            </Form.Item>
                        </Col>
                        <Col s={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }} m
                                style={{ marginBottom: 0 }}
                                label="Order Date"
                                help={formik.touched.jenisBarang && formik.errors.jenisBarang}
                                validateStatus={
                                    formik.touched.jenisBarang && formik.errors.jenisBarang
                                        ? 'error'
                                        : 'success'
                                }
                            >
                                <DatePicker
                                    id="order_date"
                                    name="order_date"
                                    disabled
                                    format="DD-MM-YYYY HH:mm:ss"
                                    onChange={(date) => {
                                        formik.setFieldValue(
                                            'order_date',
                                            date ? date.format("DD-MM-YYYY HH:mm:ss") : ''
                                        );
                                    }}
                                    value={formik.values.order_date ? moment(formik.values.order_date, "DD-MM-YYYY HH:mm:ss") : null}
                                />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row>

                        <Col sm={6}>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }} m
                                style={{ marginBottom: 0 }}
                                label="Bongkar Date"
                                help={formik.touched.bongkar_date && formik.errors.bongkar_date}
                                validateStatus={
                                    formik.touched.bongkar_date && formik.errors.bongkar_date
                                        ? 'error'
                                        : 'success'
                                }
                            >
                                <DatePicker
                                    id="bongkar_date"
                                    name="bongkar_date"
                                    format="DD-MM-YYYY HH:mm:ss"
                                    onChange={(date) => {
                                        formik.setFieldValue(
                                            'bongkar_date',
                                            date ? date.format("DD-MM-YYYY HH:mm:ss") : ''
                                        );
                                    }}
                                    value={formik.values.bongkar_date ? moment(formik.values.bongkar_date, "DD-MM-YYYY HH:mm:ss") : null}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={6}>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                style={{ marginBottom: 0 }}
                                label="Asuransi"
                                help={formik.touched.jenisBarang && formik.errors.jenisBarang}
                                validateStatus={
                                    formik.touched.jenisBarang && formik.errors.jenisBarang
                                        ? 'error'
                                        : 'success'
                                }
                            >
                                <Select
                                    id="asuransi"
                                    name="asuransi"
                                    showSearch
                                    optionFilterProp="children"
                                    type="text"
                                    value={formik.values.asuransi === "Y" ? "With Insurance" : "Without Insurance"}
                                    onBlur={formik.handleBlur}
                                    onChange={(value) => formik.setFieldValue("asuransi", value)}
                                >
                                    {AsuransiSelect && AsuransiSelect.map((item) => (
                                        <Select.Option value={item.value}
                                        >
                                            {item.tipe}
                                        </Select.Option>

                                    ))}
                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Form.Item
                        style={{ marginTop: "10px" }}
                        label="Alamat Invoice"
                        optionFilterProp="children"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Select
                            id="alamatInvoice"
                            name="alamatInvoice"
                            optionFilterProp='children'
                            showSearch
                            value={formik.values.alamatInvoice}
                            onChange={(value) => formik.setFieldValue("alamatInvoice", value)}
                            onBlur={formik.handleBlur}
                        >
                            {AlamatInvoiceOptions &&
                                AlamatInvoiceOptions.map((item) => (
                                    <Select.Option key={item.address} value={item.address}>
                                        {item.address}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Col>

            </Row>
            <ModalCreateDetail
                idmp={idmp} DetailSP={DetailSP} JenisBarangFormik={formik.values.jenisBarang} AlamatInvoiceOptions={AlamatInvoiceOptions} DetailSemua={DetailSemua} />
            {/* </Card> */}
        </div>
    )
}

export default EditSPNew