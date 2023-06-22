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
                <Row>
                    <Col sm={1} >
                        <Button size='sm'>Print Lainnya</Button>
                    </Col>
                    <Col sm={2}  className=''>
                        <Button size='sm' variant='danger'>Ubah Jadi NBP</Button>
                    </Col>
                    <Col sm={2} className='' >
                        <Button size='sm' variant='warning'>Buat Addon Invoice</Button>
                    </Col>
                    <Col sm={2}  className=''>
                        <Button size='sm' variant='success'>Export To Jurnal.id (ELOGS)</Button>
                    </Col>
                    <Col sm={3}  className=''>
                        <Button size='sm' variant='info'>Print Format Jurnal.id (ELOGS)</Button>
                    </Col>
                    <Col sm={2}  className=''>
                        <Button size='sm' variant='primary'>Print BP</Button>
                    </Col>
                </Row>
                <DetailFormAR no={no} />
            </Card>
        </>
    )
}

export default DetailAR