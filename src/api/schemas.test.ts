import { describe, it, expect } from "vitest";
import { ForecastResponse, normalizedForcast } from "./schemas";

describe("forecast schema", () => {
  it("parses and normalizes", () => {
    const fake = {
      latitude: 0,
      longitude: 0,
      timezone: "UTC",
      current: {
        temperature_2m: 12,
        weather_code: 1,
        wind_speed_10m: 3,
        apparent_temperature: 11,
      },
      daily: {
        time: [
          "2025-08-31",
          "2025-09-01",
          "2025-09-02",
          "2025-09-03",
          "2025-09-04",
        ],
        temperature_2m_max: [20, 21, 22, 23, 24],
        temperature_2m_min: [10, 11, 12, 13, 14],
        weather_code: [1, 2, 61, 3, 71],
      },
    };
    const parsed = ForecastResponse.parse(fake);
    const norm = normalizedForcast(parsed);
    expect(norm.daily.length).toBe(5);
    expect(typeof norm.current.tempC).toBe("number");
  });
});
