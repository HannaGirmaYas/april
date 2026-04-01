import { sessionEntryPath } from "./config";
import { DecoyLanding } from "./DecoyLanding";
import { parseSessionParams } from "./sessionParams";
import { SessionProvider } from "./SessionContext";
import { SecureIncident } from "./SecureIncident";
import styles from "./App.module.css";

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

/** No client router — avoids RR7 edge cases where long static paths match nothing → blank page */
export default function App() {
  const path = normalizePath(window.location.pathname);
  const entry = normalizePath(sessionEntryPath);
  const showSession = path === entry;
  const session = parseSessionParams(window.location.search);

  return (
    <div className={styles.routerRoot}>
      {showSession ? (
        <SessionProvider value={session}>
          <SecureIncident />
        </SessionProvider>
      ) : (
        <DecoyLanding />
      )}
    </div>
  );
}
