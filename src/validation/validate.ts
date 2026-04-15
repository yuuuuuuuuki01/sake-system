import type { ZodSchema } from "zod";

export interface ValidationError {
  index: number;
  input: unknown;
  issues: string[];
}

export function validateBatch<T>(
  schema: ZodSchema<T>,
  records: unknown[],
  label: string,
): { valid: T[]; errors: ValidationError[] } {
  const valid: T[] = [];
  const errors: ValidationError[] = [];

  records.forEach((record, index) => {
    const result = schema.safeParse(record);
    if (result.success) {
      valid.push(result.data);
      return;
    }

    errors.push({
      index,
      input: record,
      issues: result.error.issues.map((issue) => {
        const path = issue.path.length > 0 ? issue.path.join(".") : label;
        return `${label}[${index}]${path === label ? "" : `.${path}`}: ${issue.message}`;
      }),
    });
  });

  return { valid, errors };
}
