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
        <Route path={`${match.url}masterdata/splistdetailakunting/:idmp`} component={asyncComponent(() => import('./MasterData/Monitoring SP List Akunting/DetailsAkunting'))}/> 
        <Route path={`${match.url}masterdata/splistlama`} component={asyncComponent(() => import('./MasterData/SP List/index'))}/>
        <Route path={`${match.url}masterdata/newsplist`} component={asyncComponent(() => import('./MasterData/SP List/SPList'))}/>
        <Route path={`${match.url}masterdata/splist`} component={asyncComponent(() => import('./MasterData/SP List/Splistlama'))}/>
        <Route path={`${match.url}masterdata/driver`} component={asyncComponent(() => import('./MasterData/Driver/CobaTable'))}/>
        <Route path={`${match.url}akunting/splistakunting`} component={asyncComponent(() => import('./MasterData/Monitoring SP List Akunting/SPListAkunting'))}/> 
        <Route path={`${match.url}akunting/splistakuntingbaru`} component={asyncComponent(() => import('./MasterData/Monitoring SP List Akunting/SplistAkuntingBaru'))}/> 
        <Route path={`${match.url}masterdata/purchasing/driver`} component={asyncComponent(() => import('./MasterData/Purchasing/Driver/Index'))}/>
        <Route path={`${match.url}masterdata/purchasing/vehicle`} component={asyncComponent(() => import('./MasterData/Purchasing/Vehicle/Index'))}/>
        <Route path={`${match.url}purchasing/vehicle`} component={asyncComponent(() => import('./MasterData/Purchasing/MasterMitra/Index'))}/>
        <Route path={`${match.url}purchasing/DetailMitra/:mitraId`} component={asyncComponent(() => import('./MasterData/Purchasing/MasterMitra/DetailMitra'))}/>

      </Switch>
    </div>
  );

  export default App;
