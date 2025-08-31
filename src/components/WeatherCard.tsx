import type { NormalizedForcast, TGeo } from "../api/schemas";
import { fmtTemp } from "../lib/format";
import type { Units } from "../lib/format";

type Props = {
  city: TGeo | null;
  data: NormalizedForcast | null;
  units: Units;
};

export default function WeatherCard({ city, data, units }: Props) {
  if (!city || !data) return null;

  const c = data.current;

  return (
    <div className="card">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">
          {city.name}
          {city.country ? `, ${city.country}` : ""}
        </h2>
        <div>Wind {Math.round(c.wind ?? 0)} km/h</div>
      </div>

      <div className="mt-2 flex items-end gap-3">
        <div>{fmtTemp(c.tempC, units)}°</div>
        <div>Feels like {fmtTemp(c.feelsLikeC ?? c.tempC, units)}°</div>
        <div className="text-sm">{/* Icon/ Label for condition */}</div>
      </div>
    </div>
  );
}
