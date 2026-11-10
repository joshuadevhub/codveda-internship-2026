import { X } from "lucide-react";
import styles from "./AddStudentModal.module.css"
import { StudentForm } from "./StudentForm";

export function AddStudentModal({modal, closeModal}) {
  return (
    <section className={`${styles.modalContainer} ${modal ? styles.show : ""}`}>
      <section className={styles.modalHeader}>
        <h2>Add New Student</h2>
        <button className={styles.closeButton} onClick={closeModal}>
          <X className={styles.closeIcon} />
        </button>
      </section>

      <section className={styles.instruction}>
        <p>Enter the student details below</p>
      </section>

      <section className={styles.formContainer}>
        <StudentForm />
      </section>
    </section>
  );
}