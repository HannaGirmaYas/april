import { birthdayConfig } from "../config";
import { ConfettiCanvas } from "./ConfettiCanvas";
import styles from "./BirthdayReveal.module.css";

export function BirthdayReveal() {
  const { recipientFirstName, headlineReveal, heartfeltLine, wishes, galleryImages, receipt } =
    birthdayConfig;

  return (
    <div className={styles.page}>
      <ConfettiCanvas active className={styles.confetti} />
      <div className={styles.aura} aria-hidden />
      <div className={styles.auraSoft} aria-hidden />

      <main className={styles.main}>
        <p className={styles.eyebrow}>For you</p>
        <h1 id="bday-headline" className={styles.headline}>
          {headlineReveal}
          <br />
          <span className={styles.name}>{recipientFirstName}</span>
        </h1>
        <p className={styles.heartfelt}>{heartfeltLine}</p>

      </main>
    </div>
  );
}
