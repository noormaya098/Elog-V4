import React from "react";
import { Table } from "react-bootstrap";

function IsiItungan({ data }) {
  return (
    <div>
      {data &&
        data.map((isi, index) => (
          <Table key={index} responsive>
            <thead>
              <tr style={{ fontWeight: "bold", backgroundColor: "#dff0d8" }}>
                <td>No</td>
                <td>Destination {index + 1}</td>
                <td>Via</td>
                <td>Item</td>
                <td>Berat</td>
                <td>Qyt</td>
                <td>Exp</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{index + 1}</td> 
                <td>{isi.destination}</td>
                <td>{isi.via}</td>
                <td>{isi.item}</td>
                <td>{isi.berat}</td>
                <td>{isi.qyt}</td>
                <td>0</td>
              </tr>
            </tbody>
          </Table>
        ))}
    </div>
  );
}

export default IsiItungan;
