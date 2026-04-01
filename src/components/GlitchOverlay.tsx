import styles from "./GlitchOverlay.module.css";

type Props = {
  active: boolean;
};

export function GlitchOverlay({ active }: Props) {
  if (!active) return null;
  return (
    <div className={styles.overlay} aria-hidden>
      <div className={styles.scanlines} />
      <div className={styles.rgb} />
      <div className={styles.noise} />
    </div>
  );
}
