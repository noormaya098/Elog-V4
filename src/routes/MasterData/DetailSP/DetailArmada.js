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
            <td>No Destination 1</td>
            <td>Via</td>
            <td>Item</td>
            <td>Berat</td>
            <td>Qyt</td>
            <td>Exp</td>
          </tr>
        </tbody>
        </Table>
        </div>
    )
}


export default DetailArmada