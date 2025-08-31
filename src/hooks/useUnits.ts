import { useEffect, useState } from "react";
import type { Units } from "../lib/format";

const KEY = "client:units";

export function useUnits() {
  const [units, setUnits] = useState<Units>("metric");

  useEffect(() => {
    const saved = localStorage.getItem("KEY");
    if (saved === "imperial" || saved === "metric") setUnits(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, units);
  }, [units]);

  const toggle = () =>
    setUnits((u) => (u === "metric" ? "imperial" : "metric"));

  return { units, setUnits, toggle };
}
