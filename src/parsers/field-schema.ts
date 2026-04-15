import { readFile } from "node:fs/promises";
import { join } from "node:path";

export interface FieldDef {
  name: string;
  offset: number;
  length: number;
  type: "shiftjis" | "uint16" | "uint32" | "packed_decimal" | "date_yyyymmdd";
  confidence: "hypothesis" | "confirmed";
}

export interface FileSchema {
  fileCode: string;
  recordLength: number;
  fields: FieldDef[];
}

function stripQuotes(value: string): string {
  return value.replace(/^['"]|['"]$/g, "");
}

function parseScalar(value: string): number | string {
  const normalized = stripQuotes(value.trim());
  if (/^-?\d+$/.test(normalized)) {
    return Number.parseInt(normalized, 10);
  }

  return normalized;
}

function parseSimpleYaml(source: string): unknown {
  const lines = source
    .split(/\r?\n/u)
    .map((line) => line.replace(/#.*$/u, ""))
    .filter((line) => line.trim().length > 0);

  const root: Record<string, unknown> = {};
  let currentArrayKey: string | undefined;
  let currentObject: Record<string, unknown> | undefined;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!line.startsWith(" ") && trimmed.endsWith(":")) {
      currentArrayKey = trimmed.slice(0, -1);
      root[currentArrayKey] = [];
      currentObject = undefined;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (!currentArrayKey) {
        throw new Error("Invalid YAML schema: list item found without a parent key.");
      }

      const item = trimmed.slice(2);
      currentObject = {};
      (root[currentArrayKey] as unknown[]).push(currentObject);

      if (item.length > 0) {
        const separator = item.indexOf(":");
        if (separator === -1) {
          throw new Error(`Invalid YAML schema item: ${trimmed}`);
        }

        const key = item.slice(0, separator).trim();
        const value = item.slice(separator + 1).trim();
        currentObject[key] = parseScalar(value);
      }

      continue;
    }

    const separator = trimmed.indexOf(":");
    if (separator === -1) {
      throw new Error(`Invalid YAML schema line: ${trimmed}`);
    }

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();

    if (line.startsWith(" ")) {
      if (!currentObject) {
        throw new Error(`Invalid YAML schema nesting: ${trimmed}`);
      }

      currentObject[key] = parseScalar(value);
      continue;
    }

    root[key] = parseScalar(value);
    currentArrayKey = undefined;
    currentObject = undefined;
  }

  return root;
}

function isFieldDef(value: unknown): value is FieldDef {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<FieldDef>;
  return (
    typeof candidate.name === "string" &&
    typeof candidate.offset === "number" &&
    typeof candidate.length === "number" &&
    ["shiftjis", "uint16", "uint32", "packed_decimal", "date_yyyymmdd"].includes(
      candidate.type ?? ""
    ) &&
    ["hypothesis", "confirmed"].includes(candidate.confidence ?? "")
  );
}

function assertFileSchema(value: unknown, fileCode: string): FileSchema {
  if (!value || typeof value !== "object") {
    throw new Error(`Invalid schema for ${fileCode}: expected an object.`);
  }

  const candidate = value as Partial<FileSchema>;

  if (
    typeof candidate.fileCode !== "string" ||
    typeof candidate.recordLength !== "number" ||
    !Array.isArray(candidate.fields) ||
    !candidate.fields.every(isFieldDef)
  ) {
    throw new Error(`Invalid schema shape for ${fileCode}.`);
  }

  return candidate as FileSchema;
}

export async function loadSchema(schemasDir: string, fileCode: string): Promise<FileSchema> {
  const candidatePaths = [
    join(schemasDir, `${fileCode}.schema.json`),
    join(schemasDir, `${fileCode}.schema.yaml`),
    join(schemasDir, `${fileCode}.schema.yml`)
  ];

  for (const schemaPath of candidatePaths) {
    try {
      const source = await readFile(schemaPath, "utf8");
      const parsed = schemaPath.endsWith(".json") ? JSON.parse(source) : parseSimpleYaml(source);
      return assertFileSchema(parsed, fileCode);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        continue;
      }

      throw error;
    }
  }

  throw new Error(`Schema not found for fileCode=${fileCode} in ${schemasDir}`);
}
