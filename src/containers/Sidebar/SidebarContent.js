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
           
            <MenuItemGroup
              key="main" 
              title={<IntlMessages id="sidebar.main" />}
            >
               <Menu.Item key="sample">
              <Link to="/sample">
                <i class="icon bi-speedometer"></i>
                <span>
                  <IntlMessages id="sidebar.samplePage" />
                </span>
              </Link>
            </Menu.Item>
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
            <Menu.Item key="byunit">
              <Link to="/monitoring/byunit">
                <i className="icon icon-widgets" />
                <span>
                  <IntlMessages id="sidebar.byunit" />
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="bysm">
              <Link to="/monitoring/bysm">
                <i className="icon icon-widgets" />
                <span>
                  <IntlMessages id="sidebar.bysm" />
                </span>
              </Link>
            </Menu.Item>
            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);
