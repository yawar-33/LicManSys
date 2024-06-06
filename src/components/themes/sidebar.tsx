import React, { useEffect, useState } from "react";
// import menu from "./sidebar/menu";
import { adminmenu, customermenu } from "./sidebar/menu";
import SidebarNavList from "./sidebar/SidebarNavList";
import Link from "next/link";
import { getItem } from "../utils";

const Sidebar = () => {
  const [isadmin, setIsadmin] = useState("no")
  useEffect(() => {
    if (getItem("userdata").isadmin) {
      if (getItem("userdata").isadmin.toLowerCase()) {
        setIsadmin(getItem("userdata").isadmin.toLowerCase())
      } else {
        setIsadmin('no')
      }
    } else {
      setIsadmin('no')
    }
  }, [])
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4"
      style={{
        height: "100%", position: "fixed"
      }}
    >
      <div className="brand-link text-center">
        <span className="brand-text font-weight-light text-center">{isadmin === "yes" ? "Admin" : "Client"}</span>
      </div>
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            data-accordion="false"
          >
            {isadmin === 'yes' && adminmenu.map((menu, index) => (
              <SidebarNavList data={menu} key={index} />
            ))}
            {isadmin === 'no' && customermenu.map((menu, index) => (
              <SidebarNavList data={menu} key={index} />
            ))}
          </ul>
        </nav>
      </div>
    </aside >
  );
};

export default Sidebar;
