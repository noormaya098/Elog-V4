import React, { useState, useEffect } from "react";
import mobil from "../redux toolkit/store/ZustandStore";
import IntlMessages from "util/IntlMessages";
import { useHistory } from "react-router-dom";
import Token from "../../Api/Token";
import axios from "axios";
import Baseurl from "../../Api/BaseUrl";
import Swal from "sweetalert2";
import Card from "antd/lib/card/Card";
import { Row, Col } from "react-bootstrap";
const SamplePage = () => {


  const { jobdesk, setJobdesk } = mobil((state) => ({
    jobdesk: state.jobdesk,
    setJobdesk: state.setJobdesk
  }))
  const [namaJobdesk, setNamaJobdesk] = useState('');
  const [inform, setinform] = useState('');
  const history = useHistory()
  useEffect(() => {
    const jobdesk = localStorage.getItem('jobdesk');
    if (Token === "") {
      history.push('/signin')
    }
    setJobdesk(jobdesk)
    setNamaJobdesk(jobdesk);

  }, []);

  console.log(`ini zustand`, jobdesk);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Baseurl}information/get-inform`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = response.data.data;
      setinform(data);
      console.log(response.status);

    } catch (error) {
      if (error.response && error.response.status === 404) {
        localStorage.clear('Token');
        if (localStorage.getItem(`Token`) === null) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error Login, Silahkan Login Kembali '
          });
          setTimeout(() => {
            window.location.reload()

          }, 2000);
          // history.push('/signin');
        }
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div>
        <Card>
      <Row>
          <h2>Halo {namaJobdesk}</h2>
          <Col sm={4}>
            <Card style={{ backgroundColor: "#dd4b39" }}>
              <h5 style={{ color: 'white' }}>Total Driver : {inform.totalDriver}</h5>
              <h5 style={{ color: 'white' }}>Driver Aktif : {inform.activeDriver + " / " + inform.totalDriver}</h5>
              <h5 style={{ color: 'white' }}>Driver Off : {inform.offDriver}</h5>
            </Card>
          </Col>
          <Col sm={4}>
            <Card style={{ backgroundColor: "#00a65a" }}>
              <h5 style={{ color: 'white' }}>Total Mobil : {inform.totalVeh}</h5>
              <h5 style={{ color: 'white' }}>Mobil Aktif : {inform.activeVeh + " / " + inform.totalVeh}</h5>
              <h5 style={{ color: 'white' }}>Mobil Off : {inform.offVeh}</h5>
            </Card>
          </Col>
      </Row>
        </Card>



      <div className="gx-d-flex justify-content-center">
        {/* <h4>Start building your app. Happy Coding!</h4> */}
      </div>
    </div>
  );
};

export default SamplePage;
