import React from 'react';

const ApprovalTable = () => {
  return (
    <div className="col-md-12">
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <tbody>
            <tr style={{ textAlign: 'center' }}>
              <td colSpan="6">PERSETUJUAN BARANG MUAT</td>
            </tr>
            <tr>
              <td width="30%" colSpan="2">Armada yang Digunakan</td>
              <td width="75%" colSpan="4">
                : <b>Eureka & Mitra</b>
              </td>
            </tr>
            <tr>
              <td width="10%" colSpan="2">Operasional</td>
              <td width="50%">: <b>Ready</b> (18-07-2023 09:40)</td>
              <td width="10%">Purchasing</td>
              <td width="40%" colSpan="2">: <b>Ready</b> (18-07-2023 09:48)</td>
            </tr>
            <tr>
              <td colSpan="6" className="hd2">
                UNIT MITRA
              </td>
            </tr>
            <tr>
              <td align="center">No.</td>
              <td width="40%" colSpan="2" align="center">
                Nama Mitra
              </td>
              <td width="50%" align="center">
                Jenis Kendaraan
              </td>
              <td width="25%" align="center">
                Driver
              </td>
              <td width="20%" align="center">
                Tujuan
              </td>
            </tr>
            {/* foreach */}
            <tr>
              <td align="center">1</td>
              <td width="40%" colSpan="2" align="left">
                Eureka Logistics -
              </td>
              <td width="20%" align="left">Wingbox B 9989 BEU</td>
              <td width="30%" align="left">Suyanto (Margono)</td>
              <td width="30%" align="left">Sragen</td>
            </tr>
            <tr>
              <td align="center">2</td>
              <td width="40%" colSpan="2" align="left">
                MARGONO MEGA TRANSPORT (MMT)
              </td>
              <td width="20%" align="left">Wingbox B 9989 BEU</td>
              <td width="30%" align="left">Suyanto (Margono)</td>
              <td width="30%" align="left">Sragen</td>
            </tr>
            {/* end foreach */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalTable;
