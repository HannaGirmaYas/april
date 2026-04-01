import { birthdayConfig } from "./config";

/** Resolved identity for the breach + birthday flow (defaults + optional URL overrides) */
export type SessionIdentity = {
  recipientFirstName: string;
  realNameScare: string;
  instagramStartFollowers: number;
  /** `bd=false` → April Fools reveal instead of birthday copy */
  showBirthdayReveal: boolean;
};

function clampInt(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/** Strip unsafe characters; keep letters (unicode), numbers, spaces, simple punctuation */
function sanitizeName(input: string, maxLen: number): string | null {
  const t = input.trim().slice(0, maxLen);
  if (!t) return null;
  const cleaned = t
    .replace(/[^\p{L}\p{N}\s\-'.]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.length > 0 ? cleaned : null;
}

/**
 * Optional query params (any combination — omitted keys use `birthdayConfig`):
 * - `followers` or `ig` — starting Instagram follower count (integer ≥ 0)
 * - `account` or `handle` or `user` — first name / @handle for the target (display)
 * - `realName` or `real` or `legal` — “real name” used in the scare line
 * - `bd` — `false` / `0` / `no` shows “Happy April Fools” on the final screen; omitted or `true` = birthday reveal
 *
 * Example:
 * `?followers=1200&account=April&realName=Beza`
 * `?bd=false&account=April` — April Fools ending only
 */
export function parseSessionParams(search: string): SessionIdentity {
  const out: SessionIdentity = {
    recipientFirstName: birthdayConfig.recipientFirstName,
    realNameScare: birthdayConfig.realNameScare,
    instagramStartFollowers: birthdayConfig.instagramStartFollowers,
    showBirthdayReveal: true,
  };

  const p = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);

  const followersRaw = p.get("followers") ?? p.get("ig");
  if (followersRaw !== null && followersRaw !== "") {
    const n = Number.parseInt(followersRaw, 10);
    if (!Number.isNaN(n) && n >= 0) {
      out.instagramStartFollowers = clampInt(Math.floor(n), 0, 999_999_999);
    }
  }

  const accountRaw = p.get("account") ?? p.get("handle") ?? p.get("user");
  if (accountRaw !== null) {
    const s = sanitizeName(accountRaw, 48);
    if (s) out.recipientFirstName = s;
  }

  const realRaw = p.get("realName") ?? p.get("real") ?? p.get("legal");
  if (realRaw !== null) {
    const s = sanitizeName(realRaw, 48);
    if (s) out.realNameScare = s;
  }

  const bd = p.get("bd");
  if (bd !== null && bd !== "") {
    const b = bd.trim().toLowerCase();
    if (b === "false" || b === "0" || b === "no") {
      out.showBirthdayReveal = false;
    }
  }

  return out;
}
