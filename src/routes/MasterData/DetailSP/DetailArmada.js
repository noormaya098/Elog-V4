import { Table } from "react-bootstrap"

const DetailArmada = () =>{
    return(
        <div>
        <Table responsive border={1}>
        <thead>
          <tr style={{ fontWeight: 'bold' }}>
            <th colSpan={5}> Detail Armada</th>
            
          </tr>
        </thead>
        <tbody>
          <tr style={{ fontWeight: 'bold' }}>
            <td>No.</td>
            <td>Armada</td>
            <td>Vehicle</td>
            <td>Driver</td>
            <td>Tujuan</td>
          </tr>
        </tbody>
        </Table>
        </div>
    )
}


export default DetailArmada