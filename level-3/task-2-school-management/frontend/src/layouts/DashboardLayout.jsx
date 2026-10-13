import { BellIcon, GraduationCap, HomeIcon, Menu, X } from "lucide-react";
import styles from "./DashboardLayout.module.css";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  const [navbar, setNavbar] = useState(false);

  const handleOpenMenu = () => {
    setNavbar(true);
  }

  const handleCloseMenu = () => {
    setNavbar(false);
  }
  return (
    <>
      <header className={styles.header}>
        <div>
          <GraduationCap className={styles.headerIcon} />
          <span>DBMS</span>
        </div>

        <div>
          <BellIcon className={styles.icon} />
          <button onClick={handleOpenMenu} aria-label="Open navigation menu">
            <Menu className={styles.icon}/>
          </button>
        </div>
      </header>

      <Sidebar menu={navbar} closeMenu={handleCloseMenu} />
      
      <main className={styles.main}>
        <Outlet/>
      </main>
    </>
  );
}
