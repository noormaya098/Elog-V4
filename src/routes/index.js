import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";
const App = ({ match }) => {



  return (
  
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
        path={`${match.url}akunting/ap/`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Akunting/APList/APListALL")
        )}
      />
      <Route
        path={`${match.url}masteralamat`}
        component={asyncComponent(() =>
          import("./CopyData/MasterAlamat/index")
        )}
      />
      <Route
        path={`${match.url}alamatcustomer`}
        component={asyncComponent(() =>
          import("./CopyData/MasterAlamat/alamatcustomer")
        )}
      />
      <Route
        path={`${match.url}masteralamatadd`}
        component={asyncComponent(() =>
          import("./CopyData/MasterAlamat/add")
        )}
      />
      <Route
        path={`${match.url}detailcustomer`}
        component={asyncComponent(() =>
          import("./CopyData/MasterAlamat/detail")
        )}
      />
      <Route
        path={`${match.url}editcustomer`}
        component={asyncComponent(() =>
          import("./CopyData/MasterAlamat/edit")
        )}
      />
      <Route
        path={`${match.url}masterkecamatan`}
        component={asyncComponent(() =>
          import("./CopyData/MasterKecamatan/index")
        )}
      />
      <Route
        path={`${match.url}masterkota`}
        component={asyncComponent(() =>
          import("./CopyData/MasterKota/index")
        )}
      />
      <Route
        path={`${match.url}masterprovinsi`}
        component={asyncComponent(() =>
          import("./CopyData/MasterProvinsi/index")
        )}
      />
      <Route
        path={`${match.url}akunting/tambahdataap`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Akunting/APList/TambahDataAP")
        )}
      />
      <Route
        path={`${match.url}akunting/apaddon`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Akunting/APList/APAddOn")
        )}
      />
      <Route
        path={`${match.url}akunting/editapplist`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Akunting/APList/EditAPList")
        )}
      />
      <Route
        path={`${match.url}akunting/detailaplist`}
        component={asyncComponent(() =>
          import("./MasterData/SP List/Akunting/APList/DetailAPList")
        )}
      />
      <Route
        path={`${match.url}mastermitra`}
        component={asyncComponent(() => import("./CopyData/MasterMitraOld/Index"))}
      />
      <Route
        path={`${match.url}mastermitraadd`}
        component={asyncComponent(() => import("./CopyData/MasterMitra/add"))}
      />
      <Route
        path={`${match.url}mastermitradetaill`}
        component={asyncComponent(() => import("./CopyData/MasterMitraOld/DetailMitra"))}
      />
      <Route
        path={`${match.url}mastermitradetaillnew`}
        component={asyncComponent(() => import("./CopyData/MasterMitraOld/Form/Databaru"))}
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
          path={`${match.url}printSPKListNih`}
          component={asyncComponent(() =>
            import("./Print/PrintSP")
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
          path={`${match.url}masterdata/marketing/cancelsplist`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/CancelSPListSales")
          )}
        />
        <Route
          path={`${match.url}masterdata/marketing/createsp`}
          component={asyncComponent(() =>
            import("./MasterData/Marketing/Splist/createSPBaru/Index")
          )}
        />
        <Route
          path={`${match.url}masterdata/marketing/createspbaru`}
          component={asyncComponent(() =>
            import("./MasterData/Marketing/Splist/createSPBaru/CreateBaru")
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
          path={`${match.url}akunting/ap/`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/APListALL")
          )}
        />
        <Route
          path={`${match.url}masteralamat`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/index")
          )}
        />
        <Route
          path={`${match.url}masteralamatadd`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/add")
          )}
        />
        <Route
          path={`${match.url}detailcustomer`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/detail")
          )}
        />
        <Route
          path={`${match.url}editcustomer`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/edit")
          )}
        />
        <Route
          path={`${match.url}masterkecamatan`}
          component={asyncComponent(() =>
            import("./CopyData/MasterKecamatan/index")
          )}
        />
        <Route
          path={`${match.url}masterkota`}
          component={asyncComponent(() =>
            import("./CopyData/MasterKota/index")
          )}
        />
        <Route
          path={`${match.url}masterprovinsi`}
          component={asyncComponent(() =>
            import("./CopyData/MasterProvinsi/index")
          )}
        />
        <Route
          path={`${match.url}akunting/tambahdataap`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/TambahDataAP")
          )}
        />
        <Route
          path={`${match.url}akunting/apaddon`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/APAddOn")
          )}
        />
        <Route
          path={`${match.url}akunting/editapplist`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/EditAPList")
          )}
        />
        <Route
          path={`${match.url}mastermitra`}
          component={asyncComponent(() => import("./CopyData/MasterMitraOld/Index"))}
        />
        <Route
          path={`${match.url}mastermitraadd`}
          component={asyncComponent(() => import("./CopyData/MasterMitra/add"))}
        />
        <Route
          path={`${match.url}mastermitradetaill`}
          component={asyncComponent(() => import("./CopyData/MasterMitraOld/DetailMitra"))}
        />
        <Route
          path={`${match.url}mastermitradetaillnew`}
          component={asyncComponent(() => import("./CopyData/MasterMitraOld/Form/Databaru"))}
        />

        <Route
          path={`${match.url}tarifmitra`}
          component={asyncComponent(() =>
            import("./CopyData/TarifMitra/index")
          )}
        />
        <Route
          path={`${match.url}tarifmitradetail`}
          component={asyncComponent(() =>
            import("./CopyData/TarifMitra/detail")
          )}
        />
        <Route
          path={`${match.url}tarifmitracreate`}
          component={asyncComponent(() =>
            import("./CopyData/TarifMitra/create")
          )}
        />
        <Route
          path={`${match.url}tarifmitraedit`}
          component={asyncComponent(() =>
            import("./CopyData/TarifMitra/edit")
          )}
        />
        <Route
          path={`${match.url}tarif_eureka`}
          component={asyncComponent(() =>
            import("./CopyData/TarifEureka/index")
          )}
        />
        <Route
          path={`${match.url}tarif_eureka_edit`}
          component={asyncComponent(() =>
            import("./CopyData/TarifEureka/edit")
          )}
        />
        <Route
          path={`${match.url}tarif_eurekacreate`}
          component={asyncComponent(() =>
            import("./CopyData/TarifEureka/create")
          )}
        />

        <Route
          path={`${match.url}pelanggantarif`}
          component={asyncComponent(() =>
            import("./CopyData/TarifPelanggan/index")
          )}
        />
        <Route
          path={`${match.url}pelanggantarifedit`}
          component={asyncComponent(() =>
            import("./CopyData/TarifPelanggan/edit")
          )}
        />
        <Route
          path={`${match.url}pelanggantarifcerate`}
          component={asyncComponent(() =>
            import("./CopyData/TarifPelanggan/create")
          )}
        />
        <Route
          path={`${match.url}lostsalee`}
          component={asyncComponent(() =>
            import("./CopyData/LoseSales/index")
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
          path={`${match.url}createar`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/ARList/CreateAR/CreateAR")
          )}
        />
        <Route
          path={`${match.url}akunting/splistakuntingbaru`}
          component={asyncComponent(() =>
            import("./MasterData/Monitoring SP List Akunting/SplistAkuntingBaru")
          )}
        />
        <Route
          path={`${match.url}akunting/detaildatacustomer`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/MonitoringDataCustomer/index")
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
          path={`${match.url}masterdata/operasional/detailsp/:idmp`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/HalamanDetail")
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
            import("./MasterData/Purchasing/SP/DetailSJ/index")
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
}

export default App;
