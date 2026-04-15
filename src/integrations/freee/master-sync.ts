import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { Customer, Product } from "../../domain/types.js";
import { createFreeeClientFromEnv } from "./client.js";
import type { FreeeItem, FreeePartner } from "./types.js";

interface MappingCachePayload {
  customers: Record<string, number>;
}

const moduleDir = dirname(fileURLToPath(import.meta.url));
const mappingCachePath = join(moduleDir, "mapping-cache.json");

function normalize(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

async function loadMappingCache(): Promise<MappingCachePayload> {
  try {
    const content = await readFile(mappingCachePath, "utf8");
    const parsed = JSON.parse(content) as Partial<MappingCachePayload>;
    return {
      customers:
        parsed.customers && typeof parsed.customers === "object" ? parsed.customers : {}
    };
  } catch {
    return { customers: {} };
  }
}

async function saveMappingCache(payload: MappingCachePayload): Promise<void> {
  await mkdir(dirname(mappingCachePath), { recursive: true });
  await writeFile(mappingCachePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function matchPartner(customer: Customer, partners: FreeePartner[]): FreeePartner | undefined {
  const desiredCode = normalize(customer.legacyCustomerCode);
  const desiredName = normalize(customer.billingName ?? customer.name);

  return partners.find((partner) => {
    return normalize(partner.code) === desiredCode || normalize(partner.name) === desiredName;
  });
}

function matchItem(product: Product, items: FreeeItem[]): FreeeItem | undefined {
  const desiredCode = normalize(product.legacyProductCode);
  const desiredName = normalize(product.name);

  return items.find((item) => {
    return normalize(item.code) === desiredCode || normalize(item.name) === desiredName;
  });
}

export async function syncCustomersToFreee(
  customers: Customer[]
): Promise<{ synced: number; failed: number; mapping: Map<string, number> }> {
  const client = createFreeeClientFromEnv();
  const [partners, cache] = await Promise.all([client.getPartners(), loadMappingCache()]);
  const mapping = new Map<string, number>();
  let synced = 0;
  let failed = 0;

  for (const customer of customers) {
    const cachedId = cache.customers[customer.legacyCustomerCode];
    if (typeof cachedId === "number") {
      mapping.set(customer.legacyCustomerCode, cachedId);
      synced += 1;
      continue;
    }

    const partner = matchPartner(customer, partners);
    if (!partner) {
      failed += 1;
      continue;
    }

    cache.customers[customer.legacyCustomerCode] = partner.id;
    mapping.set(customer.legacyCustomerCode, partner.id);
    synced += 1;
  }

  await saveMappingCache(cache);

  return { synced, failed, mapping };
}

export async function syncProductsToFreee(
  products: Product[]
): Promise<{ synced: number; failed: number }> {
  const client = createFreeeClientFromEnv();
  const items = await client.getItems();
  let synced = 0;
  let failed = 0;

  for (const product of products) {
    if (matchItem(product, items)) {
      synced += 1;
      continue;
    }

    failed += 1;
  }

  return { synced, failed };
}

export async function loadFreeeCustomerMapping(): Promise<Map<string, number>> {
  const cache = await loadMappingCache();
  return new Map(Object.entries(cache.customers).map(([key, value]) => [key, value]));
}
