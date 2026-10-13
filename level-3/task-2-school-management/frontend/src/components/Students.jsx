import { PlusIcon } from "lucide-react";
import styles from "../components/Students.module.css"
import { Link } from "react-router-dom";
import { useState } from "react";

export function Students() {
  const [searchStudent, setSearchStudent] = useState("");
  const [filter, setFilter] = useState("");

  const allowedClasses = [
    { class: "Jss 1", value: "jss-1" },
    { class: "Jss 2", value: "jss-2" },
    { class: "Jss 3", value: "jss-3" },
    { class: "Ss 1", value: "ss-1" },
    { class: "Ss 2", value: "ss-2" },
    { class: "Ss 3", value: "ss-3" },
  ];

  const handleInputChange = (e) => {
    setSearchStudent(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }
  return (
    <>
        <section className={styles.studentHeader}>
          <h1>Student Lists</h1>
          <p>A complete lists of all students with their details and status</p>
        </section>

        <section className={styles.addStudent}>
          <div>
            <PlusIcon className={styles.icon} />
            <p>Add Students</p>
          </div>
        </section>

        <section className={styles.studentContainer}>
          <div>
            <h2>Student Information</h2>
            <input
              type="text"
              placeholder="Search Student"
              className={styles.input}
              value={searchStudent}
              onChange={handleInputChange}
            />
            <select value={filter} onChange={handleFilterChange}>
              <option value="">Filter by Class</option>
              {allowedClasses.map((classes) => (
                <option value={classes.value} key={classes.value}>
                  {classes.class}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.studentContents}>
            <div className={styles.studentContent}>
              <div className={styles.image}></div>
              <div>
                <h3>Elemide Joshua</h3>
                <p>Jss 1</p>
                <Link to={"/student-profile"} className={styles.profileLink}>
                  View Profile
                </Link>
              </div>
            </div>

            <div className={styles.studentContent}>
              <div className={styles.image}></div>
              <div>
                <h3>Elemide Joshua</h3>
                <p>Jss 1</p>
                <Link to={"/student-profile"} className={styles.profileLink}>
                  View Profile
                </Link>
              </div>
            </div>

            <div className={styles.studentContent}>
              <div className={styles.image}></div>
              <div>
                <h3>Elemide Joshua</h3>
                <p>Jss 1</p>
                <Link to={"/student-profile"} className={styles.profileLink}>
                  View Profile
                </Link>
              </div>
            </div>

            <div className={styles.studentContent}>
              <div className={styles.image}></div>
              <div>
                <h3>Elemide Joshua</h3>
                <p>Jss 1</p>
                <Link to={"/student-profile"} className={styles.profileLink}>
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
