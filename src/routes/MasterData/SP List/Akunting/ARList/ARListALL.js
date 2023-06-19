import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Baseurl from '../../../../../Api/BaseUrl';
import { Pagination } from 'antd';
import { defaultThemes } from 'react-data-table-component';

function ARListALL() {
    const [DataAwal, setDataAwal] = useState([])
    const [TotalData, setTotalData] = useState('')
    const [TotalPage, setTotalPage] = useState('')
    const [selectedRow, setSelectedRow] = useState(null);
    const columns = [
        {
            name: 'No',
            selector: row => row.no,
            width: '80px'
        },
        {
            name: 'Mount',
            selector: row => row.mount,
        },
        {
            name: 'ARID',
            selector: row => row.arid,
        },
        {
            name: 'Customer',
            selector: row => row.customer,
        },
        {
            name: 'Partner',
            selector: row => row.mount,
        },
        {
            name: 'Via',
            selector: row => row.mount,
        },
        {
            name: 'Invoice Date',
            selector: row => row.invoiceDate,
        },
        {
            name: 'Invoice Crate',
            selector: row => row.mount,
        },
        {
            name: 'Delivered Date',
            selector: row => row.DeliveredDate,
        },
        {
            name: 'PPN',
            selector: row => row.PPN,
        },
        {
            name: 'Invoice Amount',
            selector: row => row.InvoiceAmount,
        },
        {
            name: 'Detail',
            selector: row => row.Detail,
        },
    ];
    const handleRowClicked = (row) => {
        setSelectedRow(row);
        alert(`Clicked: ` + (row.no));
    }

    
    const ApiAwal = async (page = 1) => {
        try {
            const data = await axios.get(`${Baseurl}ar/get-AR-List?limit=10&page=${page}&keyword=`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                }
            });
            setDataAwal(data.data.data.order)
            setTotalData(data.data.data.totalData)
            setTotalPage(data.data.data.totalPage)

            console.log(TotalData);
        } catch (error) {
            // Handle the error or display an error message
            console.error(error);
        }
    };

    useEffect(() => {
        ApiAwal(1)
    }, [])

    const ubahpagination = (page) => {
        ApiAwal(page)
      
    }

   

      
    return (
        <div>
            <DataTable
                columns={columns}
                title="AR List All"
                data={DataAwal}
                // selectableRows
			// persistTableHead
            highlightOnHover
            onRowClicked={handleRowClicked}
            />
            <div className='d-flex mt-3 justify-content-end'>

                <Pagination
                    showSizeChanger
                    onRowClicked={handleRowClicked}
                    onChange={ubahpagination}
                    defaultCurrent={1}
                    total={TotalData}
                    highlightOnHover
                />
            </div>
        </div>
    )
}

export default ARListALL