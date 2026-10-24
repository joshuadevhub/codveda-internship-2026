import styles from "./Loading.module.css";

export function Loading() {
  return (
    <section className={styles.spinnerContainer}>
      <div className={styles.loading}></div>
      <p>Loading Students...</p>
    </section>
  );
}
