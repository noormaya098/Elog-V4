import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button, Table } from "react-bootstrap";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import axios from "axios";
import FormTable from "./FormTable";
function HalamanDetail() {
  const { idmp } = useParams();
  const [isidata, setIsidata] = useState([]);
  const [totalPrice , setTotalPrice] = useState([]);


  const detail = async (idmp) => {
    const isi = await axios.get(`${Baseurl}sp/get-SP-detail?idmp=${idmp}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    });

    const semua = isi.data.data
    const totalPrices = isi.data.Totalprice
    setTotalPrice(totalPrices)
    console.log(`test`, totalPrices);
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
      price : item.price,
    }));
    setIsidata(semua);
    console.log(`ini idmp ${idmp}`, isidetail);
  };

  useEffect(() => {
    detail(idmp);
  }, [idmp]);


  return (
    <div>
      <Card>
      <FormTable isidata={isidata} totalPrice={totalPrice} />
      </Card>
    </div>
  );
}

export default HalamanDetail;
