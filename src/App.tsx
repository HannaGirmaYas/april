import { useCallback, useRef, useState } from "react";
import { BirthdayReveal } from "./components/BirthdayReveal";
import { GlitchOverlay } from "./components/GlitchOverlay";
import { PrankPhase } from "./components/PrankPhase";
import { TrapModal } from "./components/TrapModal";
import styles from "./App.module.css";

type Phase = "hack" | "glitch" | "birthday";

export default function App() {
  const [phase, setPhase] = useState<Phase>("hack");
  const [trapOpen, setTrapOpen] = useState(false);
  const revealScheduled = useRef(false);
  const trapOpenedOnce = useRef(false);

  const openTrap = useCallback(() => {
    if (trapOpenedOnce.current) return;
    trapOpenedOnce.current = true;
    setTrapOpen(true);
  }, []);

  const handleCloseAttempt = useCallback(() => {
    openTrap();
  }, [openTrap]);

  const handleFollowersDrainComplete = useCallback(() => {
    openTrap();
  }, [openTrap]);

  const handlePayRansom = useCallback(() => {
    if (revealScheduled.current) return;
    revealScheduled.current = true;
    setTrapOpen(false);
    setPhase("glitch");
    window.setTimeout(() => setPhase("birthday"), 1600);
  }, []);

  return (
    <div className={styles.app}>
      {(phase === "hack" || phase === "glitch") && (
        <div className={phase === "glitch" ? styles.hackHidden : undefined}>
          <PrankPhase
            onCloseAttempt={handleCloseAttempt}
            onFollowersDrainComplete={handleFollowersDrainComplete}
          />
        </div>
      )}
      {phase === "glitch" && <GlitchOverlay active />}
      <TrapModal open={trapOpen && phase === "hack"} onPay={handlePayRansom} />

      {phase === "birthday" && <BirthdayReveal />}
    </div>
  );
}
