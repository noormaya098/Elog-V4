import React from "react";
import { Button, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
function PIC({mitraId}) {
  const columns = [
    {
      name: "No",
      selector: (row) => row.id,
    },
    {
      name: "Nama",
      selector: (row) => row.year,
    },
    {
      name: "Email",
      selector: (row) => row.year,
    },
    {
      name: "Telp",
      selector: (row) => row.year,
    },
    {
      name: "jabatan",
      selector: (row) => row.year,
    },
    {
      name: "Aksi",
      selector: (row) => <><Button size="sm" variant="primary">Detail</Button><Button size="sm" variant="danger">Hapus</Button></>
    },
  ];

  const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
  ]
  return (
    <div>
      <Row>
        <b>DATA PENANGGUNG JAWAB (Person In Charge)</b>
        <DataTable columns={columns} data={data} />
      </Row>
    </div>
  );
}

export default PIC;
