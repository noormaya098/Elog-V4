import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button, Table, Modal } from "react-bootstrap";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import axios from "axios";
import FormTable from "./FormTable";
import mobil from "../../redux toolkit/store/ZustandStore";
import useStore from "../../redux toolkit/store/UseStore";
function HalamanDetail() {
 const  { idmp } = useParams();
  const [isidata, setIsidata] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [totalPrice, setTotalPrice] = useState([]);
  const { isidetail, setSpDetail } = mobil((state) => ({
    isidetail: state.isidetail,
    setSpDetail: state.setSpDetail,
  }));
  const [kendaraan, setkendarran] = useState([]);
  const [idkendaraan, setidkendaraan] = useState([]);
  const { isiduit, setDuit } = mobil((state) => ({
    isiduit: state.isiduit,
    setDuit: state.setDuit,
  }));

  useEffect(() => {
    setkendarran(isidetail.map((item) => item.kendaraan));
  }, [isidetail]);

  console.log(`isni data`, isidata);

  const detail = async (idmp) => {
    const isi = await axios.get(`${Baseurl}sp/get-SP-detail?idmp=${idmp}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    });
    const semua = isi.data.data;
    const totalPrices = isi.data.Totalprice;
    setTotalPrice(totalPrices);
    setDuit(totalPrices);
    const isidetail = isi.data.data.map((item) => ({
      berat: item.berat,
      sp: item.sp,
      kendaraan: item.kendaraan,
      pickupAddress: item.pickupAddress,
      perusahaan: item.perusahaan,
      destination: item.destination,
      via: item.via,
      item: item.item,
      qty: item.qty,
      service: item.service,
      pickupDate: item.pickupDate,
      price: item.price,
    }));
    setIsidata(semua);
    setSpDetail(semua);
    console.log(`ini idmp ${idmp}`, isiduit);
  };

  useEffect(() => {
    detail(idmp);
    // pilihDriver();
  }, [idmp]);

  // const [driverss, setDrtivers] = useState([]);
  // const [iddriver, setiddriverr] = useState([]);
  // const [noopolice, setnoopolice] = useState([]);
  // const [drivernya, setDrivernya] = useState([]);
  // const [selecetdriver, serdriverselecetdriver] = useState([]);
  // const [bisakek, setbIsakek] = useState([]);
  // const { setBisakek } = useStore((state) => ({
  //   setBisakek: state.setBisakek,
  // }));
  // const { bisakeks } = useStore((state) => ({
  //   bisakek: state.bisakek,
  // }));

  return (
    <div>
      <FormTable isidata={isidata}></FormTable>
      {/* <DetailsAkunting isidata={isidata}></DetailsAkunting> */}
    </div>
  );
}

export default HalamanDetail;
