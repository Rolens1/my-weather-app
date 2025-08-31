import { useEffect, useMemo, useState } from "react";
import type { TGeo } from "../api/schemas";

export type FavCity = {
  id: string;
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
};

const KEY = "skycast:favs:v1";

function cityId(c: Pick<TGeo, "latitude" | "longitude">) {
  return `${c.latitude}:${c.longitude}`;
}

export function useFavorites(max = 5) {
  const [favorites, setFavorites] = useState<FavCity[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FavCity[];
        if (Array.isArray(parsed)) setFavorites(parsed);
      }
      // eslint-disable-next-line no-empty
    } catch {}
  }, []);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favorites));
      // eslint-disable-next-line no-empty
    } catch {}
  }, [favorites]);

  const ids = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites]);

  const isFavorite = (c: TGeo | FavCity | null | undefined) =>
    !!c && ids.has(cityId(c));

  const addFavorite = (c: TGeo) => {
    const id = cityId(c);
    if (ids.has(id)) return; // already present
    setFavorites((prev) => {
      const next: FavCity[] = [
        {
          id,
          name: c.name,
          country: c.country,
          latitude: c.latitude,
          longitude: c.longitude,
        },
        ...prev,
      ];
      // enforce max by dropping the oldest (end of list)
      return next.slice(0, max);
    });
  };

  const removeFavorite = (idOrCity: string | TGeo) => {
    const id = typeof idOrCity === "string" ? idOrCity : cityId(idOrCity);
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const toggleFavorite = (c: TGeo) => {
    const id = cityId(c);
    if (ids.has(id)) removeFavorite(id);
    else addFavorite(c);
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
