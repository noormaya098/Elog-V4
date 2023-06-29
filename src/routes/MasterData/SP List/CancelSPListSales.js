import { Card, Input, Pagination } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import Baseurl from '../../../Api/BaseUrl';

function CancelSPListSales() {
    const [DataAwal, setDataAwal] = useState("")
    const [CariSP , setCariSP] = useState("")

    const columns = [
        {
            name: 'no',
            selector: row => row.no,
        },
        {
            name: 'sp',
            selector: row => row.sp,
        },
        {
            name: 'Message',
            selector: row => row.massage,
        },
    ];

    const DataApiAwal = async (page = 1) => {
        try {
            const data = await axios.get(`${Baseurl}sp/get-list-cancel-do?limit=10&page=${page}&keyword=${CariSP}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token")
                    },

                }
            )
            setDataAwal(data.data.data.order)
        } catch (error) {

        }
    }

    useEffect(() => {
        DataApiAwal()
    }, [CariSP])
    const onPaginationChange = (page) => {
        DataApiAwal(page)
    }

    return (
        <div>
            <Card>
                <div className='d-flex justify-content-end'>
                    <Row>
                        <Col sm={6}>
                            <Input style={{width : "100%"}}
                                placeholder='Cari SP'
                                onChange={(e)=>setCariSP(e.target.value)}
                            />
                        </Col>
                    </Row>
                </div>
                <Row>
                    <DataTable
                        columns={columns}
                        data={DataAwal}
                        title="Reject SP Sales"
                    />
                    <div className='mt-3 d-flex justify-content-end'>

                        <Pagination
                            showSizeChanger
                            onChange={onPaginationChange}
                            // defaultPageSize={10}
                            size="default"
                            total={"200"}
                            defaultCurrent={1}
                        />
                    </div>
                </Row>
            </Card>
        </div>
    )
}

export default CancelSPListSales