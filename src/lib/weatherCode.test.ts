import { describe, it, expect } from "vitest";
import { wxInfo, themeFor } from "./weatherCode";

describe("weatherCode", () => {
  it("maps codes to labels/icons", () => {
    expect(wxInfo(0).label).toBe("Clear");
    expect(wxInfo(61).group).toBe("rain");
    expect(wxInfo(95).icon).toBe("⛈️");
  });
  it("chooses themes by group and time", () => {
    expect(themeFor(0, 14)).toBe("theme-clear");
    expect(themeFor(61, 10)).toBe("theme-rain");
    expect(themeFor(71, 10)).toBe("theme-snow");
    expect(themeFor(3, 21)).toBe("theme-night"); // night override
  });
});

describe("themeFor", () => {
  it("maps rain codes to rain theme by day", () => {
    expect(themeFor(61, 14)).toBe("theme-rain");
  });
  it("forces night theme at night", () => {
    expect(themeFor(3, 21)).toBe("theme-night");
  });
});
