/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "./useFavorites";

// Test fixtures (TGeo-like)
const MTL = {
  name: "Montreal",
  country: "CA",
  latitude: 45,
  longitude: -73,
} as any;
const TOR = {
  name: "Toronto",
  country: "CA",
  latitude: 43.7,
  longitude: -79.4,
} as any;
const NYC = {
  name: "New York",
  country: "US",
  latitude: 40.7,
  longitude: -74,
} as any;
const BOS = {
  name: "Boston",
  country: "US",
  latitude: 42.36,
  longitude: -71.06,
} as any;

const KEY = "skycast:favs:v1";

beforeEach(() => {
  localStorage.clear();
});

describe("useFavorites", () => {
  it("adds, toggles, and persists favorites", () => {
    const { result } = renderHook(() => useFavorites(3));

    // add Montreal
    act(() => result.current.addFavorite(MTL));
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].name).toBe("Montreal");
    expect(result.current.isFavorite(MTL)).toBe(true);

    // toggle removes
    act(() => result.current.toggleFavorite(MTL));
    expect(result.current.favorites).toHaveLength(0);
    expect(result.current.isFavorite(MTL)).toBe(false);

    // persists to localStorage
    act(() => result.current.addFavorite(MTL));
    const raw = localStorage.getItem(KEY) ?? "";
    expect(raw).toContain("Montreal");
  });

  it("enforces max by dropping the oldest favorite", () => {
    const { result } = renderHook(() => useFavorites(3));

    act(() => {
      result.current.addFavorite(MTL); // oldest
      result.current.addFavorite(TOR);
      result.current.addFavorite(NYC);
      result.current.addFavorite(BOS); // should drop MTL
    });

    expect(result.current.favorites).toHaveLength(3);
    // Newest-first order because we unshift in the hook
    expect(result.current.favorites.map((f) => f.name)).toEqual([
      "Boston",
      "New York",
      "Toronto",
    ]);
    expect(result.current.favorites.map((f) => f.name)).not.toContain(
      "Montreal"
    );
  });

  it("restores favorites from localStorage on mount", () => {
    // Pre-seed storage with two favorites (FavCity shape)
    const seed = [
      {
        id: `${MTL.latitude}:${MTL.longitude}`,
        name: MTL.name,
        country: MTL.country,
        latitude: MTL.latitude,
        longitude: MTL.longitude,
      },
      {
        id: `${TOR.latitude}:${TOR.longitude}`,
        name: TOR.name,
        country: TOR.country,
        latitude: TOR.latitude,
        longitude: TOR.longitude,
      },
    ];
    localStorage.setItem(KEY, JSON.stringify(seed));

    const { result } = renderHook(() => useFavorites(5));
    expect(result.current.favorites).toHaveLength(2);
    expect(result.current.isFavorite(MTL)).toBe(true);
    expect(result.current.isFavorite(TOR)).toBe(true);
  });
});
