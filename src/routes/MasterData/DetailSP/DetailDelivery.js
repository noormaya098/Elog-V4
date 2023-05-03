import React from "react";
import { Table } from "react-bootstrap";

function DetailDelivery() {
  return (
    <div>
      <Table responsive hover striped bordered>
        <thead>
          <tr style={{ fontWeight: "bold" }}>
            <th>No.</th>
            <th>Coment</th>
            <th>User</th>
            <th>Tgl Coment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default DetailDelivery;
