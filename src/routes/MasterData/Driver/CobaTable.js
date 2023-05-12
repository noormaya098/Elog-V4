import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import Swal from "sweetalert2";

function CobaTable() {
  const [DataDalamApi, setDataDalamApi] = useState([]);
  const [driverDetails, setDriverDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalData: 0,
    totalPage: 0,
  });

  ///Modal Bootstrap
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setEditShow(false);
  };

  const handleShow = () => {
    setShow(true);
    // setEditShow(true);
  };

  ///

  const ApiDriver = async (page) => {
    const urlDataDriver = await axios.get(
      `${Baseurl}driver/get-driver?limit=10&page=${page}&keyword=`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
      }
    );
    const dataApiDriver = urlDataDriver.data.data.order.map((item, index) => ({
      no: item.no,
      id: item.driverId,
      nama: item.driverName,
      gambar: item.driverImage,
      kiriman: `-`,
      penjualan: item.totalPenjualan,
    }));

    // Update pagination state
    setPagination({
      currentPage: urlDataDriver.data.data.currentPage,
      totalData: urlDataDriver.data.data.totalData,
      totalPage: urlDataDriver.data.data.totalPage,
      totallimit: urlDataDriver.data.data.limit,
    });

    setDataDalamApi(dataApiDriver);

    // Panggil GetdataDetail untuk setiap item dalam dataApiDriver
    dataApiDriver.forEach(async (item) => {
      await GetdataDetail(item.id);
    });
  };



  const handlePageChange = (page) => {
    ApiDriver(page);
  };

  useEffect(() => {
    ApiDriver();
  }, []);

  useEffect(() => {
    ApiDriver(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (driverDetails.length > 0) {
      const updatedDataDalamApi = DataDalamApi.map((data) => {
        const detail = driverDetails.find((detail) => detail.id === data.id);
        return {
          ...data,
          status: detail ? detail.dataDriver : "",
        };
      });
      setDataDalamApi(updatedDataDalamApi);
    }
  }, [driverDetails]);

  const GetdataDetail = async (id) => {
    const urlDataDetailDriver = await axios.get(
      `${Baseurl}driver/get-driver-detail?id=${id}`,
      
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
      }
    );
    const dataDriver = urlDataDetailDriver.data.data.status;

    setDriverDetails((prevDetails) => [...prevDetails, { id, dataDriver }]);

    console.log(`ini id`, id);
    console.log("Data detail:", driverDetails);
  };

  useEffect(() => {
    console.log("Data detail:", driverDetails);
  }, [driverDetails]);

  useEffect(() => {
    ApiDriver();
    // driveradd();
  }, []);



  ///on off driver
  const ondriver = async (id) => {
    try {
      const onDriver = await axios.post(
        `${Baseurl}driver/ready-driver`,
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          },
        }
      );
  
     
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Driver berhasil diaktifkan!',
        timer: 2000,
        timerProgressBar: true,
      });
      handleClose();
      ApiDriver();
    } catch (error) {
      console.log(error.message);
    }
  };

  const droffiver = async (id) => {
    try {
      const offDriver = await axios.post(
        `${Baseurl}driver/off-driver`,
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Driver berhasil dinonaktifkan!',
        timer: 2000,
        timerProgressBar: true,
      });
      handleClose();
      ApiDriver()
      
    } catch (error) {
      console.log(error.message);
    }
  };







  ///Edit Driver APi
  const editdrivapier = async (id) => {
    try {
      const urleditdrivapier = await axios.post(
        `${Baseurl}driver/update-driver`,
        {
          id: id,
          nama: nama,
          tgl: tgl_lahir,
          jenis_sim: jenis_sim,
          no_ktp: no_ktp,
          email: email,
          tgl_masuk: tgl_masuk,
          no_sim: no_sim,
          agama: agama,
          alamat: alamat,
          agama: agama,
          notelp1: notelp1,
          notelp2: notelp2,
          email: email,
          notelp1: notelp1,
          notelp2: notelp2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          },
        }
      );
      // Tangani respons dari API sesuai kebutuhan
      DataDalamApi();
    } catch (error) {
      console.log(error.message);
    }
  };

  const [selectedId, setSelectedId] = useState(null);

  const editDriver = (id) => {
    setEditShow(true);
    setSelectedId(id);
  };

  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
    },
    {
      name: "Nama",
      selector: (row) => row.nama,
    },
    {
      name: "Image",
      selector: (row) => (
        <img src={row.gambar} width="50px" alt="Foto Driver" />
      ),
    },
    {
      name: "Kiriman (SM)",
      selector: (row) => row.kiriman,
    },
    {
      name: "Penjualan",
      selector: (row) => row.penjualan,
    },
    {
      name: "Status",
      cell: (row) => (
        <Tag color={row.status === 1 ? "green" : "red"}>
          {row.status === 1 ? "Tersedia" : "Tidak tersedia"}
        </Tag>
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <Button variant="danger" size="sm" onClick={() => editDriver(row.id)}>
          Edit
        </Button>
      ),
    },
  ];

  ///// Create Driver
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [no_ktp, setNo_ktp] = useState("");
  const [no_sim, setNo_sim] = useState("");
  const [divisi, setDivisi] = useState("");
  const [jenis_sim, setJenisSim] = useState("");
  const [tgl_lahir, setTgl_lahir] = useState("");
  const [agama, setAgama] = useState("");
  const [tgl_masuk, setTgl_masuk] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setalamat] = useState("");
  const [notelp1, setNotelp1] = useState("");
  const [notelp2, setNotelp2] = useState("");
  const driveradd = async () => {
    try {
      const driverAdD = await axios.post(
        `${Baseurl}driver/create-driver`,
        {
          nik,
          nama,
          no_ktp,
          divisi,
          no_sim,
          jenis_sim,
          tgl_lahir,
          agama,
          tgl_masuk,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          },
        }
      );

      if (driverAdD.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Driver Berhasil Di Buat!",
          timer: 2000,
          timerProgressBar: true,
        });
        handleClose();
        DataDalamApi();
      } else {
        const belumImput = driverAdD.data.status.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: belumImput,
        });
      }
    } catch (errors) {
      console.log(errors.message);
      const belumImput = errors.response.data.status.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: belumImput,
      });
    }
  };

  return (
    <>
      <Card>
        <Row>
          <Col>
            <Button size="sm" variant="primary" onClick={() => handleShow()}>
              Add Driver
            </Button>
            <Modal show={show} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Tambah Driver</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>NIK</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan NIK"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Nama</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>No KTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={no_ktp}
                        onChange={(e) => setNo_ktp(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Divisi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={divisi}
                        onChange={(e) => setDivisi(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>No SIM</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={no_sim}
                        onChange={(e) => setNo_sim(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Jenis SIM</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Jenis SIM"
                        value={jenis_sim}
                        onChange={(e) => setJenisSim(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Alamat</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Tanggal Lahir</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Masukkan Divisi"
                        value={tgl_lahir}
                        onChange={(e) => setTgl_lahir(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Agama</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={agama}
                        onChange={(e) => setAgama(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>No Telp</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={tgl_masuk}
                        onChange={(e) => setTgl_masuk(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>No Telp 2</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Masukkan Divisi"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Tanggal Masuk</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Masukkan Divisi"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Control
                        type="text  "
                        placeholder="Masukkan Divisi"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => driveradd()}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Edit Button */}
            <Modal show={editShow} size="lg" onHide={handleClose}>
              <Modal.Body>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Edit Driver{" "}
                    <span>
                      <Button size="sm" onClick={()=>ondriver(selectedId)}>ON</Button>
                      <Button size="sm" variant="danger" onClick={()=>droffiver(selectedId)}>
                        OFF
                      </Button>
                    </span>
                  </Modal.Title>
                </Modal.Header>
                <Row>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Nama Driver</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Jenis Sim</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={jenis_sim}
                        onChange={(e) => setJenisSim(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>No KTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={no_ktp}
                        onChange={(e) => setNo_ktp(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Tanggal Lahir</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Masukkan Divisi"
                        value={tgl_lahir}
                        onChange={(e) => setTgl_lahir(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Masukkan Divisi"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>No Telp 1</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Jenis SIM"
                        value={notelp1}
                        onChange={(e) => setNotelp1(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Tanggal Masuk</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Masukkan Divisi"
                        value={tgl_masuk}
                        onChange={(e) => setTgl_masuk(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>No SIM</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={no_sim}
                        onChange={(e) => setNo_sim(e.target.value)}
                        required
                      />
                    </Form.Group>
                    {/* <Form.Group>
                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={tgl_masuk}
                        onChange={(e) => setTgl_masuk(e.target.value)}
                        required
                      />
                    </Form.Group> */}
                    {/* <Form.Group>
                      <Form.Label>Tempat Lahir</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        required
                      />
                    </Form.Group> */}
                    <Form.Group>
                      <Form.Label>Alamat</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={alamat}
                        onChange={(e) => setalamat(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Agama</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={agama}
                        onChange={(e) => setAgama(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>No Telp 2</Form.Label>
                      <Form.Control
                        type="text  "
                        placeholder="Masukkan Divisi"
                        value={notelp2}
                        onChange={(e) => setNotelp2(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Keterangan</Form.Label>
                      <Form.Control
                        type="text  "
                        placeholder="Masukkan Divisi"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        required
                      />
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => editdrivapier(selectedId)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>
            <DataTable
              columns={columns}
              data={DataDalamApi}
              pagination
              paginationServer
              paginationTotalRows={pagination.totalData}
              onChangePage={handlePageChange}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default CobaTable;