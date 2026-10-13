import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import image from "../assets/school-hero.jpg"
import { BookOpenIcon, BriefcaseBusinessIcon, HomeIcon, SchoolIcon, SettingsIcon, UsersRoundIcon, X } from "lucide-react";

export function Sidebar({menu, closeMenu}) {
  return (
    <nav className={`${styles.nav} ${menu ? styles.show : ""}`}>
      <button onClick={closeMenu} aria-label="Close navigation menu">
        <X className={styles.icon}/>
      </button>
      <section>
        <img src={image} alt="Admin Picture" className={styles.image} />
        <div>
          <h3>Joshua Elemide</h3>
          <p>The Admin</p>
        </div>
      </section>

      <div className={styles.line}></div>

      <ul>
        <li>
          <HomeIcon className={styles.icon} />
          <Link to={"/dashboard"} className={styles.link} onClick={closeMenu}>
            Dashboard
          </Link>
        </li>

        <li>
          <UsersRoundIcon className={styles.icon} />
          <Link to={"students"} className={styles.link} onClick={closeMenu}>
            Students
          </Link>
        </li>

        <li>
          <BriefcaseBusinessIcon className={styles.icon} />
          <Link to={"/teachers"} className={styles.link} onClick={closeMenu}>
            Teachers
          </Link>
        </li>

        <li>
          <SchoolIcon className={styles.icon} />
          <Link to={"/classes"} className={styles.link} onClick={closeMenu}>
            Classes
          </Link>
        </li>

        <li>
          <BookOpenIcon className={styles.icon} />
          <Link to={"/subjects"} className={styles.link} onClick={closeMenu}>
            Subjects
          </Link>
        </li>
        <li>
          <SettingsIcon className={styles.icon} />
          <Link to={"/settings"} className={styles.link} onClick={closeMenu}>
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}