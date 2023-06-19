import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import Swal from "sweetalert2";
import mobil from "../../redux toolkit/store/ZustandStore";
import Select from "react-select";
import elogGif from "../../.././assets/Loader_Elogs1.gif"
import { Pagination } from 'antd';
function CobaTables() {
  const FormData = require('form-data');
  const fs = require('fs');
  const [DataDalamApi, setDataDalamApi] = useState([]);
  const [driverDetails, setDriverDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [totalData, setTotalData] = useState([])
  const [pagination, setPagination] = useState(1);
  const [JenisKepemilikan, setJenisKepemilikan] = useState([])
  const [UkuranSeragam, setUkuranSeragam] = useState([])
  const [JenisSimSelect, setJenisSimSelect] = useState("")
  const [TglStnkValue, setTglStnkValue] = useState("")
  const [VehicleOptions, setVehicleOptions] = useState([])
  const [VehicleOptionsValue, setVehicleOptionsValue] = useState([])
  const [RekeningBank, setRekeningBank] = useState([])
  const [RekeningNorek, setRekeningNorek] = useState([])
  const [UKSeragam, setUKSeragam] = useState([])
  const [JenisKepemilikanValue, setJenisKepemilikanValue] = useState([])
  const [TanggalSIMValue, setTanggalSIMValue] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [CariNamaSearch, setCariNamaSearch] = useState("")
  const [JenisKepemilikanCari, setJenisKepemilikanCari] = useState("")
  const [JenisKepemilikanValues, setJenisKepemilikanValues] = useState("")
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

  ///Modal Bootstrap
  const [show, setShow] = useState(false);
  const [showUploadFoto, setshowUploadFoto] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setEditShow(false);
  };
  const handleCloses = () => {
    setshowUploadFoto(false);
    // setEditShow(false);
  };


  const handleShow = () => {
    setShow(true);
  };

  const UploadFotoTombol = () => {
    setshowUploadFoto(true)
  }

  ///
  const ApiDriver = async (page) => {
    setIsLoading(true);
    try {
      const urlDataDriver = await axios.get(
        `${Baseurl}driver/get-driver?limit=10&page=${page}&keyword=${CariNamaSearch}&jenis_kepemilikan=${JenisKepemilikanValues}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          },
        }
      );

      const dataApiDriver = urlDataDriver.data.data.order
      setDataDalamApi(dataApiDriver);
      setTotalData(urlDataDriver.data.data.totalData)
      // Set total rows for pagination
      setCurrentPage(urlDataDriver.data.data.totalPage)



      setDataDalamApi(dataApiDriver);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error in ApiDriver: ${error}`);
      // handle the error based on your application's requirement, such as setting an error state or displaying a notification to the user
    } finally {
      setIsLoading(false);
    }
  };



  const handlePageChange = (page) => {
    ApiDriver(page);
  };
  const onShowSizeChange = (page, pageSize) => {
    // console.log(page, pageSize);
    setPagination(page)
  };

  useEffect(() => {
    ApiDriver(pagination);
  }, [CariNamaSearch, pagination, JenisKepemilikanValues]);



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


  const [DetailDataDriver, setDetailDataDriver] = useState([])
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
    const dataDriver = urlDataDetailDriver.data.data?.[0]
    setDetailDataDriver(dataDriver)
    console.log(`ini dataDriver`, dataDriver);

    setDriverDetails((prevDetails) => [...prevDetails, { id, dataDriver }]);

    // console.log(`ini id`, id);
    // console.log("Data detail:", driverDetails);
  };

  useEffect(() => {
    GetdataDetail()
    console.log("Data detail:", DetailDataDriver);
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

      // Tampilkan sweet alert ketika driver berhasil dijalankan
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Driver berhasil diaktifkan!',
        timer: 2000,
        timerProgressBar: true,
      });
      handleClose();
      ApiDriver(pagination);
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
      ApiDriver(pagination);

    } catch (error) {
      console.log(error.message);
    }
  };

  ///Edit Driver APi
  const editdrivapier = async (selectedId) => {
    try {
      setIsLoading(true)
      const urleditdrivapier = await axios.post(
        `${Baseurl}driver/update-driver`,
        {
          id: selectedId,
          nik: (nik === "") ? (DetailDataDriver?.nik) : (nik),
          nama: (nama === "") ? (DetailDataDriver?.driverName) : (nama),
          tgl: (tgl_lahir === "") ? (DetailDataDriver?.tgl_lahir) : (tgl_lahir),
          jenis_sim: (jenis_sim === "") ? (DetailDataDriver?.jenis_sim) : (jenis_sim),
          no_ktp: (no_ktp === "") ? (DetailDataDriver?.driverKtp) : (no_ktp),
          divisi: (divisi === "") ? (DetailDataDriver?.division) : (divisi),
          email: (email === "") ? (DetailDataDriver?.email) : (email),
          no_sim: (no_sim === "") ? (DetailDataDriver?.numberSim) : (no_sim),
          tgl_masuk: (tgl_masuk === "") ? (DetailDataDriver?.dateIn) : (tgl_masuk),
          agama: (agama === "") ? (DetailDataDriver?.driverReligion) : (agama),
          alamat: (alamat === "") ? (DetailDataDriver?.driverAddress) : (alamat),
          agama: (agama === "") ? (DetailDataDriver?.driverReligion) : (agama),
          no_telp: (notelp1 === "") ? (DetailDataDriver?.noTelp1) : (notelp1),
          no_telp2: (notelp2 === "") ? (DetailDataDriver?.noTelp2) : (notelp2),
          email: (email === "") ? (DetailDataDriver?.driverEmail) : (email),
          vehicle_type: (VehicleOptionsValue === "") ? (DetailDataDriver?.vehicle) : (VehicleOptionsValue),
          jenis_kepemilikan: (JenisKepemilikanValue === "") ? (DetailDataDriver?.jenisKepemilikan) : (JenisKepemilikanValue)
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          },
        }
      );
      setIsLoading(false)
      handleClose()
      Swal.fire({
        icon: 'success',
        title: 'Edit Driver Berhasil',
        text: 'Driver berhasil diubah.',
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.reload()
      }, 2000);

    } catch (error) {
      console.log(error.message);
    }
  };
  const [selectedId, setSelectedId] = useState(null);
  // console.log(`ini DetailDataDriver?.driverName`,DetailDataDriver?.driverName);

  ////upload foto Edit Driver



  const editDriver = (id) => {
    setSelectedId(id)
    setEditShow(true);
    GetdataDetail(id)
    setSelectedId(id);
  };

  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "50px",
    },
    {
      name: "Nama",
      selector: (row) => row.driverName,
    },
    {
      name: "Image",
      selector: (row) => (
        <img src={row.driverImage} width="70px" alt="Foto Driver" />
      ),
    },
    {
      name: "Jenis SIM",
      selector: (row) => row.simType,
    },
    {
      name: "Jenis Kendaraan",
      selector: (row) => row.vehicle,
    },
    {
      name: "Jenis Kepemilikan",
      selector: (row) => row.jenisKepemilikan,
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
        <Button variant="primary" size="sm" onClick={() => editDriver(row.driverId)}>
          Edit
        </Button>
      ),
    },
  ];

  ///// Create Driver


  const driveradd = async () => {
    try {
      const driverAdD = await axios.post(
        `${Baseurl}driver/create-driver`,
        {
          nik: nik,
          divisi: divisi,
          nama: nama,
          no_ktp: no_ktp,
          no_sim: no_sim,
          vehicle_type: VehicleOptionsValue,
          jenis_sim: jenis_sim,
          alamat: alamat,
          tgl_lahir: tgl_lahir,
          agama: agama,
          no_telp: notelp1,
          no_telp2: notelp2,
          email: email,
          tgl_masuk: tgl_masuk,
          tgl_sim: TanggalSIMValue,
          uk_seragam: UKSeragam,
          jenis_kepemilikan: JenisKepemilikanValue,
          rekening_bank: RekeningBank,
          rekening_norek: RekeningNorek
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
        // DataDalamApi();
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
  // console.log(`ini gambar`, DataDalamApi);
  const [GambarFoto, setGambarFoto] = useState(null)
  ///Upload foto
  const UploadFoto = async (id) => {
    try {
      setIsLoading(true)
      let data = new FormData();
      data.append('id', selectedId);
      data.append('cover', GambarFoto);


      const response = await axios.post(
        `${Baseurl}driver/upload-driver-photo`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem("token")
          }
        }
      );
      setIsLoading(false)

      // handle response here
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "ada kesalahan",
      // });
    }
  }





  const getSelect = async () => {
    const data = await axios.get(`${Baseurl}driver/get-select`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      }
    )
    console.log(`ini getselect`, data.data.jenisKepemilikan);
    setJenisKepemilikan(data.data.jenisKepemilikan)
    setUkuranSeragam(data.data.ukuranSeragam)
    setJenisKepemilikanCari(data.data.jenisKepemilikan)
    // console.log(`jneis`, JenisKepemilikanCari);
  }
  useEffect(() => {
    getSelect()
    SimVehicle()
    VehicleType()
    UploadFoto()
  }, [])


  ///// getselect sim
  const SimVehicle = async () => {
    const data = await axios.get(`${Baseurl}vehicle/get-select?vehicleType=`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      }
    )
    setJenisSimSelect(data.data.data.jenisSim)
    // console.log(`data`, data.data.data.jenisSim)
  }

  ///type cehicle
  const VehicleType = async () => {
    const data = await axios.get(`${Baseurl}vehicle/get-type?keyword=`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      }
    )
    setVehicleOptions(data.data.data.order)
    // console.log(`ini type`, data.data.data.order);
  }

  const VehicleOpstionsSelect = VehicleOptions.map((item) => ({
    label: item.type,
    value: item.id
  }))
  const resetJenisKepemilikan = () => {
    setJenisKepemilikanValues('');
  }


  return (
    <>

      <Card>
        <Row>
          <Col>
            <Row>
              <Col sm={6}>
                <div className="d-flex justify-content-start">
                  <Button variant="primary" size="sm" onClick={handleShow}>
                    Add Driver
                  </Button>
                </div>
              </Col>
              <Col sm={3}>
                <div className="d-flex justify-content-end">
                  <Form.Group >
                    <Form.Control
                      type="text"
                      placeholder="Cari Nama Driver"
                      value={CariNamaSearch}
                      onChange={(e) => setCariNamaSearch(e.target.value)}
                    />
                  </Form.Group>
                  <br />
                </div>
              </Col>
              <Col sm={3}>
                <div className="d-flex justify-content-end">
                  <Form.Group>
                    <Form.Select onChange={(e) => {
                      setJenisKepemilikanValues(e.target.value);
                      if (e.target.value === 'OptionToReset') { // ganti 'OptionToReset' dengan opsi yang jika dipilih akan mereset pilihan
                        setJenisKepemilikanValues(''); // atau nilai default lain yang Anda inginkan
                      }
                    }}>
                      <option value="">Jenis Kepemilikan</option>
                      {JenisKepemilikanCari && JenisKepemilikanCari.map((item, index) => (
                        <option key={index} value={item.jenis}>{item.jenis}</option>
                      ))}
                    </Form.Select>

                  </Form.Group>
                  <br />
                </div>
              </Col>
            </Row>
            <Modal show={show} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Tambah Driver</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col sm={6}>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>NIK</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan NIK"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Nama Driver</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>No KTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={no_ktp}
                        onChange={(e) => setNo_ktp(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Divisi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={divisi}
                        onChange={(e) => setDivisi(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>No SIM</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={no_sim}
                        onChange={(e) => setNo_sim(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Jenis SIM</Form.Label>
                      <Form.Select
                        type="text"
                        placeholder="Masukkan Jenis SIM"
                        value={jenis_sim}
                        onChange={(e) => setJenisSim(e.target.value)}
                        required
                      >
                        <option>-</option>
                        {JenisSimSelect && JenisSimSelect.map((item) => (
                          <option>{item.Jenis}</option>
                        ))}
                      </Form.Select>

                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Alamat</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={alamat}
                        onChange={(e) => setalamat(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Tanggal Lahir</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Masukkan Divisi"
                        value={tgl_lahir}
                        onChange={(e) => setTgl_lahir(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Agama</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={agama}
                        onChange={(e) => setAgama(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>No Telp</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Masukkan Divisi"
                        value={notelp1}
                        onChange={(e) => setNotelp1(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>No Telp 2</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Masukkan Divisi"
                        value={notelp2}
                        onChange={(e) => setNotelp2(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Masukkan Divisi"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Tanggal Masuk</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Masukkan Divisi"
                        value={tgl_masuk}
                        onChange={(e) => setTgl_masuk(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Tanggal SIM</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Masukkan Divisi"
                        value={TanggalSIMValue}
                        onChange={(e) => setTanggalSIMValue(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Vehicle Type</Form.Label>
                      <Select
                        options={VehicleOpstionsSelect}
                        onChange={(select) => {
                          setVehicleOptionsValue(select.label)
                        }}
                      />
                      {/* <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={nik}
                        onChange={(e) => setDivisi(e.target.value)}
                        required
                      /> */}
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Jenis Kepemilikan</Form.Label>
                      <Form.Select onChange={(e) => setJenisKepemilikanValue(e.target.value)}>
                        <option>-</option>
                        {JenisKepemilikan && JenisKepemilikan.map((item) => (
                          <option>{item.jenis}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Ukuran Seragam</Form.Label>
                      <Form.Select onChange={(e) => setUKSeragam(e.target.value)}>
                        <option>-</option>
                        {UkuranSeragam && UkuranSeragam.map((item) => (
                          <option>{item.ukuran}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Rekening Bank</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={RekeningBank}
                        onChange={(e) => setRekeningBank(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Nomor Rekening</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={RekeningNorek}
                        onChange={(e) => setRekeningNorek(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                </Row>
              </Modal.Body>
              {/* Upload Foto */}
              <Modal show={showUploadFoto} size="sm" onHide={handleCloses}>
                <Modal.Body>
                  <Modal.Header closeButton>
                  </Modal.Header>
                  <Row>
                    <Card>
                      <div>
                        <img src={DataDalamApi[0]?.gambar} alt="Deskripsi Gambar" />
                      </div>
                    </Card>
                    <Form.Label>Photo Driver</Form.Label>
                    <Form.Control
                      type="file"
                      // placeholder="Masukkan NIK"
                      // value={nik}
                      // onChange={(e) => setNik(e.target.value)}
                      required
                    />
                  </Row>
                </Modal.Body>
                <Row >
                  <Col className="d-flex justify-content-center">
                    <Button variant="primary" size="sm" onClick={() => driveradd()}>
                      Upload
                    </Button>
                  </Col>
                </Row>
              </Modal>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => {
                  // handleClose()
                  UploadFotoTombol()
                }}>
                  Save
                </Button>
                {/* <Button variant="primary" onClick={() => driveradd()}>
                  Upload Foto Driver
                </Button> */}
              </Modal.Footer>
            </Modal>

            {/* Edit Button */}
            <Modal show={editShow} size="lg" onHide={handleClose}>
              <Modal.Body>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Edit Driver{" "}
                    <span>
                      <Button size="sm" onClick={() => ondriver(selectedId)}>ON</Button>
                      <Button size="sm" variant="danger" onClick={() => droffiver(selectedId)}>
                        OFF
                      </Button>
                    </span>
                  </Modal.Title>
                </Modal.Header>
                <Row>
                  <Col sm={4}>
                    <Card>
                      <div>
                        <img src={DetailDataDriver?.driverImage} alt="Deskripsi Gambar" />
                      </div>
                    </Card>
                    <Form.Label>Photo Driver</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setGambarFoto(e.target.files[0])}
                      required
                    />

                  </Col>
                  <Col sm={4}>
                    <Form.Group>
                      <Form.Label>NIK</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={DetailDataDriver?.nik}
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Nama Driver</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={DetailDataDriver?.driverName}
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>No KTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={DetailDataDriver?.driverKtp}
                        value={no_ktp}
                        onChange={(e) => setNo_ktp(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Divisi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={DetailDataDriver?.division}
                        value={divisi}
                        onChange={(e) => setDivisi(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>No SIM</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={DetailDataDriver?.numberSim}
                        value={no_sim}
                        onChange={(e) => setNo_sim(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Jenis SIM</Form.Label>
                      <Form.Select
                        type="text"
                        // placeholder={DetailDataDriver?.simType}
                        value={jenis_sim}
                        onChange={(e) => setJenisSim(e.target.value)}
                        required
                      >
                        <option>{DetailDataDriver?.simType}</option>
                        {JenisSimSelect && JenisSimSelect.map((item) => (
                          <option>{item.Jenis}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Alamat</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={DetailDataDriver?.driverAddress}
                        value={alamat}
                        onChange={(e) => setalamat(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Tanggal Lahir</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Masukkan Divisi"
                        value={tgl_lahir}
                        onChange={(e) => setTgl_lahir(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Agama</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={DetailDataDriver?.driverReligion}
                        value={agama}
                        onChange={(e) => setAgama(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={4}>

                    <Col>
                      <Form.Group style={{ marginTop: '10px' }}>
                        <Form.Label>No Telp</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder={DetailDataDriver?.noTelp1}
                          value={notelp1}
                          onChange={(e) => setNotelp1(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group style={{ marginTop: '10px' }}>
                        <Form.Label>No Telp 2</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder={DetailDataDriver?.noTelp2}
                          value={notelp2}
                          onChange={(e) => setNotelp2(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group style={{ marginTop: '10px' }}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder={DetailDataDriver?.driverEmail}
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
                          value={tgl_masuk}
                          onChange={(e) => setTgl_masuk(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Tanggal SIM</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Masukkan Divisi"
                        value={TglStnkValue}
                        onChange={(e) => setTanggalSIMValue(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Vehicle Type</Form.Label>
                      <Select
                        placeholder={DetailDataDriver?.vehicle}
                        options={VehicleOpstionsSelect}
                        onChange={(select) => {
                          setVehicleOptionsValue(select.label)
                        }}
                      />
                      {/* <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={nik}
                        onChange={(e) => setDivisi(e.target.value)}
                        required
                      /> */}
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Jenis Kepemilikan</Form.Label>
                      <Form.Select onChange={(e) => setJenisKepemilikanValue(e.target.value)}>
                        <option >{DetailDataDriver?.jenisKepemilikan}</option>
                        {JenisKepemilikan && JenisKepemilikan.map((item) => (
                          <option value={item.jenis}>{item.jenis}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Ukuran Seragam</Form.Label>
                      <Form.Select onChange={(e) => setUKSeragam(e.target.value)}>
                        <option>-</option>
                        {UkuranSeragam && UkuranSeragam.map((item) => (
                          <option>{item.ukuran}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Rekening Bank</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={RekeningBank}
                        onChange={(e) => setRekeningBank(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px' }}>
                      <Form.Label>Nomor Rekening</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Divisi"
                        value={RekeningNorek}
                        onChange={(e) => setRekeningNorek(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      {/* <Form.Label>Keterangan</Form.Label>
                      <Form.Control
                        type="text  "
                        placeholder="Masukkan Divisi"
                        value={nik}
                        // onChange={(e) => setNik(e.target.value)}
                        required
                      /> */}
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            editdrivapier(selectedId)
                            UploadFoto(selectedId)
                          }}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>
            {(isLoading) ? (<img src={elogGif}></img>
            ) : (
              <DataTable
                columns={columns}
                data={DataDalamApi}
              // pagination
              // paginationServer
              // paginationTotalRows={totalData}
              // onChangePage={handlePageChange}
              />
            )}
            <div className="d-flex justify-content-end mt-3">
              <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={1}
                total={totalData}
                onChange={handlePageChange}
              />
            </div>

          </Col>
        </Row >
      </Card >
    </>
  );
}

export default CobaTables;
