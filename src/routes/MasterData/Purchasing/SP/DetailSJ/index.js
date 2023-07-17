import { message, Card, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Button, Form, Input } from 'antd';
import gambarorang from "./employee (1).png"
import axios from 'axios';
import Baseurl from '../../../../../Api/BaseUrl';
import ZustandStore from '../../../../../zustand/Store/JenisKepemilikanOptions';

function Index() {
    const { id } = useParams()
    const onFinish = (values) => {
        console.log('Success:', values);
        message.success(`berhasil`)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const { DriverType, setDriverType } = ZustandStore((item) => ({
        DriverType: item.DriverType,
        setDriverType: item.setDriverType
    }))

    const DriverOptions = DriverType && DriverType.map((item)=>({
        label : item.tipe,
        value : item.id
    }))

    const [DataDetail, setDataDetail] = useState("")
    const DataDetailSM = async () => {
        const data = await axios.get(`${Baseurl}sm/get-sm-detail?id_msm=${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        }
        );
        console.log(`data`, data.data.data);
        setDataDetail(data.data.data?.[0])
    }

    useEffect(() => {
        DataDetailSM()
        setDriverType()
    }, [])
    if (!DataDetail) {
        return "Memuat data...";
    }
    return (
        <>
            <Card>

                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}

                    initialValues={DataDetail}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Row>
                        <h5>Detail SM</h5>
                        <Form.Item
                            wrapperCol={{
                                offset: 24,
                                span: 24,
                            }}
                            style={{ textAlign: 'end' }}
                        >
                            <div className="tombol">
                                <Button style={{ backgroundColor: "#00a65a", color: "white" }} htmlType="submit">
                                    Submit
                                </Button>
                                <Button type="primary" >
                                    Print SM
                                </Button>
                                <Button style={{ backgroundColor: "#3c8dbc", color: "white" }} >
                                    Tambah SM
                                </Button>
                                <Button type="danger" >
                                    Batal SM
                                </Button>
                            </div>

                        </Form.Item>
                        <Col sm={2}>

                            <Form.Item
                                label="No.SP"
                                name="noSp"
                                rules={[
                                    {
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                label="No. SM"
                                name="noSm"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Do"
                                name="DO"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                        </Col>
                        <Col sm={3}>

                            <Form.Item
                                label="Service"
                                name="service"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                label="Customer"
                                name="customer"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Pickup Date"
                                name="pickupDate"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Pickup Address"
                                name="pickupAddress"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Destination Address"
                                name="destinationAddress"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Row>
                                <Col sm={3}>
                                    <Form.Item
                                        labelCol={{
                                            span: 24,
                                        }}
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                        label="Weight"
                                        name="weight"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col sm={3}>
                                    <Form.Item
                                        labelCol={{
                                            span: 24,
                                        }}
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                        label="Koli"
                                        name="koli"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col sm={3}>
                                    <Form.Item
                                        label="Exp/pcs"
                                        labelCol={{
                                            span: 24,
                                        }}
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                        name="expPcs"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col sm={3}>
                                    <Form.Item
                                        label="Items"
                                        name="items"
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Col>

                        <Col sm={3}>

                            <Card style={{ width: "100%", height: 260 }}>
                                <img width="100%" src={gambarorang}></img>
                            </Card>


                        </Col>
                        <Col style={{ width: "75%", marginTop: -85 }} sm={8}>
                            <Form.Item
                                label="Memo"
                                name="memo"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: "75%" }} sm={8}>
                            <Form.Item
                                label="Destination Address"
                                name="destinationAddress"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Select />
                            </Form.Item>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Kendaraan Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Select />
                            </Form.Item>
                            <Form.Item
                                label="Jenis Kendaraan Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                                
                            >
                                <Select
                                showSearch
                                placeholder="Jenis Kendaraan PickUp"
                                optionFilterProp='label'
                                options={DriverOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Kode Kendaraan Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Nopol Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Supir Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Hp Supir Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Kendaraan Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Select />
                            </Form.Item>
                            <Form.Item
                                label="Jenis Kendaraan Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Select
                                showSearch
                                placeholder="Jenis Kendaraan PickUp"
                                optionFilterProp='label'
                                options={DriverOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Kode Kendaraan Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Nopol Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Supir Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Hp Supir Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Kendaraan Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Select />
                            </Form.Item>
                            <Form.Item
                                label="Jenis Kendaraan Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Select
                                showSearch
                                placeholder="Jenis Kendaraan PickUp"
                                optionFilterProp='label'
                                options={DriverOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Kode Kendaraan Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Nopol Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Supir Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Hp Supir Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr />
                </Form>


            </Card>
        </>
    )
}

export default Index
