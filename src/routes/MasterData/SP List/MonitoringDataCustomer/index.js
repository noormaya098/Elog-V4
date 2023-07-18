import { Card, Modal, Button } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Baseurl from '../../../../Api/BaseUrl'

function Index() {

    const [DataAwal, setDataAwal] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (row) => {
        setSelectedOrder(row);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const columns = [
        {
            name: "No",
            selector: (row) => row?.no,
            width: "80px",
            wrap: true,
        },
        {
            name: "Customer",
            selector: (row) => row?.customer,
            wrap: true,
        },
        {
            name: "Total Pesanan",
            selector: (row) => row?.totalPesanan,
            wrap: true,
        },
        {
            name: "Total Terlayani",
            selector: (row) => row?.totalTerlayani,
            wrap: true,
        },
    ]


    const dataAwal = async () => {
        const data = await axios.get(`${Baseurl}monitoring/get-datapesanan-customer?page=1&limit=10&keyword=`, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }
        )
        setDataAwal(data.data.data.order)
        // setDataLanjutan(data.data.data.order?.last_ten_order)
        console.log(`ini data`, data.data);
    }

    useEffect(() => {
        dataAwal()
    }, [])

    const RowClick = (row) => {
        showModal()
    }

    let number = 1
    return (
        <>
            <Card>
                <Row>
                    <Col>
                        <Modal
                            width="800px"
                            title="10 Terakhir Order"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}>
                            {
                                selectedOrder && selectedOrder.last_ten_order &&
                                <table style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>No SP</th>
                                            <th>Sales</th>
                                            <th>Service</th>
                                            <th>Jenis Barang</th>
                                        </tr>
                                    </thead>
                                    <br />
                                    <tbody>
                                        {selectedOrder.last_ten_order.map((order, index) => (
                                            <tr key={index}>
                                                <td>{number++}</td>
                                                <td>{order.noSp}</td>
                                                <td>{order.sales}</td>
                                                <td>{order.service}</td>
                                                <td>{order.jenisBarang}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            }
                        </Modal>

                        <style>
                            {`
                                .rdt_TableBody .rdt_TableRow:hover {
                                    cursor: pointer;
                                    background-color: #C7E1FB;
                                }
                                table tbody tr:hover {
                                    background-color: #f2f2f2;
                                    cursor: pointer;
                                }
                            `}
                             
                        </style>
                        <DataTable columns={columns} data={DataAwal} onRowClicked={showModal} />
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default Index