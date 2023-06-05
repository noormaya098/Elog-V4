// FormTable.js
import React from "react";
import { Col, Row, Form, Button, Table, Modal } from "react-bootstrap";
import { Card, Checkbox } from "antd";
import { useState, useEffect } from "react";
import Baseurl from "../../../Api/BaseUrl";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";
import Token from "../../../Api/Token";
import mobil from "../../redux toolkit/store/ZustandStore";

const jobdesk = localStorage.getItem("jobdesk");
function FormTable({ isidata, totalPrice, idmp, IsiDataSPSemua }) {
  const [jobdesk, setJobdesk] = useState(localStorage.getItem("jobdesk"));
  const [mitraVehicle, setMitraVehicle] = useState([]);
  const [types, setType] = useState([]);
  const [nomorpolisi, setNomorPolisi] = useState([]);
  const [selectnomor, setSelectnomor] = useState([]);
  const [selectnopol, setSelectNopol] = useState([]);
  const [selectMitra, setSelectMitra] = useState([]);
  const [approved, setApproved] = useState([]);
  const [selectDriver, setselectDriver] = useState([]);
  const [idsupir, setIdsupir] = useState([]);
  const [idUnit, setIdunit] = useState([]);
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
  const { orderdate, setOrderdate, asuransi, setAsuransi } = mobil();
  useEffect(() => {
    setType(isidetail.map((item) => item?.kendaraan));
  }, [isidetail]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [IDMPD, setIDMPD] = useState([]);

  ///select mitra
  const mitraList = async () => {
    const sleet = await axios.get(
      `${Baseurl}vehicle/get-vehicle-mitra?limit=10&page=1&keyword=`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const mitraa = sleet.data.data.order.map((item) => ({
      mitraId: item.mitraId,
    }));
    console.log(`mitra`, mitraa);
    setMitraVehicle(sleet.data.data.order);
  };

  useEffect(() => {
    mitraList();
  }, []);
  ///select driver
  useEffect(() => {
    if (types.length > 0 && selectnomor) {
      const vehicle = async () => {
        const sleet = await axios.get(
          `${Baseurl}sp/get-SP-select-2?vehicleType=${types[0]}&id=${selectnomor}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const nomorpolisis = sleet.data.data.vehicle;
        const drivernya = sleet.data.data.Driver;
        const idsupir = sleet.data?.data?.vehicle.map((item) => ({
          id: item.id,
          driverId: item.driverId,
        }));
        setIdsupir(idsupir[0]?.id);
        setselectDriver(drivernya);
        setNomorPolisi(nomorpolisis);
      };
      vehicle();
    }
  }, [types, selectnomor]);

  // console.log(`isi duit`, totalPrice);
  useState(() => { }, []);

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
      // console.log(`test`, driveranother);
    };

    anotherdriver();
  }, []);

  ///tombol approve
  const HandleApproveOPS = (idmpd) => {
    const body = {
      id_mpd: IDMPD,
      id_mp: idmp,
      id_unit: selectDriver[0]?.idUnit,
      id_supir: selectnomor,
      id_mitra: ``,
      id_mitra_pickup: ``,
      id_mitra_2: ``,
      plat_nomor: selectnopol,
      merk: types[0],
      is_multi: "",
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
  // console.log(`ini idmpd`, IDMPD);

  ///tombol approve
  const HandleApprovePURCH = (idmpd) => {
    const body = {
      id_mp: idmp,
      id_mpd: IDMPD,
      id_unit: selectDriver[0]?.idUnit,
      id_supir: selectnomor,
      id_mitra: selectMitra,
      id_mitra_pickup: ``,
      id_mitra_2: ``,
      plat_nomor: selectnopol,
      merk: types[0],
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
          const data = await axios.post(`${Baseurl}sp/decline-SP-akunting`, body, {
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



  const mitraOptions = mitraVehicle.map((item) => ({
    value: item.vendor,
    label: item.vendor,
  }));
  const nomorpolisiOptions = nomorpolisi.filter(item => item.mitra === selectMitra).map(item => ({
    value: item.driverId,
    label: item.no_polisi,
  }));

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
    HandleApproveOPS(idMpd)
    HandleApprovePURCH(idMpd)
    console.log(idMpd);
    handleShow()
  }
  console.log(`isi idmp`, idmp);

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
  console.log(IsiDataSPSemua);



  const options = nomorpolisi.map(vehicle => ({
    value: vehicle.id,
    label: vehicle.no_polisi + "-" + vehicle.kd_kendaraan
  }));

  const handleSelectChange = selectedOption => {
    if (selectedOption) {
      setSelectnomor(selectedOption.value);

      const selectedVehicle = nomorpolisi.find((vehicle) => vehicle.id === selectedOption.value);
      if (selectedVehicle) {
        setSelectNopol(selectedVehicle.no_polisi);
      }
    }
  };
  return (
    <>
      <Row>
        <div className="d-flex justify-content-end">
          {(jobdesk == "operasional") && (
            <>
              {(jobdesk != "purchasing") && (
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
                        <Select
                          options={options}
                          onChange={handleSelectChange}
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
                          <option value={selectDriver[0]?.idUnit}>
                            {selectDriver[0] && selectDriver[0]?.name != "" ? selectDriver[0] && selectDriver[0]?.name : "tidak tersedia"}
                          </option>
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
                          options={nomorpolisiOptions}
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
                          options={nomorpolisiOptions}
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
                          options={nomorpolisiOptions}
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
                      <Checkbox className="justify-content-end d-flex">
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
          )}
          {(jobdesk != "purchasing" && jobdesk != "operasional") && (
            <>
              <Button size="sm" onClick={() => jobdesk === "akunting" ? akuntingAprpove() : handleShow()}>
                Approve
              </Button>
            </>
          )}
          <Button size="sm" variant="danger" onClick={() => jobdesk === "akunting" ? rejectspAkunting() : rejectsp()}>
            Reject Driver
          </Button>
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
                        options={nomorpolisiOptions}
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
                        options={nomorpolisiOptions}
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
                        options={nomorpolisiOptions}
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
                    <Checkbox className="justify-content-end d-flex">
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
                value={isidata[0] ? isidata[0].sp : ""}
              />

              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Service</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? isidata[0].service : ""}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Jenis Barang</Form.Label>
              <Form.Control type="text" disabled value={jenisBarang} />
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
                value={isidata[0] ? isidata[0].via : ""}
              />
              <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pickup Date</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? (isidata[0].pickupDate === "Invalid date" ? "-" : isidata[0].pickupDate) : ""}
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
            value={isidata[0] ? isidata[0].pickupAddress : ""}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </Row>
      <br />
      <Row>
        <Col>
          <Table responsive bordered >
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
                                  <p className="text-center">{index + 1}</p>
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
          <>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Muat :{IsiDataSPSemua?.totalMuat?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Bongkar :{IsiDataSPSemua?.totalBongkar?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya MultiDrop :{IsiDataSPSemua?.biaya_multidrop?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Overtonase :{IsiDataSPSemua?.biaya_overtonase?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Mel :{IsiDataSPSemua?.Totalprice?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Inap :{IsiDataSPSemua?.Totalprice?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <hr />
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              TOTAL KESELURUHAN :{IsiDataSPSemua?.Totalprice?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </>
          {/* )} */}
        </Col>
      </Row>
    </>
  );
}

export default FormTable;
