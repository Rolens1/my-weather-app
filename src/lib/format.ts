export type Units = "metric" | "imperial";

export const toF = (c: number) => (c * 9) / 5 + 32;

// convert temp from celsius to farenheit
export function fmtTemp(celsius: number, units: Units): string {
  const v = units === "imperial" ? toF(celsius) : celsius;
  return Math.round(v).toString();
}

export function dayName(isoDate: string): string {
  // expect 'yyyy-mm-dd'
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" });
}
