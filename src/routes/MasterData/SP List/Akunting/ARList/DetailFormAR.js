import React from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function DetailFormAR({no}) {
    const EditARHalaman = () => {
        history.push(`/akunting/ar/edits/:${no}`)
    }
    const history = useHistory()
 
 
 
    return (
        <div>
            <Row>
                <Col sm={2}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>No.AR:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={2}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>Service:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={3}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>No Faktur Pajak(Trial):</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={2}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>PIC:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={3}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>Created Date:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>Customer:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={5}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>Alamat Invoice:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={3}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>Via:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>Mitra Name:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={2}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>Top:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={2}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>PPH %:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={2}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>PPN %:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={3}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label><strong>Memo:</strong></Form.Label>
                            <Form.Control type="text" placeholder="No AR" disabled />
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
                    <Col sm={1}>
                        <Button className='d-flex justify-content-end' variant='success' onClick={EditARHalaman} >EDIT</Button>
                    </Col>
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
                        <td>@mdo</td>
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
        </div>
    )
}

export default DetailFormAR