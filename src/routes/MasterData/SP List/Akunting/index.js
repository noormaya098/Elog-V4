import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import Baseurl from '../../../../Api/BaseUrl';
import { Card, Tag } from 'antd';
import { Button, Row, Form, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Index() {
    const [DataAwal, setDataAwal] = useState([]);
    const [Loading, Isloading] = useState(false)
    const[search , setSearch] = useState("")
    const [page, setPage] = useState(1);  
    const [totalRows, setTotalRows] = useState(20);


    const history = useHistory()
    const fetchData = async () => {
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
    }, [search , page]);
// const limit = 10
    const columns = [
        {
            name: "No",
            selector: (row, index) => row.no +1,
            width: "50px",
            wrap: true,
        },
        {
            name: "SP ID",
            selector: (row) => row.sp,
            width: "150px",
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
            width: "100px",
            wrap: true,
        },
        {
            name: "sales Name",
            selector: (row) => row.salesName,
            width: "100px",
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
            width: "150px",
        },
        {
            name: "Detail",
            selector: (row) => (
                <Button size="sm" onClick={() => buttonarahin(row?.idmp)}>
                    Detail
                </Button>
            ),
        },
        //   {
        //     name: "Approve By Ops",
        //     selector: (row) => {
        //       const approveact = row.approveOps;
        //       const dateApproveAct = row.dateApproveOps;
        //       let displayText =
        //         approveact === "Y" && dateApproveAct !== "Invalid date" ? (
        //           <Tag color="green">
        //             Approve <br /> <small>{dateApproveAct}</small>
        //           </Tag>
        //         ) : approveact === "N" && dateApproveAct === "Invalid date" ? (
        //           <Tag color="yellow">
        //             Waiting <br /> <small>{dateApproveAct}</small>
        //           </Tag>
        //         ) : (
        //           <Tag color="red">
        //             Diverted <br /> <small>{dateApproveAct}</small>
        //           </Tag>
        //         );

        //       return <>{displayText}</>;
        //     },
        //     width: "150px",
        //   },
        //   {
        //     name: "Approve By Purchasing",
        //     selector: (row) => {
        //       const approveact = row.approvePurch;
        //       const dateApproveAct = row.dateApprovePurch;
        //       let displayText =
        //         approveact === "Y" && dateApproveAct !== "Invalid date" ? (
        //           <Tag color="green">
        //             Approve <br /> <small>{dateApproveAct}</small>
        //           </Tag>
        //         ) : approveact === "N" && dateApproveAct === "Invalid date" ? (
        //           <Tag color="yellow">
        //             Waiting <br /> <small>{dateApproveAct}</small>
        //           </Tag>
        //         ) : (
        //           <Tag color="red">
        //             Diverted <br /> <small>{dateApproveAct}</small>
        //           </Tag>
        //         );

        //       return <>{displayText}</>;
        //     },
        //     width: "150px",
        //   },
    ];

    const buttonarahin = (idmp) => {
        console.log(`klik dong`, idmp);
        history.push(`/masterdata/purchasing/detailsp/${idmp}`);
    };

    const handlePageChange = page => {
        setPage(page);
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
                        <DataTable columns={columns} data={DataAwal} 
                        pagination // activate pagination
                        paginationServer // pagination on server side
                        onChangePage={handlePageChange} // handle page change
                        paginationTotalRows={totalRows} // total number of rows
                        />
                    )}
                </Col>
            </Card>
        </div>
    );
}

export default Index;
