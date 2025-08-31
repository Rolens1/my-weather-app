import { describe, it, expect } from "vitest";
import { toF, fmtTemp, dayName } from "./format";

describe("format helpers", () => {
  it("converts C to F", () => {
    expect(Math.round(toF(0))).toBe(32);
    expect(Math.round(toF(25))).toBe(77);
  });
  it("formats temp with units", () => {
    expect(fmtTemp(20, "metric")).toBe("20");
    expect(fmtTemp(20, "imperial")).toBe("68");
  });
  it("returns weekday short name", () => {
    const name = dayName("2025-09-01"); // Mon
    expect(typeof name).toBe("string");
    expect(name.length).toBeGreaterThan(1);
  });
});
