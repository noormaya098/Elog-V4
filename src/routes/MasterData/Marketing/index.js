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
        path={`${match.url}tarifpelanggan`}
        component={asyncComponent(() => import("./TarifPelanggan"))}
      />
      <Route
        path={`${match.url}spkapproved`}
        component={asyncComponent(() => import("./Spkapproved"))}
      />
      <Route
        path={`${match.url}waitingspk`}
        component={asyncComponent(() => import("./Waitingspk"))}
      />
      <Route
        path={`${match.url}spklist`}
        component={asyncComponent(() => import("./Spklist"))}
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
        path={`${match.url}mastercustomer/detail/:id`}
        component={asyncComponent(() => import("./MasterCustomer/detail"))}
      />
      <Route
        path={`${match.url}mastercustomer/add`}
        component={asyncComponent(() => import("./MasterCustomer/add"))}
      />
      <Route
        path={`${match.url}mastercustomer`}
        component={asyncComponent(() => import("./MasterCustomer"))}
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
        path={`${match.url}tarifpelanggan`}
        component={asyncComponent(() => import("./TarifPelanggan"))}
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
    </Switch>
  </div>
);

export default App;
