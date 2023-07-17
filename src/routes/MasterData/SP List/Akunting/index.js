import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import Baseurl from '../../../../Api/BaseUrl';
import { Card, Tag, Pagination } from 'antd';
import { Button, Row, Form, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Index() {
    const [DataAwal, setDataAwal] = useState([]);
    const [Loading, Isloading] = useState(false)
    const [search, setSearch] = useState("")
    // const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(20);


    const history = useHistory()
    const fetchData = async (page = 1) => {
        Isloading(true)
        try {
            const response = await axios.get(`${Baseurl}sp/get-SP-akunting?limit=10&page=${page}&keyword=${search}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            setDataAwal(response.data.data.order);
            // setTotalRows(response.data.totalPage * 10); 
            Isloading(false)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [search]);
    let limit = 1
    const columns = [
        {
            name: "No",
            selector: (row, index) => limit++,
            width: "50px",
            wrap: true,
        },
        {
            name: "SP ID",
            selector: (row) => row.sp,
            width: "200px",
            wrap: true,
        },
        {
            name: "Perusahaan",
            selector: (row) => row.perusahaan,
            width: "200px",
            wrap: true,
        },
        {
            name: "Service",
            selector: (row) => row.service,
            width: "150px",
            wrap: true,
        },
        {
            name: "sales Name",
            selector: (row) => row.salesName,
            width: "150px",
            wrap: true,
        },
        {
            name: "Pickup Date",
            selector: (row) => new Date(row.pickupDate).toLocaleDateString('en-CA'),
            width: "150px",
            wrap: true,
        },
        {
            name: "Approve By Akunting",
            cell: (row) => {
                const approveact = row.approveAct;
                const dateApproveAct = row.dateApproveAct;
                let displayText =
                    approveact === "Y" && dateApproveAct !== "Invalid date" ? (
                        <Tag color="green">
                            Approve <br /> <small>{dateApproveAct}</small>
                        </Tag>
                    ) : approveact === "N" && dateApproveAct === "Invalid date" ? (
                        <Tag color="yellow">
                            Waiting <br /> <small>{dateApproveAct}</small>
                        </Tag>
                    ) : (
                        <Tag color="red">
                            Diverted <br /> <small>{dateApproveAct}</small>
                        </Tag>
                    );

                return <>{displayText}</>;
            },
            width: "250px",
        },

    ];

    const buttonarahin = (row) => {
        history.push(`/masterdata/splistdetailakunting/${row.idmp}`);
    };

    const handlePageChange = (page) => {
        fetchData(page);
    }




    return (
        <div>
            <Card>
                <Row>
                    <div className="d-flex justify-content-end">
                        <Col sm={3}>
                            <Form.Control
                                type="text"
                                placeholder="No SP "
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />
                        </Col>
                    </div>
                </Row>
                <Col>
                    {Loading ? "loading gan" : (
                        <DataTable
                            columns={columns}
                            data={DataAwal}
                            onChangePage={handlePageChange}
                            paginationTotalRows={totalRows}
                            onRowClicked={buttonarahin}
                        />

                    )}
                    <div className='d-flex justify-content-end mt-3'>
                        <style>
                            {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: #C7E1FB;
          }
          
        `}
                        </style>
                        <Pagination
                            showSizeChanger
                            // onShowSizeChange={onShowSizeChange}
                            onChange={handlePageChange}
                            defaultCurrent={1}
                            total={500}
                        />
                    </div>
                </Col>
            </Card>

        </div>
    );
}

export default Index;
