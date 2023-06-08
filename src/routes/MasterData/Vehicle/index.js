import { Card } from "antd";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";

function Index() {
  const [namaDriver, setNamaDriver] = useState("");
  const [kode_kendaraan, setkode_kendaraan] = useState("");
  const [no_polisi, setno_polisi] = useState("");
  const [vendor, setvendor] = useState("");
  const [jenis_kendaraan, setjenis_kendaraan] = useState("");
  const [merk_mobil, setmerk_mobil] = useState("");
  const [tahun_mobil, settahun_mobil] = useState("");
  const [warna_plat, setwarna_plat] = useState([]);
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
  const [tgl_plat_nomor, setTgl_plat_nomor] = useState("");
  const [location, setlocation] = useState("");
  const [sebelumpilih, setsebelumpilih] = useState([]);
  const [pilihdrivers, setpilihdrivers] = useState([]);
  const [dataapigetvehicle, setDataapigetvehicle] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [detailDataVehicle, setDetailDataVehicle] = useState("")
  const [NoPolisiValue, setNoPolisiValue] = useState("")
  const [showVehicle, setshowVehicle] = useState(false);
  const handleCloseVehicle = () => setshowVehicle(false);
  const handleShowVehicle = () => setshowVehicle(true);
  const [pagination, setPagination] = useState({
    totalData: 0,
    totalPage: 0,
    currentPage: 1,
    limit: 10,
  });
  const [MitraOptions, setMitraOptions] = useState([])
  const [MitraValue, setMitraValue] = useState([])
  const [JenisMobil, setJenisMobil] = useState([])
  const [DriverName, setDriverName] = useState([])

  const getvehicleapi = async (page = 1) => {
    const getvehiCle = await axios.get(
      `${Baseurl}vehicle/get-vehicle?limit=10&page=${page}&keyword=`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
      }
    );

    /////select driver dan mitra



    const currentPage = getvehiCle.data.data.currentPage;
    setPagination({
      ...pagination,
      totalData: getvehiCle.data.data.totalData,
      totalPage: getvehiCle.data.data.totalPage,
      currentPage: getvehiCle.data.data.currentPage,
    });
    const dataapivehicle = getvehiCle.data.data.order.map((item) => ({
      no: item.no,
      vehicleId: item.vehicleId,
      driverId: item.driverId,
      vehicleCode: item.vehicleCode,
      policeNumber: item.policeNumber,
      vehicleType: item.vehicleType,
      driverName: item.driverName,
      vehicleImage: item.vehicleImage,
      vendor: item.vendor,
    }));
    console.log(dataapigetvehicle);
    setDataapigetvehicle(dataapivehicle);
  };
  useEffect(() => {
    getvehicleapi();
    selectdriver();
  }, []);
  const handlePageChange = async (page) => {
    setPagination({ ...pagination, currentPage: page });
    await getvehicleapi(page);
  };
  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "50px"
    },
    {
      name: "Kode Kendaraan",
      selector: (row) => row.vehicleCode,
      width: "130px"
    },
    {
      name: "No Polisi",
      selector: (row) => row.policeNumber,
      width: "130px"
    },
    {
      name: "Pemilik Armada",
      selector: (row) => row.vendor,
      width: "130px"
    },
    {
      name: "Jenis Kendaraan",
      selector: (row) => row.vehicleType,
      width: "130px"
    },
    {
      name: "Nama Supir",
      selector: (row) => row.driverName,
    },
    {
      name: "Edit Vehicle",
      selector: (row) => <Button onClick={() => modal(row.vehicleId)} size="sm" variant="danger">Edit</Button>
    },
  ];

  /// Create Vehicle

  const createvehicle = async () => {
    const buatmobil = await axios.post(
      `${Baseurl}vehicle/create-vehicle`,
      {
        kode_kendaraan: kode_kendaraan,
        no_polisi: no_polisi,
        vendor: MitraValue,
        jenis_kendaraan: jenis_kendaraan,
        merk_mobil: merk_mobil,
        tahun_mobil: tahun_mobil,
        warna_plat: warna_plat,
        tgl_beli: tgl_beli,
        panjang: panjang,
        lebar: lebar,
        tinggi: tinggi,
        no_bpkb: no_bpkb,
        stnk: stnk,
        tgl_stnk: tgl_stnk,
        kapasitas: kapasitas,
        kapasitas_maks: kapasitas_maks,
        kubikasi: kubikasi,
        location: location,
        id_driver: namaDriver,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
      }
    );
  };
  //// select driver

  const selectdriver = async (tipe) => {
    try {
      const selectdriver = await axios.get(
        `${Baseurl}vehicle/get-select?vehicleType=${tipe}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          },
        }
      );

      const pilih = selectdriver.data.data.driverType.map((item) => ({
        tipe: item.tipe,
      }));
      const pilihdriver = selectdriver.data.data.driverName.map((item) => ({
        driverName: item.driverName,
        driverId: item.driverId,
      }));

      // console.log("ini log", pilih);
      setsebelumpilih(pilih);
      setpilihdrivers(pilihdriver);
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sukses",
        });
      }
    }
  };

  const detailVicle = async (vehicleId) => {
    const data = await axios.get(`${Baseurl}vehicle/get-vehicle-detail?id=${vehicleId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }
      }
    )
    const datas = data.data.data
    setDetailDataVehicle(datas)
    setNoPolisiValue(data.data.data.no_polisi)
    console.log(`mitra`, datas);
  }

  useEffect(() => {
    detailVicle()
  }, [])

  const modal = (vehicleId) => {
    console.log(`idnya adalah`, vehicleId);
    handleShowVehicle(vehicleId)
    detailVicle(vehicleId)

  }
  useEffect(() => {
    if (showVehicle) {
      setkode_kendaraan(detailDataVehicle.kode_kendaraan || '');
      setno_polisi(detailDataVehicle.no_polisi || '');
      setvendor(detailDataVehicle.vendor);
      setjenis_kendaraan(detailDataVehicle.jenis_kendaraan);
      selectdriver(detailDataVehicle.jenis_kendaraan);
      setmerk_mobil(detailDataVehicle?.merk_mobil);
      settahun_mobil(detailDataVehicle.tahun_mobil);
      setwarna_plat(detailDataVehicle?.warna_plat);
      setTgl_plat_nomor(detailDataVehicle?.tgl_plat_nomor)
      settgl_beli(detailDataVehicle.tgl_beli);
      setpanjang(detailDataVehicle.panjang);
      setlebar(detailDataVehicle.lebar);
      settinggi(detailDataVehicle.tinggi);
      setno_bpkb(detailDataVehicle.no_bpkb === "" ? "Masukkan No BPKB" : detailDataVehicle.no_bpkb);
      setNamaDriver(detailDataVehicle.namaDriver === "" ? "Masukkan Nama Driver" : detailDataVehicle.namaDriver);
      setstnk(detailDataVehicle?.stnk === "" ? "Masukkan NO STNK" : detailDataVehicle.stnk);
      settgl_stnk(detailDataVehicle?.tgl_stnk);
      setkapasitas(detailDataVehicle?.kapasitas === "" ? "Masukkan Kapasitas" : detailDataVehicle?.kapasitas);
      setkapasitas_maks(detailDataVehicle?.kapasitas_maks === "" ? "Masukkan Kapasitas Max" : detailDataVehicle?.kapasitas_maks);
      setkubikasi(detailDataVehicle?.kubikasi);
      setlocation(detailDataVehicle?.location);
    }
  }, [showVehicle, detailDataVehicle]);

  const ButtonUpadateVehicle = async (id) => {
    try {
      const respons = await axios.post(`${Baseurl}vehicle/edit-vehicle`, {
        id: id,
        kode_kendaraan: kode_kendaraan,
        id_driver: "",
        no_polisi: no_polisi,
        id_vendor: "",
        vendor: MitraValue,
        id_kendaraan_jenis: "",
        jenis_kendaraan: jenis_kendaraan,
        merk_mobil: merk_mobil,
        tahun_mobil: tahun_mobil,
        tgl_plat_nomor: tgl_plat_nomor,
        warna_plat: warna_plat,
        tgl_beli: tgl_beli,
        panjang: panjang,
        lebar: lebar,
        tinggi: tinggi,
        no_bpkb: no_bpkb,
        stnk: stnk,
        tgl_stnk: tgl_stnk,
        kapasitas: kapasitas,
        kapasitas_maks: kapasitas_maks,
        kubikasi: kubikasi,
        tgl_kir: "tgl_kir",
        foto: null,
        tgl_update: "tglupdate",
        status: "status",
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          }
        }
      )
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert("Error 500: Internal Server Error");
      } else {
        alert("Terjadi kesalahan");
      }
    }
  }

  useEffect(() => {
    const Mitra = async () => {
      const data = await axios.get(`${Baseurl}vehicle/get-select?vehicleType=${jenis_kendaraan}`,
        // const data = await axios.get(`${Baseurl}sp/get-SP-select-2?vehicleType=${MitraValue}&mitra=&id=`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          },
        }
      )
      // console.log(`ini driverName`, data.data.data)
      setMitraOptions(data.data.data.mitra)
      setJenisMobil(data.data.data.driverType)
      setDriverName(data.data.data.driverName)
    }
    Mitra()
  }, [jenis_kendaraan])

  const MitraOptionss = MitraOptions.map((item) => ({
    value: item.id,
    label: item.mitra
  }))
  const MobilJenisOptionss = JenisMobil.map((item) => ({
    value: item.id,
    label: item.tipe
  }))

  const DriverNameOptionss = Array.isArray(DriverName)
    ? DriverName.map((item) => ({
      value: item.driverId,
      label: item.driverName
    }))
    : [];

  console.log("ini detailDataVehicle?.tgl_stnk", detailDataVehicle?.tgl_stnk);

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <Button variant="primary" size="sm" onClick={handleShow}>
              Add Vehicle
            </Button>
            {/* Modal Edit Driver */}
            <Modal show={showVehicle} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit vehicle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Kode Kendaraan</Form.Label>
                      <Form.Control
                        type="text"
                        value={kode_kendaraan}
                        onChange={(e) => setkode_kendaraan(e.target.value)}
                        placeholder="Masukkan kode kendaraan"
                        required
                      />
                      <Form.Label>No Polisi</Form.Label>
                      <Form.Control
                        type="text"
                        value={no_polisi}
                        onChange={(e) => setno_polisi(e.target.value)}
                        placeholder="Masukkan no polisi"
                        required
                      />
                      <Form.Label>Mitra</Form.Label>
                      <Select
                        options={MitraOptionss}
                        // value={detailDataVehicle.vendor}
                        onChange={(selectedOption) => {
                          setMitraValue(selectedOption.label)
                        }}
                      />

                      <Form.Label>Jenis Kendaraan</Form.Label>
                      <Select
                        options={MobilJenisOptionss}
                        onChange={(selectedOption) => {
                          setjenis_kendaraan(selectedOption.label)
                        }}
                      />
                      <Form.Label>Nama Driver</Form.Label>
                      <Select
                        options={DriverNameOptionss}
                        onChange={(selectedOption) => {
                          setNamaDriver(selectedOption.label)
                        }}
                      />
                      <Form.Label>Merk Mobil</Form.Label>
                      <Form.Control
                        type="text"
                        value={merk_mobil}
                        onChange={(e) => setmerk_mobil(e.target.value)}
                        required
                      />
                      <Form.Label>Tahun Mobil</Form.Label>
                      <Form.Control
                        type="text"
                        value={tahun_mobil}
                        onChange={(e) => settahun_mobil(e.target.value)}
                        required
                      />
                      <Form.Label>Warna Plat</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={warna_plat}
                        onChange={(e) => {
                          setwarna_plat(e.target.value)
                          console.log(e.target.value)
                        }}
                        required
                      />

                      <Row>
                        <Col sm={4}>
                          <Form.Label>Panjang</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder={detailDataVehicle?.panjang}
                            onChange={(e) => setpanjang(e.target.value)}
                            required
                          />
                        </Col>
                        <Col sm={4}>
                          <Form.Label>Lebar</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={detailDataVehicle?.lebar}
                            onChange={(e) => setlebar(e.target.value)}
                            required
                          />
                        </Col>
                        <Col sm={4}>
                          <Form.Label>Tinggi</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder={detailDataVehicle?.tinggi}
                            onChange={(e) => settinggi(e.target.value)}
                            required
                          />
                        </Col>
                      </Row>

                    </Form.Group>
                  </Col>
                  <Col sm={6}>

                    <Form.Label>No BPKB</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={detailDataVehicle?.no_bpkb == "" ? "Masukkan No BPKB" : detailDataVehicle.no_bpkb}
                      onChange={(e) => setno_bpkb(e.target.value)}
                      required
                    />

                    {/* <Form.Control
                      type="text"
                      placeholder={detailDataVehicle.namaDriver === "" ? "Masukkan Nama Driver" : detailDataVehicle.namaDriver}
                      onChange={(e) => setNamaDriver(e.target.value)}
                      required
                    >
                    </Form.Control> */}
                    <Form.Label>STNK</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={detailDataVehicle?.stnk === "" ? "Masukkan NO STNK" : detailDataVehicle.stnk}
                      onChange={(e) => setstnk(e.target.value)}
                      required
                    />
                    <Row>
                      <Col sm={6}>
                        <Form.Label>Tanggal Exp STNK</Form.Label>
                        <Form.Control
                          type="date"
                          value={detailDataVehicle?.tgl_stnk}
                          onChange={(e) => settgl_stnk(e.target.value)}
                          required
                        />
                      </Col>
                      <Col sm={6}>
                        <Form.Label>Tanggal Exp Plat Nomor</Form.Label>
                        <Form.Control
                          type="date"
                          value={tgl_plat_nomor}
                          onChange={(e) => setTgl_plat_nomor(e.target.value)}
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <Form.Label>Tanggal Exp Kir</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder={detailDataVehicle?.stnk === "" ? "Masukkan NO STNK" : detailDataVehicle.stnk}
                          onChange={(e) => setstnk(e.target.value)}
                          required
                        />
                      </Col>
                      <Col sm={6}>
                        <Form.Label>Tanggal Beli</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder={detailDataVehicle?.tgl_beli}
                          onChange={(e) => settgl_beli(e.target.value)}
                          required
                        />
                      </Col>

                    </Row>



                    <Form.Label>Kapasitas</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={detailDataVehicle?.kapasitas == "" ? "Masukkan Kapasitas" : detailDataVehicle?.kapasitas}
                      onChange={(e) => setkapasitas(e.target.value)}
                      required
                    />
                    <Form.Label>Kapasitas Max</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={detailDataVehicle?.kapasitas_maks == "" ? "Masukkan Kapasitas Max" : detailDataVehicle?.kapasitas_maks}
                      onChange={(e) => setkapasitas_maks(e.target.value)}
                      required
                    />
                    <Form.Label>Kubikasi</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={detailDataVehicle?.kubikasi}
                      onChange={(e) => setkubikasi(e.target.value)}
                      required
                    />
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Location"
                      value={detailDataVehicle?.location}
                      onChange={(e) => setlocation(e.target.value)}
                      required
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseVehicle}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => ButtonUpadateVehicle(detailDataVehicle?.id)}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>



            {/* Modal Driver Add */}
            <Modal show={show} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create vehicle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Kode Kendaraan</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Kode Kendaran"
                        value={kode_kendaraan}
                        onChange={(e) => setkode_kendaraan(e.target.value)}
                        required
                      />
                      <Form.Label>No Polisi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan No Polisi"
                        value={no_polisi}
                        onChange={(e) => setno_polisi(e.target.value)}
                        required
                      />
                      <Form.Label>Mitra</Form.Label>
                      <Select
                        options={MitraOptionss}
                        onChange={(selectedOption) => {
                          setMitraValue(selectedOption.label)
                        }}
                      />
                      <Form.Label>Jenis Kendaraan</Form.Label>
                      <Select
                        options={MobilJenisOptionss}
                        onChange={(selectedOption) => {
                          setjenis_kendaraan(selectedOption.label)
                        }}
                      />
                      <Form.Label>Nama Driver</Form.Label>
                      <Select
                        options={DriverNameOptionss}
                        onChange={(selectedOption) => {
                          setNamaDriver(selectedOption.label)
                        }}
                      />
                      {/* <Form.Select
                        type="text"
                        placeholder="Masukkan Jenis Kendaraan"
                        value={jenis_kendaraan}
                        onChange={(e) => {
                          setjenis_kendaraan(e.target.value);
                          selectdriver(e.target.value);
                        }}
                        required
                      >
                        <option>Pilih Jenis Kendaraan</option>
                        {sebelumpilih.map((item, index) => (
                          <option key={index}>{item.tipe}</option>
                        ))}
                      </Form.Select> */}

                      <Form.Label>Merk Mobil</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Merk Mobil"
                        value={merk_mobil}
                        onChange={(e) => setmerk_mobil(e.target.value)}
                        required
                      />
                      <Form.Label>Tahun Mobil</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Tahun Mobil"
                        value={tahun_mobil}
                        onChange={(e) => settahun_mobil(e.target.value)}
                        required
                      />
                      <Form.Label>Warna Plat</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Warna Plat"
                        value={warna_plat}
                        onChange={(e) => setwarna_plat(e.target.value)}
                        required
                      />
                      <Row>
                        <Col sm={4}>
                          <Form.Label>Panjang</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder={"Panjang"}
                            onChange={(e) => setpanjang(e.target.value)}
                            required
                          />
                        </Col>
                        <Col sm={4}>
                          <Form.Label>Lebar</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={"Lebar"}
                            onChange={(e) => setlebar(e.target.value)}
                            required
                          />
                        </Col>
                        <Col sm={4}>
                          <Form.Label>Tinggi</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder={"Tinggi"}
                            onChange={(e) => settinggi(e.target.value)}
                            required
                          />
                        </Col>
                      </Row>

                      {/* <Form.Label>Panjang</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Contoh 12 (harus angka)"
                        value={panjang}
                        onChange={(e) => setpanjang(e.target.value)}
                        required
                      /> */}
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                  <Form.Label>No BPKB</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan No BPKB"
                      value={no_bpkb}
                      onChange={(e) => setno_bpkb(e.target.value)}
                      required
                    />
                    <Form.Label>STNK</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan STNK"
                      value={stnk}
                      onChange={(e) => setstnk(e.target.value)}
                      required
                    />
                    <Row>
                      <Col sm={6}>
                        <Form.Label>Tanggal Exp STNK</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Masukkan Tanggal Beli"
                          value={tgl_beli}
                          onChange={(e) => settgl_beli(e.target.value)}
                          required
                        />
                        </Col>
                         <Col sm={6}>
                        <Form.Label>Tanggal Exp Plat Nomor</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Masukkan Tanggal STNK"
                          value={tgl_stnk}
                          onChange={(e) => settgl_stnk(e.target.value)}
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <Form.Label>Tanggal Exp Kir</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Masukkan Tanggal Beli"
                          value={tgl_beli}
                          onChange={(e) => settgl_beli(e.target.value)}
                          required
                        />
                        </Col>
                         <Col sm={6}>
                        <Form.Label>Tanggal Beli</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Masukkan Tanggal STNK"
                          value={tgl_stnk}
                          onChange={(e) => settgl_stnk(e.target.value)}
                          required
                        />
                      </Col>
                    </Row>


                   

                    <Form.Label>Kapasitas</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Kapasitas"
                      value={kapasitas}
                      onChange={(e) => setkapasitas(e.target.value)}
                      required
                    />
                    <Form.Label>Kapasitas Max</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Kapasitas Max"
                      value={kapasitas_maks}
                      onChange={(e) => setkapasitas_maks(e.target.value)}
                      required
                    />
                    <Form.Label>Kubikasi</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Kubikasi"
                      value={kubikasi}
                      onChange={(e) => setkubikasi(e.target.value)}
                      required
                    />
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Location"
                      value={location}
                      onChange={(e) => setlocation(e.target.value)}
                      required
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => createvehicle()}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <DataTable
              columns={columns}
              data={dataapigetvehicle}
              pagination
              paginationServer
              paginationTotalRows={pagination.totalData}
              onChangePage={handlePageChange}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Index;
