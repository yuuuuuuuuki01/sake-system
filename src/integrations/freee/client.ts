import { FREEE_ACCESS_TOKEN, FREEE_COMPANY_ID } from "../../env.js";
import type {
  CreateInvoiceParams,
  FreeeApiError,
  FreeeInvoice,
  FreeeItem,
  FreeePartner
} from "./types.js";

const FREEE_BASE_URL = "https://api.freee.co.jp";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1_000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function parseCompanyId(value: string | undefined): number {
  const companyId = Number(value);
  if (!Number.isInteger(companyId) || companyId <= 0) {
    throw new Error("FREEE_COMPANY_ID must be a positive integer.");
  }

  return companyId;
}

async function parseError(response: Response): Promise<FreeeApiError> {
  const fallback: FreeeApiError = {
    status_code: response.status,
    errors: [
      {
        type: "http_error",
        messages: [response.statusText || "freee API request failed."]
      }
    ]
  };

  try {
    const body = (await response.json()) as Partial<FreeeApiError>;
    if (typeof body.status_code === "number" && Array.isArray(body.errors)) {
      return {
        status_code: body.status_code,
        errors: body.errors.map((entry) => ({
          type: typeof entry.type === "string" ? entry.type : "unknown",
          messages: Array.isArray(entry.messages)
            ? entry.messages.filter((message): message is string => typeof message === "string")
            : []
        }))
      };
    }
  } catch {
    return fallback;
  }

  return fallback;
}

export class FreeeClient {
  private readonly accessToken: string;
  private readonly companyId: number;

  constructor(accessToken: string, companyId: number) {
    if (!accessToken) {
      throw new Error("FREEE_ACCESS_TOKEN is required.");
    }

    this.accessToken = accessToken;
    this.companyId = companyId;
  }

  async getPartners(): Promise<FreeePartner[]> {
    const response = await this.request<{ partners?: FreeePartner[] }>(
      `/api/1/partners?company_id=${this.companyId}`,
      { method: "GET" }
    );
    return Array.isArray(response.partners) ? response.partners : [];
  }

  async getItems(): Promise<FreeeItem[]> {
    const response = await this.request<{ items?: FreeeItem[] }>(
      `/api/1/items?company_id=${this.companyId}`,
      { method: "GET" }
    );
    return Array.isArray(response.items) ? response.items : [];
  }

  async createInvoice(params: CreateInvoiceParams): Promise<FreeeInvoice> {
    const response = await this.request<{ invoice?: FreeeInvoice }>(
      `/api/1/invoices?company_id=${this.companyId}`,
      {
        method: "POST",
        body: JSON.stringify(params)
      }
    );
    if (!response.invoice) {
      throw new Error("freee API returned no invoice payload.");
    }

    return response.invoice;
  }

  async updateInvoice(id: number, params: Partial<CreateInvoiceParams>): Promise<FreeeInvoice> {
    const response = await this.request<{ invoice?: FreeeInvoice }>(
      `/api/1/invoices/${id}?company_id=${this.companyId}`,
      {
        method: "PUT",
        body: JSON.stringify(params)
      }
    );
    if (!response.invoice) {
      throw new Error("freee API returned no invoice payload.");
    }

    return response.invoice;
  }

  private async request<T>(path: string, init: RequestInit, attempt = 1): Promise<T> {
    const response = await fetch(`${FREEE_BASE_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init.headers ?? {})
      }
    });

    if (response.status === 429 && attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY_MS);
      return this.request<T>(path, init, attempt + 1);
    }

    if (!response.ok) {
      throw await parseError(response);
    }

    return (await response.json()) as T;
  }
}

export function createFreeeClientFromEnv(): FreeeClient {
  return new FreeeClient(FREEE_ACCESS_TOKEN ?? "", parseCompanyId(FREEE_COMPANY_ID?.toString()));
}
