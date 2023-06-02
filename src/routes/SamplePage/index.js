import React, { useState, useEffect } from "react";
import mobil from "../redux toolkit/store/ZustandStore";
import IntlMessages from "util/IntlMessages";
import { useHistory } from "react-router-dom";
import Token from "../../Api/Token";
import axios from "axios";
import Baseurl from "../../Api/BaseUrl";
import Swal from "sweetalert2";
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
      <h2>Halo {namaJobdesk}</h2>
      <h5>Total Driver ada {inform.totalDriver}</h5>
      <h5>Driver Aktif ada {inform.activeDriver}</h5>
      <h5>Driver Off ada {inform.offDriver}</h5>
      <h5>Total Mobil ada {inform.totalVeh}</h5>
      <h5>Mobil Aktif ada {inform.activeVeh}</h5>
      <h5>Mobil Off ada {inform.offVeh}</h5>

      <div className="gx-d-flex justify-content-center">
        {/* <h4>Start building your app. Happy Coding!</h4> */}
      </div>
    </div>
  );
};

export default SamplePage;
