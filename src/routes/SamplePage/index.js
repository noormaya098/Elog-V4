import React, { useState, useEffect } from "react";
import mobil from "../redux toolkit/store/ZustandStore";
import IntlMessages from "util/IntlMessages";
import { useHistory } from "react-router-dom";
import Token from "../../Api/Token";

const SamplePage = () => {
  const [namaJobdesk, setNamaJobdesk] = useState('');
const history = useHistory()
  useEffect(() => {
    const jobdesk = localStorage.getItem('jobdesk');
    if (Token === "") { 
      history.push('/signin')
    }
    setNamaJobdesk(jobdesk);
  }, []);

  return (
    <div>
      <h2>Halo {namaJobdesk}</h2>

      <div className="gx-d-flex justify-content-center">
        {/* <h4>Start building your app. Happy Coding!</h4> */}
      </div>
    </div>
  );
};

export default SamplePage;
