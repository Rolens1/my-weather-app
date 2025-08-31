import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ForecastList from "./ForecastList";

const data = {
  current: { tempC: 20, feelsLikeC: 20, code: 1, wind: 5 },
  daily: [
    { date: "2025-09-01", minC: 10, maxC: 20, code: 1 },
    { date: "2025-09-02", minC: 11, maxC: 22, code: 2 },
    { date: "2025-09-03", minC: 12, maxC: 23, code: 3 },
    { date: "2025-09-04", minC: 13, maxC: 24, code: 61 },
    { date: "2025-09-05", minC: 14, maxC: 25, code: 71 },
  ],
};

describe("ForecastList", () => {
  it("renders 5 forecast tiles with temps", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<ForecastList data={data as any} units="metric" />);
    const twenty = screen.getAllByText(/20°|22°|23°|24°|25°/);
    expect(twenty.length).toBeGreaterThanOrEqual(5);
  });
});
