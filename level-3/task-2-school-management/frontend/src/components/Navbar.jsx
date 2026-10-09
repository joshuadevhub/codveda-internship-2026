import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { X } from "lucide-react";

export function Navbar({ openMenu, closeMenu }) {
  function handleCloseMenu() {
    closeMenu();
  }
  return (
    <nav className={`${styles.nav} ${openMenu ? `${styles.show}` : ""}`}>
      <div className={styles.closeMenuContainer}>
        <button className={styles.closeMenu}>
          <X onClick={handleCloseMenu} />
        </button>
      </div>
      <ul>
        <li>
          <NavLink to={"/"} className={styles.link} onClick={handleCloseMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/about"} className={styles.link} onClick={handleCloseMenu}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to={"/academics"} className={styles.link} onClick={handleCloseMenu}>
            Academics
          </NavLink>
        </li>
        <li>
          <NavLink to={"/admission"} className={styles.link} onClick={handleCloseMenu}>
            Admission
          </NavLink>
        </li>
        <li>
          <NavLink to={"/contacts"} className={styles.link} onClick={handleCloseMenu}>
            Contacts
          </NavLink>
        </li>
      </ul>
      <div className={styles.loginContainer}>
        <Link to={"/login"} className={styles.login} onClick={handleCloseMenu}>
          Login
        </Link>
      </div>
    </nav>
  );
}
