import React from 'react';

const OrderTable = () => {
  return (
    <table id="tb1" className="table table-striped table-bordered table-hover">
      <thead>
        <tr style={{ textAlign: 'center' }}>
          <td colSpan="9" className="hd">
            <strong>SURAT PESANAN</strong>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="2">Sales</td>
          <td colSpan="3">: Rifaldi</td>
          <td>Tanggal Order</td>
          <td colSpan="3">: 18-07-2023 09:38</td>
        </tr>
        <tr>
          <td colSpan="2">Nama Perusahaan</td>
          <td colSpan="3">: PT. Wilmar Nabati Indonesia</td>
          <td>Email</td>
          <td colSpan="3">: chandra.ng@id.wilmar-intl.com</td>
        </tr>
        <tr>
          <td colSpan="2">Service</td>
          <td colSpan="3">:<b> Charter</b></td>
          <td>No Telp/HP</td>
          <td colSpan="3">: , </td>
        </tr>
        <tr>
          <td colSpan="2">Alamat Muat</td>
          <td width="50%" colSpan="4">: Cilegon, Tangerang, Cilegon</td>
          <td align="center">Berat(kg)</td>
          <td align="center">Koli</td>
          <td align="center">Harga (/Kg)</td>
        </tr>
        {/* FOREACH */}
        <tr>
          <td width="0.5%" rowspan="2" align="center">
            1
          </td>
          <td>Alamat Bongkar</td>
          <td width="65%" colSpan="4">: Sragen, Jawa Tengah, Sragen</td>
          <td width="11%" rowspan="2" align="right" style={{ fontSize: '9.5pt' }}>
            20.000
          </td>
          <td width="10%" rowspan="2" align="right" style={{ fontSize: '9.5pt' }}>
            0
          </td>
          <td width="20%" rowspan="2" align="right" style={{ fontSize: '9.5pt' }}>
            7.200.000
          </td>
        </tr>
        <tr>
          <td width="15%">Via : darat</td>
          <td width="25%">DO : -</td>
          <td width="10%">Items : Bahan makanan</td>
          <td width="5%" colSpan="2"> SM :JKT23-007577 <b>(Regular (Kg))</b> </td>
        </tr>
        {/* END FOREACH */}
        <tr>
          <td colSpan="6" align="right">
            <b>Total</b>
          </td>
          <td width="11%" align="right" style={{ fontSize: '9.5pt' }}>
            20.000
          </td>
          <td width="10%" align="right" style={{ fontSize: '9.5pt' }}>
            0
          </td>
          <td width="21%" align="right" style={{ fontSize: '9.5pt' }}>
            7.200.000,-
          </td>
        </tr>
        <tr>
          <td colSpan="2">Waktu Muat</td>
          <td colSpan="4">: 18-07-2023 09:37</td>
          <td colSpan="2" width="15%">
            Biaya Muat
          </td>
          <td align="right" style={{ fontSize: '9.5pt' }}>
            Rp. 0,-
          </td>
        </tr>
        <tr>
          <td colSpan="2">Packing</td>
          <td colSpan="4">:-</td>
          <td colSpan="2">Biaya Bongkar</td>
          <td align="right" style={{ fontSize: '9.5pt' }}>
            Rp. 0,-
          </td>
        </tr>
        <tr>
          <td colSpan="2">Asuransi</td>
          <td colSpan="4">:Tidak (Tidak Menggunakan Asuransi)</td>
          <td colSpan="2">Biaya Multidrop</td>
          <td align="right" style={{ fontSize: '9.5pt' }}>
            Rp. 0,-
          </td>
        </tr>
        <tr>
          <td colSpan="2">Keterangan</td>
          <td colSpan="4">:</td>
          <td colSpan="2">Biaya Lainnya</td>
          <td align="right" style={{ fontSize: '9.5pt' }}>
            Rp. 0,-
          </td>
        </tr>
        <tr>
          <td colSpan="6"></td>
          <td colSpan="2">Biaya Overtonase</td>
          <td align="right" style={{ fontSize: '9.5pt' }}>
            Rp. 0,-
          </td>
        </tr>
        <tr>
          <td colSpan="6"></td>
          <td colSpan="2">Promo</td>
          <td align="right">(Rp. 0,-)</td>
        </tr>
        <tr>
          <td colSpan="7" align="right">
            <b>Total Biaya Keseluruhan</b>
          </td>
          <td colSpan="2" align="right" style={{ fontSize: '10pt' }}>
            Rp. 7.200.000,-
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderTable;
