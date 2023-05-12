import React, { useState, useEffect } from "react";
import mobil from "../redux toolkit/store/ZustandStore";
import IntlMessages from "util/IntlMessages";

const SamplePage = () => {
  const [nama, setNama] = useState('');

  useEffect(() => {
    const jobdesk = localStorage.getItem('jobdesk');
    setNama(jobdesk);
  }, []);

  return (
    <div>
      <h2>Halo {nama}</h2>

      <div className="gx-d-flex justify-content-center">
        {/* <h4>Start building your app. Happy Coding!</h4> */}
      </div>
    </div>
  );
};

export default SamplePage;
