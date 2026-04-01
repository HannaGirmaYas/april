import { birthdayConfig } from "../config";
import styles from "./TrapModal.module.css";

type Props = {
  open: boolean;
  onPay: () => void;
};

export function TrapModal({ open, onPay }: Props) {
  if (!open) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal aria-labelledby="trap-title">
      <div className={styles.panel}>
        <p className={styles.badge}>ACCESS DENIED</p>
        <h2 id="trap-title" className={styles.title}>
          Nice try closing the window.
        </h2>
        <p className={styles.lede}>
          We already mapped your device. Screen session logged. And yes — we know your real name is{" "}
          <strong>{birthdayConfig.realNameScare}</strong>.
        </p>
        <p className={styles.body}>
          Session remains elevated. Payment is required before the secure channel closes. Non-compliance
          routes your identifiers to the next queue.
        </p>
        <ul className={styles.list}>
          <li>Wire $4.01 to the displayed wallet within the window.</li>
          <li>Alternative: biometric verification image — front camera capture authorized.</li>
        </ul>
        <button type="button" className={styles.cta} onClick={onPay}>
          Submit payment
        </button>
      </div>
    </div>
  );
}
