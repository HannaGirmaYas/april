import type { ReactNode } from "react";
import styles from "./HackShell.module.css";

type Props = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function HackShell({ title, onClose, children }: Props) {
  return (
    <div className={styles.shell}>
      <div className={styles.scanlines} aria-hidden />
      <div className={styles.vignette} aria-hidden />

      <header className={styles.topBar}>
        <div className={styles.brand}>
          <span className={styles.skull} aria-hidden>
            ☠
          </span>
          <span className={styles.brandText}>ANONYMOUS_SECTOR // BREACH_KIT</span>
        </div>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close security alert"
        >
          <span className={styles.closeGlyph} aria-hidden>
            ×
          </span>
        </button>
      </header>

      <div className={styles.chrome}>
        <div className={styles.chromeBar}>
          <span className={styles.chromeDots} aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.chromeTitle}>{title}</span>
        </div>
        <div className={styles.chromeBody}>{children}</div>
      </div>
    </div>
  );
}
