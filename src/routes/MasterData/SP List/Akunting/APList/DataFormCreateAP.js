import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "antd";
import { FormOutlined, RestOutlined } from "@ant-design/icons";

function DataFormCreateAP({ formData }) {
  useEffect(() => {
    // Save formData.customer to localStorage
    localStorage.setItem("iniNamaCustomer", formData?.customer);
  }, [formData]);

  console.log("iniiii dia ", formData);
  return (
    <div>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: "green", color: "white" }}>
          <tr>
            <th>No.</th>
            <th>Customer</th>
            <th>Tujuan</th>
            <th>Jenis Barang</th>
            <th>Jumlah</th>
            <th>TD</th>
            <th>TA</th>
            <th>Harga (Rp)</th>
            <th>Operasi</th>
          </tr>
        </thead>
        <tbody>
          {formData && (
            <tr>
              <td>1</td>
              <td>{formData.customer}</td>
              <td>{formData.tujuan}</td>
              <td>{formData.jenisBarang}</td>
              <td>{formData.jumlah}</td>
              <td>{formData.TD}</td>
              <td>{formData.TA}</td>
              <td style={{ textAlign: "end" }}>{formData.harga}</td>
              <td>
                <Button style={{ backgroundColor: "green", color: "white" }}>
                  <FormOutlined />
                </Button>
                <Button type="danger">
                  <RestOutlined />
                </Button>
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={7} style={{ textAlign: "end", fontWeight: "bold" }}>
              Sub Total
            </td>
            <td style={{ textAlign: "end", fontWeight: "bold" }}>0</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={7} style={{ textAlign: "end", fontWeight: "bold" }}>
              Total Invoice no.
            </td>
            <td style={{ textAlign: "end", fontWeight: "bold" }}>0</td>
            <td></td>
          </tr>
          <tr>
            <td
              colSpan={7}
              style={{ textAlign: "end", fontWeight: "bold" }}
            ></td>
            <td style={{ textAlign: "end", fontWeight: "bold" }}>0</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={7} style={{ textAlign: "end", fontWeight: "bold" }}>
              Total Pembayaran
            </td>
            <td style={{ textAlign: "end", fontWeight: "bold" }}>0</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default DataFormCreateAP;
