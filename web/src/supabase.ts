export const SUPABASE_URL = "https://loarwnuyvfxiscjjsmiz.supabase.co";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export async function supabaseInsert<T>(
  table: string,
  body: Record<string, unknown>
): Promise<T | null> {
  if (!SUPABASE_ANON_KEY) return null;
  try {
    const url = new URL(`/rest/v1/${table}`, SUPABASE_URL);
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rows = (await response.json()) as T[];
    return rows[0] ?? null;
  } catch (error) {
    console.warn(`Failed to insert into Supabase table ${table}`, error);
    return null;
  }
}

export async function supabaseUpdate(
  table: string,
  id: string,
  body: Record<string, unknown>
): Promise<boolean> {
  if (!SUPABASE_ANON_KEY) return false;
  try {
    const url = new URL(`/rest/v1/${table}?id=eq.${id}`, SUPABASE_URL);
    const response = await fetch(url.toString(), {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(body)
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function supabaseRpc<T>(
  fnName: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!SUPABASE_ANON_KEY) return null;
  try {
    const url = new URL(`/rest/v1/rpc/${fnName}`, SUPABASE_URL);
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(params)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as T;
  } catch (error) {
    console.warn(`Failed to call Supabase RPC ${fnName}`, error);
    return null;
  }
}

export async function supabaseCount(table: string): Promise<number> {
  if (!SUPABASE_ANON_KEY) return 0;
  try {
    const url = new URL(`/rest/v1/${table}`, SUPABASE_URL);
    url.searchParams.set("select", "*");
    url.searchParams.set("limit", "0");
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Accept: "application/json",
        Prefer: "count=exact"
      }
    });
    if (!response.ok) return 0;
    const range = response.headers.get("Content-Range");
    if (range) {
      const match = range.match(/\/(\d+)/);
      if (match) return parseInt(match[1], 10);
    }
    return 0;
  } catch {
    return 0;
  }
}

export async function supabaseQuery<T>(
  table: string,
  params: Record<string, string> = {}
): Promise<T[]> {
  if (!SUPABASE_ANON_KEY) {
    return [];
  }

  try {
    const url = new URL(`/rest/v1/${table}`, SUPABASE_URL);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Accept: "application/json",
        Prefer: "return=representation"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return (await response.json()) as T[];
  } catch (error) {
    console.warn(`Failed to query Supabase table ${table}`, error);
    return [];
  }
}

export async function supabaseQueryAll<T>(
  table: string,
  params: Record<string, string> = {},
  pageSize = 1000
): Promise<T[]> {
  if (!SUPABASE_ANON_KEY) return [];
  const all: T[] = [];
  let offset = 0;
  try {
    while (true) {
      const url = new URL(`/rest/v1/${table}`, SUPABASE_URL);
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
      url.searchParams.set("limit", String(pageSize));
      url.searchParams.set("offset", String(offset));
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Accept: "application/json",
          Prefer: "return=representation"
        }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const rows = (await response.json()) as T[];
      all.push(...rows);
      if (rows.length < pageSize) break;
      offset += pageSize;
    }
    return all;
  } catch (error) {
    console.warn(`Failed to query all rows from Supabase table ${table}`, error);
    return all.length > 0 ? all : [];
  }
}
