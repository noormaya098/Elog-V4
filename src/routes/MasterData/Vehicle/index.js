import React from "react";
import { Container, Col, Row, Modal, Form, Image } from "react-bootstrap/";
import { Card } from "antd";
import { Button } from "antd";
import { Space, Table, Tag } from "antd";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import foto from "../DetailSP/gojo_satoru_19784.jpg";
import Gettype from "../../Monitoring/By sm/api/GetIdDriver";
import useVehicleStore from "../../Monitoring/By sm/api/GetIdDriver";

const Vehicle = () => {
  const posts  = Gettype((state) => state.posts);
  const fetchPosts = Gettype((state) => state.fetchPosts);
  // const fetchVehicles = useVehicleStore((state) => state.fetchVehicles);
  // const vehicles = useVehicleStore((state) => state.vehicles);

// console.log(`ini id`,vehicles);


  const [getvehicle, setGetVehicle] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(`ini postid`, posts);
  const getapivehicle = async () => {
    axios
      .get(`${Baseurl}vehicle/get-vehicle?limit=10&page=1&keyword=`, {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((res) => {
        setGetVehicle(res.data.data.order);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getapivehicle();
    // fetchPosts();
  },[] );

  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
    },
    {
      name: "No Polisi",
      selector: (row) => row.policeNumber,
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

  const api = async () => {
    try {
      const response = await axios.get(`${Baseurl}vehicle/get-select?vehicleType=`, {
        headers: {
          'Authorization': `token ${Token}`,
        }
      });
      // console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  api();
  



  ///state create vehicle
  const [imgUpload, setImgUpload] = useState(null);
  const [mitraName, setMitraName] = useState("");
  const [kode_kendaraan, setKode_kendaraan] = useState("");
  const [no_polisi, setNo_Polisi] = useState("");
  const [jenis_kendaraan, setjenis_kendaraan] = useState("");
  const [merk_mobil, setmerk_mobil] = useState("");
  const [tahun_mobil, settahun_mobil] = useState("");
  const [warna_plat, setwarna_plat] = useState("");
  const [tgl_beli, settgl_beli] = useState("");
  const [panjang, setpanjang] = useState("");
  const [lebar, setlebar] = useState("");
  const [tinggi, settinggi] = useState("");
  const [no_bpkb, setno_bpkb] = useState("");
  const [stnk, setstnk] = useState("");
  const [tgl_stnk, settgl_stnk] = useState("");
  const [kapasitas, setkapasitas] = useState("");
  const [kapasitas_maks, setkapasitas_maks] = useState("");
  const [kubikasi, setkubikasi] = useState("");
  const [location, setlocation] = useState("");

  const handleSave = async () => {
    try {
      const response = await fetch(`${Baseurl}vehicle/create-vehicle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({
          imgUpload,
          kode_kendaraan,
          mitraName,
          no_polisi,
          jenis_kendaraan,
          merk_mobil,
          tahun_mobil,
          warna_plat,
          tgl_beli,
          panjang,
          lebar,
          tinggi,
          no_bpkb,
          stnk,
          tgl_stnk,
          kapasitas,
          kapasitas_maks,
          kubikasi,
          location,
        }),
      });
      handleClose();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Driver Berhasil Di Buat!",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ADA KESALAHAN DI FORM INPUT",
        });
      }
    } catch (errors) {}
  };

  return (
    <div>
      <div className="gx-d-flex justify-content-start">
        <h5>List Vehicle</h5>
        <p> &nbsp;Operasional</p>
      </div>
      <Container>
        <Card>
          <Button type="primary" onClick={handleShow}>
            Add Vehicle
          </Button>
          <DataTable columns={columns} data={getvehicle} pagination />
          {/* Tambahkan data table di sini */}
        </Card>
        {/* Modal */}
        <Modal show={show} size="lg" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Vehicle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                {/* Kolom 1 */}
                <Col>
                  <Form.Group controlId="imgUpload">
                    <Form.Label>Upload Image:</Form.Label>
                    <Image
                      className="py-3"
                      src={imgUpload}
                      width="150px"
                      fluid
                    />
                    <Form.Control
                      type="file"
                      onChange={(e) => setImgUpload(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>
                {/* Kolom 2 */}
                <Col>
                  <Form.Group>
                    <Form.Label>Mitra:</Form.Label>
                    <Form.Control
                      value={mitraName}
                      onChange={(e) => setMitraName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="kodeKendaraan">
                    <Form.Label>Kode Kendaraan:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Kode Kendaraan"
                      value={kode_kendaraan}
                      onChange={(e) => setKode_kendaraan(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="namaSupir">
                    <Form.Label>Nama Supir:</Form.Label>
                    <Form.Select>
                      <option value="menu1">Adi Purnomo</option>
                      <option value="menu2">Menu 2</option>
                      <option value="menu3">Menu 3</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="tahun">
                    <Form.Label>Tahun:</Form.Label>
                    <Form.Control
                      type="text"
                      value={tahun_mobil}
                      onChange={(e) => settahun_mobil(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>No STNK:</Form.Label>
                    <Form.Control
                      type="text"
                      value={stnk}
                      onChange={(e) => setstnk(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tanggal Beli:</Form.Label>
                    <Form.Control
                      type="date"
                      value={tgl_beli}
                      onChange={(e) => settgl_beli(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Panjang:</Form.Label>
                    <Form.Control
                      type="text"
                      value={panjang}
                      onChange={(e) => setpanjang(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tinggi:</Form.Label>
                    <Form.Control
                      type="text"
                      value={tinggi}
                      onChange={(e) => settinggi(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Kapasitas MAX:</Form.Label>
                    <Form.Control
                      type="text"
                      value={kapasitas_maks}
                      onChange={(e) => setkapasitas_maks(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                {/* Kolom 3 */}
                <Col>
                  <Form.Group>
                    <Form.Label>No Polisi:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter No Polisi"
                      value={no_polisi}
                      onChange={(e) => setNo_Polisi(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Vehicle:</Form.Label>
                    <Form.Control
                      value={jenis_kendaraan}
                      onChange={(e) => setjenis_kendaraan(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="MerkMobil">
                    <Form.Label>Merk Mobil:</Form.Label>
                    <Form.Control
                      type="text"
                      value={merk_mobil}
                      onChange={(e) => setmerk_mobil(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Warna Plat:</Form.Label>
                    <Form.Control
                      type="text"
                      value={warna_plat}
                      onChange={(e) => setwarna_plat(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>No BPKB:</Form.Label>
                    <Form.Control type="text"   value={no_bpkb}
                      onChange={(e) => setno_bpkb(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tanggal Stnk:</Form.Label>
                    <Form.Control type="date"   value={tgl_stnk}
                      onChange={(e) => settgl_stnk(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Lebar:</Form.Label>
                    <Form.Control type="text"   value={lebar}
                      onChange={(e) => setlebar(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Kapasitas:</Form.Label>
                    <Form.Control type="text"   value={kapasitas}
                      onChange={(e) => setkapasitas(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Kubikasi:</Form.Label>
                    <Form.Control type="text"   value={kubikasi}
                      onChange={(e) => setkubikasi(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Lokasi:</Form.Label>
                    <Form.Control type="text"   value={location}
                      onChange={(e) => setlocation(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end */}
      </Container>
    </div>
  );
};
export default Vehicle;
