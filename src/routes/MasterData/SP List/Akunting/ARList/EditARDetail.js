import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import mobil from '../../../../redux toolkit/store/ZustandStore'
import Select from 'react-select'
import Baseurl from '../../../../../Api/BaseUrl'
import axios from 'axios'
import PenerimaanINV from './Payment/PenerimaanINV'
import useMitraStore from '../../../../../zustand/Store/MitraStore'; 

function EditARDetail() {
    // const [NamaMitra, setNamaMitra] = useState('')
    const NamaMitra = useMitraStore((state) => state.NamaMitra);
    const fetchMitra = useMitraStore((state) => state.fetchMitra);

    useEffect(() => {
        fetchMitra();
      }, [fetchMitra]);
    

    const MitraNameOptions = Array.isArray(NamaMitra) ? 
    NamaMitra.map((item) => ({
        label: item.NamaMitra,
        value: item.mitraId
    })) 
    : []; // Anda perlu menambahkan ekspresi untuk "jika salah". Dalam contoh ini, saya menggunakan array kosong.

    const via = ['laut', 'darat', 'udara'];



    return (
        <div>
            <Card>

                <Row>
                    <Col sm={8}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>No.AR:</strong></Form.Label>
                                <Form.Control type="text" placeholder="No AR" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={4}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>Created Date:</strong></Form.Label>
                                <Form.Control type="text" placeholder="No AR" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>Perusahaan:</strong></Form.Label>
                                <Form.Control type="text" placeholder="No AR" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={4}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>PIC: (kosongkan jika tidak perlu)</strong></Form.Label>
                                <Form.Control type="text" placeholder="No AR" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={4}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>Alamat Invoice:</strong></Form.Label>
                                <Form.Control type="text" placeholder="No AR" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>Mitra Name:</strong></Form.Label>
                                <Select options={MitraNameOptions}
                                placeholder="Select Nama Mitra"/>
                                {/* <Form.Control type="text" placeholder="No AR" /> */}
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={2}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>Via:</strong></Form.Label>
                                <Form.Select>

                                    <option>-</option>
                                {via.map((item)=>(
                                    <option>{item}</option>
                                ))}
                                </Form.Select>
                                {/* <Form.Control type="text" placeholder="No AR" /> */}
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={2}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>Top:</strong></Form.Label>
                                <Form.Control type="text" placeholder="No AR" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={2}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>PPN %:</strong></Form.Label>
                                <Form.Control type="text" placeholder="No AR" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={2}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>PPH %:</strong></Form.Label>
                                <Form.Control type="text" placeholder="No AR" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>Service:</strong></Form.Label>
                                <Form.Control type="text" placeholder="No AR" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={3}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>No SM:</strong></Form.Label>
                                <Form.Control type="text" placeholder="No AR" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={3}>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label><strong>No SM XTRA: akunting:</strong></Form.Label>
                                <Form.Control type="text" placeholder="No AR" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <div className='mt-4'>
                    <hr />
                    <Row>
                        <Col sm={11}>
                            <h5>List : Biaya Penjualan (BP)</h5>
                        </Col>
                        {/* <Col sm={1}>
                        <Button className='d-flex justify-content-end' variant='success' onClick={EditARHalaman} >EDIT</Button>
                    </Col> */}
                    </Row>
                </div>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th style={{ width: '150px' }}>SM</th>
                            <th>Via</th>
                            <th>TD</th>
                            <th>TBKapal</th>
                            <th>TA</th>
                            <th style={{ width: "200px" }}>SJ/DO</th>
                            <th>Koli</th>
                            <th>Exp</th>
                            <th>Kg</th>
                            <th>M3</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Operasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ height: "50px" }}>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>Operasi</td>
                            <td>
                                <Button size='sm' variant='success'>test</Button>
                                <Button size='sm' variant='danger'>test</Button>
                                </td>
                        </tr>
                        <tr>
                            <td colSpan={7} className='text-end'><strong>Total Pengiriman</strong></td>
                            <td><strong>2</strong></td>
                            <td><strong>2</strong></td>
                            <td><strong>2</strong></td>
                            <td><strong>2</strong></td>
                            <td><strong></strong></td>
                            <td><strong>2</strong></td>
                           
                        </tr>
                        <tr>
                            <td colSpan={11} className='text-end'><strong>Biaya Pengganti</strong></td>
                            <td><strong>2</strong></td>
                            <td><strong>2</strong></td>

                        </tr>
                        <tr>
                            <td colSpan={11} className='text-end'><strong>PPN 1.1%</strong></td>
                            <td><strong>2</strong></td>
                            <td><strong>2</strong></td>

                        </tr>
                        <tr>
                            <td colSpan={11} className='text-end'><strong>Total Keseluruhan</strong></td>
                            <td><strong>2</strong></td>
                            <td><strong>2</strong></td>

                        </tr>
                    </tbody>
                </Table>
            </Card>
        </div>

    )
}

export default EditARDetail