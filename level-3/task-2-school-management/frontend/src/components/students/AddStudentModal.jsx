import styles from "./AddStudentModal.module.css"
import { StudentForm } from "./StudentForm";

export function AddStudentModal() {
  return (
    <section className={styles.modalContainer}>
      <StudentForm/>
    </section>
  );
}