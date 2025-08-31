import { ForecastResponse } from "./schemas";
import type { NormalizedForcast } from "./schemas";
import { normalizedForcast } from "./schemas";

export async function getForcast(
  lat: number,
  long: number,
  signal?: AbortSignal
): Promise<NormalizedForcast> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(long));
  url.searchParams.set(
    "current",
    "temperature_2m,apparent,temperature,weather_code,wind_speed_10m"
  );
  url.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,weather_code"
  );
  url.searchParams.set("forecast_days", "5");
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Forecast failed ${res.status}`);

  const parsed = ForecastResponse.parse(await res.json);
  return normalizedForcast(parsed);
}
