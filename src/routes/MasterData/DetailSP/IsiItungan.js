import React from 'react'
import { Table } from 'react-bootstrap'

function IsiItungan() {
  return (
    <div>
        <Table responsive>
              <thead>
                <tr style={{ fontWeight: 'bold' }}>
                  <th>No</th>
                  <th>Destination</th>
                  <th>Shipment</th>
                  <th>Item</th>
                  <th>Berat</th>
                  <th>Exp</th>
                  <th>Koli</th>
                  <th>Biaya Bongkar</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </Table>
    </div>
  )
}

export default IsiItungan