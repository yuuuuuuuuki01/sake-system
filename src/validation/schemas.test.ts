import { describe, expect, it } from "vitest";

import {
  CustomerSchema,
  ProductSchema,
  SalesHeaderSchema,
} from "./schemas.js";

describe("validation schemas", () => {
  it("CustomerSchema accepts a valid customer", () => {
    expect(
      CustomerSchema.safeParse({
        id: "customer-1",
        legacyCustomerCode: "C001",
        name: "Test Customer",
        closingDay: 15,
        isActive: true,
      }).success,
    ).toBe(true);
  });

  it("CustomerSchema rejects an empty code", () => {
    expect(
      CustomerSchema.safeParse({
        id: "customer-1",
        legacyCustomerCode: "",
        name: "Test Customer",
        closingDay: 15,
        isActive: true,
      }).success,
    ).toBe(false);
  });

  it("CustomerSchema rejects closingDay outside the valid range", () => {
    expect(
      CustomerSchema.safeParse({
        id: "customer-1",
        legacyCustomerCode: "C001",
        name: "Test Customer",
        closingDay: 32,
        isActive: true,
      }).success,
    ).toBe(false);
  });

  it("ProductSchema accepts a 13-digit janCode", () => {
    expect(
      ProductSchema.safeParse({
        id: "product-1",
        legacyProductCode: "P001",
        name: "Test Product",
        janCode: "1234567890123",
        isActive: true,
      }).success,
    ).toBe(true);
  });

  it("ProductSchema rejects a 12-digit janCode", () => {
    expect(
      ProductSchema.safeParse({
        id: "product-1",
        legacyProductCode: "P001",
        name: "Test Product",
        janCode: "123456789012",
        isActive: true,
      }).success,
    ).toBe(false);
  });

  it("SalesHeaderSchema rejects a negative totalAmount", () => {
    expect(
      SalesHeaderSchema.safeParse({
        id: "sales-1",
        legacyDocumentNo: "S0001",
        legacyCustomerCode: "C001",
        salesDate: "2026-04-15",
        totalAmount: -1,
      }).success,
    ).toBe(false);
  });

  it("SalesHeaderSchema rejects an invalid salesDate format", () => {
    expect(
      SalesHeaderSchema.safeParse({
        id: "sales-1",
        legacyDocumentNo: "S0001",
        legacyCustomerCode: "C001",
        salesDate: "2026/04/15",
        totalAmount: 1000,
      }).success,
    ).toBe(false);
  });
});
