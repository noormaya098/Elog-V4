import { Alert, Card, Modal, Input, Select, message } from "antd";
import { Col, Row, Form, Button, Table } from "react-bootstrap";
import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import mobil from "../../redux toolkit/store/ZustandStore";
import Baseurl from "../../../Api/BaseUrl";
import Swal from "sweetalert2";
import PrintSP from "../../Print/PrintSP";
import { Image } from "antd";

function DetailsAkunting() {
  const history = useHistory();
  const printRef = React.useRef();
  const [detailData, setDetailData] = useState([]);
  const [memo, setMemo] = useState([]);
  const [jobdesk, setJobdesk] = useState(localStorage.getItem("jobdesk"));
  const { isicombinedData, setisiCombinedData } = mobil((item) => ({
    sp: item.sp,
  }));
  const { idmp } = useParams();
  const [comment, setComment] = useState([]);
  const [ApproveAkuntingStatus, setApproveAkuntingStatus] = useState("");
  const [ApproveAkuntingTgl, setApproveAkuntingTgl] = useState("");
  const [Kendaraan_operasional, setkendaraan_operasional] = useState("");
  const [tgl_act_4, settgl_act_4] = useState("");
  const [Kendaraan_purchasing, setKendaraan_purchasing] = useState("");
  const [tgl_act_5, settgl_act_5] = useState("");
  const [modal1Open, setModal1Open] = useState(false);
  const [MessageRejectSP, setMessageRejectSP] = useState("");
  const [IDMessageRejectSP, setIDMessageRejectSP] = useState("");
  const [KeteranganRejectSP, setKeteranganRejectSP] = useState("");

  // message reject
  const MessageReject = async () => {
    try {
      const data = await axios.get(
        `${Baseurl}sp/get-do-massage?limit=10334&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setMessageRejectSP(data.data.data.order);
    } catch (error) {}
  };

  useEffect(() => {
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
        // handle error appropriately
      }
    };
    getDetail();
    comments();
    MessageReject();
  }, [idmp, memo, Kendaraan_operasional, ApproveAkuntingStatus]);

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

    Swal.fire({
      title: "Apakah yakin untuk approve?",
      text: "jika belum, silahkan cek lagi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await axios.post(
            `${Baseurl}sp/approve-SP-akunting`,
            body,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          );

          const approve = data.status;

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data telah disetujui.",
          });
          window.location.reload();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan dalam memproses data.",
          });
          console.error(error);
        }
      }
    });
  };

  const rejectbutton = () => {
    Swal.fire({
      title: "Apakah yakin untuk Reject?",
      text: "jika belum, silahkan cek lagi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const body = {
          id_mp: idmp,
        };

        try {
          const data = await axios.post(
            `${Baseurl}sp/reject-SP-akunting`,
            body,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          );

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Telah di Reject",
          });
          // window.location.reload();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan dalam memproses data.",
          });
          console.error(error);
        }
      }
    });
  };

  const RejectSP = async () => {
    try {
      const data = await axios.post(
        `${Baseurl}sp/cancel-sp`,
        {
          id_mp: idmp,
          id_massage_do: IDMessageRejectSP,
          keterangan: KeteranganRejectSP,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      Swal.fire("Berhasil!", "Permintaan berhasil!", "success");
    } catch (error) {
      // Munculkan SweetAlert jika terjadi error
      if (error.response && error.response.status === 402) {
        const isieror = error.response.data.status.message;
        Swal.fire(
          "Gagal!",
          `${isieror}`, // Memasukkan response data ke dalam pesan error
          "error"
        );
      } else {
        Swal.fire("Gagal!", "Terjadi kesalahan!", "error");
      }
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
  console.log(jobdesk);

  const handlePrint = () => {
    history.push(`/printSPKListNih/${idmp}`);
  };

  const pindahedit = () => {
    history.push(`/masterdata/edit-sp/${idmp}`);
  };

  ///to IDR
  const total = detailData?.Totalprice;
  const rupiah = total?.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  // console.log(`TOTAL KESELURUHAN : ${rupiah}`);
  const [actSalesStatus, setactSalesStatus] = useState("");
  const StausApprove = async () => {
    try {
      const data = await axios.get(
        `${Baseurl}sp/get-status-approve?id_mp=${idmp}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.data.status.message);
      setactSalesStatus(data.data.status.message.act_sales);
      setApproveAkuntingStatus(data.data.status.message.act_akunting);
      setApproveAkuntingTgl(data.data.status.message.tgl_act_3);
      setkendaraan_operasional(data.data.status.message.kendaraan_operasional);
      settgl_act_4(data.data.status.message.tgl_act_4);
      setKendaraan_purchasing(data.data.status.message.kendaraan_purchasing);
      settgl_act_5(data.data.status.message.tgl_act_5);
    } catch (error) {}
  };

  useEffect(() => {
    StausApprove();
  }, []);

  console.log(`statusnya adalah`, actSalesStatus);

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentReject, setCommentReject] = useState("");

  const BuatMessage = async () => {
    try {
      const data = await axios.post(
        `${Baseurl}sp/create-massage-do`,
        {
          massage: commentReject,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      message.success(`${data.data.status.message}`);
      MessageReject();
      setCommentReject(""); // Mengatur ulang nilai commentReject menjadi string kosong
      setIDMessageRejectSP(null); // Mengatur ulang nilai IDMessageRejectSP menjadi null
      setKeteranganRejectSP(null); // Mengatur ulang nilai KeteranganRejectSP menjadi null
      setShowCommentInput(false);
    } catch (error) {
      // Munculkan pesan error
      if (error.response && error.response.status === 402) {
        // Pesan khusus untuk error 402
        message.error(`${error.response.data.status.message}`);
      } else {
        message.error("Terjadi kesalahan!");
      }
    }
  };


  const columnsss = [
    
         
    {
      title: 'SURAT PESANAN',
      children: [
        {
          title: 'Street',
          dataIndex: 'street',
          key: 'street',
          width: 100,
        },
        
            {
              title: 'Building',
              dataIndex: 'building',
              key: 'building',
              width: 100,
            },
            {
              title: 'Door No.',
              dataIndex: 'number',
              key: 'number',
              width: 100,
            },
          ],
        },
      ];
  
const dataaaa = [
{
key: "1",
name: "John Brown",
money: "￥300,000.00",
address: "New York No. 1 Lake Park",
},
{
key: "2",
name: "Jim Green",
money: "￥1,256,000.00",
address: "London No. 1 Lake Park",
},
{
key: "3",
name: "Joe Black",
money: "￥120,000.00",
address: "Sydney No. 1 Lake Park",
},
];

  return (
    <div>
      <Card>
        <Row>
          {/* Modal Reject*/}
          <Modal
            title="Reject SP Sales"
            style={{
              top: 180,
            }}
            open={modal1Open}
            onOk={() => {
              RejectSP();
              setModal1Open(false);
            }}
            onCancel={() => setModal1Open(false)}
          >
            <Row>
              <Col sm={12}>
                <Select
                  showSearch
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  placeholder="Pilih Alasan Reject"
                  onChange={(e, options) => {
                    setIDMessageRejectSP(e);
                    setKeteranganRejectSP(options.children);
                    console.log(IDMessageRejectSP);
                    console.log(options.children);
                  }}
                >
                  {MessageRejectSP &&
                    MessageRejectSP.map((item) => (
                      <Select.Option key={item.message} value={item.id}>
                        {item.no + " - " + item.massage}
                      </Select.Option>
                    ))}
                </Select>
              </Col>
              <div className="mt-3" onClick={() => setShowCommentInput(true)}>
                <i>
                  Tidak ada Comment?
                  <span>
                    <a style={{ color: "blue" }}>Klik di sini</a>
                  </span>{" "}
                  untuk menambahkan
                </i>
              </div>
              {showCommentInput && (
                <Col sm={12} className="mt-2">
                  <Input
                    size="large"
                    value={commentReject}
                    onChange={(e) => setCommentReject(e.target.value)}
                    placeholder="Tambahkan komentar baru di sini"
                  />
                  <Button className="mt-2" size="sm" onClick={BuatMessage}>
                    Tambahkan
                  </Button>
                </Col>
              )}
            </Row>
          </Modal>

          <div className="d-flex justify-content-end">
            {jobdesk !== "operasional" &&
            jobdesk !== "sales" &&
            jobdesk !== "purchasing" &&
            ApproveAkuntingStatus !== "Y" ? (
              <>
                <Button size="sm" onClick={() => tombolApprove()}>
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => rejectbutton()}
                >
                  Reject SP
                </Button>
              </>
            ) : (
              <>
                {ApproveAkuntingStatus === "Y" &&
                ApproveAkuntingTgl !== null ? (
                  <Alert type="success" message="Approve Akunting" banner />
                ) : ApproveAkuntingStatus === "N" &&
                  ApproveAkuntingTgl !== null ? (
                  <Alert type="error" message="Diverted Akunting" banner />
                ) : ApproveAkuntingStatus === "N" &&
                  ApproveAkuntingTgl === null ? (
                  <Alert type="info" message="Waiting Operasional" banner />
                ) : null}

                {Kendaraan_operasional === "Y" && tgl_act_4 != null ? (
                  <Alert type="success" message="Approve Operasional" banner />
                ) : Kendaraan_operasional === "N" && tgl_act_4 != null ? (
                  <Alert type="error" message="Diverted Operasional" banner />
                ) : Kendaraan_operasional === "N" && tgl_act_4 === null ? (
                  <Alert type="info" message="Waiting Operasional" banner />
                ) : null}

                {Kendaraan_purchasing === "Y" && tgl_act_5 !== null ? (
                  <Alert type="success" message="Approve Purchasing" banner />
                ) : Kendaraan_purchasing === "N" && tgl_act_5 !== null ? (
                  <Alert type="error" message="Diverted Purchasing" banner />
                ) : Kendaraan_purchasing === "N" && tgl_act_5 === null ? (
                  <Alert type="info" message="Waiting Purchasing" banner />
                ) : null}
              </>
            )}

            <div class="mx-2">
              <Button size="sm" onClick={() => handlePrint()} variant="primary">
                Print
              </Button>
            </div>

            {jobdesk === "sales" && actSalesStatus === "N" ? (
              <>
                <Button
                  size="sm"
                  onClick={() => setModal1Open(true)}
                  variant="danger"
                >
                  Reject SP Sales
                </Button>
                <Button size="sm" onClick={pindahedit} variant="primary">
                  Edit SJ
                </Button>
              </>
            ) : (
              ""
            )}
            {/* ? jobdesk === "sales" && actSalesStatus === "Y" : <>
              <Button size="sm" disabled onClick={() => setModal1Open(true)} variant="danger">
                Reject SP Sales
              </Button>
              <Button size="sm" onClick={pindahedit} variant="primary">
                Edit SJ
              </Button>
            </> : "" */}
          </div>

          {/* <Modal> */}
          {/* <Modal.Header closeButton>
              <Modal.Title>Approve Driver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Select></Form.Select>

              <Form.Label>Kode Kendaraan</Form.Label>
              <Form.Select></Form.Select>

              <Form.Label>Select Driver</Form.Label>
              <Form.Select></Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save Changes</Button>
            </Modal.Footer> */}
          {/* </Modal> */}

          <Col sm={6}>
            <Form>
              <Form.Group>
                <Form.Label>No.SPK</Form.Label>
                <Form.Control disabled value={detailData?.sp} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Service</Form.Label>
                <Form.Control disabled value={detailData?.service} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Jenis Barang</Form.Label>
                <Form.Control disabled value={detailData?.jenisBarang} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Marketing</Form.Label>
                <Form.Control disabled value={detailData?.marketing} />
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
                <Form.Control disabled value={detailData?.customer} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tgl Pickup</Form.Label>
                <Form.Control disabled value={detailData?.pickup_date} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tgl Bongkar</Form.Label>
                <Form.Control disabled value={detailData?.bongkar_date} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Asuransi</Form.Label>
                <Form.Control
                  disabled
                  value={
                    detailData?.asuransi === "Y"
                      ? "Menggunakan Asuransi"
                      : "Tidak Menggunakan Asuransi"
                  }
                />
              </Form.Group>
            </Form>
          </Col>
          {/* <Form.Group>
            <Form.Label>Pickup Address</Form.Label>
            <Form.Control
              disabled
              value={detailData?.detail?.[0]?.pickupAddress}
            />
          </Form.Group> */}
        </Row>
        <br />
        <Row>
          <Col>
            <Table responsive>
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
                        <td>{index + 1}</td>
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
                        detailData.detail[index].tujuan.map((data, index) => (
                          <>
                            <tr
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "#dff0d8",
                              }}
                            >
                              <td> </td>
                              <td>Alamat Bongkar</td>
                              <td width="100px">SJ ID</td>
                              <td>Kendaraan</td>
                              <td>Via</td>
                              <td>Item</td>
                              <td>Berat</td>
                              <td>Qty</td>
                              {jobdesk !== "operasional" && (
                                <>
                                  <td width="150px">Biaya Kirim</td>
                                  <td width="150px">Total</td>
                                </>
                              )}
                            </tr>

                            <tr key={index}>
                              {/* <td>
                                {index + 1}
                                <span>
                                  <Button
                                    size="md"
                                    variant="danger"
                                    onClick={() => deltebutton(data.idmpd)}
                                    className="mt-2"
                                  >
                                    X
                                  </Button>
                                </span>
                              </td> */}
                              <td></td>
                              <td>{data.destination}</td>
                              <td>{data.noSJ}</td>
                              <td>{data.kendaraan}</td>
                              <td>{data?.via}</td>
                              <td>{data.item}</td>
                              <td>{data.berat}</td>
                              <td>{data.qty}</td>
                              {jobdesk !== "operasional" && (
                                <>
                                  <td>
                                    {data.Price?.toLocaleString("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                    })}
                                  </td>
                                  <td>
                                    {data.Price?.toLocaleString("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                    })}
                                  </td>
                                </>
                              )}
                            </tr>
                          </>
                        ))}
                    </>
                  ))}
              </tbody>

              <tfoot>
                <tr style={{ fontWeight: "bold" }}>
                  {jobdesk !== "operasional" && (
                    <>
                      <td colSpan={9} width="150px" className="text-right">
                        Sub Total
                      </td>
                    </>
                  )}
                  {jobdesk !== "operasional" && (
                    <>
                      <td width="150px">
                        Rp{" "}
                        {detailData?.subTotal?.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                    </>
                  )}
                </tr>
              </tfoot>
            </Table>
            {jobdesk !== "operasional" && (
              <>
                <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Muat :
                  {detailData?.totalMuat?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Bongkar :
                  {detailData?.totalBongkar?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya MultiDrop :
                  {detailData?.biaya_multidrop?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Overtonase :
                  {detailData?.biaya_overtonase?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Mel :
                  {detailData?.Totalprice?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Inap :
                  {detailData?.Totalprice?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <hr />
                <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  TOTAL KESELURUHAN :
                  {detailData?.Totalprice?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </>
            )}
            {/* <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Muat :{detailData?.biaya_muat?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Bongkar :{detailData?.biaya_muat_bongkar?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya MultiDrop :{detailData?.biaya_multidrop?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Overtonase :{detailData?.biaya_overtonase?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Mel :{detailData?.Totalprice?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Inap :{detailData?.Totalprice?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <hr />
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
             TOTAL KESELURUHAN : {detailData?.Totalprice?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p> */}
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Isi Memo</Form.Label>
              <Form.Control disabled value={memo} />
            </Form.Group>
            <br />
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
                      <td>{data.tgl_chat.substring(0, 10)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card>

     
    </div>
  );
}

export default DetailsAkunting;
