import { sessionEntryPath } from "./config";
import styles from "./DecoyLanding.module.css";

const requestId = "a7f3c891-2e4b-4d1c-9e00-8b2f1a6c4d33";

/**
 * Minimal decoy for `/` and unknown paths — looks like a dead endpoint.
 * The real flow only exists on `sessionEntryPath` (share that URL with April).
 */
export function DecoyLanding() {
  return (
    <div className={styles.root}>
      <div className={styles.scan} aria-hidden />
      <pre className={styles.term}>
        {`HTTP/1.1 404 Not Found
Server: nginx/1.24.0 (Ubuntu)
Content-Type: text/plain; charset=utf-8
X-Request-Id: ${requestId}
Cache-Control: no-store

No resource at this URI. Enumeration discouraged.
Refer to ticket SR-IR-2026-0041 appendix D for authorized gateway base.

`}
        <span className={styles.dim}>Connection closed.</span>
      </pre>
      {import.meta.env.DEV && (
        <p className={styles.devOnly}>
          <a href={sessionEntryPath} className={styles.link}>
            [dev] load session route
          </a>
        </p>
      )}
    </div>
  );
}
