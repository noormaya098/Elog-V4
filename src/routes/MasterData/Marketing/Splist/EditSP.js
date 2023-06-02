import { Card } from "antd";
import { Col, Row, Form, Modal, Button, Table } from "react-bootstrap";
import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import mobil from "../../../redux toolkit/store/ZustandStore";
import Select from 'react-select';
import Baseurl from "../../../../Api/BaseUrl";
import Swal from "sweetalert2";
function EditSP() {
  const [show, setShow] = useState(false);
  const [showSP, setShowSP] = useState(false);
  const { phZustand, setPHZustand } = mobil((state) => ({
    setPHZustand: state.setPHZustand,
    phZustand: state.phZustand,
  }));

  const { shipmentSementara, setshipmentSementara } = mobil((state) => ({
    shipmentSementara: state.shipmentSementara,
    setshipmentSementara: state.setshipmentSementara

  }))
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSP = () => setShowSP(false);
  const handleShowSP = () => setShowSP(true);
  const [detailData, setDetailData] = useState([]);
  const [detailDataTemp, setDetailDataTemp] = useState([]);
  const [detailModal, setDetailModal] = useState([]);
  const [detaildestination, setDestinationDetail] = useState([]);
  const [KendaraanModal, setKendaraanModal] = useState([]);
  const [memo, setMemo] = useState([]);
  const [jobdesk, setJobdesk] = useState(localStorage.getItem("jobdesk"));
  const { isicombinedData, setisiCombinedData } = mobil((item) => ({
    sp: item.sp,
  }));
  const { idmp } = useParams();
  const [comment, setComment] = useState([]);
  const [selectVia, setSelectVia] = useState("");
  const [ShipmentModal, setShipmentModal] = useState([]);
  const [Marketing, setMarketing] = useState([]);
  const [shipmentOptions, setShipmentOptions] = useState([]);
  const [KendaraanValue, setKendaraanValue] = useState("");
  const [alamatMuatValue, setalamatMuatValue] = useState("");
  const [alamtBongkarValue, setAlamatBongkarValue] = useState("");
  const [shipmentValue, setshipmentValue] = useState([]);
  const [BeratValue, setBeratValue] = useState("");
  const [Value, setValue] = useState("");
  const [KoliValue, setKoliValue] = useState("");
  const [PanjangValue, setPanjangValue] = useState("");
  const [LebarValue, setLebarValue] = useState("");
  const [TinggiValue, setTinggiValue] = useState("");
  const [Namabarang, setNamaBarang] = useState("");
  const [bongkarValue, setBongkarValue] = useState(0);
  const [biayaMuatValue, setBiayaMuatValue] = useState(0);
  const [TarifValue, setTarifValue] = useState(0);
  const [totalValue, settotalValue] = useState(0);
  const [tambahKomen, setTambahKomen] = useState("");
  const [MarketingValue, setMarketingValue] = useState("")
  const [perubahanServiceValue, setPerubahanServiceValue] = useState("")
  const [JenisBarangValue, setJenisBarangValue] = useState("")
  const [CustomerValue, setCustomerValue] = useState("")
  const [AlamatInvoiceOption, setAlamatInvoiceOption] = useState("")
  const [isiTarif, setisiTarif] = useState("")
  const [IdmpdPerstate, setIdmpdPerstate] = useState([])
  const [NameKendaraan, setNameKendaraan] = useState("")


  const getDetail = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}sp/get-SP-all-detail?keyword=&idmp=${idmp}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDetailData(response.data);
      const memos = response.data.memo;
      setMemo(memos);
    } catch (error) {
      console.error("Failed to fetch detail data:", error);
    }
  };
  useEffect(() => {
    getDetail();
    comments();
  }, [idmp, memo]);


  useEffect(() => {
    const getDetailModal = async () => {
      try {
        const response = await axios.get(
          `${Baseurl}sp/get-SP-select-detail?keyword=&companyId=${detailData?.idcustomer}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setDetailModal(response.data.data);
        setDestinationDetail(response.data.data.destination);
        setKendaraanModal(response.data.data.type);
        setShipmentModal(response.data.data.shipment);
        setMarketing(response.data.data.marketing)
      } catch (error) {
        console.error("Failed to fetch detail data:", error);
        // handle error appropriately
      }
    };

    getDetailModal();
  }, [detailData?.customer]);

  const refresh = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}sp/get-SP-all-detail?keyword=&idmp=${idmp}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDetailData(response.data);
      const memos = response.data.memo;
      setMemo(memos);
    } catch (error) {
      console.error("Failed to fetch detail data:", error);
      // handle error appropriately
    }
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];

  const tombolApprove = async () => {
    const body = {
      id_mp: idmp,
    };

    try {
      const data = await axios.post(`${Baseurl}sp/approve-SP-akunting`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const approve = data.status;

      // Menampilkan SweetAlert berhasil
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data telah disetujui.",
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
  };

  const rejectbutton = async () => {
    const body = {
      id_mp: idmp,
    };
    try {
      const data = await axios.post(`${Baseurl}sp/reject-SP-akunting`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Telah di Reject",
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
  };

  const comments = async () => {
    const api = await axios.get(`${Baseurl}sp/get-SP-massage?id_mp=${idmp}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const comment = api.data.data;
    // console.log(comment);
    setComment(comment);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setJobdesk(localStorage.getItem("jobdesk"));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    if (selectVia) {
      const filteredShipments = ShipmentModal.filter(
        (item) => item?.via === selectVia
      );
      setShipmentOptions(filteredShipments);
    } else {
      setShipmentOptions([]);
    }
  }, [selectVia, ShipmentModal]);

  useEffect(() => {
    tarif();
  });
  const tarif = () => {
    // cek shipment baru dikalikan sesuai rumus
    setTimeout(() => {
      const bongkar = bongkarValue ? parseInt(bongkarValue) : 0;
      // const tarif = isiTarif?.biaya_jalan != 0 ? parseInt(isiTarif?.biaya_jalan) : (TarifValue ? parseInt(TarifValue) : 0);
      const tarif = TarifValue != 0 ? parseInt(TarifValue) : (isiTarif?.biaya_jalan ? parseInt(isiTarif?.biaya_jalan) : 0);
      const biaya = biayaMuatValue ? parseInt(biayaMuatValue) : 0;

      const totals = bongkar + tarif + biaya;
      settotalValue(totals);
      console.log("TOTAL", totals);
    },);
  };

  // Create sp detail
  const CreateDetailSP = async () => {
    const data = await axios.post(
      `${Baseurl}sp/create-SP-detail`,
      {
        idMp: idmp,
        idcustomer: 1,
        ph:
          phZustand !== ""
            ? JSON.stringify(phZustand)
            : JSON.stringify(detailData?.detail?.[0]?.noSJ),
        via: selectVia,
        shipment: shipmentValue,
        kendaraan: NameKendaraan,
        id_almuat: alamatMuatValue,
        id_albongkar: alamtBongkarValue,
        nama_barang: Namabarang,
        berat: BeratValue,
        panjang: PanjangValue,
        lebar: LebarValue,
        tinggi: TinggiValue,
        qty: Value,
        koli: KoliValue,
        // harga: TarifValue === "" ? TarifValue : isiTarif?.biaya_jalan,  
        harga: TarifValue != 0 ? parseInt(TarifValue) : (isiTarif?.biaya_jalan ? parseInt(isiTarif?.biaya_jalan) : 0),
        // harga: isiTarif?.biaya_jalan != 0 ? isiTarif?.biaya_jalan : TarifValue,  
        harga_bongkar: bongkarValue,
        harga_muat: biayaMuatValue,
        total: totalValue,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setshipmentSementara(shipmentValue)
    refresh();
    handleClose();
    Swal.fire("Good job!", "Data Berhasil Di tambahkan", "success");
  };

  console.log(`NameKendaraan`, NameKendaraan);


  const deltebutton = async (x) => {
    Swal.fire({
      title: "Ingin Menghapus SJ?",
      showDenyButton: true,
      denyButtonText: `Tidak`,
      confirmButtonText: "Iya?",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await axios.post(
          `${Baseurl}sp/delete-SP-detail`,
          {
            id: x,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        refresh();
        handleClose();
        Swal.fire("Good job!", "Data Berhasil Di hapus", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const tambahkomen = async () => {
    const data = await axios.post();
  };

  const total = detailData?.Totalprice;
  const rupiah = total?.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });


  ////Edit sp
  useEffect(() => {
    // editttsp()
  }, [])
  const editttsp = async () => {
    try {
      Swal.fire({
        title: 'Apakah data sudah benar?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ubah'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Update!',
            'Data sudah terupdate!',
            'success'
          )
        }
      })
      const data = await axios.post(`${Baseurl}sp/edit-SP`, {
        id_mp: idmp,
        memo: "ini barang",
        id_customer: "1",
        jenis_barang: JenisBarangValue !== "" ? JenisBarangValue : detailData?.jenis_barang,
        packing: "1",
        asuransi: "Y",
        tgl_pickup: "2023-05-03 17:12:33",
        marketing: MarketingValue,
        tgl_bongkar: "2023-05-03 17:12:33",
        service: perubahanServiceValue !== "" ? perubahanServiceValue : detailData?.service,
        customer: CustomerValue !== "" ? CustomerValue : detailData?.customer,
        alamat_invoice: AlamatInvoiceOption,
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      getDetail()

      console.log(data); // Prin

    } catch (error) {
      console.error("An error occurred while making the axios request: ", error);
    }
  }

  ////tarif 

  const tarifalamat = async () => {
    const data = await axios.post(`${Baseurl}sp/get-tarif-alamat`, {
      // id_muat_kota: alamatMuatValue,
      // id_tujuan_kota: alamtBongkarValue,
      // id_customer: detailData?.idcustomer,
      // id_kendaraan_jenis: KendaraanValue,
      // service_type: detailData?.service,
      id_muat_kota: 3172,
      id_tujuan_kota: 3603,
      id_customer: 11,
      id_kendaraan_jenis: KendaraanValue,
      service_type: "Charter",
    },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const valid = data.data.data.order
    const Namakendaraan = data.data.data?.jenisKendaraan?.nama_kendaraan_jenis
    // console.log(`apa ini `,KendaraanValue);
    if (valid == undefined) {
      console.log(`nama`, Namakendaraan)
      return alert(`tidak ada harga`, valid)
    } else {
      console.log(`nama`, Namakendaraan)
      return (
        setisiTarif(valid),
        setNameKendaraan(Namakendaraan)
      )
    }

  }
  // console.log(`ini tarif`, isiTarif?.biaya_jalan);
  console.log(`KendaraanValue`, KendaraanValue);


  const options = detaildestination.map((item, index) => ({
    value: item.id,
    label: item.pic + "-" + item.address
  }));

  const EditSPButton = async () => {
    console.log(`ini idmpd`, IdmpdPerstate);

    const updateData = async () => {
      try {
        const result = await Swal.fire({
          title: 'Apakah data sudah benar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ubah'
        });

        if (result.isConfirmed) {
          const response = await axios.post(`${Baseurl}sp/edit-SP-detail`,
            {
              id_mpd: IdmpdPerstate,
              via: selectVia,
              shipment: shipmentValue,
              kendaraan: "CDD",
              id_almuat: alamatMuatValue,
              id_albongkar: alamtBongkarValue,
              nama_barang: "Buku",
              volume: 0,
              nama_barang: Namabarang,
              berat: BeratValue,
              qty: Value,
              koli: KoliValue,
              harga_muat: biayaMuatValue,
              harga_bongkar: bongkarValue,
              harga: TarifValue != 0 ? parseInt(TarifValue) : (isiTarif?.biaya_jalan ? parseInt(isiTarif?.biaya_jalan) : 0),
              total: totalValue,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            });

          Swal.fire(
            'Update!',
            'Data sudah terupdate!',
            'success'
          );
          handleClose();
          refresh();
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleClose();
    updateData();
  }
  let counter = 1;

  // console.log(`detail data`, detailData);

  console.log(`detail data`, detailDataTemp);
  // console.log(`detail data`, detailData.detail?.[0].tujuan);
  // const alamatbongkarscroll  =
  return (
    <div>
      <Card>
        <Row>
          <div className="d-flex justify-content-end">
            {jobdesk != "sales" ? (
              <>
                <Button size="sm" onClick={() => tombolApprove()}>
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => rejectbutton()}
                >
                  Reject Driver
                </Button>
              </>
            ) : (
              <></>
            )}
            <Button onClick={() => editttsp()} size="sm" className="d-flex justify-content-end" variant="primary">
              Save Edit SP
            </Button>
          </div>

          {/* Modal add alamat sp */}
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Masukkan Alamat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Col sm={12}>
                <Form>
                  <Form.Group>
                    <Form.Label>* Alamat Muat</Form.Label>
                    <Select
                      options={options}
                      onChange={(selectedOption) => setalamatMuatValue(selectedOption.value)}
                    />

                    <hr />
                    <h5>Alamat Bongkar</h5>
                    <Row>
                      <Col sm={12}>
                        <Form.Label>* Alamat Bongkar</Form.Label>
                        <Select
                          options={options}
                          onChange={(selectedOption) =>
                            setAlamatBongkarValue(selectedOption.value)
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <Form.Label>* Kendaraan</Form.Label>
                        <Form.Select
                          onChange={(e) => setKendaraanValue(e.target.value)}
                        >
                          <option>Pilih Kendaraan</option>
                          {KendaraanModal.map((item, index) => (
                            <option value={item.id}>{item.type}</option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Via</Form.Label>
                        <Form.Select
                          onChange={(e) => setSelectVia(e.target.value)}
                        >
                          <option>Pilih Via</option>
                          <option>darat</option>
                          <option>laut</option>
                          <option>udara</option>
                        </Form.Select>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Shipment</Form.Label>
                        <Form.Select
                          onChange={(e) =>
                            setshipmentValue(e.target.value)

                          }
                        >

                          <option>Pilih Shipment</option>
                          {shipmentOptions.map((item, index) => (
                            <option>{item.shipment}</option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={3}>
                        <Form.Label>* Berat</Form.Label>
                        <Form.Control
                          value={detailDataTemp.berat}
                          onChange={(e) => setBeratValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>* Qty</Form.Label>
                        <Form.Control
                          onChange={(e) => setValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>* Koli</Form.Label>
                        <Form.Control
                          onChange={(e) => setKoliValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>* Nama Barang</Form.Label>
                        <Form.Control
                          onChange={(e) => setNamaBarang(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <Form.Label>Panjang</Form.Label>
                        <Form.Control
                          onChange={(e) => setPanjangValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>Lebar</Form.Label>
                        <Form.Control
                          onChange={(e) => setLebarValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>Tinggi</Form.Label>
                        <Form.Control
                          onChange={(e) => setTinggiValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <Form.Label>* Tarif</Form.Label>
                        <Form.Control
                          disabled
                          // value={TarifValue == "" ? TarifValue : isiTarif.biaya_jalan}
                          // value={isiTarif?.biaya_jalan}  
                          defaultValue={isiTarif?.biaya_jalan != 0 ? isiTarif?.biaya_jalan : TarifValue}
                          onChange={(e) => {
                            setTarifValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        >
                        </Form.Control>
                        <Button className="mt-1" size="sm" variant="warning" onClick={() => tarifalamat()}>cek tarif</Button>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Bongkar</Form.Label>
                        <Form.Control
                          disabled
                          value={bongkarValue}
                          onChange={(e) => {
                            setBongkarValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        ></Form.Control>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Biaya Muat</Form.Label>
                        <Form.Control
                          disabled
                          value={biayaMuatValue}
                          onChange={(e) => {
                            setBiayaMuatValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        ></Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <Form.Label>* Biaya Multimuat</Form.Label>
                        <Form.Control
                          disabled
                          value={TarifValue}
                          onChange={(e) => {
                            setTarifValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        ></Form.Control>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Biaya Multidrop</Form.Label>
                        <Form.Control
                          disabled
                          value={bongkarValue}
                          onChange={(e) => {
                            setBongkarValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        ></Form.Control>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Biaya Mel</Form.Label>
                        <Form.Control
                          disabled
                          value={biayaMuatValue}
                          onChange={(e) => {
                            setBiayaMuatValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        ></Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={8}>
                        <Form.Label>Total</Form.Label>
                        <Form.Control
                          value={totalValue}
                          disabled
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Col>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => CreateDetailSP()}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>



          {/* Modal Edit SP */}
          <Modal show={showSP} onHide={handleCloseSP} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Edit SP</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Col sm={12}>
                <Form>
                  <Form.Group>
                    <Form.Label>* Alamat Muat</Form.Label>
                    <Select
                      // defaultInputValue={detailDataTemp?.destination}
                      options={options}
                      onChange={(selectedOption) => setalamatMuatValue(selectedOption.value)}
                    />

                    <hr />
                    <h5>Alamat Bongkar</h5>
                    <Row>
                      <Col sm={12}>
                        <Form.Label>* Alamat Bongkar</Form.Label>
                        <Select
                          // defaultInputValue={detailDataTemp?.destination}
                          options={options}
                          label={detailDataTemp?.destination}
                          onChange={(selectedOption) => setAlamatBongkarValue(selectedOption.value)}
                        />
                      </Col>

                    </Row>
                    <Row>
                      <Col sm={4}>
                        <Form.Label>* Kendaraan</Form.Label>
                        <Form.Control
                          onChange={(e) => setKendaraanValue(e.target.value)}
                          value={detailDataTemp?.kendaraan}
                          disabled
                        >

                        </Form.Control>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Via</Form.Label>
                        <Form.Select
                          value={detailDataTemp?.via}
                          onChange={(e) => setSelectVia(e.target.value)}
                        >
                          <option>Pilih Via</option>
                          <option>darat</option>
                          <option>laut</option>
                          <option>udara</option>
                        </Form.Select>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Shipment</Form.Label>
                        <Form.Select
                          value={shipmentSementara}
                          onChange={(e) => setshipmentValue(e.target.value)}
                        >
                          <option>Pilih Shipment</option>
                          {shipmentOptions.map((item, index) => (
                            <option>{item.shipment}</option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={3}>
                        <Form.Label>* Berat</Form.Label>
                        <Form.Control
                          value={detailDataTemp?.berat}
                          onChange={(e) => setBeratValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>* Qty</Form.Label>
                        <Form.Control
                          onChange={(e) => setValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>* Koli</Form.Label>
                        <Form.Control
                          onChange={(e) => setKoliValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>* Nama Barang</Form.Label>
                        <Form.Control
                          onChange={(e) => setNamaBarang(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <Form.Label>Panjang</Form.Label>
                        <Form.Control
                          onChange={(e) => setPanjangValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>Lebar</Form.Label>
                        <Form.Control
                          onChange={(e) => setLebarValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>Tinggi</Form.Label>
                        <Form.Control
                          onChange={(e) => setTinggiValue(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <Form.Label>* Tarif</Form.Label>
                        <Form.Control
                          // value={TarifValue == "" ? TarifValue : isiTarif.biaya_jalan}
                          // value={isiTarif?.biaya_jalan}  
                          defaultValue={isiTarif?.biaya_jalan != 0 ? isiTarif?.biaya_jalan : TarifValue}
                          onChange={(e) => {
                            setTarifValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        >
                        </Form.Control>
                        <Button className="mt-1" size="sm" variant="warning" onClick={() => tarifalamat()}>cek tarif</Button>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Bongkar</Form.Label>
                        <Form.Control
                          value={bongkarValue}
                          onChange={(e) => {
                            setBongkarValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        ></Form.Control>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Biaya Muat</Form.Label>
                        <Form.Control
                          value={biayaMuatValue}
                          onChange={(e) => {
                            setBiayaMuatValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        ></Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <Form.Label>* Biaya Multimuat</Form.Label>
                        <Form.Control
                          value={TarifValue}
                          onChange={(e) => {
                            setTarifValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        ></Form.Control>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Biaya Multidrop</Form.Label>
                        <Form.Control
                          value={bongkarValue}
                          onChange={(e) => {
                            setBongkarValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        ></Form.Control>
                      </Col>
                      <Col sm={4}>
                        <Form.Label>* Biaya Mel</Form.Label>
                        <Form.Control
                          value={biayaMuatValue}
                          onChange={(e) => {
                            setBiayaMuatValue(
                              e.target.value == "" ? 0 : e.target.value
                            );
                            tarif();
                          }}
                        ></Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={8}>
                        <Form.Label>Total</Form.Label>
                        <Form.Control
                          value={totalValue}
                          disabled
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Col>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => EditSPButton()}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Row>
            <Col sm={6}>
              <Form>
                <Form.Group>
                  <Form.Label>No.SP</Form.Label>
                  <Form.Control disabled value={detailData?.sp} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Marketing</Form.Label>
                  <Form.Select disabled onChange={(e) => setMarketingValue(e.target.value)} >
                    {detailModal?.marketing?.map((item, index) => (
                      <option value={item.id}>{item?.fullname}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Service</Form.Label>
                  <Form.Control onChange={(e) => setPerubahanServiceValue(e.target.value)} value={detailData?.service} disabled placeholder={detailData?.service}>

                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Jenis Barang</Form.Label>
                  <Form.Control onChange={(e) => setJenisBarangValue(e.target.value)} placeholder={detailData?.jenisBarang} />
                </Form.Group>
              </Form>
            </Col>
            <Col sm={6}>
              <Form>
                {/* <Form.Group>
                <Form.Label>Via</Form.Label>
                <Form.Control disabled value={detailData?.detail?.[0]?.via} />
              </Form.Group> */}
                <Form.Group>
                  <Form.Label>Customer</Form.Label>
                  <Form.Control onChange={(e) => setCustomerValue(e.target.value)} disabled value={detailData?.customer} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Pickup Date</Form.Label>
                  <Form.Control placeholder={detailData?.pickup_date} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Order Date</Form.Label>
                  <Form.Control placeholder={detailData?.order_date} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Asuransi</Form.Label>
                  <Form.Select value={detailData?.asuransi}>
                    <option value={"N"}>Tidak Menggunakan Asuransi</option>
                    <option value={"Y"}>Menggunakan Asuransi</option>
                  </Form.Select>
                </Form.Group>
              </Form>

            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={12}>
              <Form.Group>
                <Form.Label>Alamat Invoice</Form.Label>
                <Form.Select onChange={(e) => setAlamatInvoiceOption(e.target.value)} value={detailData?.alamatInvoice}>
                  <option>{detailData?.alamatInvoice}</option>
                  {detailData && detailData?.alamatInvoiceList?.map((item) => (
                    <option value={item?.value}>{item?.address_npwp}</option>

                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            {/* <Col sm={2}>
              <Form.Group>
                <Form.Label>PIC Pickup</Form.Label>
                <Form.Control

                  value={detailData?.detail?.[0]?.pickupAddress}
                />
              </Form.Group>
            </Col> */}
            {/* <Col sm={2}>
              <Form.Group>
                <Form.Label>PIC Phone</Form.Label>
                <Form.Control

                  value={detailData?.detail?.[0]?.pickupAddress}
                />
              </Form.Group>
            </Col> */}
          </Row>
          {/* <Row className="mt-4">
              <Col sm={8}>
                <Form.Group>
                  <Form.Label>Alamat Invoice</Form.Label>
                  <Form.Control placeholder={detailData?.alamatInvoice} />
                </Form.Group>
              </Col>
              <Col sm={2}>
              <Form.Group>
                  <Form.Label>Pic</Form.Label>
                  <Form.Control placeholder={detailData?.alamatInvoice} />
                </Form.Group>
              </Col>
            </Row> */}
          <Col className="mt-5" sm={12}>
            <h4 className="text-center"> Detail Alamat</h4>
            <Button size="sm" variant="primary" onClick={handleShow}>
              Tambah Alamat
            </Button>
          </Col>


        </Row>
        <br />
        <Row>
          <Col>
            <Table responsive bordered >
              <thead></thead>
              <tbody>
                {detailData &&
                  detailData.detail &&
                  detailData.detail.map((data, index) => (
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
                        <td> </td>
                        <td colSpan={9}>Alamat Muat</td>
                      </tr>

                      <tr key={index}>
                        <td>
                          {/* {index + 1}
                            <span>
                              <Button
                                size="md"
                                variant="danger"
                                onClick={() => deltebutton(data.idmpd)}
                                className="mt-2"
                              >
                                X
                              </Button>
                            </span> */}
                        </td>
                        <td colSpan={9}>{data.pickup}</td>
                      </tr>
                      {detailData &&
                        detailData.detail[index].tujuan &&
                        detailData.detail[index].tujuan.map((data, index2) => (
                          <>
                            <tr
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "#dff0d8",
                              }}
                            >
                              <td>No {counter++}</td>
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

                                <span >
                                  <Button
                                    size="md"
                                    variant="danger"
                                    onClick={() => deltebutton(data.idmpd)}
                                    className="mt-2"
                                  >
                                    X
                                  </Button>
                                  <Button
                                    size="md"
                                    variant="primary"
                                    onClick={() => {
                                      setIdmpdPerstate(data.idmpd);
                                      handleShowSP(data.idmpd, data.noSJ);
                                      setDetailDataTemp(data)
                                    }}
                                    className="mt-2"
                                  >
                                    Edit
                                  </Button>

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
                  <td width="150px">Rp {detailData?.totalMuat?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}</td>
                </tr>
              </tfoot>
            </Table>

            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Muat :{detailData?.totalMuat?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Bongkar :{detailData?.totalBongkar?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya MultiDrop :{detailData?.biaya_multidrop?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Overtonase :{detailData?.biaya_overtonase?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Mel :{detailData?.Totalprice?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Inap :{detailData?.Totalprice?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <hr />
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              TOTAL KESELURUHAN :{detailData?.Totalprice?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Isi Memo</Form.Label>
              <Form.Control disabled value={memo} />
            </Form.Group>
            <Row className="mt-3">
              <Col sm={12}>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold" }}></Form.Label>
                  <Form.Control
                    onChange={(e) => setTambahKomen(e.target.value)}
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col className="mt-3" sm={4}>
                <Button onClick={tambahkomen} size="sm">
                  Tambah Komen
                </Button>
              </Col>
            </Row>
            <br />
            <Table responsive>
              <thead>
                <tr style={{ fontWeight: "bold", backgroundColor: "#f4dddd" }}>
                  <td>No</td>
                  <td>Comment</td>
                  <td>User</td>
                  <td>Tgl Comment</td>
                </tr>
              </thead>
              <tbody>
                {comment &&
                  comment.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data?.chat}</td>
                      <td>{data?.user}</td>
                      <td>{data?.tgl_chat}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
          <br />

        </Row>
      </Card>
    </div>
  );
}

export default EditSP;
