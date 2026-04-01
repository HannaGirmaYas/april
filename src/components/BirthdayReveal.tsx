import { birthdayConfig } from "../config";
import { useSession } from "../SessionContext";
import { ConfettiCanvas } from "./ConfettiCanvas";
import styles from "./BirthdayReveal.module.css";

export function BirthdayReveal() {
  const { recipientFirstName, showBirthdayReveal } = useSession();
  const { headlineReveal, heartfeltLine, aprilFoolsHeadline, aprilFoolsLine } = birthdayConfig;

  return (
    <div className={styles.page}>
      <ConfettiCanvas active className={styles.confetti} />
      <div className={styles.aura} aria-hidden />
      <div className={styles.auraSoft} aria-hidden />

      <main className={styles.main}>
        {showBirthdayReveal ? (
          <>
            <p className={styles.eyebrow}>For you</p>
            <h1 id="bday-headline" className={styles.headline}>
              {headlineReveal}
              <br />
              <span className={styles.name}>{recipientFirstName}</span>
            </h1>
            <p className={styles.heartfelt}>{heartfeltLine}</p>
          </>
        ) : (
          <>
            <p className={styles.eyebrow}>Surprise</p>
            <h1 id="bday-headline" className={styles.headline}>
              {aprilFoolsHeadline}
              <br />
              <span className={styles.name}>{recipientFirstName}</span>
            </h1>
            <p className={styles.heartfelt}>{aprilFoolsLine}</p>
          </>
        )}
      </main>
    </div>
  );
}
