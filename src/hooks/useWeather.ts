import { useEffect, useMemo, useRef, useState } from "react";
import { geocode } from "../api/geocode";
import { getForcast } from "../api/forecast";
import type { TGeo, NormalizedForcast } from "../api/schemas";
import { setJSON, getJSON } from "../lib/storage";

type Status = "idle" | "searching" | "ready" | "loading" | "error";

export function useWeather() {
  // states
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TGeo[]>([]);
  const [selected, setSelected] = useState<TGeo | null>(null);
  const [forecast, setForecast] = useState<NormalizedForcast | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // abort + debounce refs
  // debounce only means wait a short time after the user stops typing to send a request
  // abort is to cancel any request if the user starts typing again
  // and useRefs prevents the re-renders of the components
  const searchCtl = useRef<AbortController | null>(null);
  const forecastCtl = useRef<AbortController | null>(null);
  const debounceId = useRef<number | null>(null);

  // search (debounced and cached)
  useEffect(() => {
    if (!query) {
      setResults([]);
      setStatus("idle");
      return;
    }
    setStatus("searching");
    setError(null);

    // cache hit?
    const cached = getJSON<TGeo[]>(`geo:${query.toLocaleLowerCase()}`);
    if (cached) {
      setResults(cached);
      setStatus("ready");
      return;
    }

    if (debounceId.current) window.clearTimeout(debounceId.current);
    if (searchCtl.current) searchCtl.current.abort();
    searchCtl.current = new AbortController();

    debounceId.current = window.setTimeout(async () => {
      try {
        const hits = await geocode(query, searchCtl.current?.signal);
        setResults(hits);
        setJSON(`geo:${query.toLocaleLowerCase()}`, hits, 24 * 60 * 60 * 1000);
        setStatus("ready");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setError(e?.message ?? "Search Failed");
        setStatus("error");
      }
    }, 250);

    return () => {
      if (debounceId.current) window.clearTimeout(debounceId.current);
      searchCtl.current?.abort();
    };
  }, [query]);

  // select a city -> fetch forecast and cached 30 min
  async function selectCity(city: TGeo) {
    setSelected(city);
    setStatus("loading");
    setError(null);

    const key = `fc:${city.latitude}:${city.longitude}`;
    const cached = getJSON<NormalizedForcast>(key);
    if (cached) {
      setForecast(cached);
      setStatus("ready");
      return;
    }

    if (forecastCtl.current) forecastCtl.current.abort();
    forecastCtl.current = new AbortController();

    try {
      const f = await getForcast(
        city.latitude,
        city.longitude,
        forecastCtl.current.signal
      );
      setForecast(f);
      setJSON(key, f, 30 * 60 * 1000);
      setStatus("ready");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      setError(e?.message ?? "Forecast failed");
      setStatus("error");
    }
  }
  // geolocation helper -> to get the user location if permission accepted
  const loadByGeolocation = () =>
    new Promise<void>((resolve, reject) => {
      if (!navigator.geolocation)
        return reject(new Error("Geolocation not supported"));
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            await selectCity({
              name: "Your location",
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              country: "",
            } as TGeo);
            resolve();
          } catch (e) {
            reject(e);
          }
        },
        (err) => reject(err),
        { enableHighAccuracy: true, maximumAge: 60000, timeout: 8000 }
      );
    });

  // derived flags
  const canSearch = useMemo(() => query.trim().length >= 2, [query]);

  return {
    //states
    query,
    results,
    selected,
    forecast,
    status,
    error,
    //asctions
    setQuery,
    selectCity,
    loadByGeolocation,
    //helper
    canSearch,
  };
}
