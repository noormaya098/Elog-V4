import { Table } from "react-bootstrap"

const DetailArmada = () =>{
    return(
        <div>
        <Table responsive border={1}>
        <tbody>
          <tr style={{ fontWeight: 'bold'  , backgroundColor: '#f2dede'}}>
            <td>Kode Kendaraan</td>
            <td>Nama Mitra</td>
            <td>Kendaraan</td>
            <td>Supir</td>
            <td>No Polisi</td>
            <td>telp Supir</td>
          </tr>
        </tbody>
        </Table>
        </div>
    )
}


export default DetailArmada