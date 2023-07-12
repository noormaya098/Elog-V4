import axios from "axios";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import Baseurl from "../../../../../Api/BaseUrl";

function Report() {
  const columns = [
    {
      name: "No",
      selector: (row) => row.title,
      width: "50px"
    },
    {
      name: "Bulan",
      selector: (row) => row.month,
      width: "100px"
    },
    {
      name: "Penjualan 2018",
      selector: (row) => row.sales2018,
    },
    {
      name: "Penjualan 2019",
      selector: (row) => row.sales2019,
    },
  ];

  const columnsx = [
    {
      cell: (row) => (
        <div>
          <span>{row.month}</span>
        </div>
      ),
    },
    {
      cell: (row) => (
        <div>
          <span>{row.sales2018}</span>
        </div>
      ),
    },
    {
      cell: (row) => (
        <div>
          <span>{row.sales2019}</span>
        </div>
      ),
    },
    {
      cell: (row) => (
        <div>
          <span>{row.sales2019}</span>
        </div>
      ),
    },
  ];


  const data = [
    { title: 1, month: "Januari", sales2018: 100, sales2019: 120 },
    { title: 2, month: "Februari", sales2018: 110, sales2019: 130 },
    { title: 3, month: "Maret", sales2018: 120, sales2019: 140 },
    { title: 4, month: "April", sales2018: 130, sales2019: 150 },
    { title: 5, month: "Mei", sales2018: 140, sales2019: 160 },
    { title: 6, month: "Juni", sales2018: 150, sales2019: 170 },
    { title: 7, month: "Juli", sales2018: 160, sales2019: 180 },
    { title: 8, month: "Agustus", sales2018: 170, sales2019: 190 },
    { title: 9, month: "September", sales2018: 180, sales2019: 200 },
    { title: 10, month: "Oktober", sales2018: 190, sales2019: 210 },
    { title: 11, month: "November", sales2018: 200, sales2019: 220 },
    { title: 12, month: "Desember", sales2018: 210, sales2019: 230 },
  ];

  const totalData = {
    month: "Total",
    sales2018: "-",
    sales2019: "-",
    sales2019: "-",
  };

  return (
    <div>
      <DataTable columns={columns} data={data} />
      <DataTable columns={columnsx} data={[totalData]} noHeader />
    </div>
  );
}

export default Report;
