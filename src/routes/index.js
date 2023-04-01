import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route path={`${match.url}masterdata/driver`} component={asyncComponent(() => import('./MasterData/Driver'))}/>
      <Route path={`${match.url}masterdata/vehicle`} component={asyncComponent(() => import('./MasterData/Vehicle'))}/>
      <Route path={`${match.url}monitoring/byunit`} component={asyncComponent(() => import('./Monitoring/By unit'))}/>
      <Route path={`${match.url}monitoring/bysm`} component={asyncComponent(() => import('./Monitoring/By sm'))}/>
    </Switch>
  </div>
);

export default App;
