import React from "react";

const Header = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="col-md-4">
          <img
            src="https://elogs.eurekalogistics.co.id/assets/admin/dist/img/logo-eurekalogistics.png"
            height="55px"
            alt="Eureka Logistics Logo"
          />
        </div>
        <div
          className="col-md-4"
          style={{
            textAlign: "center",
            border: "2px dashed #000000",
            fontSize: "10pt",
            padding: "6px",
            fontWeight: "bold",
          }}
        >
          SURAT PERINTAH KERJA <br />
          SPK :
        </div>
      </div>
      <div className="col-md-12">
        <small className="pull-right">Ref.SP: SP20747/07/23/JKT</small>
        <br />
        <small className="pull-right">Ref.SP: QJKT23-20747</small>
      </div>
    </div>
  );
};

export default Header;
