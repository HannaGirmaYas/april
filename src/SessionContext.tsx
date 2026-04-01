import { createContext, useContext, type ReactNode } from "react";
import { birthdayConfig } from "./config";
import type { SessionIdentity } from "./sessionParams";

const SessionContext = createContext<SessionIdentity | null>(null);

export function SessionProvider({
  value,
  children,
}: {
  value: SessionIdentity;
  children: ReactNode;
}) {
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

/** Identity for this session (URL overrides + defaults). Safe to call outside provider — falls back to config. */
export function useSession(): SessionIdentity {
  const ctx = useContext(SessionContext);
  if (ctx) return ctx;
  return {
    recipientFirstName: birthdayConfig.recipientFirstName,
    realNameScare: birthdayConfig.realNameScare,
    instagramStartFollowers: birthdayConfig.instagramStartFollowers,
    showBirthdayReveal: true,
  };
}
