import { Mail, PhoneIcon, PlusIcon } from "lucide-react";
import styles from "../components/Students.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudents } from "../services/schoolService";
import { Loading } from "./Loading";

export function Students() {
  const [searchStudent, setSearchStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const totalStudents = await getStudents();
        setStudents(totalStudents.results);
      } catch (err) {
        setError(
          "Unable to load students. Please check your connection and try again.",
        );
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

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
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredStudent = students.filter((student) => {
    const firstName = student.first_name;
    const lastName = student.last_name;
    const studentClass = transformWord(student.name);
    const fullName = `${firstName} ${lastName}`;

    if (fullName.toLowerCase().includes(searchStudent.toLowerCase()) && (studentClass === filter || filter === "")) {
      return true;
    }
  });

  function transformWord(word) {
    const name = word.toLowerCase();
    const splittedName = name.split(" ");
    const joinedName = splittedName.join("-");
    return joinedName;
  }

  return (
    <>
      <section className={styles.studentHeader}>
        <h1>Student Lists</h1>
        <p>A complete lists of all students with their details and status</p>
      </section>

      <section className={styles.addStudent}>
        <div>
          <PlusIcon />
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

        <section className={styles.studentContents}>
          {loading ? (
            <Loading />
          ) : error === "" ? (
            filteredStudent.length > 0 ? (
              filteredStudent.map((student) => (
                <section className={styles.studentCard} key={student.id}>
                  <div className={styles.cardHeader}>
                    <div className={styles.studentInfo}>
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
                        alt="Student Avatar"
                        className={styles.studentAvatar}
                      />
                      <div>
                        <h3 className={styles.studentName}>
                          {student.first_name} {student.last_name}
                        </h3>
                        <p className={styles.studentId}>
                          ID: {student.student_id}
                        </p>
                      </div>
                    </div>
                    <span className={styles.statusBadge}>Active</span>
                  </div>

                  <div className={styles.academicInfo}>
                    <p className={styles.programTitle}>Science Department</p>
                    <p className={styles.programMeta}>
                      {student.name} • First Term
                    </p>
                  </div>

                  <div className={styles.contactInfo}>
                    <div>
                      <Mail className={styles.icon} />
                      <p>{student.email}</p>
                    </div>

                    <div>
                      <PhoneIcon className={styles.icon} />
                      <p>{student.phone}</p>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <Link to={"/view-profile"} className={styles.viewProfile}>
                      View Profile
                    </Link>
                    <Link to={"/edit-profile"} className={styles.editProfile}>
                      Edit
                    </Link>
                  </div>
                </section>
              ))
            ) : (
              <p className={styles.emptyStateMessage}>
                No students found matching your search.
              </p>
            )
          ) : (
            <p className={styles.emptyStateMessage}>{error}</p>
          )}
        </section>
      </section>
    </>
  );
}