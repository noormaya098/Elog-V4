import { Card } from 'antd';
import React from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import DetailFormAR from './DetailFormAR';

function DetailAR() {
    const { no } = useParams();
    return (
        <>
            <Card>
            {/* <Button variant="primary">Print Lainnya</Button>{' '}
            <Button variant="danger">Ubah Jadi NBP</Button>{' '}
            <Button variant="warning">Buat Addon Invoice</Button>{' '}
            <Button variant="success">Export To Jurnal.id (ELOGS)</Button>{' '}
            <Button variant="info">Print Format Jurnal.id (ELOGS)</Button>{' '}
            <Button variant="primary">Print BP</Button>{' '} */}
                <Row>
                    <Col sm={1} style={{marginRight: "20px"}}>
                        <Button size='sm'>Print Lainnya</Button>
                    </Col>
                    <Col sm={1} style={{marginRight: "30px"}}>
                        <Button size='sm' variant='danger'>Ubah Jadi NBP</Button>
                    </Col>
                    <Col sm={2} >
                        <Button size='sm' variant='warning'>Buat Addon Invoice</Button>
                    </Col>
                    <Col sm={2} style={{marginLeft: "-20px", marginRight: "20px"}}>
                        <Button size='sm' variant='success'>Export To Jurnal.id (ELOGS)</Button>
                    </Col>
                    <Col sm={2} style={{marginRight: "30px"}}>
                        <Button size='sm' variant='info'>Print Format Jurnal.id (ELOGS)</Button>
                    </Col>
                    <Col sm={2}  style={{marginLeft: "10px"}}>
                        <Button size='sm' variant='primary'>Print BP</Button>
                    </Col>
                </Row>
                <DetailFormAR no={no} />
            </Card>
        </>
    )
}

export default DetailAR