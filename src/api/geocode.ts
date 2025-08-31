import { GeoResponse } from "./schemas";
import type { TGeo } from "./schemas";

export async function geocode(
  q: string,
  signal?: AbortSignal
): Promise<TGeo[]> {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", q);
  url.searchParams.set("count", "5");
  url.searchParams.set("language", "en");

  const res = await fetch(url, { signal });

  if (!res.ok) throw new Error(`Geocode failed: ${res.status}`);

  const data = GeoResponse.parse(await res.json());
  const list = data.results ?? [];

  return list.sort((a, b) => (b.population ?? 0) - (a.population ?? 0));
}
