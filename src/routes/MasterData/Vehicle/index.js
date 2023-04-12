import React from "react";
import { Container } from "react-bootstrap/";
import { Card } from "antd";
import { Button, Modal } from "antd";
import { Space, Table, Tag } from "antd";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";

const Vehicle = () => {
  const { confirm } = Modal;
  const [getvehicle, setGetVehicle] = useState('')


  const getapivehicle = async () => {
    axios
      .get(
        `${Baseurl}vehicle/get-vehicle?limit=10&page=1&keyword=`,
        {
          headers: {
            Authorization: `token ${Token}`,
          },
        }
      )
      .then((res) => {
        setGetVehicle(res.data.data.order);
        console.log(res.data.data.order);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getapivehicle();
  }, []);


  

  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
    },
    {
      name: "No Polisi",
      selector:(row) => row.policeNumber
    },

    {
      name: "Kode Kendaraan",
      selector: (row) => row.driverName,
    },
    {
      name: "Pemilik Armada",
      selector: (row) => row.vendor,
    },
    {
      name: "Jenis Kendaraan",
      selector: (row) => row.vehicleType,
    },
    {
      name: "Nama Supir",
      selector: (row) => row.driverName,
    },
    
    
   
  ];

  return (
    <div>
      <div className="gx-d-flex justify-content-start">
      <h5>List Vehicle</h5>
      <p> &nbsp;Operasional</p>
    </div>
      <Container>
        <Card>
          <Button type="primary">Add Vehicle</Button>
          <DataTable columns={columns} data={getvehicle} pagination
			/>
        </Card>
      </Container>
      </div>
  );
};
export default Vehicle;
