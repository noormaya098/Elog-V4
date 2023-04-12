import React from "react";
import { Tag } from "antd";
import {
  Table,
  Modal,
  Button,
  Form,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import useStore from "../../../zustand/Store";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Card } from "antd";
const Driver = () => {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODEwOTgyMTcsImV4cCI6MTY4MTcwMzAxN30.JqwiPCZzsts9rkA-veeSNi8aRHjKoXkNyOpEMQtMTNQ`;
  const url = `https://api.eurekalogistics.co.id/driver/update-driver/`;
  const buatuser = "https://api.eurekalogistics.co.id/driver/create-driver";
  const { posts, fetchPosts } = useStore();
  const { onDriver, toggleDriver } = useStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState({});
  const [editedDriver, setEditedDriver] = useState({
    nama: "",
    driverId: "",
    driverName: "",
    simType: "",
    division: "",
    no_ktp: "",
  });
  // const handleClose = () => setShowModal(false);
  const handleClosed = () => setShowModal(false);

  const handleRowClick = (driver) => {
    setSelectedDriver(driver);
    setEditedDriver({ ...driver });
    setShowModal(true);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDriver({ ...editedDriver, [name]: value });
  };

  useEffect(() => {
    fetchPosts();
    // toggleDriver();
  }, []);

  ////edit driver api
  const handleEditSubmit = async (event) => {
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODEwOTgyMTcsImV4cCI6MTY4MTcwMzAxN30.JqwiPCZzsts9rkA-veeSNi8aRHjKoXkNyOpEMQtMTNQ",
        },
        body: JSON.stringify({
          id: selectedDriver.driverId, // driver id yang dipilih
          nama: editedDriver.driverName, // value dari form nama
          jenis_sim: editedDriver.simType, // nik dari driver yang dipilih
          no_ktp: editedDriver.driverKtp, // nik dari driver yang dipilih
          divisi: editedDriver.division, // value dari form divisi
        }),
      });
      handleClose();
      if (response.ok) {
        fetchPosts();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Driver Berhasil Di Update!",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /////Buat user
  const [nik, setNik] = useState("");
  const [divisi, setDivisi] = useState("");
  const [nama, setNama] = useState("");
  const [no_ktp, setNoKtp] = useState("");
  const [no_sim, setNoSim] = useState("");
  const [jenis_sim, setJenisSim] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tgl_lahir, setTglLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [no_telp2, setNoTelp2] = useState("");
  const [email, setEmail] = useState("");
  const [tgl_masuk, setTglMasuk] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleBuatUser = async (e) => {
    try {
      const response = await fetch(`${buatuser}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODEwOTgyMTcsImV4cCI6MTY4MTcwMzAxN30.JqwiPCZzsts9rkA-veeSNi8aRHjKoXkNyOpEMQtMTNQ",
        },
        body: JSON.stringify({
          nik,
          divisi,
          nama,
          no_ktp,
          no_sim,
          jenis_sim,
          alamat,
          tgl_lahir,
          agama,
          no_telp,
          no_telp2,
          email,
          tgl_masuk,
          vehicle_type,
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
          text: "Semua data harus diisi! / Email sudah Terdaftar",
        });
      }
    } catch (errors) {
      console.log(errors.message);
    }
  };

  ///function untuk merubah status driver
  function status(driverStatus) {
    // fetchPosts()
    if (driverStatus == "0") {
      return <Tag color="error">OFF</Tag>;
    } else {
      return <Tag color="processing">ON</Tag>;
    }
  }
  //// end

  ///function untuk on driver
  const UbahOn = async () => {
    const response = await fetch(
      `https://api.eurekalogistics.co.id/driver/ready-driver`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODEwOTgyMTcsImV4cCI6MTY4MTcwMzAxN30.JqwiPCZzsts9rkA-veeSNi8aRHjKoXkNyOpEMQtMTNQ",
        },
        body: JSON.stringify({
          id: editedDriver.driverId,
        }),
      }
    );
    if (response.ok) {
      fetchPosts();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Driver Berhasil Di Update!",
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };
  //end

  ///function untuk off driver
  const UbahOff = async () => {
    const response = await fetch(
      `https://api.eurekalogistics.co.id/driver/off-driver`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODEwOTgyMTcsImV4cCI6MTY4MTcwMzAxN30.JqwiPCZzsts9rkA-veeSNi8aRHjKoXkNyOpEMQtMTNQ",
        },
        body: JSON.stringify({
          id: editedDriver.driverId,
        }),
      }
    );
    if (response.ok) {
      fetchPosts();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Driver Berhasil Di Update!",
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };
  ///end

  return (
    <>
      {/* <BootstrapTable bootstrap4 keyField='id' data={ posts } columns={ Table }  pagination={ paginationFactory() }/> */}
      <Col>
        <Card>
          <Button size="sm" variant="primary" onClick={() => handleShow()}>
            Add Driver
          </Button>
          {/* add driver */}
          <Modal show={show} size="lg" onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Tambah Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleBuatUser}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="nik">
                      <Form.Label>NIK</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan NIK"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="nama">
                      <Form.Label>Nama</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="no_ktp">
                      <Form.Label>No KTP :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nomor KTP"
                        value={no_ktp}
                        onChange={(e) => setNoKtp(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="divisi">
                      <Form.Label>Divisi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={divisi}
                        onChange={(e) => setDivisi(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="no_sim">
                      <Form.Label>No SIM :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nomor SIM"
                        value={no_sim}
                        onChange={(e) => setNoSim(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="jenis_sim">
                      <Form.Label>Jenis SIM :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Jenis SIM"
                        value={jenis_sim}
                        onChange={(e) => setJenisSim(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="nama">
                      <Form.Label>Alamat :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="nama">
                      <Form.Label>Tanggal Lahir :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={tgl_lahir}
                        onChange={(e) => setTglLahir(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="nama">
                      <Form.Label>Agama :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={agama}
                        onChange={(e) => setAgama(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="nama">
                      <Form.Label>No Telp :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={no_telp}
                        onChange={(e) => setNoTelp(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="nama">
                      <Form.Label>No Telp 2 :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={no_telp2}
                        onChange={(e) => setNoTelp2(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="nama">
                      <Form.Label>Email :</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Masukkan Nama"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="nama">
                      <Form.Label>Tanggal Masuk :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={tgl_masuk}
                        onChange={(e) => setTglMasuk(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="nama">
                      <Form.Label>Vehicle Type :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={vehicle_type}
                        onChange={(e) => setVehicleType(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                type="submit"
                onClick={() => handleBuatUser()}
              >
                Simpan
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Tutup
              </Button>
            </Modal.Footer>
          </Modal>

          {/* end addd driver */}
          <Table striped bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Image</th>
                <th>Kiriman (SM)</th>
                <th>Penjualan</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.no}>
                  <td>{index + 1}</td>
                  <td>{post.driverName}</td>
                  <td>
                    <img src={post.driverImage} alt="" width={50} />
                  </td>
                  <td>{post.totalPenjualan}</td>
                  <td>{post.totalPenjualan}</td>
                  <td>{status(post.driverStatus)}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleRowClick(post)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Edit driver */}
          <Modal show={showModal} size="lg" onHide={handleClosed}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Driver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEditSubmit}>
                <Row>
                  <Col>
                    <Form.Group>
                      <img src={editedDriver.driverImage} alt="Foto Driver" />
                      <Form.Label>Foto Driver :</Form.Label>
                      <Form.Control type="file" name="driverPhoto" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Nama Driver :</Form.Label>
                      <Form.Control
                        type="text"
                        name="driverName"
                        value={editedDriver.driverName}
                        onChange={handleEditInputChange}
                        required
                      />
                      <Form.Label>Ubah Status Driver:</Form.Label>
                      <br />
                      <Button size="sm" variant="primary" onClick={UbahOn}>
                        On
                      </Button>
                      <Button size="sm" variant="danger" onClick={UbahOff}>
                        Off
                      </Button>

                      <br />
                      <Form.Label>Jenis Sim :</Form.Label>
                      <Form.Control
                        type="text"
                        name="simType"
                        value={editedDriver.simType}
                        onChange={handleEditInputChange}
                        required
                      />
                      <Form.Label>No KTP :</Form.Label>
                      <Form.Control
                        type="text"
                        name="driverKtp"
                        value={editedDriver.driverKtp}
                        onChange={handleEditInputChange}
                        required
                        onKeyPress={(event) => {
                          const keyCode = event.keyCode || event.which;
                          const keyValue = String.fromCharCode(keyCode);
                          const regex = /^[0-9]+$/;

                          if (!regex.test(keyValue)) {
                            event.preventDefault();
                            alert("Input hanya diizinkan angka!");
                          }
                        }}
                      />
                      <Form.Label>Tanggal Lahir :</Form.Label>
                      <Form.Control
                        type="date"
                        name="driverKtp"
                        value={editedDriver.dateBirth}
                        onChange={handleEditInputChange}
                        required
                      />
                      <Form.Label>Email :</Form.Label>
                      <Form.Control
                        type="text"
                        name="driverKtp"
                        value={editedDriver.driverEmail}
                        onChange={handleEditInputChange}
                        required
                      />
                      <Form.Label>No Telp 1 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="driverKtp"
                        value={editedDriver.noTelp1}
                        onChange={handleEditInputChange}
                        required
                      />

                      <Form.Label>Tanggal Masuk :</Form.Label>
                      <Form.Control
                        type="date"
                        name="driverKtp"
                        value={editedDriver.dateIn}
                        onChange={handleEditInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Vehicle Type :</Form.Label>
                      <Form.Control
                        type="text"
                        name="driverName"
                        value={editedDriver.vehicle}
                        onChange={handleEditInputChange}
                        required
                      />
                      <Form.Label>No SIM :</Form.Label>
                      <Form.Control
                        type="text"
                        name="driverName"
                        value={editedDriver.jenis_sim}
                        onChange={handleEditInputChange}
                        required
                      />
                      <Form.Label>Tempat Lahir :</Form.Label>
                      <Form.Control
                        type="text"
                        name="driverName"
                        value={editedDriver.vehicle}
                        onChange={handleEditInputChange}
                        required
                      />
                      <Form.Label>Alamat :</Form.Label>
                      <Form.Control
                        type="text"
                        name="driverName"
                        value={editedDriver.driverAddress}
                        onChange={handleEditInputChange}
                        required
                      />
                      <Form.Label>Agama :</Form.Label>
                      <Form.Control
                        type="text"
                        name="driverName"
                        value={editedDriver.driverReligion}
                        onChange={handleEditInputChange}
                        required
                      />
                      <Form.Label>No Telp 2 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="driverName"
                        value={editedDriver.noTelp2}
                        onChange={handleEditInputChange}
                        required
                      />
                      <Form.Label>Keterangan :</Form.Label>
                      <Form.Control
                        type="text"
                        name="driverName"
                        value={editedDriver.driverAddress}
                        onChange={handleEditInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                type="submit"
                onClick={handleEditSubmit}
              >
                Save
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {/* End edit driver */}
            </Modal.Footer>
          </Modal>
        </Card>
      </Col>
    </>
  );
};

export default Driver;
