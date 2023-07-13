import React, { useEffect, useState } from "react";
import { Button, Row, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import Baseurl from "../../../../Api/BaseUrl";
import { Pagination } from "antd";

function PIC({ mitraId }) {
  const [showModal, setShowModal] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [dataPagination, setDataPagination] = useState(0);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const initialValues = {
    nama: "",
    email: "",
    telpon: "",
    jabatan: "",
    ktp: "",
  };

  const createMitraPic = (values) => {
    axios
      .post("http://api.eurekalogistics.co.id/mitra/create-mitra-pic", values)
      .then((response) => {
        console.log(response.data); // Replace with your desired logic for successful response
      })
      .catch((error) => {
        console.error(error); // Replace with your desired error handling logic
      });
  };

  const fetchDataDetail = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}mitra/get-mitra-pic?mitra_id=${mitraId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", response.data.data);
      setDataList(response.data.data);
      setDataPagination(response.data.total); // Jumlah data pagination
    } catch (error) {
      console.error(error);
    }
  };
 
  useEffect(() => {
    fetchDataDetail();
  }, []);

  const handleSubmit = (values) => {
    createMitraPic(values);
  };

  let nomor = 1;

  const columns = [
    {
      name: "No.",
      selector: (row) => nomor++,
    },
    {
      name: "Nama",
      selector: (row) => row.nama,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Telp",
      selector: (row) => row.telepon,
    },
    {
      name: "Jabatan",
      selector: (row) => row.jabatan,
    },
    // {
    //   name: "Aksi",
    //   cell: (row) => (
    //     <>
    //       <Button size="sm" variant="primary" onClick={handleShowModal}>
    //         Detail
    //       </Button>
    //       <Button size="sm" variant="danger">
    //         Hapus
    //       </Button>
    //     </>
    //   ),
    // },
  ];

  return (
    <div>
      <Row>
        <b>DATA PENANGGUNG JAWAB (Person In Charge)</b>
        <DataTable columns={columns} data={dataList} />
        <div className="mt-5 d-flex justify-content-end">
          <Pagination 
           defaultCurrent={100}
           total={dataPagination} />
        </div>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <div className="mb-3">
                <label htmlFor="nama" className="form-label">
                  Nama:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="nama"
                  name="nama"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <Field
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telpon" className="form-label">
                  Telpon:
                </label>
                <Field
                  type="tel"
                  className="form-control"
                  id="telpon"
                  name="telpon"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="jabatan" className="form-label">
                  Jabatan:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="jabatan"
                  name="jabatan"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ktp" className="form-label">
                  KTP:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="ktp"
                  name="ktp"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PIC;
