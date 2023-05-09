import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route path={`${match.url}masterdata/drivers`} component={asyncComponent(() => import('./MasterData/Driver'))}/>
      <Route path={`${match.url}masterdata/vehicle`} component={asyncComponent(() => import('./MasterData/Vehicle'))}/>
      {/* <Route path={`${match.url}masterdata/detailsp`} component={asyncComponent(() => import('./MasterData/DetailSP/Index'))}/> */}
      <Route path={`${match.url}masterdata/detailsplama/:idmp`} component={asyncComponent(() => import('./MasterData/DetailSP/Index'))}/>
      <Route path={`${match.url}masterdata/detailsp/:idmp`} component={asyncComponent(() => import('./MasterData/SP List/HalamanDetail'))}/>
      <Route path={`${match.url}masterdata/splistlama`} component={asyncComponent(() => import('./MasterData/SP List/index'))}/>
      <Route path={`${match.url}masterdata/splist`} component={asyncComponent(() => import('./MasterData/SP List/SPList'))}/>
      <Route path={`${match.url}masterdata/driver`} component={asyncComponent(() => import('./MasterData/Driver/CobaTable'))}/>
      <Route path={`${match.url}monitoring/byunit`} component={asyncComponent(() => import('./Monitoring/By unit'))}/>
      <Route path={`${match.url}monitoring/editdriver`} component={asyncComponent(() => import('./Monitoring/By unit/EditDriver'))}/>
      <Route path={`${match.url}monitoring/bysm`} component={asyncComponent(() => import('./Monitoring/By sm'))}/>
    </Switch>
  </div>
);

export default App;
