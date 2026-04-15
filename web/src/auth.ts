import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase";

const STORAGE_KEY = "sake_auth";

interface AuthSession {
  access_token: string;
  refresh_token: string;
}

interface AuthResponse extends AuthSession {
  user?: {
    email?: string;
  };
}

function saveSession(session: AuthSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function authHeaders(): HeadersInit {
  return {
    apikey: SUPABASE_ANON_KEY,
    "Content-Type": "application/json"
  };
}

function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const normalized = payload.replaceAll("-", "+").replaceAll("_", "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return JSON.parse(atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function authRequest(path: string, body: Record<string, unknown>): Promise<AuthResponse> {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body)
  });

  const payload = (await response.json().catch(() => ({}))) as AuthResponse & {
    error_description?: string;
    msg?: string;
  };

  if (!response.ok) {
    throw new Error(payload.error_description ?? payload.msg ?? `HTTP ${response.status}`);
  }

  return payload;
}

export async function signIn(email: string, password: string): Promise<{ email: string }> {
  const result = await authRequest("token?grant_type=password", { email, password });
  saveSession({
    access_token: result.access_token,
    refresh_token: result.refresh_token
  });
  return { email: result.user?.email ?? email };
}

export async function signUp(email: string, password: string): Promise<{ email: string }> {
  const result = await authRequest("signup", { email, password });
  if (result.access_token && result.refresh_token) {
    saveSession({
      access_token: result.access_token,
      refresh_token: result.refresh_token
    });
  }
  return { email: result.user?.email ?? email };
}

export async function signOut(): Promise<void> {
  const session = getSession();
  localStorage.removeItem(STORAGE_KEY);

  if (!session?.access_token) {
    return;
  }

  try {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: {
        ...authHeaders(),
        Authorization: `Bearer ${session.access_token}`
      }
    });
  } catch (error) {
    console.warn("Supabase sign out failed", error);
  }
}

export function getSession(): AuthSession | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as Partial<AuthSession>;
    if (!parsed.access_token || !parsed.refresh_token) {
      return null;
    }
    return {
      access_token: parsed.access_token,
      refresh_token: parsed.refresh_token
    };
  } catch {
    return null;
  }
}

export function currentUser(): { email: string } | null {
  const session = getSession();
  if (!session) return null;
  const payload = parseJwtPayload(session.access_token);
  const email = typeof payload?.email === "string" ? payload.email : null;
  return email ? { email } : null;
}
