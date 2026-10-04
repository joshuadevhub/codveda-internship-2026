import { useEffect, useState } from "react";
import { getStudents } from "./services/schoolService";

export function Test() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      const totalStudents = await getStudents();
      setStudents(totalStudents.results);
    }
    fetchStudents();
  }, []);

  return (
    <>
      {students.map((student) => (
        <ul key={student.student_id}>
          <li>{student.student_id}</li>
          <li>{student.first_name}</li>
          <li>{student.last_name}</li>
          <li>{student.email}</li>
        </ul>
      ))}
    </>
  );
}
