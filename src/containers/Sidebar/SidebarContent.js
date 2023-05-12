import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
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
const { SubMenu } = Menu;

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);

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
              {jobdesk == "operasional" && (
                <SubMenu key="master" title="Operasional">
                  <Menu.Item key="driver">
                    <Link to="/masterdata/driver">
                      <i className="icon icon-widgets" />
                      <span>
                        <IntlMessages id="sidebar.driver" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="vehicle">
                    <Link to="/masterdata/vehicle">
                      <i className="icon icon-widgets" />
                      <span>
                        <IntlMessages id="sidebar.vehicle" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="New SP">
                    <Link to="/masterdata/splist">
                      <i className="icon icon-widgets" />
                      <span>
                        <IntlMessages id="New SP" />
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
                </SubMenu>
              )}
             {jobdesk === "operasional" || jobdesk === "akunting" ? (
                <SubMenu key="monitoring" title="Akunting">
                  <Menu.Item key="SP Lists">
                    <Link to="/masterdata/splistakunting">
                      <i className="icon icon-widgets" />
                      <span>
                        <IntlMessages id="SP List Akunting" />
                      </span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ): null}
             {jobdesk === "operasional" || jobdesk === "purchasing" ?  (
                <SubMenu key="monitorings" title="Purchasing">
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
                </SubMenu>
             ): null}
            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);
