export type ImportableEntity = "customers" | "products" | "suppliers" | "staff";

export interface ImportRow {
  [key: string]: unknown;
  _valid?: boolean;
  _error?: string;
}

export interface ImportPreview {
  entity: ImportableEntity;
  columns: string[];
  rows: ImportRow[];
  totalRows: number;
  validRows: number;
  invalidRows: number;
}

const REQUIRED_FIELDS: Record<ImportableEntity, string[]> = {
  customers: ["legacy_customer_code", "name"],
  products: ["legacy_product_code", "name"],
  suppliers: ["legacy_supplier_code", "name"],
  staff: ["legacy_staff_code", "name"]
};

const TEMPLATES: Record<ImportableEntity, string[]> = {
  customers: [
    "legacy_customer_code",
    "name",
    "kana_name",
    "phone",
    "postal_code",
    "address1",
    "address2",
    "closing_day",
    "payment_day",
    "email"
  ],
  products: [
    "legacy_product_code",
    "name",
    "kana_name",
    "jan_code",
    "category_code",
    "volume_ml",
    "alcohol_degree",
    "list_price",
    "default_sale_price"
  ],
  suppliers: [
    "legacy_supplier_code",
    "name",
    "kana_name",
    "phone",
    "postal_code",
    "address1",
    "closing_day",
    "payment_day",
    "email"
  ],
  staff: ["legacy_staff_code", "name", "kana_name", "department"]
};

// シンプルなCSVパーサ（クォート対応）
export function parseCSV(text: string): { columns: string[]; rows: Record<string, string>[] } {
  // BOM除去
  if (text.charCodeAt(0) === 0xfeff) {
    text = text.slice(1);
  }
  const lines: string[][] = [];
  let current: string[] = [];
  let field = "";
  let inQuote = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuote) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuote = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuote = true;
      } else if (c === ",") {
        current.push(field);
        field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        current.push(field);
        if (current.some((f) => f !== "")) lines.push(current);
        current = [];
        field = "";
      } else {
        field += c;
      }
    }
  }
  if (field !== "" || current.length > 0) {
    current.push(field);
    if (current.some((f) => f !== "")) lines.push(current);
  }
  if (lines.length === 0) return { columns: [], rows: [] };
  const columns = lines[0].map((c) => c.trim());
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const row: Record<string, string> = {};
    columns.forEach((col, j) => {
      row[col] = (lines[i][j] ?? "").trim();
    });
    rows.push(row);
  }
  return { columns, rows };
}

export function validateImport(
  entity: ImportableEntity,
  columns: string[],
  rows: Record<string, string>[]
): ImportPreview {
  const required = REQUIRED_FIELDS[entity];
  const missing = required.filter((r) => !columns.includes(r));
  const validated: ImportRow[] = rows.map((row) => {
    const issues: string[] = [];
    if (missing.length > 0) {
      issues.push(`必須列欠損: ${missing.join(",")}`);
    }
    for (const r of required) {
      if (columns.includes(r) && !row[r]) {
        issues.push(`${r}が空`);
      }
    }
    return {
      ...row,
      _valid: issues.length === 0,
      _error: issues[0]
    };
  });
  const validRows = validated.filter((r) => r._valid).length;
  return {
    entity,
    columns,
    rows: validated,
    totalRows: rows.length,
    validRows,
    invalidRows: validated.length - validRows
  };
}

// テンプレートCSV生成
export function generateTemplateCSV(entity: ImportableEntity): string {
  const bom = "\uFEFF";
  const cols = TEMPLATES[entity];
  const exampleRow: Record<ImportableEntity, string[]> = {
    customers: ["C0001", "青葉商事", "アオバショウジ", "03-1234-5678", "100-0001", "東京都千代田区", "", "15", "末", "aoba@example.com"],
    products: ["P00001", "純米吟醸 720ml", "ジュンマイギンジョウ", "4901234567891", "01", "720", "16", "2200", "1500"],
    suppliers: ["S001", "山田農場", "ヤマダノウジョウ", "03-9999-0000", "150-0001", "東京都渋谷区", "末", "25", "yamada@farm.example.com"],
    staff: ["S001", "金井和雄", "カナイカズオ", "製造部"]
  };
  const example = exampleRow[entity];
  return bom + cols.join(",") + "\n" + example.join(",") + "\n";
}

// Supabaseへのバッチ投入
export async function importToSupabase(
  entity: ImportableEntity,
  rows: ImportRow[]
): Promise<{ inserted: number; failed: number }> {
  const { supabaseInsert } = await import("../supabase");
  let inserted = 0;
  let failed = 0;
  const tableMap: Record<ImportableEntity, string> = {
    customers: "customers",
    products: "products",
    suppliers: "suppliers",
    staff: "staff"
  };
  const table = tableMap[entity];

  for (const row of rows) {
    if (!row._valid) continue;
    const { _valid, _error, ...payload } = row;
    // id が必要なテーブル(staff等)への対応
    const body: Record<string, unknown> = { ...payload };
    if (!body.id) {
      const codeField =
        entity === "customers"
          ? "legacy_customer_code"
          : entity === "products"
            ? "legacy_product_code"
            : entity === "suppliers"
              ? "legacy_supplier_code"
              : "legacy_staff_code";
      body.id = String(payload[codeField] ?? `${entity}-${Date.now()}-${inserted + failed}`);
    }
    // 数値変換
    for (const k of ["volume_ml", "closing_day", "payment_day", "list_price", "default_sale_price"]) {
      if (typeof body[k] === "string" && body[k] !== "") {
        const n = Number(body[k]);
        if (Number.isFinite(n)) body[k] = n;
      }
    }
    try {
      const result = await supabaseInsert(table, body);
      if (result !== null) inserted++;
      else failed++;
    } catch {
      failed++;
    }
  }
  return { inserted, failed };
}
