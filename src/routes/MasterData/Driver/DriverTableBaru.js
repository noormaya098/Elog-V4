import { Button, Card, Modal, Form, Input, Pagination, Upload, DatePicker, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Row, Col, Alert } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import Baseurl from '../../../Api/BaseUrl';
import Swal from 'sweetalert2';
import ZustandStore from '../../../zustand/Store/JenisKepemilikanOptions';
import useMitraStore from '../../../zustand/Store/MitraStore';

function DriverTableBaru() {
    const [modalOpen, setModalOpen] = useState(false);
    const [DataAwal, setDataAwal] = useState("");
    const [DetailId, setDetailId] = useState("")
    const [loading, setLoading] = useState(false);
    const [CariDriver, setCariDriver] = useState("")
    const [TotalPages, setTotalPages] = useState("")
    const [CariDriverAktif, setCariDriverAktif] = useState("")
    const { jenisKepemilikan, setjenisKepemilikan } = ZustandStore((state) => ({
        jenisKepemilikan: state.jenisKepemilikan,
        setjenisKepemilikan: state.setjenisKepemilikan
    }))
    const { JenisSim, setJenisSim } = ZustandStore((item) => ({
        JenisSim: item.JenisSim,
        setJenisSim: item.setJenisSim
    }))
    const { UkuranSeragam, setUkuranSeragam } = ZustandStore((item) => ({
        UkuranSeragam: item.UkuranSeragam,
        setUkuranSeragam: item.setUkuranSeragam
    }))
    const { DriverType, setDriverType } = ZustandStore((item) => ({
        DriverType: item.DriverType,
        setDriverType: item.setDriverType
    }))
    const { StatusDriverAktif, setStatusDriverAktif } = ZustandStore((item) => ({
        StatusDriverAktif: item.StatusDriverAktif,
        setStatusDriverAktif: item.setStatusDriverAktif
    }))

    const [CariJenisKepemilikan, setCariJenisKepemilikan] = useState("")
    const [success, setSuccess] = useState(false);
    const columns = [
        {
            name: 'No',
            selector: row => row.no,
            width: "80px"
        },
        {
            name: 'NIK Driver',
            selector: row => row.nik,
            width: "100px"
        },
        {
            name: 'Nama',
            selector: row => row.driverName,
        },
        {
            name: 'Image',
            selector: row => <img src={row.driverImage} height="108px" width="158px"></img>,
        },
        {
            name: 'Jenis SIM',
            selector: row => row.simType,
        },
        {
            name: 'Jenis Kendaraan',
            selector: row => row.vehicle,
        },
        {
            name: 'Jenis Kepemilikan',
            selector: row => row.jenisKepemilikan,
        },
        {
            name: 'Status',
            selector: row => row.driverStatus === 1 ? "Tersedia" : "Tidak Tersedia",
            cell: row => (
                <div>
                    {row.driverStatus === 1 ? (
                        <>
                            <Button
                                size="small"
                                type="primary"
                                className="mt-3"

                                onClick={() => ModalOFFDriver(row.driverId)}
                            >
                                Driver Ready
                            </Button>
                        </>
                    ) :
                        <>
                            <Button
                                size="small"
                                type="danger"
                                className="mt-2"
                                onClick={() => ModalONDriver(row.driverId)}
                            >
                                Driver Tidak Ready
                            </Button>

                        </>}
                </div>
            )
        },

    ];


    const ModalONDriver = async (driverId) => {
        try {
            Swal.fire({
                title: 'Konfirmasi',
                text: 'Apakah Anda yakin ingin mengubah status driver menjadi "Ready"?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = await axios.post(
                        `${Baseurl}driver/ready-driver`,
                        {
                            id: driverId,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: localStorage.getItem('token'),
                            },
                        }
                    );
                }
                ApiAwal()
            });
        } catch (error) {
            // Handle error
        }
    };

    const ModalOFFDriver = async (driverId) => {
        try {
            Swal.fire({
                title: 'Konfirmasi',
                text: 'Apakah Anda yakin ingin mengubah status driver menjadi "Tidak Ready"?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = await axios.post(
                        `${Baseurl}driver/off-driver`,
                        {
                            id: driverId,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: localStorage.getItem('token'),
                            },
                        }
                    );
                }
                ApiAwal()
            });
        } catch (error) {
            // Handle error
        }
    };

    const ApiAwal = async (page = 1) => {
        try {
            const data = await axios.get(`${Baseurl}driver/get-driver?limit=10&page=${page}&keyword=${CariDriver}&jenis_kepemilikan=${CariJenisKepemilikan}&status=${CariDriverAktif}`, {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),

                }
            }
            )
            setDataAwal(data.data.data.order)
            setTotalPages(data.data.data.totalData)
            console.log(data.data.data);
        } catch (error) {

        }
    }

    console.log(`inijenis jenisKepemilikan`, jenisKepemilikan);

    useEffect(() => {
        ApiAwal()
        setjenisKepemilikan()
        setUkuranSeragam()
        setJenisSim()
        setDriverType()
        setStatusDriverAktif()
        fetchMitra()
    }, [CariDriver, CariJenisKepemilikan, CariDriverAktif])

    const onShowSizeChange = async (page) => {
        ApiAwal(page)
    }
    const DetailRow = (row) => {
        console.log(row)
        setDetailId(row.driverId)
        setModalOpen(true)

        DetailDriver(row.driverId)
    }



    const [GambarDriver, setGambarDriver] = useState("")
    const DetailDriver = async (driverId) => {
        try {
            const data = await axios.get(`${Baseurl}driver/get-driver-detail?id=${driverId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),

                }
            })
            setGambarDriver(data.data.data[0]?.driverImage)
            console.log(data.data.data[0]);
            formik.setValues({
                nik: data.data.data[0]?.nik,
                namadriver: data.data.data[0]?.driverName,
                noktp: data.data.data[0]?.driverKtp,
                divisi: data.data.data[0]?.division,
                nosim: data.data.data[0]?.numberSim,
                jenissim: data.data.data[0]?.simType,
                alamat: data.data.data[0]?.driverAddress,
                tgllahir: data.data.data[0]?.dateBirth,
                agama: data.data.data[0]?.driverReligion,
                notelp1: data.data.data[0]?.noTelp1,
                notelp2: data.data.data[0]?.noTelp2 === undefined ? "Tidak ada No Telp2" : data.data.data[0]?.noTelp2,
                email: data.data.data[0]?.driverEmail,
                tglmasuk: data.data.data[0]?.dateIn,
                tglsim: data.data.data[0]?.simDate,
                vehicletype: data.data.data[0]?.vehicle,
                jeniskepemilikan: data.data.data[0]?.jenisKepemilikan,
                ukseragam: data.data.data[0]?.ukuranSeragam,
                rekeningbank: data.data.data[0]?.BankRekening,
                norekening: data.data.data[0]?.Norek,
                mitra: data.data.data[0]?.mitra,
                mitraId: data.data.data[0]?.mitraId,
                cover: data.data.data[0]?.driverImage

            })
        } catch (error) {

        }
    }

    const EditDriver = async (driverId) => {
        setLoading(true);
        try {
            const data = await axios.post(
                `${Baseurl}driver/update-driver`,
                {
                    id: DetailId,
                    nik: formik.values.nik,
                    divisi: formik.values.divisi,
                    nama: formik.values.namadriver,
                    no_ktp: formik.values.noktp,
                    no_sim: formik.values.nosim,
                    vehicle_type: formik.values.vehicletype,
                    jenis_sim: formik.values.jenissim,
                    alamat: formik.values.alamat,
                    tgl_lahir: formik.values.tgllahir,
                    agama: formik.values.agama,
                    notelp: formik.values.notelp1,
                    notelp2: formik.values.notelp2,
                    email: formik.values.email,
                    tgl_masuk: formik.values.tglmasuk,
                    tgl_sim: formik.values.tglsim,
                    uk_seragam: formik.values.ukseragam,
                    jenis_kepemilikan: formik.values.jeniskepemilikan,
                    rekening_bank: formik.values.rekeningbank,
                    rekening_norek: formik.values.norekening,
                    id_mitra: formik.values.mitraId,
                    mitra: formik.values.mitra,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            ApiAwal()
            setSuccess(true);
            // Display SweetAlert success message
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Driver updated successfully',
            });

            // Perform other actions after success
        } catch (error) {
            // Handle errors
            console.error(error);

            // Display SweetAlert error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update driver',
            });
        } finally {
            setLoading(false);
        }
    };

    const BuatDriver = async () => {
        try {
            const formData = new FormData();
            formData.append('cover', formik.values.cover);
            formData.append('id', DetailId);
            formData.append('nik', formik.values.nik);
            formData.append('divisi', formik.values.divisi);
            formData.append('nama', formik.values.namadriver);
            formData.append('no_ktp', formik.values.noktp);
            formData.append('no_sim', formik.values.nosim);
            formData.append('vehicle_type', formik.values.vehicletype);
            formData.append('jenis_sim', formik.values.jenissim);
            formData.append('alamat', formik.values.alamat);
            formData.append('tgl_lahir', formik.values.tgllahir);
            formData.append('agama', formik.values.agama);
            formData.append('notelp', formik.values.notelp1);
            formData.append('notelp2', formik.values.notelp2);
            formData.append('email', formik.values.email);
            formData.append('tgl_masuk', formik.values.tglmasuk);
            formData.append('tgl_sim', formik.values.tglsim);
            formData.append('uk_seragam', formik.values.ukseragam);
            formData.append('jenis_kepemilikan', formik.values.jeniskepemilikan);
            formData.append('rekening_bank', formik.values.rekeningbank);
            formData.append('rekening_norek', formik.values.norekening);
            formData.append('id_mitra', formik.values.mitraId);

            const response = await axios.post(`${Baseurl}driver/create-driver`,
                formData
                , {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: localStorage.getItem("token"),
                    }
                });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Driver created successfully',
            });
            UploadFoto(formik.values.cover)
            ApiAwal()


            console.log(response.data);
        } catch (error) {
            console.error(error.status);

            // Display SweetAlert error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to create driver',
            });
        }
    };



    const { NamaMitra, fetchMitra } = useMitraStore((item) => ({
        NamaMitra: item.NamaMitra,
        fetchMitra: item.fetchMitra
    }))



    const UploadFoto = async () => {
        try {
            const formData = new FormData();
            formData.append('cover', formik.values.cover);
            formData.append('id', DetailId);
            const data = await axios.post(`${Baseurl}driver/upload-driver-photo`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: localStorage.getItem("token"),
                    }
                }
            )
            ApiAwal()
        } catch (error) {
            // console.error(error);
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error',
            //     text: `Failed to upload photo: ${error.message}`,
            // });
        }
    }



    const JenisSimOptions = JenisSim.map((item) => ({
        label: item.Jenis,
        value: item.mitraId
    }))
    const UkuranSeragamOptions = UkuranSeragam.map((item) => ({
        label: item.ukuran,
        value: item.mitraId
    }))
    const DriverTypeOptions = DriverType.map((item) => ({
        label: item.tipe,
        value: item.mitraId
    }))



    const formik = useFormik({
        initialValues: {
            nik: '',
            namadriver: '',
            noktp: '',
            jenis_SIM: '',
            tglsim: '',
            cover: "",
            tglmasuk: "",
            tgllahir: "",
            email: '',
            divisi: '',
            nosim: '',
            jenissim: '',
            alamat: '',
            agama: '',
            notelp1: '',
            vehicletype: '',
            jeniskepemilikan: '',
            ukseragam: '',
            rekeningbank: '',
            norekening: '',

        },
        validationSchema: Yup.object({
            nik: Yup.string()
                .required('Nik harus diisi')
                .max(6, "Tidak Boleh Melebihi 6 Karakter")
                .transform(value => (value ? value.charAt(0).toUpperCase() + value.slice(1) : '')),
            noktp: Yup.number().required('No KTP harus diisi').integer('Nik harus berupa angka'),
            namadriver: Yup.string().required('Nama Driver harus diisi'),
            email: Yup.string().email('Format email tidak valid').required('Email harus diisi'),
            divisi: Yup.string().required('Divisi Driver harus diisi'),
            nosim: Yup.number().required('No SIM harus diisi').integer('Nik harus berupa angka'),
            jenissim: Yup.string().required('Jenis SIM harus diisi'),
            alamat: Yup.string().required('Alamat harus diisi'),
            tgllahir: Yup.date().required('Tanggal Lahir harus diisi'),
            agama: Yup.string().required('Agama harus diisi'),
            notelp1: Yup.number().required('No Telp 1 harus diisi'),
            cover: Yup.string().required('gambar harus diisi'),
            tglmasuk: Yup.date().nullable().required('Tanggal Masuk harus diisi'),
            tglsim: Yup.date().nullable().required('Tanggal SIM harus diisi'),
            vehicletype: Yup.string().required('Vehicle Type harus diisi'),
            jeniskepemilikan: Yup.string().required('Jenis Kepemilikan harus diisi'),
            ukseragam: Yup.string().required('Ukuran Seragam harus diisi'),
            rekeningbank: Yup.string().required('Rekening Bank harus diisi'),
            norekening: Yup.string().required('Nomor Rekening harus diisi'),
        }),
        onSubmit: values => {
            console.log(values);
            setModalOpen(false);
            // EditDriver(values.driverId)
            // BuatDriver()
            if (DetailId === null) {
                return BuatDriver()
            } else {
                EditDriver(values.driverId)
                UploadFoto(values.driverId)

            }
        },
    });

    const UpdateFoto = async () => {
        try {
            const formData = new FormData();
            formData.append('cover', formik.values.cover);
            formData.append('id', DetailId);
            const data = await axios.post(`${Baseurl}driver/upload-driver-photo`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: localStorage.getItem("token"),
                    }
                }
            )
        } catch (error) {
            // console.error(error);
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error',
            //     text: `Failed to upload photo: ${error.message}`,
            // });
        }
    }

    return (

        <div>
            <Card>
                <Col>
                    <h5>Halaman Add Driver</h5>
                </Col>
                <Row>

                    <Col sm={6}>
                        <Button size='default'
                            onClick={() => {
                                setModalOpen(true); formik.resetForm(); setGambarDriver(null); setDetailId(null)
                            }} type="primary">Add Driver</Button>
                    </Col>
                    <Col sm={2}>
                        <Input onChange={(e) => { setCariDriver(e.target.value) }} placeholder='Cari Driver'></Input>
                    </Col>

                    <Col>
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

                    <Modal
                        title="Modal Driver"
                        style={{ top: 20 }}
                        width='800px'
                        visible={modalOpen}
                        onOk={formik.handleSubmit}
                        onCancel={() => setModalOpen(false)}
                    >
                        <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
                            <Row>
                                <Col sm={4}>
                                    <Card style={{ height: "200px" }}>
                                        <div style={{ width: "100%", height: "100%" }}>
                                            <img
                                                src={GambarDriver}
                                                alt="Gambar Driver"
                                                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                                            />
                                        </div>
                                    </Card>
                                    <Form.Item
                                        name="uploadgambar"
                                        label="Upload Gambar"
                                        help={formik.touched.cover && formik.errors.cover ? formik.errors.cover : null}
                                        validateStatus={formik.touched.cover && formik.errors.cover ? 'error' : undefined}
                                    >
                                        <Upload
                                            name="cover"
                                            beforeUpload={(file) => {
                                                formik.setFieldValue('cover', file);
                                                return false; // Prevent upload immediately
                                            }}
                                            fileList={formik.values.cover ? [formik.values.cover] : []}
                                        >
                                            <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item
                                        label="Tanggal Masuk"
                                        help={formik.touched.tglmasuk && formik.errors.tglmasuk ? formik.errors.tglmasuk : null}
                                        validateStatus={formik.touched.tglmasuk && formik.errors.tglmasuk ? 'error' : undefined}
                                    >
                                        <DatePicker
                                            name="tglmasuk"
                                            onChange={(date, dateString) => formik.setFieldValue('tglmasuk', dateString)}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.tglmasuk ? moment(formik.values.tglmasuk) : null}
                                            placeholder="Pilih tanggal masuk"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Tanggal SIM"
                                        help={formik.touched.tglsim && formik.errors.tglsim ? formik.errors.tglsim : null}
                                        validateStatus={formik.touched.tglsim && formik.errors.tglsim ? 'error' : undefined}
                                    >
                                        <DatePicker
                                            placeholder="input tgl sim"
                                            name="tglsim"
                                            id='tglsim'
                                            onChange={(date, dateString) => formik.setFieldValue('tglsim', dateString)}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.tglsim ? moment(formik.values.tglsim) : null}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Tanggal Lahir"
                                        help={formik.touched.tgllahir && formik.errors.tgllahir ? formik.errors.tgllahir : null}
                                        validateStatus={formik.touched.tgllahir && formik.errors.tgllahir ? 'error' : undefined}
                                    >
                                        <DatePicker
                                            placeholder="input tgl lahir"
                                            name="tgllahir"
                                            onChange={(date, dateString) => formik.setFieldValue('tgllahir', dateString)}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.tgllahir ? moment(formik.values.tgllahir) : null}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col sm={4}>
                                    <Form.Item
                                        label="NIK"
                                        help={formik.touched.nik && formik.errors.nik ? formik.errors.nik : null}
                                        validateStatus={formik.touched.nik && formik.errors.nik ? 'error' : undefined}
                                    >
                                        <Input
                                            placeholder="input nik"
                                            name="nik"
                                            onChange={e => {
                                                const val = e.target.value;
                                                formik.setFieldValue('nik', val ? val.charAt(0).toUpperCase() + val.slice(1) : '');
                                            }}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.nik}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Nama Driver"
                                        help={formik.touched.namadriver && formik.errors.namadriver ? formik.errors.namadriver : null}
                                        validateStatus={formik.touched.namadriver && formik.errors.namadriver ? 'error' : undefined}
                                    >
                                        <Input
                                            placeholder="namadriver"
                                            name="namadriver"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.namadriver}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Divisi"
                                        help={formik.touched.divisi && formik.errors.divisi ? formik.errors.divisi : null}
                                        validateStatus={formik.touched.divisi && formik.errors.divisi ? 'error' : undefined}
                                    >
                                        <Input
                                            placeholder="input divisi"
                                            name="divisi"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.divisi}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Perusahaan"
                                        help={formik.touched.jeniskepemilikan && formik.errors.jeniskepemilikan ? formik.errors.jeniskepemilikan : null}
                                        validateStatus={formik.touched.jeniskepemilikan && formik.errors.jeniskepemilikan ? 'error' : undefined}
                                    >
                                        <Select

                                            name="mitra"
                                            id='mitra'
                                            showSearch
                                            optionFilterProp="children"
                                            // onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.mitra}
                                            onChange={(value, key) => {
                                                formik.setFieldValue('mitra', value)
                                                formik.setFieldValue('mitraId', parseInt(key.key))

                                            }}
                                        >

                                            {NamaMitra && NamaMitra.map((item) => (
                                                <Select.Option key={item.mitraId} value={item.NamaMitra}>
                                                    {item.NamaMitra}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        {/* <Input
                                            placeholder="input jenis kepemilikan"
                                            name="jeniskepemilikan"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.jeniskepemilikan}
                                        /> */}
                                    </Form.Item>
                                    <Form.Item
                                        label="Jenis Driver"
                                        help={formik.touched.jeniskepemilikan && formik.errors.jeniskepemilikan ? formik.errors.jeniskepemilikan : null}
                                        validateStatus={formik.touched.jeniskepemilikan && formik.errors.jeniskepemilikan ? 'error' : undefined}
                                    >
                                        <Select

                                            name="jeniskepemilikan"
                                            id='jeniskepemilikan'
                                            // onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.jeniskepemilikan}
                                            onChange={(value) => formik.setFieldValue('jeniskepemilikan', value)}
                                        >

                                            {jenisKepemilikan.map((item) => (
                                                <Select.Option key={item.label} value={item.jenis}>
                                                    {item.jenis}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        {/* <Input
                                            placeholder="input jenis kepemilikan"
                                            name="jeniskepemilikan"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.jeniskepemilikan}
                                        /> */}
                                    </Form.Item>
                                    <Form.Item
                                        label="No KTP"
                                        help={formik.touched.noktp && formik.errors.noktp ? formik.errors.noktp : null}
                                        validateStatus={formik.touched.noktp && formik.errors.noktp ? 'error' : undefined}
                                    >
                                        <Input
                                            placeholder="input no ktp"
                                            name="noktp"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.noktp}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="No SIM"
                                        help={formik.touched.nosim && formik.errors.nosim ? formik.errors.nosim : null}
                                        validateStatus={formik.touched.nosim && formik.errors.nosim ? 'error' : undefined}
                                    >
                                        <Input
                                            placeholder="input no sim"
                                            name="nosim"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.nosim}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Jenis SIM"
                                        help={formik.touched.jenissim && formik.errors.jenissim ? formik.errors.jenissim : null}
                                        validateStatus={formik.touched.jenissim && formik.errors.jenissim ? 'error' : undefined}
                                    >
                                        <Select
                                            showSearch
                                            optionFilterProp="children"
                                            id="jenissim"
                                            name="jenissim"
                                            type="text"
                                            defaultValue="Pilih Jenis SIM"
                                            // onChange={formik.handleChange}
                                            onChange={(value) => formik.setFieldValue('jenissim', value)}
                                            value={formik.values.jenissim}
                                            onBlur={formik.handleBlur}

                                        >
                                            {JenisSimOptions.map((option) => (
                                                <Select.Option key={option.label} value={option.jenis}>
                                                    {option.jenis}
                                                </Select.Option>
                                            ))}

                                        </Select>
                                        {/* <Input
                                            placeholder="input jenissim"
                                            name="jenissim"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.jenissim}
                                        /> */}
                                    </Form.Item>


                                    <Form.Item
                                        label="Agama"
                                        help={formik.touched.agama && formik.errors.agama ? formik.errors.agama : null}
                                        validateStatus={formik.touched.agama && formik.errors.agama ? 'error' : undefined}
                                    >
                                        <Select
                                            placeholder="Pilih Agama"
                                            onBlur={formik.handleBlur}
                                            value={formik.values.agama}
                                            onChange={(value, option) => {
                                                formik.handleChange({
                                                    target: {
                                                        name: 'agama',
                                                        value: value,
                                                    },
                                                });
                                            }}
                                        >
                                            <Select.Option value="1">Islam</Select.Option>
                                            <Select.Option value="2">Kristen</Select.Option>
                                            <Select.Option value="3">Hindu</Select.Option>
                                            <Select.Option value="4">Buddha</Select.Option>
                                            <Select.Option value="5">Khonghucu</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col sm={4}>

                                    <Form.Item
                                        label="No Telp"
                                        help={formik.touched.notelp1 && formik.errors.notelp1 ? formik.errors.notelp1 : null}
                                        validateStatus={formik.touched.notelp1 && formik.errors.notelp1 ? 'error' : undefined}
                                    >
                                        <Input
                                            type='number'
                                            placeholder="input notelp1"
                                            name="notelp1"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.notelp1}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="No Telp 2"
                                        help={formik.touched.notelp2 && formik.errors.notelp2 ? formik.errors.notelp2 : null}
                                        validateStatus={formik.touched.notelp2 && formik.errors.notelp2 ? 'error' : undefined}
                                    >
                                        <Input
                                            type='number'
                                            placeholder="input notelp2"
                                            name="notelp2"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.notelp2 === undefined ? "Tidak ada No Telp 2" : formik.values.notelp2}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        help={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                                        validateStatus={formik.touched.email && formik.errors.email ? 'error' : undefined}
                                    >
                                        <Input
                                            placeholder="input email"
                                            name="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Vehicle Type"
                                        help={formik.touched.vehicletype && formik.errors.vehicletype ? formik.errors.vehicletype : null}
                                        validateStatus={formik.touched.vehicletype && formik.errors.vehicletype ? 'error' : undefined}
                                    >
                                        <Select
                                            showSearch
                                            name="vehicletype"
                                            id='vehicletype'
                                            optionFilterProp="children"

                                            value={formik.values.vehicletype}
                                            onChange={(value) => formik.setFieldValue('vehicletype', value)}
                                        >
                                            {DriverTypeOptions.map((option) => (
                                                <Select.Option key={option.label} value={option.jenis}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        {/* <Input
                                            placeholder="input vehicle type"
                                            name="vehicletype"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.vehicletype}
                                        /> */}
                                    </Form.Item>

                                    <Form.Item
                                        label="Ukuran Seragam"
                                        help={formik.touched.ukseragam && formik.errors.ukseragam ? formik.errors.ukseragam : null}
                                        validateStatus={formik.touched.ukseragam && formik.errors.ukseragam ? 'error' : undefined}
                                    >
                                        <Select
                                            name="ukseragam"
                                            id="ukseragam"
                                            onChange={(value) => {
                                                formik.setFieldValue('ukseragam', value);
                                            }}
                                            defaultValue="Pilih Ukuran Seragam"
                                            onBlur={formik.handleBlur}
                                            value={formik.values.ukseragam}
                                        >
                                            {UkuranSeragam.map((item) => (
                                                <Select.Option value={item.ukuran}>{item.ukuran}</Select.Option>
                                            ))}
                                        </Select>
                                        {/* <Input
                                            placeholder="input ukuran seragam"
                                            name="ukseragam"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.ukseragam}
                                        /> */}
                                    </Form.Item>
                                    <Form.Item
                                        label="Rekening Bank"
                                        help={formik.touched.rekeningbank && formik.errors.rekeningbank ? formik.errors.rekeningbank : null}
                                        validateStatus={formik.touched.rekeningbank && formik.errors.rekeningbank ? 'error' : undefined}
                                    >
                                        <Input
                                            placeholder="input rekening bank"
                                            name="rekeningbank"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.rekeningbank}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Nomor Rekening"
                                        help={formik.touched.norekening && formik.errors.norekening ? formik.errors.norekening : null}
                                        validateStatus={formik.touched.norekening && formik.errors.norekening ? 'error' : undefined}
                                    >
                                        <Input
                                            type='number'
                                            placeholder="input nomor rekening"
                                            name="norekening"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.norekening}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Alamat"
                                        help={formik.touched.alamat && formik.errors.alamat ? formik.errors.alamat : null}
                                        validateStatus={formik.touched.alamat && formik.errors.alamat ? 'error' : undefined}
                                    >
                                        <Input
                                            placeholder="input alamat"
                                            name="alamat"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.alamat}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                    <DataTable
                        columns={columns}
                        data={DataAwal}
                        onRowClicked={DetailRow}
                    />
                    <style>
                        {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: #E3EAE7;
          }
          
        `}
                    </style>
                    <div className='d-flex justify-content-end mt-3'>
                        <Pagination
                            showSizeChanger
                            onChange={onShowSizeChange}
                            defaultCurrent={1}
                            total={TotalPages}
                        />
                    </div>
                </Row>
            </Card>
        </div>
    )
}

export default DriverTableBaru