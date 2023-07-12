import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import { Button, Row, Col, Form, Modal } from 'react-bootstrap'
import { DatePicker, Space } from 'antd';
import Select from 'react-select';
import useMitraStore from '../../../../../../zustand/Store/MitraStore';
import DataTable from 'react-data-table-component';

function PenerimaanINV() {
    const NamaMitra = useMitraStore((state) => state.NamaMitra)
    const fetchMitra = useMitraStore((state) => state.fetchMitra);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { RangePicker } = DatePicker;
    console.log(`ini mitra NamaMitra`, NamaMitra)

    useEffect(() => {
        fetchMitra()
    }, [])

    const NamaMitraOptions = NamaMitra.map((item) => ({
        label: item.NamaMitra,
        value: item.mitraId
    }))

    const columns = [
        {
            name: 'No',
            selector: row => row.title,
        },
        {
            name: 'Invoice',
            selector: row => row.year,
        },
        {
            name: 'SM',
            selector: row => row.year,
        },
        {
            name: 'Mitra',
            selector: row => row.year,
        },
        {
            name: 'Tgl Muat SM',
            selector: row => row.year,
        },
        {
            name: 'Tgl Terima Barang ',
            selector: row => row.year,
        },
        {
            name: 'Tgl Terima Invoice',
            selector: row => row.year,
        },
        {
            name: 'Tgl Transfer',
            selector: row => row.year,
        },
        {
            name: 'AP',
            selector: row => row.year,
        },
        {
            name: 'AR',
            selector: row => row.year,
        },
        {
            name: 'Status',
            selector: row => row.year,
        },
        {
            name: 'Aksi',
            selector: row => row.year,
        },
    ];
    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]
    
    return (
        <div>
            <Card>
                <Row>
                    <Col sm={2}>
                        <Button className='mt-4' variant='success' onClick={handleShow}>Tambah</Button>
                    </Col>
                    <Col sm={4}>
                        <Form>
                            <Form.Group >
                                <Form.Label><strong>Tgl Terima Invoice:</strong></Form.Label>
                                <RangePicker />

                                {/* <Form.Control type="text" placeholder="No AR" /> */}
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={4}>
                        <Form>
                            <Form.Group >
                                <Form.Label><strong>Mitra:</strong></Form.Label>
                                <Select
                                    options={NamaMitraOptions}
                                    placeholder="Pilih Mitra"
                                />
                                {/* <Form.Control type="text" placeholder="No AR" /> */}
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={2}>
                        <Button className='mt-4' variant='primary'>Download</Button>
                    </Col>
                </Row>
            </Card>

            <Modal show={show} size='md' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Laporan Penerimaan Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group >
                                    <Form.Label><strong>No. Surat Muat</strong></Form.Label>
                                    <Form.Select type="text" placeholder="No AR">
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                            <Form className='mt-2'>
                                <Form.Group >
                                    <Form.Label><strong>No. Invoice</strong></Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                            </Form>

                            <Form className='mt-2'>
                                <Form.Group >
                                    <Form.Label><strong>Nama Mitra</strong></Form.Label>
                                    <Select options={NamaMitraOptions} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Form className='mt-2'>

                                <Form.Group >
                                    <Form.Label><strong>Tgl Terima Barang</strong></Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sm={6}>
                            <Form className='mt-2'>

                                <Form.Group >
                                    <Form.Label><strong>Tgl Terima Barang</strong></Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Form className='mt-2'>
                                <Form.Group >
                                    <Form.Label><strong>Memo</strong></Form.Label>
                                    <Form.Control style={{ height: "100px" }} type="text" />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Keluar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
            <DataTable
            columns={columns}
            data={data}
        />
        </div>
    )
}

export default PenerimaanINV