import { Button, Modal, Input, Form as AntForm, DatePicker, Card, Select, Upload, Pagination } from 'antd';
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import Baseurl from '../../../Api/BaseUrl';
import axios from 'axios';
import FormTable from './FormTable';
import ZustandStore from '../../../zustand/Store/JenisKepemilikanOptions';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import useMitraStore from '../../../zustand/Store/MitraStore';

function ModalDriverKosongan() {
    const [NamaSupir, setNamaSupir] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [FotoDriver, setFotoDriver] = useState("")
    const [CariNoKendaraan, setCariNoKendaraan] = useState("")
    const [CariJenisKepemilikan, setCariJenisKepemilikan] = useState("")
    const [CariDriverAktif, setCariDriverAktif] = useState("")
    const [IdDriver, setIdDriver] = useState("");
    const { DriverType, setDriverType } = ZustandStore((item) => ({
        DriverType: item.DriverType,
        setDriverType: item.setDriverType
    }))
    const { NamaMitra, fetchMitra } = useMitraStore((item) => ({
        NamaMitra: item.NamaMitra,
        fetchMitra: item.fetchMitra
    }))
    const { WarnaPlat, setWarnaPlat } = ZustandStore((item) => ({
        WarnaPlat: item.WarnaPlat,
        setWarnaPlat: item.setWarnaPlat
    }))
    const { JenisSim, setJenisSim } = ZustandStore((item) => ({
        JenisSim: item.JenisSim,
        setJenisSim: item.setJenisSim
    }))
    const { jenisKepemilikan, setjenisKepemilikan } = ZustandStore((item) => ({
        jenisKepemilikan: item.jenisKepemilikan,
        setjenisKepemilikan: item.setjenisKepemilikan
    }))
    const { StatusDriverAktif, setStatusDriverAktif } = ZustandStore((item) => ({
        StatusDriverAktif: item.StatusDriverAktif,
        setStatusDriverAktif: item.setStatusDriverAktif
    }))

    const NamaMitraOptions = NamaMitra.map((item) => ({
        label: item.NamaMitra,
        value: item.mitraId
    }))


    const showModal = () => {
        setIsModalOpen(true);
        formik.resetForm();

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const validationSchema = Yup.object().shape({
        kode_kendaraan: Yup.string()
            .required('Kode Kendaraan wajib diisi'),
        no_polisi: Yup.string()
            .required('No Polisi wajib diisi'),
        jenis_kepemilikan: Yup.string()
            .required('Jenis Kepemilikan wajib diisi'),
        jenis_kendaraan: Yup.string()
            .required('Jenis Kendaraan wajib diisi'),
        vendor: Yup.string()
            .required('Vendor Kendaraan wajib diisi'),
        warna_plat: Yup.string()
            .required('Warna Plat Driver wajib diisi'),
        merk_mobil: Yup.string()
            .required('Warna Plat Driver wajib diisi'),


    });



    const DriverName = async (value) => {
        try {
            const data = await axios.get(`${Baseurl}vehicle/get-select?vehicleType=${value}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),

                    }
                }
            )
            setNamaSupir(data.data.data.driverName)
            console.log(`nama supir`, data.data.data.driverName);
        } catch (error) {

        }
    }


    const BuatVehicle = async (values, newFileList) => {
        try {
            const formData = new FormData();
            Object.keys(values).forEach(key => formData.append(key, values[key]));
            formData.append("cover", FotoDriver);

            const data = await axios.post(`${Baseurl}vehicle/create-vehicle`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: localStorage.getItem("token"),
                    }
                });
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data kendaraan berhasil ditambahkan',
            });

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Terjadi kesalahan saat menambahkan data kendaraan',
            });
        }
    }


    const formik = useFormik({
        initialValues: {
            kode_kendaraan: '',
            no_polisi: '',
            jenis_kepemilikan: '',
            jenis_kendaraan: '',
            vendor: '',
            nama_driver: '',
            jenis_SIM: '',
            warna_plat: '',
            merk_mobil: '',
            tahun_mobil: '',
            warna_plat: '',
            panjang: '',
            lebar: '',
            tinggi: '',
            no_bpkb: '',
            stnk: '',
            tgl_kir: '',
            tgl_beli: '',
            kapasitas: '',
            kapasitas_maks: '',
            kubikasi: '',
            location: '',
            id_driver: '',
            id_kendaraan_jenis: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            if (IdDriver == null) {
                BuatVehicle(values)

            } else {

                // EditVehicle(values)
            }
            console.log(formik.errors)
            console.log(values);;
        },
    });
    const title = () => {
        if (formik.values.jenis_kepemilikan === "") {
            return "Create Vehicle";
        } else {
            return "Edit Vehicle";
        }
    }



    return (
        <div>
            <Card>
                <Row>
                    <Col sm={6}>
                        <Button
                            type="primary" onClick={() => {
                                showModal()
                                setIdDriver(null)
                                setFotoDriver(null)
                            }} >
                            Tambah Vehicle
                        </Button>
                    </Col>
                    <Col sm={2}>
                        <Input
                            value={CariNoKendaraan}
                            onChange={(e) => setCariNoKendaraan(e.target.value)}
                            placeholder="Cari No Kendaraan" />
                    </Col>
                    <Col sm={2}>
                        <Select
                            showSearch
                            placeholder="Jenis Kepemilikan"
                            optionFilterProp="children"
                            style={{ width: "150px" }}
                            // value={CariJenisKepemilikan}
                            onChange={(value) => setCariJenisKepemilikan(value)}

                        >
                            <Select.Option value="">-</Select.Option>
                            {jenisKepemilikan.map((option) => (
                                <Select.Option key={option.label} value={option.jenis}>
                                    {option.jenis}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col sm={2}>
                        <Select
                            showSearch
                            placeholder="Status"
                            optionFilterProp="children"
                            style={{ width: "150px" }}
                            // value={CariJenisKepemilikan}
                            onChange={(value) => setCariDriverAktif(value)}

                        >
                            <Select.Option value="">-</Select.Option>
                            {StatusDriverAktif.map((option) => (
                                <Select.Option key={option.label} value={option.value}>
                                    {option.status}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
                <Modal
                    title={title()} style={{ top: 10 }} visible={isModalOpen} onOk={formik.handleSubmit}
                    width={800}
                    onCancel={handleCancel}>

                    <AntForm>
                        <Row>
                            <Col sm={4}>
                                <Card>
                                    <img src={FotoDriver}></img>

                                </Card>
                                <Upload
                                    beforeUpload={file => {
                                        // Mencegah upload default
                                        return false;
                                    }}
                                    onChange={({ fileList }) => {
                                        // Ambil file asli dari fileList terakhir dan simpan dalam state
                                        if (fileList.length > 0) {
                                            const { originFileObj } = fileList[fileList.length - 1];
                                            setFotoDriver(originFileObj);
                                        } else {
                                            setFotoDriver(null);
                                        }
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                                <AntForm.Item
                                    label="Tgl EXP STNK"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.tgl_stnk && formik.errors.tgl_stnk}
                                    validateStatus={formik.touched.tgl_stnk && formik.errors.tgl_stnk ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <DatePicker
                                        id="tgl_stnk"
                                        name="tgl_stnk"
                                        onChange={(date) => {
                                            formik.setFieldValue("tgl_stnk", date ? date.format("YYYY-MM-DD") : "");
                                        }}
                                        value={formik.values.tgl_stnk ? moment(formik.values.tgl_stnk) : null}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>


                                <AntForm.Item
                                    label="Tgl Exp Plat Nomor"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan}
                                    validateStatus={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <DatePicker
                                        id="tgl_plat_nomor"
                                        name="tgl_plat_nomor"
                                        onChange={(date) => {
                                            formik.setFieldValue("tgl_plat_nomor", date ? date.format("YYYY-MM-DD") : "");
                                        }}
                                        value={formik.values.tgl_plat_nomor ? moment(formik.values.tgl_plat_nomor) : null}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>
                                <AntForm.Item
                                    label="Tgl Exp Kir"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.tgl_kir && formik.errors.tgl_kir}
                                    validateStatus={formik.touched.tgl_kir && formik.errors.tgl_kir ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <DatePicker
                                        id="tgl_kir"
                                        name="tgl_kir"
                                        onChange={(date) => {
                                            formik.setFieldValue("tgl_kir", date ? date.format("YYYY-MM-DD") : "");
                                        }}
                                        value={formik.values.tgl_kir ? moment(formik.values.tgl_kir) : null}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>

                                <AntForm.Item
                                    label="Tgl Beli"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan}
                                    validateStatus={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <DatePicker
                                        id="tgl_beli"
                                        name="tgl_beli"
                                        onChange={(date) => {
                                            formik.setFieldValue("tgl_beli", date ? date.format("YYYY-MM-DD") : "");
                                        }}
                                        value={formik.values.tgl_beli ? moment(formik.values.tgl_beli) : null}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>
                            </Col>
                            <Col sm={4}>
                                <AntForm.Item
                                    label="Jenis Kepemilikan"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.jenis_kepemilikan && formik.errors.jenis_kepemilikan}
                                    validateStatus={formik.touched.jenis_kepemilikan && formik.errors.jenis_kepemilikan ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        id="jenis_kepemilikan"
                                        name="jenis_kepemilikan"
                                        onChange={(value) => formik.setFieldValue('jenis_kepemilikan', value)}
                                        value={formik.values.jenis_kepemilikan || ""}
                                        onBlur={formik.handleBlur}
                                    >
                                        {jenisKepemilikan.map((option) => (
                                            <Select.Option key={option.label} value={option.jenis}>
                                                {option.jenis}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </AntForm.Item>
                                <AntForm.Item
                                    label="Kode Kendaraan"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.kode_kendaraan && formik.errors.kode_kendaraan}
                                    validateStatus={formik.touched.kode_kendaraan && formik.errors.kode_kendaraan ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="kode_kendaraan"
                                        name="kode_kendaraan"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.kode_kendaraan}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>

                                <AntForm.Item
                                    style={{ marginBottom: 2 }}
                                    label="No Polisi"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.no_polisi && formik.errors.no_polisi}
                                    validateStatus={formik.touched.no_polisi && formik.errors.no_polisi ? 'error' : 'success'}
                                >
                                    <Input
                                        id="no_polisi"
                                        name="no_polisi"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.no_polisi}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>
                                <AntForm.Item
                                    style={{ marginBottom: 2 }}
                                    label="Mitra"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.vendor && formik.errors.vendor}
                                    validateStatus={formik.touched.vendor && formik.errors.vendor ? 'error' : 'success'}
                                >
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        id="vendor"
                                        name="vendor"
                                        onChange={(value, option) => {
                                            formik.setFieldValue('vendor', option.children); // ini akan mengambil label (children dari option)
                                            formik.setFieldValue('id_vendor', value); // ini akan mengambil value dari option yang dipilih
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.vendor || ''}
                                    >
                                        {NamaMitraOptions.map((option) => (
                                            <Select.Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Select.Option>
                                        ))}
                                    </Select>

                                </AntForm.Item>

                                <AntForm.Item
                                    label="Jenis Kendaraan"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan}
                                    validateStatus={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        id="jenis_kendaraan"
                                        name="jenis_kendaraan"
                                        type="text"
                                        onChange={(value, option) => {
                                            formik.setFieldValue('jenis_kendaraan', value);
                                            formik.setFieldValue('id_kendaraan_jenis', parseInt(option.key));
                                            DriverName(value);
                                        }}
                                        value={formik.values.jenis_kendaraan}
                                        onBlur={formik.handleBlur}
                                    >
                                        {DriverType.map((item) => (
                                            <Select.Option key={item.id} value={item.tipe}>
                                                {item.tipe}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </AntForm.Item>
                                <AntForm.Item
                                    label="Nama Driver"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.nama_driver && formik.errors.nama_driver}
                                    validateStatus={formik.touched.nama_driver && formik.errors.nama_driver ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        id="id_driver"
                                        name="id_driver"
                                        type="text"
                                        onChange={(value) => {
                                            formik.setFieldValue('id_driver', value);
                                        }}
                                        value={formik.values.id_driver}

                                        onBlur={formik.handleBlur}
                                    >
                                        {NamaSupir && NamaSupir.map((item) => (
                                            <Select.Option key={item.tipe} value={item.driverId}>
                                                {item.driverName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </AntForm.Item>
                                <AntForm.Item
                                    label="Warna Plat"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.warna_plat && formik.errors.warna_plat}
                                    validateStatus={formik.touched.warna_plat && formik.errors.warna_plat ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Select
                                        id="warna_plat"
                                        name="warna_plat"
                                        type="text"
                                        onChange={(value) => formik.setFieldValue('warna_plat', value)}
                                        value={formik.values.warna_plat}
                                        onBlur={formik.handleBlur}
                                    >
                                        {WarnaPlat && WarnaPlat.map((item) => (
                                            <Select.Option key={item.warna} value={item.warna}>
                                                {item.warna}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </AntForm.Item>
                                <AntForm.Item
                                    label="Merk Mobil"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.merk_mobil && formik.errors.merk_mobil}
                                    validateStatus={formik.touched.merk_mobil && formik.errors.merk_mobil ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="merk_mobil"
                                        name="merk_mobil"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.merk_mobil}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>


                            </Col>
                            <Col sm={4}>
                                <AntForm.Item
                                    label="Tahun Mobil"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.tahun_mobil && formik.errors.tahun_mobil}
                                    validateStatus={formik.touched.tahun_mobil && formik.errors.tahun_mobil ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="tahun_mobil"
                                        name="tahun_mobil"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.tahun_mobil}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>
                                {/* <AntForm.Item
                                    label="Warna Plat"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.warna_plat && formik.errors.warna_plat}
                                    validateStatus={formik.touched.warna_plat && formik.errors.warna_plat ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="warna_plat"
                                        name="warna_plat"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.warna_plat}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item> */}
                                <Row gutter={16}>
                                    <Col sm={4}>
                                        <AntForm.Item
                                            label="Panjang"
                                            required
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                            help={formik.touched.panjang && formik.errors.panjang}
                                            validateStatus={formik.touched.panjang && formik.errors.panjang ? 'error' : 'success'}
                                            style={{ marginBottom: 2 }}
                                        >
                                            <Input
                                                id="panjang"
                                                name="panjang"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.panjang}
                                                onBlur={formik.handleBlur}
                                            />
                                        </AntForm.Item>
                                    </Col>
                                    <Col sm={4}>
                                        <AntForm.Item
                                            label="Lebar"
                                            required
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                            help={formik.touched.lebar && formik.errors.lebar}
                                            validateStatus={formik.touched.lebar && formik.errors.lebar ? 'error' : 'success'}
                                            style={{ marginBottom: 2 }}
                                        >
                                            <Input
                                                id="lebar"
                                                name="lebar"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.lebar}
                                                onBlur={formik.handleBlur}
                                            />
                                        </AntForm.Item>
                                    </Col>
                                    <Col sm={4}>
                                        <AntForm.Item
                                            label="Tinggi"
                                            required
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                            help={formik.touched.tinggi && formik.errors.tinggi}
                                            validateStatus={formik.touched.tinggi && formik.errors.tinggi ? 'error' : 'success'}
                                            style={{ marginBottom: 2 }}
                                        >
                                            <Input
                                                id="tinggi"
                                                name="tinggi"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.tinggi}
                                                onBlur={formik.handleBlur}
                                            />
                                        </AntForm.Item>
                                    </Col>
                                </Row>
                                <AntForm.Item
                                    label="No BPKB"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.no_bpkb && formik.errors.no_bpkb}
                                    validateStatus={formik.touched.no_bpkb && formik.errors.no_bpkb ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="no_bpkb"
                                        name="no_bpkb"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.no_bpkb}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>
                                <AntForm.Item
                                    label="STNK"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.stnk && formik.errors.stnk}
                                    validateStatus={formik.touched.stnk && formik.errors.stnk ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="stnk"
                                        name="stnk"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.stnk}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>

                                <AntForm.Item
                                    label="Kapasitas"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.tinggi && formik.errors.tinggi}
                                    validateStatus={formik.touched.tinggi && formik.errors.tinggi ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="kapasitas"
                                        name="kapasitas"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.kapasitas}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>
                                <AntForm.Item
                                    label="Kapasitas Max"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.kapasitas_maks && formik.errors.kapasitas_maks}
                                    validateStatus={formik.touched.kapasitas_maks && formik.errors.kapasitas_maks ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="kapasitas_maks"
                                        name="kapasitas_maks"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.kapasitas_maks}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>
                                <AntForm.Item
                                    label="Kubikasi"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.tinggi && formik.errors.tinggi}
                                    validateStatus={formik.touched.tinggi && formik.errors.tinggi ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="kubikasi"
                                        name="kubikasi"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.kubikasi}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>
                                <AntForm.Item
                                    label="Location"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.location && formik.errors.location}
                                    validateStatus={formik.touched.location && formik.errors.location ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="location"
                                        name="location"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.location}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item>

                            </Col>

                        </Row>
                    </AntForm>
                </Modal>
            </Card>
        </div>
    )
}

export default ModalDriverKosongan