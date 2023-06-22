import { Card, DatePicker, Form, Input, Upload,Space  , Modal} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Baseurl from '../../../Api/BaseUrl';
import Select from 'react-select';
import ZustandStore from '../../../zustand/Store/JenisKepemilikanOptions';
import Swal from 'sweetalert2';
import { Pagination } from 'antd';
// import { colors } from 'react-select/dist/declarations/src/theme';
function DriverTableBaru() {
    // const FetchTipeKendaraan = ZustandStore((state) => state.FetchTipeKendaraan)
    // const TipeKendaraan = ZustandStore((state) => state.TipeKendaraan)
    const { TipeKendaraan, FetchTipeKendaraan } = ZustandStore((state) => ({
        FetchTipeKendaraan: state.FetchTipeKendaraan,
        TipeKendaraan: state.TipeKendaraan
    }))
    const { jenisKepemilikan, setjenisKepemilikan } = ZustandStore((state) => ({
        jenisKepemilikan: state.jenisKepemilikan,
        setjenisKepemilikan: state.setjenisKepemilikan
    }))
    const { UkuranSeragam, setUkuranSeragam } = ZustandStore((state) => ({
        UkuranSeragam: state.UkuranSeragam,
        setUkuranSeragam: state.setUkuranSeragam
    }))
    const { JenisSim, setJenisSim } = ZustandStore((state) => ({
        JenisSim: state.JenisSim,
        setJenisSim: state.setJenisSim
    }))
    useEffect(() => {
        FetchTipeKendaraan()
        setjenisKepemilikan()
        setUkuranSeragam()
        setJenisSim()
    }, [])

    const [open, setOpen] = useState(false);
    const showModal = () => {
      setOpen(true);
    };
    const handleOk = (e) => {
      console.log(e);
      setOpen(false);
    };
    const handleCancel = (e) => {
      console.log(e);
      setOpen(false);
    };


    console.log(`ini adalah JenisSim`, JenisSim);
    const [form] = Form.useForm();
    const [FileUpload, setFileUpload] = useState(null)
    const [driverImage, setdriverImage] = useState(null)
    const [DataAwal, setDataAwal] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showAdd, setShowADD] = useState(false);
    const handleCloseAdd = () => setShowADD(false);
    const handleShowAdd = () => setShowADD(true);
    const [DataDetail, setDataDetail] = useState('')
    const [DriverId, setDriverId] = useState('')
    const [NIKValue, setNIKValue] = useState("")
    const [NamaDriverValue, setNamaDriverValue] = useState("")
    const [NoKTPValue, setNoKTPValue] = useState("")
    const [DivisiValue, setDivisiValue] = useState("")
    const [NoSIMValue, setNoSIMValue] = useState("")
    const [JenisSIMValue, setJenisSIMValue] = useState("")
    const [AlamatValue, setAlamatValue] = useState("")
    const [TanggalLahirValue, setTanggalLahirValue] = useState("")
    const [AgamaValue, setAgamaValue] = useState("")
    const [NoTelpValue, setNoTelpValue] = useState("")
    const [Notelp2Value, setNotelp2Value] = useState("")
    const [EmailValue, setEmailValue] = useState("")
    const [TanggalMasukValue, setTanggalMasukValue] = useState("")
    const [TanggalSIMValue, setTanggalSIMValue] = useState("")
    const [VehicleTypeValue, setVehicleTypeValue] = useState("")
    const [JenisKepemilikanValue, setJenisKepemilikanValue] = useState("")
    const [UkuranSeragamValue, setUkuranSeragamValue] = useState("")
    const [RekeningBankValue, setRekeningBankValue] = useState("")
    const [NoMorRekeningValue, setNoMorRekeningValue] = useState("")


    const columns = [
        {
            name: 'No',
            selector: row => row.no,
            width: "80px"
        },
        {
            name: 'Nama',
            selector: row => row.driverName,
        },
        {
            name: 'Image',
            selector: row => <img src={row.driverImage} style={{ width: "50px" }}></img>,
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
            selector: row => row.driverStatus === 1 ? "Driver Tersedia" : "Driver Tidak Tersedia",
        },
        {
            name: 'Edit',
            selector: row =>
                <>
                    <Button size='sm' onClick={() => {
                        handleShow(row.driverId)
                        setDriverId(row.driverId)
                        DetailDriver(row.driverId)
                    }}>Edit</Button>
                </>,
        },
    ];
    const ApiAwal = async (page = 1) => {
        try {
            const response = await axios.get(`${Baseurl}driver/get-driver?limit=10&page=${page}&keyword=&jenis_kepemilikan=`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                }
            });

            console.log("isi data", response.data.data.order);
            setDataAwal(response.data.data.order);
        } catch (error) {
            localStorage.removeItem(`token`)
            window.location.reload()
        }
    };

    useEffect(() => {
        ApiAwal();
    }, []);

    const DetailDriver = async (driverId) => {
        try {
            const data = await axios.get(`${Baseurl}driver/get-driver-detail?id=${driverId}`,

                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    }
                });
            setDataDetail(data.data.data?.[0])
            console.log(`data detail`, data.data.data?.[0]);
            setNamaDriverValue(data.data.data?.[0].driverName)
            setNIKValue(data.data.data?.[0].nik)
            setNoKTPValue(data.data.data?.[0].driverKtp)
            setDivisiValue(data.data.data?.[0].division)
            setNoSIMValue(data.data.data?.[0].numberSim)
            setJenisSIMValue(data.data.data?.[0].simType)
            setAlamatValue(data.data.data?.[0].driverAddress)
            setTanggalLahirValue(data.data.data?.[0].dateBirth)
            setAgamaValue(data.data.data?.[0].driverReligion)
            setNoTelpValue(data.data.data?.[0].noTelp1)
            setNotelp2Value(data.data.data?.[0].noTelp2)
            setEmailValue(data.data.data?.[0].driverEmail)
            setTanggalMasukValue(data.data.data?.[0].dateIn)
            setTanggalSIMValue(data.data.data?.[0].simDate)
            setVehicleTypeValue(data.data.data?.[0].vehicle)
            setJenisKepemilikanValue(data.data.data?.[0].jenisKepemilikan)
            setUkuranSeragamValue(data.data.data?.[0].ukuranSeragam)
            setRekeningBankValue(data.data.data?.[0].BankRekening)
            setNoMorRekeningValue(data.data.data?.[0].Norek)
            setdriverImage(data.data.data?.[0].driverImage)
        } catch (error) {

        }
    }

    const onChanges = (date, dateString) => {
        console.log(date, dateString);
      };
    const UpdateDriver = async (driverId) => {
        try {
            const data = await axios.post(`${Baseurl}driver/update-driver`,
                {
                    nama: NamaDriverValue,
                    id: driverId,
                    nik: NIKValue,
                    no_ktp: NoKTPValue,
                    no_sim: NoSIMValue,
                    divisi: DivisiValue,
                    jenis_sim: JenisSIMValue,
                    alamat: AlamatValue,
                    tgl_lahir: TanggalLahirValue,
                    agama: AgamaValue,
                    notelp: NoTelpValue,
                    notelp2: Notelp2Value,
                    email: EmailValue,
                    tgl_masuk: TanggalMasukValue,
                    tgl_sim: TanggalSIMValue,
                    vehicle_type: VehicleTypeValue,
                    jenis_kepemilikan: JenisKepemilikanValue,
                    uk_seragam: UkuranSeragamValue,
                    rekening_bank: RekeningBankValue,
                    rekening_norek: NoMorRekeningValue


                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    }
                });

            Swal.fire({
                icon: 'success',
                title: 'Sukses',
                text: 'Data driver berhasil diperbarui.'
            });
            handleClose()
        } catch (error) {
            // Menampilkan SweetAlert error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan saat memperbarui data driver.'
            });
        }
    }
    const onFinish = (values) => {
        console.log('Success:', values);
        UpdateDriver(DriverId)
        // Lalu Anda bisa menggunakan fungsi update driver Anda di sini
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    console.log(`setNamaDriverValue`, NamaDriverValue);

    const UploadGambar = async (file) => {
        const formData = new FormData();
        formData.append('cover', file);
        formData.append('id', DriverId);

        try {
            const response = await axios.post(
                `${Baseurl}driver/upload-driver-photo`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            // Handle response here
            console.log(response.data);

            return response; // return response

        } catch (error) {
            console.error(error);
        }
    }


    const onChange = info => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            setdriverImage(URL.createObjectURL(info.file.originFileObj));
        } else if (info.file.status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
        }
    };


    const TipeKendaraanOptions = TipeKendaraan.map((item) => ({
        label: item.tipe
    }))


    const jenisKepemilikanOptions = jenisKepemilikan.map((item) => ({
        label: item.jenis
    }))
    const UkuranSeragamOptions = UkuranSeragam.map((item) => ({
        label: item.ukuran
    }))

    const JenisSimOptions = JenisSim && JenisSim.map((item) => ({
        label: item.Jenis
    }))

    const onShowSizeChange = (page, pageSize) => {
        ApiAwal(page)
    };



    // Create Driver
    const CreateDriver = async (file) => {
        const formData = new FormData();
        formData.append('cover', driverImage);
        formData.append('nama', NamaDriverValue);
        formData.append('divisi', DivisiValue);
        formData.append('no_ktp', NoKTPValue);
        formData.append('no_sim', NoSIMValue);
        formData.append('vehicle_type', VehicleTypeValue);
        formData.append('jenis_sim', JenisSIMValue);
        formData.append('alamat', AlamatValue);
        formData.append('tgl_lahir', TanggalLahirValue);
        formData.append('agama', AgamaValue);
        formData.append('notelp', Notelp2Value);
        formData.append('notelp2', Notelp2Value);
        formData.append('tgl_masuk', TanggalMasukValue);
        formData.append('uk_seragam', UkuranSeragamValue);
        formData.append('nik', NIKValue);
        formData.append('email', EmailValue);
        formData.append('jenis_kepemilikan', JenisKepemilikanValue);
        try {
            const data = await axios.post(`${Baseurl}driver/create-driver`, formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    }
                })
        } catch (error) {

        }
    }

    return (
        <div>
            <Card>
                <Button size='sm' onClick={() => {
                    showModal()
                    setNamaDriverValue(null)
                    setNIKValue(null)
                    setNoKTPValue(null)
                    setDivisiValue(null)
                    setNoSIMValue(null)
                    setJenisSIMValue(null)
                    setAlamatValue(null)
                    setTanggalLahirValue(null)
                    setAgamaValue(null)
                    setNoTelpValue(null)
                    setNotelp2Value(null)
                    setEmailValue(null)
                    setTanggalMasukValue(null)
                    setTanggalSIMValue(null)
                    setVehicleTypeValue(null)
                    setJenisKepemilikanValue(null)
                    setUkuranSeragamValue(null)
                    setRekeningBankValue(null)
                    setNoMorRekeningValue(null)
                    setdriverImage(null)

                }}>Add Driver</Button>
                <Modal show={show} size='lg' onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            form={form}
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues={{
                                alamat: AlamatValue // Mengisi initialValues dengan nilai dari state AlamatValue
                            }}
                        >
                            <Row>
                                <Col sm={4}>
                                    <Card>
                                        <img src={driverImage} style={{ width: "200px" }} alt="driver" />
                                        <Form.Item
                                            name="upload"
                                            label="Upload File"
                                            valuePropName="fileList"
                                            rules={[{ required: true, message: 'Silahkan upload file!' }]}
                                        >
                                            <br />
                                            <Upload
                                                name="logo"
                                                customRequest={({ file }) => UploadGambar(file)}
                                                onChange={onChange}
                                                listType="picture"
                                            >
                                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                                            </Upload>
                                        </Form.Item>
                                    </Card>
                                </Col>
                                <Col sm={4}>
                                    <Form.Item
                                        label="NIK"
                                        rules={[{ required: true, message: 'Masukkan NIK!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={NIKValue} onChange={(e) => setNIKValue(e.target.value)} placeholder="Masukkan NIK" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Nama Driver"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}

                                    >
                                        <Input value={NamaDriverValue} onChange={(e) => setNamaDriverValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="No KTP"
                                        rules={[{ required: true, message: 'Masukkan NO KTP Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={NoKTPValue} onChange={(e) => setNoKTPValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Divisi"
                                        rules={[{ required: true, message: 'Masukkan Divisi Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={DivisiValue} onChange={(e) => setDivisiValue(e.target.value)} placeholder="Masukkan Divisi Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="No SIM"
                                        rules={[{ required: true, message: 'Masukkan No SIM!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={NoSIMValue} onChange={(e) => setNoSIMValue(e.target.value)} placeholder="Masukkan No SIM" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Jenis SIM"
                                        // name="jenissim"
                                        rules={[{ required: true, message: 'Masukkan Jenis SIM!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        {/* <Input value={JenisSIMValue} onChange={(e) => setJenisSIMValue(e.target.value)} placeholder="Masukkan No SIM" /> */}
                                        <Select value={JenisSIMValue} placeholder={JenisSIMValue} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Alamat"
                                        // name="alamat"
                                        rules={[{ required: true, message: 'Masukkan Alamat Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input
                                            value={AlamatValue} // Menggunakan nilai alamat dari state
                                            onChange={(e) => setAlamatValue(e.target.value)} // Mengubah nilai alamat dalam state
                                            placeholder="Masukkan Alamat Driver"
                                        />
                                    </Form.Item>


                                    <Form.Item
                                        label="Tanggal Lahir"
                                        // name="tgllahir"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={TanggalLahirValue} onChange={(e) => setTanggalLahirValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Agama"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={AgamaValue} onChange={(e) => setAgamaValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                </Col>
                                <Col sm={4}>
                                    <Form.Item
                                        label="No Telp"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={NoTelpValue} onChange={(e) => setNoTelpValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="No Telp2"

                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={Notelp2Value} onChange={(e) => setNotelp2Value(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={EmailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Tanggal Masuk"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={TanggalMasukValue} onChange={(e) => setTanggalMasukValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Tanggal SIM"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={TanggalSIMValue} onChange={(e) => setTanggalSIMValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Vehicle Type"
                                        rules={[{ required: true, message: 'Masukkan Vehicle Type!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Select placeholder={VehicleTypeValue} options={TipeKendaraanOptions} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Jenis Kepemilikan"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Select placeholder={JenisKepemilikanValue} options={jenisKepemilikanOptions}
                                            onChange={(options) => {
                                                setJenisKepemilikanValue(options.label)
                                                console.log(jenisKepemilikan)
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Ukuran Seragam"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={UkuranSeragamValue} onChange={(e) => setUkuranSeragamValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Rekening Bank"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={RekeningBankValue} onChange={(e) => setRekeningBankValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Nomor Rekening"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={NoMorRekeningValue} onChange={(e) => setNoMorRekeningValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {
                            form.submit();
                            UpdateDriver(DriverId);
                        }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Add Driver */}    

                <Modal
        title="Basic Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: true,
        }}
        cancelButtonProps={{
          disabled: true,
        }}
      >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            form={form}
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues={{
                                alamat: AlamatValue // Mengisi initialValues dengan nilai dari state AlamatValue
                            }}
                        >
                            <Row>
                                <Col sm={4}>
                                    <Card>
                                        <img src={driverImage} style={{ width: "200px" }} alt="driver" />
                                        <Form.Item
                                            name="upload"
                                            label="Upload File"
                                            valuePropName="fileList"
                                            rules={[{ required: true, message: 'Silahkan upload file!' }]}
                                        >
                                            <br />
                                            <Upload
                                                name="logo"
                                                customRequest={({ file }) => setdriverImage(file)}
                                                onChange={onChange}
                                                listType="picture"
                                            >
                                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                                            </Upload>
                                        </Form.Item>
                                    </Card>
                                </Col>
                                <Col sm={4}>
                                    <Form.Item
                                        label="NIK"
                                        rules={[{ required: true, message: 'Masukkan NIK!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={NIKValue} onChange={(e) => setNIKValue(e.target.value)} placeholder="Masukkan NIK" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Nama Driver"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}

                                    >
                                        <Input value={NamaDriverValue} onChange={(e) => setNamaDriverValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="No KTP"
                                        rules={[{ required: true, message: 'Masukkan NO KTP Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={NoKTPValue} onChange={(e) => setNoKTPValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Divisi"
                                        rules={[{ required: true, message: 'Masukkan Divisi Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={DivisiValue} onChange={(e) => setDivisiValue(e.target.value)} placeholder="Masukkan Divisi Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="No SIM"
                                        rules={[{ required: true, message: 'Masukkan No SIM!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={NoSIMValue} onChange={(e) => setNoSIMValue(e.target.value)} placeholder="Masukkan No SIM" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Jenis SIM"
                                        // name="jenissim"
                                        rules={[{ required: true, message: 'Masukkan Jenis SIM!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Select options={JenisSimOptions} onChange={(option) => setJenisSIMValue(option.label)} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Alamat"
                                        // name="alamat"
                                        rules={[{ required: true, message: 'Masukkan Alamat Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input
                                            value={AlamatValue} // Menggunakan nilai alamat dari state
                                            onChange={(e) => setAlamatValue(e.target.value)} // Mengubah nilai alamat dalam state
                                            placeholder="Masukkan Alamat Driver"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Tanggal Lahir"
                                         require={true}
                                        rules={[{ required: true, message: 'Masukkan Tanggal Lahir!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                           <Space direction="hotizontal" >
                                     <DatePicker onChange={onChange} style={{zIndex:99999999999999999999999999, display:'-ms-inline-flexbox'  }} />
  
  </Space>  
                                        {/* <DatePicker onChange={(date, dateString) => setTanggalLahirValue(dateString)} /> */}
                                    </Form.Item>
                                    <Form.Item
                                        label="Agama"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={AgamaValue} onChange={(e) => setAgamaValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                </Col>
                                <Col sm={4}>
                                    <Form.Item
                                        label="No Telp"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={NoTelpValue} onChange={(e) => setNoTelpValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="No Telp2"

                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={Notelp2Value} onChange={(e) => setNotelp2Value(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={EmailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Tanggal Masuk"
                                        rules={[{ required: false, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}

                                    >
                                        <Input value={TanggalMasukValue} onChange={(e) => setTanggalMasukValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Tanggal SIM"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={TanggalSIMValue} onChange={(e) => setTanggalSIMValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Vehicle Type"
                                        rules={[{ required: true, message: 'Masukkan Vehicle Type!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Select options={TipeKendaraanOptions} onChange={(value) => setVehicleTypeValue(value.label)} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Jenis Kepemilikan"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Select options={jenisKepemilikanOptions}
                                            onChange={(options) => setJenisKepemilikanValue(options.label)} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Ukuran Seragam"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Select options={UkuranSeragamOptions} onChange={(options) => setUkuranSeragamValue(options.label)} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Rekening Bank"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={RekeningBankValue} onChange={(e) => setRekeningBankValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Nomor Rekening"
                                        rules={[{ required: true, message: 'Masukkan Nama Driver!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input value={NoMorRekeningValue} onChange={(e) => setNoMorRekeningValue(e.target.value)} placeholder="Masukkan Nama Driver" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {
                            form.submit();
                            CreateDriver();
                            UploadGambar()
                        }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Row>
                    <DataTable
                        columns={columns}
                        data={DataAwal}
                    />
                    <div className='mt-3 d-flex justify-content-end'>

                        <Pagination
                            showSizeChanger
                            onChange={onShowSizeChange}
                            defaultCurrent={1}
                            total={500}
                        />
                    </div>
                </Row>
            </Card>
        </div>
    )
}

export default DriverTableBaru