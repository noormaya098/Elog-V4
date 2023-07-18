import React from 'react';

const CommentsTable = () => {
  return (
    <div className="row">
      <label className="box-title">Comments :</label>
      <div className="col-xs-12 table-responsive">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <td colSpan="4">
                  <strong>List Comments</strong>
                </td>
              </tr>
              <tr className="odd gradeX">
                <th>No. </th>
                <th>Coment</th>
                <th>User</th>
                <th>Tgl Coment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Menggunakan Unit</td>
                <td>Adinda Putri R</td>
                <td>18-07-2023 9:40:30</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Menggunakan Unit MARGONO MEGA TRANSPORT (MMT)</td>
                <td>Siti Rahma</td>
                <td>18-07-2023 9:48:59</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* /.col */}
    </div>
  );
};

export default CommentsTable;
