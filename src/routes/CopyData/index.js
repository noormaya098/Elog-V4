import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${match.url}sample`}
        component={asyncComponent(() => import("./SamplePage"))}
      />
      <Route
        path={`${match.url}addnewso`}
        component={asyncComponent(() => import("./AddNewSo"))}
      />
      <Route
        path={`${match.url}addnewsp`}
        component={asyncComponent(() => import("./Splist/create"))}
      />
      <Route
        path={`${match.url}addnewap`}
        component={asyncComponent(() => import("./AddNewAP"))}
      />
      <Route
        path={`${match.url}aplist`}
        component={asyncComponent(() => import("./APList"))}
      />
      <Route
        path={`${match.url}apaddon`}
        component={asyncComponent(() => import("./APAddon"))}
      />
      <Route
        path={`${match.url}appersonal`}
        component={asyncComponent(() => import("./APAddon"))}
      />
      <Route
        path={`${match.url}appengajuanservice`}
        component={asyncComponent(() => import("./APAddon"))}
      />
      <Route
        path={`${match.url}appermohonanbiaya`}
        component={asyncComponent(() => import("./APAddon"))}
      />
      <Route
        path={`${match.url}penerimaaninv`}
        component={asyncComponent(() => import("./APAddon"))}
      />
      <Route
        path={`${match.url}akuntingprofit`}
        component={asyncComponent(() => import("./APAddon"))}
      />
      <Route
        path={`${match.url}splist/detail/:id`}
        component={asyncComponent(() => import("./Splist/detail"))}
      />
      <Route
        path={`${match.url}splist/create`}
        component={asyncComponent(() => import("./Splist/create"))}
      />
      <Route
        path={`${match.url}splist`}
        component={asyncComponent(() => import("./Splist"))}
      />
      <Route
        path={`${match.url}splistnew`}
        component={asyncComponent(() => import("./SamplePage"))}
      />
      <Route
        path={`${match.url}smlist`}
        component={asyncComponent(() => import("./Smlist"))}
      />
      <Route
        path={`${match.url}smlistnew`}
        component={asyncComponent(() => import("./Smlistnew"))}
      />
      <Route
        path={`${match.url}smreal`}
        component={asyncComponent(() => import("./Smreal"))}
      />
      <Route
        path={`${match.url}tarifeureka-add`}
        component={asyncComponent(() => import("./TarifEureka/create"))}
      />
      <Route
        path={`${match.url}tarifeureka/edit/:id`}
        component={asyncComponent(() => import("./TarifEureka/edit"))}
      />
      <Route
        path={`${match.url}tarifeureka`}
        component={asyncComponent(() => import("./TarifEureka"))}
      />
      <Route
        path={`${match.url}tarifpelanggan-add`}
        component={asyncComponent(() => import("./TarifPelanggan/create"))}
      />
      <Route
        path={`${match.url}tarifpelanggan/edit/:id`}
        component={asyncComponent(() => import("./TarifPelanggan/edit"))}
      />
      <Route
        path={`${match.url}tarifpelanggan`}
        component={asyncComponent(() => import("./TarifPelanggan"))}
      />
      <Route
        path={`${match.url}tarifmitra-add`}
        component={asyncComponent(() => import("./TarifMitra/create"))}
      />
      <Route
        path={`${match.url}tarifmitra/edit/:id`}
        component={asyncComponent(() => import("./TarifMitra/edit"))}
      />
      <Route
        path={`${match.url}tarifmitra`}
        component={asyncComponent(() => import("./TarifMitra"))}
      />

      <Route
        path={`${match.url}masterprovinsi`}
        component={asyncComponent(() => import("./MasterProvinsi"))}
      />
      <Route
        path={`${match.url}masterkota`}
        component={asyncComponent(() => import("./MasterKota"))}
      />
      <Route
        path={`${match.url}masterkecamatan`}
        component={asyncComponent(() => import("./MasterKecamatan"))}
      />
      <Route
        path={`${match.url}reportcust`}
        component={asyncComponent(() => import("./ReportCust"))}
      />
      <Route
        path={`${match.url}reportsales`}
        component={asyncComponent(() => import("./ReportSales"))}
      />
      <Route
        path={`${match.url}losesales/detail/:id`}
        component={asyncComponent(() => import("./LoseSales/detail"))}
      />
      <Route
        path={`${match.url}losesales`}
        component={asyncComponent(() => import("./LoseSales"))}
      />
      <Route
        path={`${match.url}reportspapprove`}
        component={asyncComponent(() => import("./ReportSPApprove"))}
      />

      <Route
        path={`${match.url}deliveryschedule`}
        component={asyncComponent(() => import("./Deliveryschedule"))}
      />
      <Route
        path={`${match.url}pengajuanansuransi`}
        component={asyncComponent(() => import("./Pengajuanansuransi"))}
      />
      <Route
        path={`${match.url}marketingschedule/edit/:id`}
        component={asyncComponent(() => import("./Marketingschedule/edit"))}
      />
      <Route
        path={`${match.url}marketingschedule/detail/:id`}
        component={asyncComponent(() => import("./Marketingschedule/detail"))}
      />
      <Route
        path={`${match.url}marketingschedule/add`}
        component={asyncComponent(() => import("./Marketingschedule/add"))}
      />
      <Route
        path={`${match.url}marketingschedule`}
        component={asyncComponent(() => import("./Marketingschedule"))}
      />
      <Route
        path={`${match.url}pengajuaninternal`}
        component={asyncComponent(() => import("./Pengajuaninternal"))}
      />
      <Route
        path={`${match.url}customerrequest`}
        component={asyncComponent(() => import("./Customerrequest"))}
      />
      <Route
        path={`${match.url}blogartikel`}
        component={asyncComponent(() => import("./BlogArtikel"))}
      />
      <Route
        path={`${match.url}blogimage`}
        component={asyncComponent(() => import("./BlogImage"))}
      />
      <Route
        path={`${match.url}blogpartial`}
        component={asyncComponent(() => import("./BlogPartial"))}
      />
      <Route
        path={`${match.url}blogsubpartial`}
        component={asyncComponent(() => import("./BlogSubPartial"))}
      />
      <Route
        path={`${match.url}chatinternal`}
        component={asyncComponent(() => import("./ChatInternal"))}
      />
      <Route
        path={`${match.url}commentinternal`}
        component={asyncComponent(() => import("./CommentInternal"))}
      />
      <Route
        path={`${match.url}eurekamap`}
        component={asyncComponent(() => import("./EurekaMap"))}
      />
      <Route
        path={`${match.url}masteralamat/edit/:id`}
        component={asyncComponent(() => import("./MasterAlamat/edit"))}
      />
      <Route
        path={`${match.url}masteralamat/detail/:id`}
        component={asyncComponent(() => import("./MasterAlamat/detail"))}
      />
      <Route
        path={`${match.url}masteralamat/add`}
        component={asyncComponent(() => import("./MasterAlamat/add"))}
      />
      <Route
        path={`${match.url}masteralamat`}
        component={asyncComponent(() => import("./MasterAlamat"))}
      />
      <Route
        path={`${match.url}mastercustomer/edit/:id`}
        component={asyncComponent(() => import("./MasterCustomer/edit"))}
      />
      <Route
        path={`${match.url}mastercustomer/detail/:id`}
        component={asyncComponent(() => import("./MasterCustomer/detail"))}
      />
      <Route
        path={`${match.url}mastercustomer/add`}
        component={asyncComponent(() => import("./MasterCustomer/add"))}
      />
      <Route
        path={`${match.url}mastermitra/edit/:id`}
        component={asyncComponent(() => import("./MasterMitra/edit"))}
      />
      <Route
        path={`${match.url}mastermitra/detail/:id`}
        component={asyncComponent(() => import("./MasterMitra/detail"))}
      />
      <Route
        path={`${match.url}mastermitra/add`}
        component={asyncComponent(() => import("./MasterMitra/add"))}
      />
      <Route
        path={`${match.url}mastermitra`}
        component={asyncComponent(() => import("./MasterMitra"))}
      />
      <Route
        path={`${match.url}mastercustomer`}
        component={asyncComponent(() => import("./MasterCustomer/index"))}
      />
      <Route
        path={`${match.url}masteraddress`}
        component={asyncComponent(() => import("./MasterAddress"))}
      />
      <Route
        path={`${match.url}vehiclestatus`}
        component={asyncComponent(() => import("./VehicleStatus"))}
      />
      <Route
        path={`${match.url}vehicleready`}
        component={asyncComponent(() => import("./VehicleReady"))}
      />
      <Route
        path={`${match.url}unitmitra`}
        component={asyncComponent(() => import("./UnitMitra"))}
      />
      <Route
        path={`${match.url}businessunit/edit/:id`}
        component={asyncComponent(() => import("./BusinessUnit/edit"))}
      />
      <Route
        path={`${match.url}businessunit/add`}
        component={asyncComponent(() => import("./BusinessUnit/create"))}
      />
      <Route
        path={`${match.url}businessunit`}
        component={asyncComponent(() => import("./BusinessUnit"))}
      />
      <Route
        path={`${match.url}pengguna`}
        component={asyncComponent(() => import("./Pengguna"))}
      />
      <Route
        path={`${match.url}cancelmassage`}
        component={asyncComponent(() => import("./CancelMassage"))}
      />
      {/* <Route
        path={`${match.url}mastermitraold/edit/:id`}
        component={asyncComponent(() => import("./MasterMitraOld/edit"))}
      /> */}
      <Route
        path={`${match.url}mastermitraold/detailmitra/:id`}
        component={asyncComponent(() => import("./MasterMitraOld/DetailMitra"))}
      />
      {/* <Route
        path={`${match.url}mastermitraold/tambahmitrabaru`}
        component={asyncComponent(() => import("./MasterMitraOld/tambahmitrabaru"))}
      />  */}
      <Route
        path={`${match.url}mastermitraold`}
        component={asyncComponent(() => import("./MasterMitraOld/Index"))}
      />

      <Route
        path={`${match.url}mastermitraold/datakeuangan`}
        component={asyncComponent(() =>
          import("./MasterMitraOld/Form/DataKeuangan")
        )}
      />
      <Route
        path={`${match.url}mastermitraold/dataprofile`}
        component={asyncComponent(() =>
          import("./MasterMitraOld/Form/DataProfile")
        )}
      />
      <Route
        path={`${match.url}mastermitraold/datareferensi`}
        component={asyncComponent(() =>
          import("./MasterMitraOld/Form/DataReferensi")
        )}
      />
      <Route
        path={`${match.url}mastermitraold/pic`}
        component={asyncComponent(() => import("./MasterMitraOld/Form/PIC"))}
      />
      <Route
        path={`${match.url}mastermitraold/report`}
        component={asyncComponent(() => import("./MasterMitraOld/Form/Report"))}
      />
      <Route
        path={`${match.url}mastermitraold/createmitramodal`}
        component={asyncComponent(() =>
          import("./MasterMitraOld/CreateMitraModal")
        )}
      />

      <Route
        path={`${match.url}bubrench/detail/:id`}
        component={asyncComponent(() => import("./BuBrench/edit"))}
      />
      <Route
        path={`${match.url}bubrench/add`}
        component={asyncComponent(() => import("./BuBrench/create"))}
      />
      <Route
        path={`${match.url}bubrench/edit/:id`}
        component={asyncComponent(() => import("./BuBrench/edit"))}
      />
      <Route
        path={`${match.url}buemploye/edit/:id`}
        component={asyncComponent(() => import("./BuEmploye/edit"))}
      />
      <Route
        path={`${match.url}bubrench`}
        component={asyncComponent(() => import("./BuBrench"))}
      />
      <Route
        path={`${match.url}buemploye/add`}
        component={asyncComponent(() => import("./BuEmploye/create"))}
      />
      <Route
        path={`${match.url}buemploye`}
        component={asyncComponent(() => import("./BuEmploye"))}
      />
      <Route
        path={`${match.url}buemployeposition/edit/:id`}
        component={asyncComponent(() => import("./BuEmployePosition/edit"))}
      />
      <Route
        path={`${match.url}buemployeposition/add`}
        component={asyncComponent(() => import("./BuEmployePosition/create"))}
      />
      <Route
        path={`${match.url}buemployeposition`}
        component={asyncComponent(() => import("./BuEmployePosition"))}
      />
    </Switch>
  </div>
);

export default App;
