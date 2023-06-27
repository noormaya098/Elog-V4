import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";
import Token from "../Api/Token";
const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${match.url}sample`}
        component={asyncComponent(() => import("./SamplePage"))}
      />
      <Route
        path={`${match.url}masterdata/drivers`}
        component={asyncComponent(() => import("./MasterData/Driver"))}
      />
      <Route
        path={`${match.url}masterdata/vehicle`}
        component={asyncComponent(() => import("./MasterData/Purchasing/Vehicle/VehicleBaru"))}
      />

      <Route
        path={`${match.url}masterdata/monitoring`}
        component={asyncComponent(() =>
          import("./MasterData/Monitoring/DriverMap")
        )}
      />

      <Route
        path={`${match.url}masterdata/detailsplama/:idmp`}
        component={asyncComponent(() => import("./MasterData/DetailSP/Index"))}
      />

      <Route
        path={`${match.url}masterdata/detailsp/:idmp`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/HalamanDetail")
        )}
      />

      <Route
        path={`${match.url}masterdata/splistdetailakunting/:idmp`}
        component={asyncComponent(() =>
          import("./MasterData/Monitoring SP List Akunting/DetailsAkunting")
        )}
      />
      <Route
        path={`${match.url}masterdata/splistlama`}
        component={asyncComponent(() => import("./MasterData/SP List/index"))}
      />
      <Route
        path={`${match.url}masterdata/newsplist`}
        component={asyncComponent(() => import("./MasterData/SP List/SPList"))}
      />
      <Route
        path={`${match.url}masterdata/splist`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Splistlama")
        )}
      />
      <Route
        path={`${match.url}masterdata/marketing/splist`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Splistlama")
        )}
      />
      <Route
        path={`${match.url}masterdata/marketing/createsp`}
        component={asyncComponent(() =>
          import("./MasterData/Marketing/Splist/createSPBaru/Index")
        )}
      />

      <Route
        path={`${match.url}masterdata/driver`}
        component={asyncComponent(() =>
          import("./MasterData/Driver/CobaTable")
        )}
      />
      <Route
        path={`${match.url}akunting/splistakunting`}
        component={asyncComponent(() =>
          import("./MasterData/Monitoring SP List Akunting/SPListAkunting")
        )}
      />
      <Route
        path={`${match.url}akunting/ar/ar`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Akunting/ARList/ARListALL")
        )}
      />
      <Route
        path={`${match.url}akunting/ar/detailar/:no`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Akunting/ARList/DetailAR")
        )}
      />
      <Route
        path={`${match.url}akunting/ar/edits/:no`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Akunting/ARList/EditARDetail")
        )}
      />
      <Route
        path={`${match.url}akunting/ar/reportpartners/reportpenerimaaninvoice`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Akunting/ARList/Payment/PenerimaanINV")
        )}
      />
      <Route
        path={`${match.url}akunting/splistakuntingbaru`}
        component={asyncComponent(() =>
          import("./MasterData/Monitoring SP List Akunting/SplistAkuntingBaru")
        )}
      />
      <Route
        path={`${match.url}akunting/splistwaitingakunting`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Akunting/index")
        )}
      />
      <Route
        path={`${match.url}masterdata/purchasing/driver`}
        component={asyncComponent(() => import("./MasterData/Driver/DriverTableBaru"))}
      />
      <Route
        path={`${match.url}masterdata/driverbaru`}
        component={asyncComponent(() => import("./MasterData/Driver/DriverTableBaru"))}
      />
      <Route
        path={`${match.url}masterdata/purchasing/vehicle`}
        component={asyncComponent(() => import("./MasterData/Purchasing/Vehicle/VehicleBaru"))}
      />
      <Route
        path={`${match.url}masterdata/vehiclebaru`}
        component={asyncComponent(() => import("./MasterData/Purchasing/Vehicle/VehicleBaru"))}
      />
      <Route
        path={`${match.url}purchasing/mastermitra`}
        component={asyncComponent(() =>
          import("./MasterData/Purchasing/MasterMitra/Index")
        )}
      />
      <Route
        path={`${match.url}purchasing/DetailMitra/:mitraId`}
        component={asyncComponent(() =>
          import("./MasterData/Purchasing/MasterMitra/DetailMitra")
        )}
      />
      <Route
        path={`${match.url}purchasing/tambahmitra/`}
        component={asyncComponent(() =>
          import("./MasterData/Purchasing/MasterMitra/TambahMitraBaru")
        )}
      />

      <Route
        path={`${match.url}masterdata/purchasing/detailsp/:idmp`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/HalamanDetail")
        )}
      />
      <Route
        path={`${match.url}purchasing/newsplist`}
        component={asyncComponent(() =>
          import("./MasterData/Purchasing/SP/SplistAkuntingBaru")
        )}
      />
      <Route
        path={`${match.url}masterdata/sjlist`}
        component={asyncComponent(() =>
          import("./MasterData/Purchasing/SP/SJ")
        )}
      />
      <Route
        path={`${match.url}masterdata/detailsjlist/:id`}
        component={asyncComponent(() =>
          import("./MasterData/Purchasing/SP/detail/DetailSJ")
        )}
      />

      {/* ROUTE MARKETING */}
      <Route
        path={`${match.url}masterdata/edit-sp/:idmp`}
        component={asyncComponent(() =>
          import("./MasterData/Marketing/Splist/EditSP")
        )}
      />
      <Route
        path={`${match.url}masterdata/edit-spNew/:idmp`}
        component={asyncComponent(() =>
          import("./MasterData/Marketing/Splist/EditSPNew")
        )}
      />
      <Route
        path={`${match.url}masterdata/detail-sp/:idmp`}
        component={asyncComponent(() =>
          import("./MasterData/Marketing/Splist/DetailSP")
        )}
      />
      <Route
        path={`${match.url}masterdata/createsp`}
        component={asyncComponent(() =>
          import("./MasterData/Marketing/Splist/createSPBaru/Index")
        )}
      />
    </Switch>
  </div>
);

export default App;
