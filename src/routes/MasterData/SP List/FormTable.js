// FormTable.js
import React from "react";
import { Col, Row, Form, Button, Table, Modal } from "react-bootstrap";
import { Card, Checkbox, Tag } from "antd";
import { useState, useEffect } from "react";
import Baseurl from "../../../Api/BaseUrl";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";
import Token from "../../../Api/Token";
import mobil from "../../redux toolkit/store/ZustandStore";
import { Alert, Space } from 'antd';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const jobdesk = localStorage.getItem("jobdesk");
function FormTable({ isidata, totalPrice, idmp, IsiDataSPSemua }) {
  const [jobdesk, setJobdesk] = useState(localStorage.getItem("jobdesk"));
  const [mitraVehicle, setMitraVehicle] = useState([]);
  const [types, setType] = useState([]);
  const [nomorpolisi, setNomorPolisi] = useState([]);
  const [NomorPolisi2, setNomorPolisi2] = useState([])
  const [isidaSementara, setIsidaSementara] = useState([])
  const [selectnomor, setSelectnomor] = useState([]);
  const [selectnomor2, setSelectnomor2] = useState([]);
  const [selectnopol, setSelectNopol] = useState([]);
  const [selectMitra, setSelectMitra] = useState([]);
  const [selectMitra2, setSelectMitra2] = useState([]);
  const [approved, setApproved] = useState([]);
  const [selectDriver, setselectDriver] = useState([]);
  const [selectDriver2, setselectDriver2] = useState([]);
  const [idsupir, setIdsupir] = useState([]);
  const [idUnit, setIdunit] = useState([]);
  const [idUnit2, setIdunit2] = useState([]);
  const [idUnit3, setIdunit3] = useState([]);
  const [bukaanother, setBukaanother] = useState(false);
  const [driveranother, setDriveranother] = useState([]);
  const [selectanotherrvalue, setSelectanotherrvalue] = useState([]);
  const { isidetail, setSpDetail } = mobil((state) => ({
    isidetail: state.isidetail,
    setSpDetail: state.setSpDetail,
  }));
  const { isiduit, setDuit } = mobil((state) => ({
    isiduit: state.isiduit,
    setDuit: state.setDuit,
  }));
  const { custumer, setCustumer } = mobil((state) => ({
    custumer: state.custumer,
    setCustumer: state.setCustumer,
  }));
  const { jenisBarang, setjenisBarang } = mobil((state) => ({
    jenisBarang: state.jenisBarang,
    setjenisBarang: state.setjenisBarang,
  }));
  const { kodekendaraan1, setkodekendaraan1 } = mobil((state) => ({
    kodekendaraan1: state.kodekendaraan1,
    setkodekendaraan1: state.setkodekendaraan1,
  }));
  const { IsiKomenRejectSP, setIsiKomenRejectSP } = mobil((state) => ({
    IsiKomenRejectSP: state.IsiKomenRejectSP,
    setIsiKomenRejectSP: state.setIsiKomenRejectSP
  }))
  const { orderdate, setOrderdate, asuransi, setAsuransi } = mobil();
  useEffect(() => {
    setType(isidetail.map((item) => item?.kendaraan));
  }, [isidetail]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [IDMPD, setIDMPD] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState(0);

  const { mitra1, setmitra1 } = mobil((state) => ({
    mitra1: state.mitra1,
    setmitra1: state.setmitra1,
  }));
  const { mitra2, setmitra2 } = mobil((state) => ({
    mitra2: state.mitra2,
    setmitra2: state.setmitra2,
  }))
  const [idmitraini, setidmitraini] = useState([])
  const [idmitraini2, setidmitraini2] = useState([])
  //////////////////
  const [mitraFix, setMitraFix] = useState([])
  const [NomorFix, setNomorFix] = useState([])
  const [NomorFix2, setNomorFix2] = useState([])
  const [NamaDriverFix, setNamaDriverFix] = useState([])
  const [NamaDriverFix2, setNamaDriverFix2] = useState([])
  const [KodeKendaraanOps, setKodeKendaraanOps] = useState([])
  const { SJKosongModal, setSJKosongModal } = mobil((state) => ({
    SJKosongModal: state.SJKosongModal,
    setSJKosongModal: state.setSJKosongModal,
  }));
  const [Mitra1Multi, setMitra1Multi] = useState([])
  const [StatusApproveAct, setStatusApproveAct] = useState("")
  const [TanggalACT3, setTanggalACT3] = useState("")
  const [StatusApproveOpt, setStatusApproveActOpt] = useState("")


  const history = useHistory()

  ////checkbox multi
  const handleCheckboxChange = (event) => {
    setCheckboxValue(event.target.checked ? 1 : 0);
  };


  ///select driver
  useEffect(() => {
    const vehicle = async () => {
      let url = `${Baseurl}sp/get-SP-select-2?vehicleType=${types[0]}&mitra=${mitra1}&id=${selectnomor}`;

      const sleet = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const nomorpolisis = sleet.data.data.vehicle;
      const drivernya = sleet.data.data.Driver;
      setMitraFix(sleet.data.data.mitra)
      setNomorFix(sleet.data.data.vehicle)
      setNamaDriverFix(sleet.data.data.Driver)
      // console.log(`ini driver`, sleet.data.data);
      setselectDriver(drivernya);
      setNomorPolisi(nomorpolisis);
    };

    if (types.length > 0) {
      vehicle();
    }

  }, [types, selectnomor, mitra1, selectnomor2,]);  // pastikan Anda memasukkan semua variabel yang Anda gunakan sebagai dependensi useEffect

  // console.log(`ini NamaDriverFix`, NomorFix2);

  // if (isidata[0]?.via != "") {
  //   setTimeout(() => {
  //     return (Swal.fire({
  //       icon: 'error',
  //       title: 'Data SP belum Lengkap',
  //       text: 'Silahkan Hubungi Marketing!',
  //     }))
  //   }, 1500);

  // } else {
  //   console.log(`ada`)
  // }
  // }, [isidata]);
  const validasi = () => {
    const iniaapa = "ksoong"
  }



  useEffect(() => {
    const vehicle = async () => {
      let url = `${Baseurl}sp/get-SP-select-2?vehicleType=${types[0]}&mitra=${mitra2}&id=${selectnomor2}`;

      const sleet = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      setNomorFix2(sleet.data.data.vehicle)
      setNamaDriverFix2(sleet.data.data.Driver)
      // const nomorpolisis = sleet.data.data.vehicle;
      // const drivernya = sleet.data.data.Driver;
    };

    if (types.length > 0) {
      vehicle();
    }
  }, [types, selectnomor, mitra2, selectnomor2]);  // pastikan Anda memasukkan semua variabel yang Anda gunakan sebagai dependensi useEffect

  // console.log(`ini NamaDriverFix2`, NamaDriverFix2);
  ///// approve op
  useEffect(() => {
    const vehicle = async () => {
      let url = `${Baseurl}sp/get-SP-select-2?vehicleType=${types[0]}&mitra=1&id=${selectnomor}`;

      const sleet = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(sleet.data?.data.vehicle);
      setKodeKendaraanOps(sleet.data?.data.vehicle)
    };

    if (types.length > 0) {
      vehicle();
    }
  }, [types, selectnomor, mitra1, selectnomor2]);


  useEffect(() => {
    const anotherdriver = async () => {
      const another = await axios.get(`${Baseurl}sp/another-driver`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
      });
      const driveranotders = another.data.data;
      setDriveranother(driveranotders);
      setIsiKomenRejectSP()
    };

    anotherdriver();
  }, []);

  ///tombol approve
  const HandleApproveOPS = (idmpd) => {
    const body = {
      id_mpd: IDMPD,
      id_mp: idmp,
      id_unit: selectnomor,
      id_supir: selectDriver[0]?.idUnit ? selectDriver[0]?.idUnit : idUnit,
      nama_supir: selectDriver[0]?.name ? selectDriver[0]?.name : idUnit,
      id_mitra: 1,
      id_mitra_pickup: 1,
      id_mitra_2: 1,
      plat_nomor: selectnopol,
      merk: types[0],
      is_multi: checkboxValue,
    };

    axios
      .post(`${Baseurl}sp/approve-SP`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const isidata = response.data.status;
        setApproved(isidata);
        console.log(`data approve`, approved);

        // Display success alert
        Swal.fire({
          icon: "success",
          title: "Approval Successful",
          text: "The approval process has been completed successfully.",
        });
        window.location.reload()
        handleClose();
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  // console.log(`ini idUnit`, idUnit);

  ///tombol approve
  const HandleApprovePURCH = (idmpd) => {
    const body = {
      // id_mp: idmp,
      // id_mpd: IDMPD,
      // id_unit: selectDriver[0]?.idUnit,
      // id_supir: selectnomor,
      // id_mitra: selectMitra,
      // id_mitra_pickup: ``,
      // id_mitra_2: ``,
      // plat_nomor: selectnopol,
      // merk: types[0],
      id_mp: idmp,
      id_mpd: IDMPD,
      id_unit: selectDriver[0]?.idUnit ? selectDriver[0]?.idUnit : idUnit,
      id_unit_2: selectnomor,
      id_unit_3: selectnomor2,
      id_driver: selectDriver?.[0]?.idUnit,
      id_driver_2: idUnit,
      id_driver_3: idUnit2,
      id_mitra_pickup: 1,
      id_mitra: mitra1,
      id_mitra_2: mitra1,
      id_mitra_3: mitra2,
    };

    axios
      .post(`${Baseurl}sp/approve-SP-purch`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const isidata = response.data.status;
        setApproved(isidata);
        // console.log(`data approve`, approved);

        // Display success alert
        Swal.fire({
          icon: "success",
          title: "Approval Successful",
          text: "The approval process has been completed successfully.",
        });
        handleClose();
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  const handleAnotherDriverClick = () => {
    setBukaanother(true);
    setBukaanother(!bukaanother);
  };

  ///sp reject operasional
  const rejectsp = async () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const body = {
            id_mp: idmp,
          };
          const data = await axios.post(`${Baseurl}sp/decline-SP`, body, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          });
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data telah di reject",
          });
          window.location.reload()
        } catch (error) {
          // Menampilkan SweetAlert gagal
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan dalam memproses data.",
          });
          console.error(error);
        }
      }
    })
  };

  //// reject sp akunting
  const rejectspAkunting = async () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const body = {
            id_mp: idmp,
          };
          const data = await axios.post(`${Baseurl}sp/reject-SP-akunting`, body, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          });
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data telah di reject",
          });
          window.location.reload()
        } catch (error) {
          // Menampilkan SweetAlert gagal
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan dalam memproses data.",
          });
          console.error(error);
        }
      }
    })
  };
  const [vehicletype, setvehicletype] = useState("")

  const mitraOptions = mitraFix.map((item) => ({
    value: item.id,
    label: item.mitra,
    mitraId: item.mitraId,
  }));
  const kodeKendaraanOptions = Array.isArray(NomorFix) ? NomorFix.map((item) => ({
    value: item.id,
    label: item.no_polisi,
    kd_kendaraan: item.kd_kendaraan
  })) : [];
  const kodeKendaraanOptions2 = Array.isArray(NomorFix2) ? NomorFix2.map((item) => ({
    value: item.id,
    label: item.no_polisi,
    kd_kendaraan: item.kd_kendaraan
  })) : [];
  const nomorpolisiOptions = Array.isArray(KodeKendaraanOps) ? KodeKendaraanOps.map((item) => ({
    value: item.id,
    label: item.no_polisi,
    kd_kendaraan: item.kd_kendaraan
  })) : [];

  const anotneroptionsdriver = Array.isArray(driveranother) ? driveranother.map((item) => ({
    value: item.id,
    label: item.name,
    kd_kendaraan: item.kd_kendaraan
  })) : [];
  // const nomorpolisiOptions = nomorpolisi.filter(item => item.mitra === mitra1).map(item => ({
  //   value: item.driverId,
  //   label: item.no_polisi,
  // }));
  // const nomorpolisiOptions2 = NomorPolisi2.filter(item => item.mitra === mitra2).map(item => ({
  //   value: item.driverId,
  //   label: item.no_polisi,
  // }));

  useEffect(() => {
    const handleStorageChange = () => {
      setJobdesk(localStorage.getItem("jobdesk"));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const approvebaru = (idMpd) => {
    setIDMPD(idMpd)
    handleShow()
    HandleApproveOPS(idMpd)
    // HandleApprovePURCH(idMpd)
  }


  ////ini approve akunting
  const akuntingAprpove = async () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda ingin menyetujui?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, setujui!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${Baseurl}sp/approve-SP-akunting`,
          {
            id_mp: idmp
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        )
          .then(response => {
            const data = response.data;
            Swal.fire(
              'Sukses!',
              'Berhasil disetujui.',
              'success'
            );
          })
          setTimeout(() => {
            window.location.reload()
          }, 1500)
          .catch(error => {
            Swal.fire(
              'Gagal!',
              'Terjadi kesalahan saat menyetujui.',
              'error'
            );
          });
      }
    })
  }
  let counter = 1


  ////select nomor polisi sama nama driver
  // const options = nomorpolisi.map(vehicle => ({
  //   value: vehicle.id,
  //   label: vehicle.no_polisi + "-" + vehicle.kd_kendaraan
  // }));
  // const options2 = NomorPolisi2.map(vehicle => ({
  //   value: vehicle.id,
  //   label: vehicle.no_polisi + "-" + vehicle.kd_kendaraan
  // }));

  const handleSelectChange = selectedOption => {
    if (selectedOption) {
      setSelectnomor(selectedOption.value);

      const selectedVehicle = nomorpolisi.find((vehicle) => vehicle.id === selectedOption.value);
      if (selectedVehicle) {
        setSelectNopol(selectedVehicle.no_polisi);
      }
    }
  };


  ////// approve sp purchasing 3



  localStorage.setItem(`mitra1`, mitra1)
  localStorage.setItem(`kendaraan`, types[0])
  localStorage.setItem(`idkodekendaraan1`, selectnomor)
  localStorage.setItem(`IdDriver`, idUnit)
  localStorage.setItem(`mitra2`, mitra2)
  localStorage.setItem(`idkodekendaraan2`, selectnomor2)
  localStorage.setItem(`IdDriver2`, idUnit2)

  // console.log(`isi Mitra1Multi?.driverName `, Mitra1Multi?.driverName);
  // const [isisp , setisisp]= useState("")
  // useEffect(()=>{
  //   if (isidata[0] ) {
  //     setisisp(isidata[0]?.sp)
  //   } else {
  //     setisisp("ksoong")
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'SP tidak tersedia!',
  //     });
  //   }
  // })


  //// ngambil mitra 1 kalau multi 

  const MitraMulti = async () => {
    try {
      const data = await axios.get(`${Baseurl}sp/get-SP-detail-purch?id_mp=${idmp}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
      );
      // console.log(`ini mitra 1`, data.data.data[0]);
      setMitra1Multi(data.data.data[0])

    } catch (error) {

    }
  };
  useEffect(() => {
    MitraMulti()
    AmbilStatusApprove()
  }, [StatusApproveAct])


  ////ambil status approve
  const AmbilStatusApprove = async () => {
    try {
      const data = await axios.get(`${Baseurl}sp/get-status-approve?id_mp=${idmp}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }
      }
      )
      setStatusApproveAct(data.data.status.message.act_akunting)
      setStatusApproveActOpt(data.data.status.message.kendaraan_operasional)
      setTanggalACT3(data.data.status.message.tgl_act_3)
      console.log(`ini status`, StatusApproveAct);
    } catch (error) {

    }
  };
  return (
    <>
      <Row>

        <div className="d-flex justify-content-end">
          {(jobdesk == "operasional") && (
            <>
              {(jobdesk != "purchasing" && jobdesk != "operasional") && (
                <>
                  <Button size="sm" onClick={() => jobdesk === "akunting" ? akuntingAprpove() : handleShow()}>
                    Approve
                  </Button>
                </>
              )}
              <Modal show={show} onHide={handleClose} size="md" >
                <Modal.Header closeButton>
                  <Modal.Title>Approve {jobdesk}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {jobdesk == "operasional" && (<>
                    <Row>
                      <Col sm={12}>
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Select
                          type="text"
                          disabled
                          value={types[0] || ""}
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        >
                          {types.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                    <Row>

                      <Col sm={12}>
                        <Form.Label>Kode Kendaraan</Form.Label>
                        {/* <Select
                          // options={options}
                          onChange={handleSelectChange}
                        /> */}
                        <Select
                          options={nomorpolisiOptions}
                          onChange={(selectedOption) => {
                            console.log(`kode kendaraan`, selectedOption.value);
                            setSelectnomor(selectedOption.value);
                            setSelectNopol(selectedOption.label);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>

                      <Col sm={12}>
                        <Form.Label>Select Driver</Form.Label>
                        <Form.Select

                          value={selectDriver[0]?.idUnit}
                          onChange={(e) => {
                            console.log(`awo`, e.target.value);
                            setIdunit(e.target.value);
                          }}
                        >
                          <option value={selectDriver[0]?.idUnit}>
                            {selectDriver[0] && selectDriver[0]?.name != "" ? selectDriver[0] && selectDriver[0]?.name : "tidak tersedia"}
                          </option>
                          console.log(selectDriver[0]?.idUnit);
                        </Form.Select>
                      </Col>
                    </Row>
                  </>)}

                  {/* Bukan operasional */}
                  {jobdesk != "operasional" && (<>
                    <Row>
                      <Col sm={3}>
                        {jobdesk == "purchasing" ? (
                          <>
                            <Form.Label>Select Mitra 1</Form.Label>
                            <Select
                              options={mitraOptions}
                              onChange={(mitraOptions) => {
                                setSelectMitra(mitraOptions.value);
                              }}
                            />
                          </>
                        ) : null}
                      </Col>

                      <Col sm={3}>

                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Select
                          type="text"
                          disabled
                          value={types[0] || ""}
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        >
                          {types.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Kode Kendaraan</Form.Label>
                        <Select
                          // options={nomorpolisiOptions}
                          onChange={(selectedOption) => {
                            console.log(`kode kendaraan`, selectedOption.value);
                            setSelectnomor(selectedOption.value);
                            setSelectNopol(selectedOption.label);
                          }}
                        />
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Select Driver</Form.Label>
                        <Form.Select

                          value={selectDriver[0]?.id}
                          onChange={(e) => {
                            console.log(`awo`, e.target.value);
                            setIdunit(e.target.value);
                          }}
                        >
                          <option value={selectDriver[0]?.id}>
                            {selectDriver[0] && selectDriver[0]?.name != "" ? selectDriver[0] && selectDriver[0]?.name : "tidak tersedia"}
                          </option>
                        </Form.Select>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={3}>
                        {jobdesk == "purchasing" ? (
                          <>
                            <Form.Label>Select Mitra 2</Form.Label>
                            <Select
                              options={mitraOptions}
                              onChange={(mitraOptions) => {
                                setSelectMitra(mitraOptions.value);
                              }}
                            />
                          </>
                        ) : null}
                      </Col>

                      <Col sm={3}>
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Select
                          type="text"
                          disabled
                          value={types[0] || ""}
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        >
                          {types.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Kode Kendaraan</Form.Label>
                        <Select
                          // options={nomorpolisiOptions}
                          onChange={(selectedOption) => {
                            console.log(`kode kendaraan`, selectedOption.value);
                            setSelectnomor(selectedOption.value);
                            setSelectNopol(selectedOption.label);
                          }}
                        />
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Select Driver</Form.Label>
                        <Form.Select
                          value={selectDriver[0]?.id}
                          onChange={(e) => {
                            console.log(`awo`, e.target.value);
                            setIdunit2(e.target.value);
                          }}
                        >
                          <option value={selectDriver[0]?.id}>
                            {selectDriver[0] && selectDriver[0]?.name != "" ? selectDriver[0] && selectDriver[0]?.name : "tidak tersedia"}
                          </option>
                        </Form.Select>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={3}>
                        {jobdesk == "purchasing" ? (
                          <>
                            <Form.Label>Select Mitra 3</Form.Label>
                            <Select
                              options={mitraOptions}
                              onChange={(mitraOptions) => {
                                setSelectMitra(mitraOptions.value);
                              }}
                            />
                          </>
                        ) : null}
                      </Col>

                      <Col sm={3}>
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Select
                          type="text"
                          disabled
                          value={types[0] || ""}
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        >
                          {types.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Kode Kendaraan</Form.Label>
                        <Select
                          // options={nomorpolisiOptions}
                          onChange={(selectedOption) => {
                            console.log(`kode kendaraan`, selectedOption.value);
                            setSelectnomor(selectedOption.value);
                            setSelectNopol(selectedOption.label);
                          }}
                        />
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Select Driver</Form.Label>
                        <Form.Select

                          value={selectDriver[0]?.id}
                          onChange={(e) => {
                            console.log(`awo`, e.target.value);
                            setIdunit(e.target.value);
                          }}
                        >
                          <option value={selectDriver[0]?.id}>
                            {selectDriver[0] && selectDriver[0]?.name != "" ? selectDriver[0] && selectDriver[0]?.name : "tidak tersedia"}
                          </option>
                        </Form.Select>
                      </Col>
                    </Row>
                  </>)}
                  <>
                    {jobdesk != "purchasing" ? (
                      <Checkbox
                        className="justify-content-end d-flex"
                        onChange={handleCheckboxChange}
                      >
                        Multi
                      </Checkbox>
                    ) : null}

                    <br />
                    <hr />

                    <Button size="sm" onClick={() => handleAnotherDriverClick()}>
                      another driver
                    </Button>
                    <br />
                    {bukaanother && (
                      <>
                        <Form.Label>Select Driverssss</Form.Label>
                        <Form.Select onChange={(e) => setIdunit(e.target.value)}>
                          <option>Select Driver</option>
                          {driveranother &&
                            driveranother.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item?.name}
                              </option>
                            ))}
                        </Form.Select>
                      </>
                    )}
                  </>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      jobdesk == "operasional"
                        ? HandleApproveOPS()
                        : HandleApprovePURCH()
                    }
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

            </>
          )}
          {IsiKomenRejectSP === "Tidak Menggunakan unit" ? (
            <Alert type="error" message="SP Sudah Di Reject" banner />
          ) : (
            <>
              {(jobdesk !== "purchasing" && jobdesk !== "operasional" && StatusApproveAct !== 'Y' && TanggalACT3 == null) && (
                <Button size="sm" onClick={() => jobdesk === "akunting" ? akuntingAprpove() : handleShow()}>
                  Approve
                </Button>
              )}
              {(StatusApproveAct !== 'Y' && TanggalACT3 === null) &&
                <Button size="sm" variant="danger" onClick={() => jobdesk === "akunting" ? rejectspAkunting() : rejectsp()}>
                  Reject SP
                </Button>
              }
              {(StatusApproveAct === 'Y') &&
                <Alert type="success" message="SP Telah di Approve" banner />
              }
              {(StatusApproveAct === 'N' &&  TanggalACT3 !== null) &&
                 <Alert type="error" message="SP Sudah Di Reject" banner />
              }
            </>
          )}


        </div>
        {(jobdesk != "operasional" && (
          <>

            <Modal show={show} onHide={handleClose} size="lg" >
              <Modal.Header closeButton>
                <Modal.Title>Approve {jobdesk}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {jobdesk == "operasional" && (<>
                  <Row>
                    <Col sm={12}>
                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Select
                        type="text"
                        disabled
                        value={types[0] || ""}
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                      >
                        {types.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>

                    <Col sm={12}>
                      <Form.Label>Kode Kendaraan</Form.Label>
                      <Select
                        // options={nomorpolisiOptions}
                        onChange={(selectedOption) => {
                          console.log(`kode kendaraan`, selectedOption.value);
                          setSelectnomor(selectedOption.value);
                          setSelectNopol(selectedOption.label);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>

                    <Col sm={12}>
                      <Form.Label>Select Driver</Form.Label>
                      <Form.Select

                        value={selectDriver[0]?.id}
                        onChange={(e) => {
                          console.log(`awo`, e.target.value);
                          setIdunit(e.target.value);
                        }}
                      >
                        <option value={selectDriver[0]?.id}>
                          {selectDriver[0] && selectDriver[0]?.name != "" ? selectDriver[0] && selectDriver[0]?.name : "tidak tersedia"}
                        </option>
                      </Form.Select>
                    </Col>
                  </Row>
                </>)}

                {/* purchasing */}

                {jobdesk != "operasional" && (<>
                  <Row>
                    <Col sm={3}>
                      {jobdesk === "purchasing" && (
                        <>
                          <Form.Label>Select Mitra 1</Form.Label>
                          <Form.Select
                            disabled
                            value={Mitra1Multi?.driverName || ''}
                            onChange={() => { }}
                          >
                            {Mitra1Multi && (
                              <option value={Mitra1Multi.driverName}>
                                {Mitra1Multi.driverName}
                              </option>
                            )}
                          </Form.Select>
                        </>
                      )}
                    </Col>


                    <Col sm={3}>
                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Select
                        type="text"
                        disabled
                        value={Mitra1Multi?.tipeKendaraan}
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                      >
                        {types.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col sm={3}>
                      <Form.Label>Kode Kendaraan</Form.Label>
                      <Form.Select
                        disabled
                        value={Mitra1Multi?.unit}
                      >
                        Mitra1Multi && (
                        <option value={Mitra1Multi?.unit}>
                          {Mitra1Multi?.unit}
                        </option>
                        )
                      </Form.Select>
                    </Col>
                    <Col sm={3}>
                      <Form.Label>Select Driver</Form.Label>
                      <Form.Select
                        disabled
                        value={Mitra1Multi?.driverName || ''}
                        onChange={(e) => {
                          setIdunit3(e.target.value);
                        }}
                      >
                        {Mitra1Multi && (
                          <option value={Mitra1Multi.driverName}>
                            {Mitra1Multi.driverName}
                          </option>
                        )}
                      </Form.Select>
                    </Col>
                    <Col sm={3}>
                      {jobdesk == "purchasing" ? (
                        <>
                          <Form.Label>Select Mitra 2</Form.Label>
                          <Select
                            options={mitraOptions}
                            onChange={(mitraOptions) => {
                              setmitra1(mitraOptions.value);
                              setidmitraini(mitraOptions.mitraId)
                            }}
                          />
                        </>
                      ) : null}
                    </Col>

                    <Col sm={3}>

                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Select
                        type="text"
                        disabled
                        value={types[0] || ""}
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                      >
                        {types.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col sm={3}>
                      <Form.Label>Kode Kendaraan</Form.Label>
                      <Select
                        options={kodeKendaraanOptions}
                        onChange={(selectedOption) => {
                          console.log(`kode kendaraan`, selectedOption.value);
                          setSelectnomor(selectedOption.value);
                          setSelectNopol(selectedOption.label);
                        }}
                      />

                    </Col>
                    <Col sm={3}>
                      <Form.Label>Select Driver</Form.Label>
                      <Select
                        options={anotneroptionsdriver}
                        onChange={(selectedOption) => {
                          console.log(`kode kendaraan`, selectedOption.value);
                          setIdunit(selectedOption.value);
                          setSelectNopol(selectedOption.label);
                        }}
                      />
                      {/* <Form.Select

                        value={selectDriver[0]?.idUnit}
                        onChange={(e) => {
                          console.log(`awo`, e.target.value);
                          setIdunit(e.target.value);
                        }}
                      >
                        <option value={selectDriver[0]?.idUnit}>
                          {selectDriver[0] && selectDriver[0]?.name != "" ? selectDriver[0] && selectDriver[0]?.name : "tidak tersedia"}
                        </option>
                      </Form.Select> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3}>
                      {jobdesk == "purchasing" ? (
                        <>
                          <Form.Label>Select Mitra 3</Form.Label>
                          <Select
                            options={mitraOptions}
                            onChange={(mitraOptions) => {
                              setmitra2(mitraOptions.value);
                              setidmitraini2(mitraOptions.mitraId)
                            }}
                          />
                        </>
                      ) : null}
                    </Col>

                    <Col sm={3}>
                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Select
                        type="text"
                        disabled
                        value={types[0] || ""}
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                      >
                        {types.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col sm={3}>
                      <Form.Label>Kode Kendaraan</Form.Label>
                      <Select
                        options={kodeKendaraanOptions2}
                        onChange={(selectedOption) => {
                          console.log(`kode kendaraan`, selectedOption.value);
                          setSelectnomor2(selectedOption.value);
                          setSelectNopol(selectedOption.label);
                        }}
                      />

                    </Col>
                    <Col sm={3}>
                      <Form.Label>Select Driver</Form.Label>
                      <Select
                        options={anotneroptionsdriver}
                        onChange={(selectedOption) => {
                          console.log(`kode kendaraan`, selectedOption.value);
                          setIdunit2(selectedOption.value);
                          setSelectNopol(selectedOption.label);
                        }}
                      />
                      {/* <Form.Select
                        value={NamaDriverFix2[0]?.idUnit}
                        onChange={(e) => {
                          console.log(`awo`, e.target.value);
                          setIdunit2(e.target.value);
                        }}
                      >
                         <option value={NamaDriverFix2[0]?.idUnit}>
                            {NamaDriverFix2[0] && NamaDriverFix2[0]?.name != "" ? NamaDriverFix2[0] && NamaDriverFix2[0]?.name : "tidak tersedia"}
                          </option>
                      </Form.Select> */}
                    </Col>
                  </Row>
                  <Row>

                  </Row>
                </>)}
                <>
                  {jobdesk != "purchasing" ? (
                    <Checkbox className="justify-content-end d-flex">
                      Multi
                    </Checkbox>
                  ) : null}

                  <br />
                  {/* <hr /> */}
                  {/* Purchasing Another Button */}
                  {/* <Button size="sm" onClick={() => handleAnotherDriverClick()}>
                    another driver
                  </Button> */}
                  <br />
                  {bukaanother && (
                    <>
                      <Form.Label>Select Driver</Form.Label>
                      <Form.Select onChange={(e) => setIdunit(driveranother.name)}>
                        <option>Select Driver</option>
                        {driveranother &&
                          driveranother.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item?.name}
                            </option>
                          ))}
                      </Form.Select>
                    </>
                  )}
                </>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    jobdesk == "operasional"
                      ? HandleApproveOPS()
                      : HandleApprovePURCH()
                  }
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ))}
        <Col sm={6}>
          <Form>
            <Form.Group>
              <Form.Label>ID SP</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? isidata[0].sp : SJKosongModal}
              />


              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Service</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? isidata[0].service : SJKosongModal}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Jenis Barang</Form.Label>
              <Form.Control type="text" disabled value={jenisBarang ? jenisBarang : SJKosongModal} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Customer</Form.Label>
              <Form.Control type="text" disabled value={custumer} />
            </Form.Group>
          </Form>
        </Col>
        <Col sm={6}>
          <Form>
            <Form.Group>
              <Form.Label>Via</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? isidata[0].via : SJKosongModal}
              />
              <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pickup Date</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? (isidata[0].pickupDate === "Invalid date" ? "-" : isidata[0].pickupDate) : SJKosongModal}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Order Date</Form.Label>
              <Form.Control type="text" disabled value={orderdate} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Asuransi</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={
                  asuransi === "Y"
                    ? "Menggunakan Asuransi"
                    : "Tidak Menggunakan Asuransi"
                }
              />
            </Form.Group>
          </Form>
        </Col>

        <Form.Group>
          <Form.Label>Pickup Address</Form.Label>
          <Form.Control
            type="email"
            disabled
            value={isidata[0] ? isidata[0].pickupAddress : SJKosongModal}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </Row>
      <br />
      <Row>
        <Col>
          <Table responsive >
            <thead></thead>
            <tbody>
              {IsiDataSPSemua &&
                IsiDataSPSemua.detail &&
                IsiDataSPSemua.detail.map((data, index) => (
                  <>
                    <tr style={{ fontWeight: "bold" }}>
                      <td colSpan={10}>
                        <hr />
                        <br />{" "}
                      </td>
                    </tr>
                    <tr
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#dff0d8",
                      }}
                    >
                      {/* <td></td> */}
                      <td colSpan={10}>Alamat Muat</td>
                    </tr>

                    <tr key={index}>
                      <td colSpan={10}>{data.pickup}</td>
                    </tr>

                    {IsiDataSPSemua &&
                      IsiDataSPSemua.detail[index].tujuan &&
                      IsiDataSPSemua.detail[index].tujuan.map((data, index) => (
                        <>
                          <tr
                            style={{
                              fontWeight: "bold",
                              backgroundColor: "#dff0d8",
                            }}
                          >

                            <td>No</td>


                            <td>Alamat Bongkar</td>

                            <td width="100px">SJ ID</td>
                            <td>Kendaraan</td>
                            <td>Via</td>
                            <td>Item</td>
                            <td>Berat</td>
                            <td>Qty</td>
                            <td width="150px">Biaya Kirim</td>
                            <td width="150px">Total</td>
                          </tr>


                          <tr key={index}>
                            <td>
                              {(jobdesk !== "purchasing" && (

                                <>
                                  <p className="text-center">{counter++}</p>
                                </>
                              ))}
                              <span >

                                {jobdesk != "purchasing" || jobdesk == "akunting" && (
                                  <>

                                    <Button
                                      size="md"
                                      variant="danger"
                                      // onClick={() => deltebutton(data.idmpd)}
                                      className="mt-2"
                                    >
                                      X
                                    </Button>
                                  </>)}

                                {jobdesk != "purchasing" || jobdesk == "akunting" && (
                                  <>
                                    <Button
                                      size="md"
                                      variant="primary"
                                      onClick={() => {
                                        // setIdmpdPerstate(data.idmpd);
                                        // handleShowSP(data.idmpd, data.noSJ);
                                        // setIsiDataSPSemuaTemp(data)
                                      }}
                                      className="mt-2"
                                    >
                                      Edit
                                    </Button>
                                  </>
                                )}
                                {(jobdesk == "purchasing" || jobdesk != "akunting" && jobdesk != "operasional") && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      onClick={() => {
                                        handleShow(data.idmpd);
                                        approvebaru(data.idmpd);
                                      }}
                                      className="mt-2"
                                    >
                                      Approve
                                    </Button>

                                  </>)
                                }
                                {(jobdesk == "operasional" && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      onClick={() => {
                                        handleShow(data.idmpd);
                                        approvebaru(data.idmpd);
                                      }}
                                      className="mt-2"
                                    >
                                      Approve
                                    </Button>
                                  </>
                                ))}



                              </span>
                            </td>
                            <td>{data.destination}</td>
                            <td>{data.noSJ}</td>
                            <td>{data.kendaraan}</td>
                            <td>{data?.via}</td>
                            <td>{data.item}</td>
                            <td>{data.berat}</td>
                            <td>{data.qty}</td>
                            <td>{data.Price?.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}</td>
                            <td>{data.Price?.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}</td>
                          </tr>
                          <tr>
                            <td>No</td>
                            <td>Kode Mitra</td>
                            <td>Nama Mitra</td>
                            <td>Kendaraan</td>
                            <td>Via</td>
                            <td>Supir</td>
                            <td>No Polisi</td>
                            <td>Telp Supir</td>
                            <td>Operasi</td>
                          </tr>
                        </>
                      ))}
                  </>
                ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: "bold" }}>
                <td colSpan={9} width="150px" className="text-right">
                  Sub Total
                </td>
                <td width="150px">Rp {IsiDataSPSemua?.totalMuat?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}</td>
              </tr>
            </tfoot>
          </Table>
          {/* {(jobdesk === "purchasing") && ( */}
          <Table>
            <tr>
              <>
                <p
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Muat :{IsiDataSPSemua?.totalMuat?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Bongkar :{IsiDataSPSemua?.totalBongkar?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p
                  style={{ fontWeight: "bold" }}
                >
                  Biaya MultiDrop :{IsiDataSPSemua?.biaya_multidrop?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Overtonase :{IsiDataSPSemua?.biaya_overtonase?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Mel :{IsiDataSPSemua?.Totalprice?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Inap :{IsiDataSPSemua?.Totalprice?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <hr />
                <p
                  style={{ fontWeight: "bold" }}
                >
                  TOTAL KESELURUHAN :{IsiDataSPSemua?.Totalprice?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </>
            </tr>
          </Table>
          {/* )} */}
        </Col>
      </Row>
    </>
  );
}

export default FormTable;
