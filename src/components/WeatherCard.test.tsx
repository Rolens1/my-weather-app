import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WeatherCard from "./WeatherCard";

const city = {
  name: "Montreal",
  latitude: 45,
  longitude: -73,
  country: "CA",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;
const data = {
  current: { tempC: 20, feelsLikeC: 18, code: 1, wind: 12 },
  daily: [],
};

describe("WeatherCard", () => {
  it("renders current temperature and city", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<WeatherCard city={city} data={data as any} units="metric" />);
    expect(screen.getByText(/Montreal, CA/)).toBeInTheDocument();
    expect(screen.getByText(/20°/)).toBeInTheDocument();
    expect(screen.getByText(/Feels like 18°/)).toBeInTheDocument();
  });

  it("shows F when units are imperial", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<WeatherCard city={city} data={data as any} units="imperial" />);
    expect(screen.getByText(/68°/)).toBeInTheDocument(); // 20C -> 68F
  });
});
