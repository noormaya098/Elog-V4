import React from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { CarTwoTone, SmileTwoTone, ScheduleTwoTone, ProfileTwoTone, CheckSquareTwoTone } from '@ant-design/icons';
const { SubMenu } = Menu;

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);
  const history = useHistory();
  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const MenuItemGroup = Menu.ItemGroup;

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  const jobdesk = localStorage.getItem("jobdesk");
  console.log(`jobdeks`, jobdesk);

  const createsp = () => {
    history.push(`/masterdata/marketing/createsp`);
  };
  const createar = () => {
    history.push(`/createar`);
  };
  const createap = () => {
    history.push(`/akunting/tambahdataap`);
  };

  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          <UserProfile />
          <AppsNavigation />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            <MenuItemGroup key="main">
              {jobdesk === "sales" ? (

                <div className="d-flex justify-content-center gx-sidebar-content w-100  text-center ">
                  <Button
                    size="lg"
                    style={{ width: 180 }}
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => createsp()}
                    variant="warning"
                  >
                    ADD SP
                  </Button>
                </div>
              ) : (
                <></>
              )}
              {jobdesk === "akunting" ? (
                <>
                <div className="d-flex justify-content-center gx-sidebar-content w-100  text-center ">
                  <Button
                    size="lg"
                    style={{ width: 180, backgroundColor: "#00a65a", color: "white", marginTop: "-35px" }}
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => createar()}
                    variant="#00a65a"
                    >
                    ADD AR
                  </Button>
                </div>
                <div className="d-flex justify-content-center gx-sidebar-content w-100 mt-5 text-center ">
                  <Button
                    size="lg"
                    style={{ width: 180,  color: "white", marginTop: "-35px" }}
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => createap()}
                    variant="warning"
                    >
                    ADD AP AJA 
                  </Button>
                </div>
                    </>
              ) : (
                <></>
              )}
              {jobdesk == "sales" && (
                <SubMenu key="master" title="Marketing">
                  <Menu.Item key="SP List">
                    <Link to="/masterdata/marketing/splist">
                      <i className="icon icon-widgets" />
                      <span>
                        <IntlMessages id="SP List" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Cancel SP List">
                    <Link to="/masterdata/marketing/cancelsplist">
                      <i className="icon icon-widgets" />
                      <span>
                        <IntlMessages id="Cancel SP List" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="monitoringVehicle">
                    <Link to="/masterdata/monitoring">
                      <i className="icon icon-widgets" />
                      <span>
                        <IntlMessages id="Monitoring Vehicle" />
                      </span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
              )}
              {jobdesk == "operasional" && (
                <SubMenu key="master" title="Operasional">
                  <Menu.Item key="driver">
                    <Link to="/masterdata/purchasing/driver">
                      {/* <i className="icon icon-widgets" /> */}
                      <SmileTwoTone />
                      <IntlMessages id="sidebar.driver" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="vehicle">
                    <Link to="/masterdata/vehicle">
                      <CarTwoTone />
                      <IntlMessages id="sidebar.vehicle" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="monitoringVehicle">
                    <Link to="/masterdata/monitoring">
                      <ScheduleTwoTone />
                      <IntlMessages id="Monitoring Vehicle" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="New SP">
                    <Link to="/masterdata/newsplist">
                      <CheckSquareTwoTone />
                      <IntlMessages id="Approve SP" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="SP List">
                    <Link to="/masterdata/splist">
                      <ProfileTwoTone />
                      <IntlMessages id="SP List" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              )}
              {jobdesk == "operasional" && (
                <SubMenu key="monitorings" title="Monitoring">
                  <Menu.Item key="monitoringVehicle">
                    <Link to="/masterdata/monitoring">
                      <i className="icon icon-widgets" />
                      <span>
                        <IntlMessages id="Vehicle Map" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="monitoringDriver">
                    <Link to="/masterdata/monitoring">
                      <i className="icon icon-widgets" />
                      <span>
                        <IntlMessages id="Driver Map" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="DriverEmc">
                    <Link to="/masterdata/monitoring">
                      <i className="icon icon-widgets" />
                      <span>
                        <IntlMessages id="Driver Emc" />
                      </span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
              )}
              {jobdesk.toLowerCase() === "akunting" ? (
                <>
                  <SubMenu key="monitoring" title="Akunting">
                    <Menu.Item key="SP Lists All">
                      <Link to="/akunting/splistakuntingbaru">
                        <i className="icon icon-widgets" />
                        <span>Approve SP</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP Lists">
                      <Link to="/akunting/splistwaitingakunting">
                        <i className="icon icon-widgets" />
                        <span>Waiting SP Akunting</span>
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="ArList" title="AR List">
                    <Menu.Item key="SP Lists All">
                      <Link to="/akunting/ar/ar">
                        <i className="icon icon-widgets" />
                        <span>AR List ALL</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP Lists All">
                      <Link to="/akunting/ar/ar">
                        <i className="icon icon-widgets" />
                        <span>List Invoice AR</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP Lists All">
                      <Link to="/akunting/ar/ar">
                        <i className="icon icon-widgets" />
                        <span>SJ no AR</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP Lists All">
                      <Link to="/akunting/ar/ar">
                        <i className="icon icon-widgets" />
                        <span>Penerimaan SJ</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP Lists All">
                      <Link to="/akunting/ar/ar">
                        <i className="icon icon-widgets" />
                        <span>Report Pembayaran Customer</span>
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="Payment" title="Payment">
                    <Menu.Item key="Payment">
                      <Link to="/akunting/ar/reportpartners/reportpenerimaaninvoice">
                        <i className="icon icon-widgets" />
                        <span>Penerimaan INV</span>
                      </Link>
                    </Menu.Item>
                  </SubMenu><SubMenu key="Masters" title="Masters">
                    <Menu.Item key="Master Mitra">
                      <Link to="/mastermitra">
                        <i className="icon icon-widgets" />
                        <span>Master Mitra</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="Masters">
                      <Link to="/masteralamat">
                        <i className="icon icon-widgets" />
                        <span>Data Customer</span>
                      </Link>
                    </Menu.Item>

                    <Menu.Item key="Master Kecamatan">
                      <Link to="/masterkecamatan">
                        <i className="icon icon-widgets" />
                        <span>Data Kecamatan</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="Master Kota">
                      <Link to="/masterkota">
                        <i className="icon icon-widgets" />
                        <span>Data Kota</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="Master Provinsi">
                      <Link to="/masterprovinsi">
                        <i className="icon icon-widgets" />
                        <span>Data Provinsi</span>
                      </Link>
                    </Menu.Item>
                  </SubMenu>

                  <SubMenu key="AP List" title="AP List">
                    <Menu.Item key="SP_AP_LIST">
                      <Link to="/akunting/ap/">
                        <i className="icon icon-widgets" />
                        <span>AP List ALL</span>
                      </Link>
                    </Menu.Item>



                    {/* <Menu.Item key="SP_AP_LIST">
                    <Link to="/akunting/apaddon">
                      <i className="icon icon-widgets" />
                      <span>AP AddOn</span>
                    </Link>
                  </Menu.Item> */}
                  </SubMenu>
                  <SubMenu key="Tarif" title="Tarif">
                    <Menu.Item key="Tarif Mitra">
                      <Link to="/tarifmitra">
                        <i className="icon icon-widgets" />
                        <span>Tarif Mitra</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="Tarif Eureka">
                      <Link to="/tarif_eureka">
                        <i className="icon icon-widgets" />
                        <span>Tarif Eureka</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="Tarif Customer">
                      <Link to="/pelanggantarif">
                        <i className="icon icon-widgets" />
                        <span>Tarif Customer</span>
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                </>

              ) : null}

              {jobdesk === "purchasing" ? (
                <SubMenu key="monitorings" title="Purchasing">
                  <SubMenu key="data" title="Data">
                    <Menu.Item key="New SP">
                      <Link to="/purchasing/newsplist">
                        <i className="icon icon-widgets" />
                        <span>
                          <IntlMessages id="Approve SP" />
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP List">
                      <Link to="/masterdata/splist">
                        <i className="icon icon-widgets" />
                        <span>
                          <IntlMessages id="SP List" />
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SJ List">
                      <Link to="/masterdata/sjlist">
                        <i className="icon icon-widgets" />
                        <span>
                          <IntlMessages id="SJ List" />
                        </span>
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="master" title="Master Data">
                    <Menu.Item key="driverpurch">
                      <Link to="/masterdata/purchasing/driver">
                        <i className="icon icon-widgets" />
                        <span>
                          <IntlMessages id="Master Driver" />
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="vehiclepurch">
                      <Link to="/masterdata/purchasing/vehicle">
                        <i className="icon icon-widgets" />
                        <span>
                          <IntlMessages id="Master Vehicle" />
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="vehiclepurchs">
                      <Link to="/purchasing/mastermitra">
                        <i className="icon icon-widgets" />
                        <span>
                          <IntlMessages id="Master Mitra" />
                        </span>
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                </SubMenu>
              ) : null}
            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);
