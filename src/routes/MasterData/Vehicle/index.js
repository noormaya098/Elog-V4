import { Card } from "antd";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Index() {
  const [dataapigetvehicle, setDataapigetvehicle] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pagination, setPagination] = useState({
    totalData: 0,
    totalPage: 0,
    currentPage: 1,
    limit: 10,
  });

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

    // const page = getvehiCle.data.data.limit;
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
    },
    {
      name: "No Polisi",
      selector: (row) => row.policeNumber,
    },
    {
      name: "Kode Kendaraan",
      selector: (row) => row.vehicleCode,
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

  /// Create Vehicle
  const [namaDriver, setNamaDriver] = useState("");
  const [kode_kendaraan, setkode_kendaraan] = useState("");
  const [no_polisi, setno_polisi] = useState("");
  const [vendor, setvendor] = useState("");
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
  const [sebelumpilih, setsebelumpilih] = useState([]);
  const [pilihdrivers, setpilihdrivers] = useState([]);
  const createvehicle = async () => {
    const buatmobil = await axios.post(
      `${Baseurl}vehicle/create-vehicle`,
      {
        kode_kendaraan: kode_kendaraan,
        no_polisi: no_polisi,
        vendor: vendor,
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

      console.log("ini log", pilih);
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

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <Button variant="primary" size="sm" onClick={handleShow}>
              Add Vehicle
            </Button>
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
                      <Form.Label>Vendor</Form.Label>
                      <Form.Select
                        type="text"
                        placeholder="Masukkan Vendor"
                        value={vendor}
                        onChange={(e) => setvendor(e.target.value)}
                        required
                      >
                        <option>Pilih Mitra</option>
                        <option>Mitra</option>
                        <option>Eureka Logistik</option>
                      </Form.Select>
                      <Form.Label>Jenis Kendaraan</Form.Label>
                      <Form.Select
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
                      </Form.Select>

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
                      <Form.Label>Tanggal Beli</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Masukkan Tanggal Beli"
                        value={tgl_beli}
                        onChange={(e) => settgl_beli(e.target.value)}
                        required
                      />
                      <Form.Label>Panjang</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Panjang"
                        value={panjang}
                        onChange={(e) => setpanjang(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Lebar</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Kode Kendaran"
                      value={lebar}
                      onChange={(e) => setlebar(e.target.value)}
                      required
                    />
                    <Form.Label>Tinggi</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Tinggi"
                      value={tinggi}
                      onChange={(e) => settinggi(e.target.value)}
                      required
                    />
                    <Form.Label>No BPKB</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan No BPKB"
                      value={no_bpkb}
                      onChange={(e) => setno_bpkb(e.target.value)}
                      required
                    />
                    <Form.Label>Nama Driver</Form.Label>
                    <Form.Select
                      type="text"
                      placeholder="Masukkan STNK"
                      value={namaDriver}
                      onChange={(e) => setNamaDriver(e.target.value)}
                      required
                    >
                      <option>Pilih Driver</option>
                      {pilihdrivers.map((item, index) => (
                        <option key={index} value={item.driverId}>
                          {item.driverName}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Label>STNK</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan STNK"
                      value={stnk}
                      onChange={(e) => setstnk(e.target.value)}
                      required
                    />
                    <Form.Label>Tanggal STNK</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Masukkan Tanggal STNK"
                      value={tgl_stnk}
                      onChange={(e) => settgl_stnk(e.target.value)}
                      required
                    />
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
