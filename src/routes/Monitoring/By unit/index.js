// import { Space, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import useStore from "../../../zustand/Store";
import DataTable from "react-data-table-component";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function Byunit() {
  const [driverData, setDriverData] = useState({});
  const { posts, fetchPosts } = useStore();
  const Baseurl = "https://api.eurekalogistics.co.id/";
  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODA0ODk1MTAsImV4cCI6MTY4MTA5NDMxMH0.rM1kY9dx2mFKTmNtGsVUYiE9h2kyVcjFoC-FiyCNLKQ";

  const [selectedPost, setSelectedPost] = useState({});
  const [showModal, setShowModal] = useState(false);

  // console.log(`ini driver data`, driverData);

  const handleShowModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPost({}); // reset selectedPost saat modal ditutup
    setShowModal(false);
  };

  useEffect(() => {
    fetchPosts();
    // Editdriver.fetchPosts();
  }, [fetchPosts]);
  console.log(`ini post`, posts.driverId);

  const columns = [
    {
      name: "Title",
      selector: (posts) => posts.no + 1,
    },
    {
      name: "Nama",
      selector: (posts) => posts.driverName,
    },
    {
      name: "Foto",
      selector: (posts) => <img src={posts.driverImage} width="50px" />,
    },
    {
      name: "Penjualan",
      selector: (posts) => posts.totalPenjualan,
    },
    {
      name: "Actions",
      cell: (posts) => (
        <>
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleShowModal(posts)}
          >
            Show
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              editdatadriver(posts.driverId);
              // lakukan sesuatu setelah Button di klik
            }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  const editdatadriver = (id) => {
    axios
      .post(
        `${Baseurl}driver/update-driver`,
        {
          id: `${id}`,
          nik: "",
          divisi: "",
          // tambahkan field yang ingin diubah dan datanya di sini
        },
        {
          headers: {
            Authorization: `token ${Token}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: "Update sukses!",
          text: "Data driver telah diperbarui.",
          icon: "success",
        }).then(() => {
          fetchPosts();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Update Driver Gagal",
          text: error.message,
        });
      });
  };

  return (
    <>
      <DataTable columns={columns} data={posts} pagination={10} />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Data Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <img
                src={selectedPost.driverImage}
                width="100%"
                alt={selectedPost.driverName}
              />
            </Col>
            <Col xs={8}>
              <p>Nama Driver : {selectedPost.driverName}</p>
              <p>Total Penjualan : {selectedPost.totalPenjualan}</p>
              <p>Driver Divisi : {selectedPost.division}</p>
              <p>Driver Alamat : {selectedPost.driverAddress}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Byunit;
