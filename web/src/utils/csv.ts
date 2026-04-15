export interface CSVColumn {
  key: string;
  label: string;
}

function escapeCSVValue(value: unknown): string {
  const normalized =
    value === null || value === undefined
      ? ""
      : value instanceof Date
        ? value.toISOString()
        : String(value);
  const escaped = normalized.replaceAll('"', '""');
  return /[",\n\r]/.test(escaped) ? `"${escaped}"` : escaped;
}

export function downloadCSV(
  filename: string,
  rows: Record<string, unknown>[],
  columns?: CSVColumn[]
): void {
  if (rows.length === 0 && (!columns || columns.length === 0)) {
    return;
  }

  const resolvedColumns =
    columns && columns.length > 0
      ? columns
      : Object.keys(rows[0] ?? {}).map((key) => ({ key, label: key }));

  const lines = [
    resolvedColumns.map((column) => escapeCSVValue(column.label)).join(","),
    ...rows.map((row) =>
      resolvedColumns.map((column) => escapeCSVValue(row[column.key])).join(",")
    )
  ];

  const csv = `\uFEFF${lines.join("\r\n")}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
