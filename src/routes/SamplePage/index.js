import React from "react";
import mobil from "../redux toolkit/store/ZustandStore";
import IntlMessages from "util/IntlMessages";
import { useEffect } from "react";
const SamplePage = () => {
  const jobdesk = mobil((state) => state.jobdesk);
  useEffect(() => {
    console.log(jobdesk);
  }, [jobdesk]);
  
  return (
    <div>
      <h2>Halo {jobdesk}</h2>

      <div className="gx-d-flex justify-content-center">
        {/* <h4>Start building your app. Happy Coding!</h4> */}
      </div>

    </div>
  );
};

export default SamplePage;
