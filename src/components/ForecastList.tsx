import type { NormalizedForcast } from "../api/schemas";
import { fmtTemp, dayName } from "../lib/format";
import type { Units } from "../lib/format";

type Props = {
  data: NormalizedForcast;
  units: Units;
};

export default function ForecastList({ data, units }: Props) {
  if (!data) return null;

  return (
    <div className="card">
      <h3 className="mb-2 text-lg font-semibold">5-Day Forecast</h3>
      <div>
        {data.daily.map((d, i) => (
          <div key={i} className="rounded-xl border p-3 text-center">
            <div className="text-sm text-zinc-500">{dayName(d.date)}</div>
            <div className="mt-1 text-2xl font-semibold">
              {fmtTemp(d.maxC, units)}°
            </div>
            <div className="text-sm text-zinc-600">
              Low {fmtTemp(d.minC, units)}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
