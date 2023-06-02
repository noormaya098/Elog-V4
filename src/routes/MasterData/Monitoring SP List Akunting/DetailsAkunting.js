import { Card } from "antd";
import { Col, Row, Form, Modal, Button, Table } from "react-bootstrap";
import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import mobil from "../../redux toolkit/store/ZustandStore";
import Baseurl from "../../../Api/BaseUrl";
import Swal from "sweetalert2";
function DetailsAkunting() {
  const history = useHistory();
  const [detailData, setDetailData] = useState([]);
  const [memo, setMemo] = useState([]);
  const [jobdesk, setJobdesk] = useState(localStorage.getItem("jobdesk"));
  const { isicombinedData, setisiCombinedData } = mobil((item) => ({
    sp: item.sp,
  }));
  const { idmp } = useParams();
  const [comment, setComment] = useState([]);
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
  }, [idmp, memo]);

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
      title: 'Apakah yakin untuk approve?',
      text: "jika belum, silahkan cek lagi",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await axios.post(`${Baseurl}sp/approve-SP-akunting`, body, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          });

          const approve = data.status;

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data telah disetujui.",
          });
        } catch (error) {
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


  const rejectbutton = () => {
    Swal.fire({
      title: 'Apakah yakin untuk Reject?',
      text: "jika belum, silahkan cek lagi",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
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
    window.print();
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

  return (
    <div>
      <Card>
        <Row>
          {/* <div className="d-flex justify-content-end">
            {(jobdesk !== "operasional" && jobdesk !== "sales") && (
              <>
                <Button size="sm" onClick={() => tombolApprove()}>
                  Approve
                </Button>
              </>
            )}

          </div> */}
          <div className="d-flex justify-content-end">
            {
              (jobdesk !== "operasional" && jobdesk !== "sales" && jobdesk !== "purchasing") ? (
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
              )
            }


            <Button size="sm" onClick={() => handlePrint()} variant="primary">
              Print
            </Button>


            {jobdesk === "sales" && (
              <Button size="sm" onClick={pindahedit} variant="danger">
                Edit SJ
              </Button>
            )}
          </div>

          <Modal>
            <Modal.Header closeButton>
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
            </Modal.Footer>
          </Modal>

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
                <Form.Label>Pickup Date</Form.Label>
                <Form.Control disabled value={detailData?.pickup_date} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Order Date</Form.Label>
                <Form.Control disabled value={detailData?.order_date} />
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
                                </>)}
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
                                  <td>{data.Price?.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}</td>
                                  <td>{data.Price?.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}</td>
                                </>)}
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
                    </>)}
                  {jobdesk !== "operasional" && (
                    <>

                      <td width="150px">Rp {detailData?.subTotal?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}</td>
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
                      <td>{data?.tgl_chat}</td>
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
