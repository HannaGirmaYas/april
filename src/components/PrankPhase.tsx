import { useEffect, useRef, useState } from "react";
import { birthdayConfig } from "../config";
import { HackShell } from "./HackShell";
import styles from "./PrankPhase.module.css";

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

const { recipientFirstName, realNameScare, instagramStartFollowers } = birthdayConfig;

const TERMINAL_LINES: string[] = [
  `[BOOT] kernel hardening… FAILED (0xDEADBEEF)`,
  `INITIALIZING INTERCEPT // NODE: TOR-RELAY-Ω`,
  `HANDSHAKE → victim_session_${recipientFirstName.toUpperCase()}_01`,
  `EXFILTRATING DEVICE FINGERPRINT… SHA-512 MATCH`,
  `GEO-IP TRIANGULATION… [REDACTED] ± 14m`,
  `SOCIAL GRAPH INJECTION… Instagram API hook… ESTABLISHED`,
  `CROSS_REFERENCE: PUBLIC_HANDLE → REAL_IDENTITY`,
  `>>> ALIAS LOCK: LEGAL_NAME = "${realNameScare.toUpperCase()}" (99.7% confidence)`,
  `WARNING: SUBJECT "${recipientFirstName.toUpperCase()}" — DOX PACKAGE READY FOR RELEASE`,
  `WEBCAM SUBSYSTEM… ACCESS REQUESTED — BUFFER ARMED`,
  `KEYLOGGER: capturing "${recipientFirstName}" typed passwords… [ACTIVE]`,
  `RANSOM MODULE ARMED — PAYMENT WALLET GENERATING…`,
  `ENCRYPTION WAVE: ████████████░░░░░░░░ 61%`,
  `THREAT VECTOR: Session termination triggers queued data release to public index.`,
  `FINAL LOCK: system_payload.exe — execution imminent`,
];

const THREAT_FLASHES = [
  `CRITICAL: ${recipientFirstName.toUpperCase()} — WE SEE YOU.`,
  `ALERT: SESSION TOKEN EXPIRING — PANIC RECOMMENDED.`,
  `SYSTEM: EXFIL QUEUE PRIORITY = MAXIMUM.`,
];

type Props = {
  onCloseAttempt: () => void;
  onFollowersDrainComplete: () => void;
};

export function PrankPhase({ onCloseAttempt, onFollowersDrainComplete }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [threatIdx, setThreatIdx] = useState(0);
  const [followers, setFollowers] = useState(instagramStartFollowers);
  const [igPhase, setIgPhase] = useState<"hidden" | "congrats" | "draining">("hidden");
  const terminalRef = useRef<HTMLDivElement>(null);
  const onFollowersDrainCompleteRef = useLatest(onFollowersDrainComplete);
  const drainDone = useRef(false);

  useEffect(() => {
    const durationMs = 52_000;
    const lineInterval = Math.max(320, Math.floor(durationMs / TERMINAL_LINES.length));
    let i = 0;
    const lineTimer = window.setInterval(() => {
      if (i < TERMINAL_LINES.length) {
        setLines((prev) => [...prev, TERMINAL_LINES[i]!]);
        i += 1;
      } else {
        window.clearInterval(lineTimer);
      }
    }, lineInterval);

    const tick = 90;
    const steps = Math.ceil(durationMs / tick);
    let step = 0;
    const progTimer = window.setInterval(() => {
      step += 1;
      const next = Math.min(100, Math.round((step / steps) * 100));
      setProgress(next);
      if (next >= 100) window.clearInterval(progTimer);
    }, tick);

    const threatTimer = window.setInterval(() => {
      setThreatIdx((k) => (k + 1) % THREAT_FLASHES.length);
    }, 3800);

    const igIntro = window.setTimeout(() => {
      setIgPhase("congrats");
    }, 2400);

    const igStartDrain = window.setTimeout(() => {
      setIgPhase("draining");
    }, 5200);

    return () => {
      window.clearInterval(lineTimer);
      window.clearInterval(progTimer);
      window.clearInterval(threatTimer);
      window.clearTimeout(igIntro);
      window.clearTimeout(igStartDrain);
    };
  }, []);

  useEffect(() => {
    if (igPhase !== "draining") return;

    const start = instagramStartFollowers;
    const duration = 8200;
    const t0 = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = t * t;
      const next = Math.max(0, Math.floor(start * (1 - eased)));
      setFollowers(next);
      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setFollowers(0);
        if (!drainDone.current) {
          drainDone.current = true;
          onFollowersDrainCompleteRef.current();
        }
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [igPhase, instagramStartFollowers, onFollowersDrainCompleteRef]);

  useEffect(() => {
    const el = terminalRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <HackShell
      title={`root@${recipientFirstName.toLowerCase()}-exploit — live_tap.sh`}
      onClose={onCloseAttempt}
    >
      <div className={styles.rootInner}>
        <p className={styles.rainbow}>
          ⚠ UNAUTHORIZED REMOTE SESSION — TRACE ROUTE ACTIVE — SOURCE NARROWING ⚠
        </p>

        {igPhase !== "hidden" && (
          <section className={styles.igCard} aria-live="polite">
            {igPhase === "congrats" && (
              <p className={styles.igCongrats}>
                CONGRATULATIONS — we verified{" "}
                <span className={styles.igHandle}>@{recipientFirstName.toLowerCase()}</span> with{" "}
                <strong>{instagramStartFollowers}</strong> Instagram followers.
              </p>
            )}
            {igPhase === "draining" && (
              <>
                <p className={styles.igDrainLabel}>SOCIAL CREDIT DRAIN — FOLLOWERS BEING REVOKED</p>
                <p
                  className={`${styles.igBig} ${followers < 400 ? styles.igPanic : ""} ${
                    followers < 100 ? styles.igCritical : ""
                  }`}
                >
                  {followers}
                </p>
                <p className={styles.igSub}>
                  {followers > 300
                    ? "Attribution locked. Revocation is not available."
                    : followers > 80
                      ? "Your ratio is collapsing in real time."
                      : followers > 0
                        ? "Almost zero. Smile for the camera."
                        : "Followers: NULL. Influence: destroyed."}
                </p>
              </>
            )}
          </section>
        )}

        <div ref={terminalRef} className={styles.terminal}>
          {lines.map((line, idx) => (
            <div key={`${idx}-${line.slice(0, 10)}`} className={styles.line}>
              <span className={styles.prompt}>#</span> {line}
            </div>
          ))}
          <div className={styles.cursorLine}>
            <span className={styles.prompt}>#</span> <span className={styles.cursor}>█</span>
          </div>
        </div>

        <div className={styles.progressBlock}>
          <div className={styles.progressLabel}>
            <span>SYSTEM COMPROMISE</span>
            <span>{progress}%</span>
          </div>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className={styles.progressBlock}>
          <div className={styles.progressLabel}>
            <span>DATA EXFIL / ENCRYPTION</span>
            <span>{Math.min(100, progress + 4)}%</span>
          </div>
          <div className={styles.track}>
            <div className={styles.fillBlood} style={{ width: `${Math.min(100, progress + 4)}%` }} />
          </div>
        </div>

        <div className={styles.ransomShell}>
          <div className={styles.ransomScan} aria-hidden />
          <div className={styles.ransomBox}>
            <div className={styles.ransomHeader}>
              <span className={styles.ransomSkull} aria-hidden>
                ☠
              </span>
              <p className={styles.ransomTitle}>IMMEDIATE PAYMENT REQUIRED</p>
              <span className={styles.ransomSkull} aria-hidden>
                ☠
              </span>
            </div>
            <p className={styles.ransomSub}>
              FAILURE TO COMPLY WILL RESULT IN PERMANENT DATA LOSS — YOUR DIGITAL LIFE ENDS IN{" "}
              <span className={styles.ransomBlink}>T−00:13:37</span>
            </p>
            <ul className={styles.ransomList}>
              <li>
                <strong>WALLET DRAIN:</strong> Send 4.01 ETH to 0xDEAD…APR1L — non-negotiable.
              </li>
              <li>
                <strong>OR ELSE:</strong> Full camera + mic archive uploads to a billboard titled “
                {recipientFirstName}&apos;s 3am search history.”
              </li>
              <li>
                <strong>FINAL WARNING:</strong> Each delay overwrites one encrypted volume with
                irrecoverable noise.
              </li>
            </ul>
            <p className={styles.ransomFooter}>⚠ SESSION LOCKED — PAYMENT GATEWAY ACTIVE — DO NOT EXIT ⚠</p>
          </div>
        </div>

        <div className={styles.threatMarquee} role="status">
          {THREAT_FLASHES[threatIdx]}
        </div>
      </div>
    </HackShell>
  );
}
