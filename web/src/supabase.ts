const SUPABASE_URL = "https://loarwnuyvfxiscjjsmiz.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

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
