import React, { memo, useEffect, useState } from "react";
import { Col, Row, Form, Button, Table, Modal } from "react-bootstrap";
import { Card, Input } from "antd";
import { useParams } from "react-router-dom";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import axios from "axios";
import FormTable from "./FormTable";
import mobil from "../../redux toolkit/store/ZustandStore";
import useStore from "../../redux toolkit/store/UseStore";
function HalamanDetail() {
  const { idmp } = useParams();
  const [IsiDataSPSemua, setIsiDataSPSemua] = useState("")
  const [isidata, setIsidata] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 
  const [totalPrice, setTotalPrice] = useState([]);
  const { isidetail, setSpDetail } = mobil((state) => ({
    isidetail: state.isidetail,
    setSpDetail: state.setSpDetail,
  }));
  const { custumer, setCustumer } = mobil((state) => ({
    custumer: state.custumer,
    setCustumer: state.setCustumer,
  }));
  const [kendaraan, setkendarran] = useState([]);
  const [idkendaraan, setidkendaraan] = useState([]);
  const { memo, SetisiMemo } = mobil((state) => ({
    memo: state.memo,
    SetisiMemo: state.SetisiMemo,
  }));
  const { isiduit, setDuit } = mobil((state) => ({
    isiduit: state.isiduit,
    setDuit: state.setDuit,
  }));

  const { jenisBarang, setjenisBarang } = mobil((state) => ({
    jenisBarang: state.jenisBarang,
    setjenisBarang: state.setjenisBarang,
  }));

  const { asuransi, setAsuransi } = mobil((state) => ({
    asuransi: state.asuransi,
    setAsuransi: state.setAsuransi,
  }));

  const { orderdate, setOrderdate } = mobil((state) => ({
    orderdate: state.orderdate,
    setOrderdate: state.setOrderdate,
  }));
 
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [komen, setKomen] = useState([]);
  const { IsiKomenRejectSP, setIsiKomenRejectSP } = mobil((state) => ({
    IsiKomenRejectSP: state.IsiKomenRejectSP,
    setIsiKomenRejectSP: state.setIsiKomenRejectSP
  }))
//  const { SJKosongModal, setSJKosongModal } = mobil((state) => ({
//     SJKosongModal: state.SJKosongModal,
//     setSJKosongModal: state.setSJKosongModal,
//   }));


  useEffect(() => {
    setkendarran(isidetail.map((item) => item?.kendaraan));
  }, [isidetail]);

  // console.log(`isni data`, isidata);

  const detail = async (idmp) => {
    try {
        const isi = await axios.get(`${Baseurl}sp/get-SP-detail?idmp=${idmp}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        });
        const semua = isi.data.data;
        const totalPrices = isi.data.Totalprice;
        setTotalPrice(totalPrices);
        // setSJKosongModal(totalPrice)
        setDuit(totalPrices);
       
        const isidetail = semua.map((item) => ({
            berat: item.berat,
            sp: item.sp,
            kendaraan: item?.kendaraan,
            pickupAddress: item.pickupAddress,
            perusahaan: item.perusahaan,
            destination: item.destination,
            via: item.via,
            item: item.item,
            qty: item.qty,
            service: item.service,
            pickupDate: item.pickupDate,
            price: item.price,
            noSj: item.noSj,
        }));
        setIsidata(semua);
        setSpDetail(semua);
        setIsiKomenRejectSP()
    } catch (error) {
        console.error(error); 
    }
};

useEffect(() => {
    detail(idmp);
}, []);

// useEffect(() => {
//   const timeoutId = setTimeout(() => {
//     if (isiduit.length < 1) {  
//         console.log(`gaada isinya`);
//     } else {
//         alert(`ada isinya`);
//     }
//   }, 3000);

//   return () => {
//     clearTimeout(timeoutId);  // membersihkan timeout ketika komponen dilepas
//   };
// }, [isiduit]);

  
  
  // const SJKosongModalTrigger =()=>{
  //   if (isiduit == 0) {
  //     alert(`gaada isinya`)
  //   } else{
  //     alert(`ada isinya`)
  //   }
  // }
  

  const messagedetail = async () => {
    const isi = await axios.get(`${Baseurl}sp/get-SP-massage?id_mp=${idmp}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });


    const data = isi.data.data.map((item) => ({
      chat: item.chat,
      user: item.user,
      tgl_chat: item.tgl_chat,
    }));
    // console.log(`ini supir`,isi.data.supir);
    setUsers(isi.data?.supir[1]?.supir)
    setKomen(data);
    // console.log(`user`, users);
  };


  useEffect(() => {
    messagedetail();
    memos();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // messagedetail();
    }, 5000); // delay 5 detik

    findTidakMenggunakanUnit()
    return () => clearTimeout(timeoutId);
  }, [komen]);



  const memos = async () => {
    const data = await axios.get(
      `${Baseurl}sp/get-SP-all-detail?idmp=${idmp}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const datas = data.data.memo;
    const customer = data.data.customer;
    const jenisBarangs = data.data.jenisBarang;
    const orderdate = data.data.order_date;
    const asuransis = data.data.asuransi;
    SetisiMemo(datas);
    setCustumer(customer);
    setjenisBarang(jenisBarangs);
    setOrderdate(orderdate);
    setAsuransi(asuransis);
    setIsiDataSPSemua(data.data)
  };


  const findTidakMenggunakanUnit = () => {
    const isicommentTidak = komen.find(item => item.chat === "Tidak Menggunakan unit");
    if (isicommentTidak) {
      setIsiKomenRejectSP(isicommentTidak.chat);
    }
  };
  return (
    <div>
      <Card>
        
        <FormTable IsiDataSPSemua={IsiDataSPSemua} isidata={isidata} idmp={idmp}></FormTable>
        <Form>
          <Form.Group controlId="inputText">
            <Form.Label style={{ fontWeight: "bold" }}>Isi Memo</Form.Label>
            <Form.Control type="text" value={memo} disabled />
          </Form.Group>
        </Form>
        <br />
        <br />
        <Table responsive>
          <thead>
            <tr style={{ fontWeight: "bold", backgroundColor: "#f4dddd" }}>
              <td style={{ textAlign: "center" }}>No</td>
              <td style={{ textAlign: "left" }}>Comment</td>
              <td style={{ textAlign: "left" }}>User</td>
              <td style={{ textAlign: "center" }}>Tgl Comment</td>
            </tr>
          </thead>
          <tbody>
            {komen.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td style={{ textAlign: "left" }}>{item.chat}</td>
                <td style={{ textAlign: "left" }}>{item.user}</td>
                <td style={{ textAlign: "center" }}>{item.tgl_chat}</td>

              </tr>
            ))}
          </tbody>


        </Table>
      </Card>
    </div>
  );
}

export default HalamanDetail;
