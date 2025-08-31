import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import { useWeather } from "./hooks/useWeather";
import { useUnits } from "./hooks/useUnits";

export default function App() {
  const w = useWeather();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)._w = w;
  const { units, toggle } = useUnits();

  return (
    <div className="min-h-screen theme-clear p-6">
      <div className="mx-auto grid max-w-3xl gap-4">
        <h1 className="text-3xl font-semibold">SkyCast</h1>

        <div className="flex items-center gap-3">
          <div className="grow">
            <SearchBox
              query={w.query}
              setQuery={w.setQuery}
              results={w.results}
              status={w.status}
              canSearch={w.canSearch}
              onSelect={w.selectCity}
            />
          </div>
          <button onClick={toggle} className="rounded-xl border px-3 py-2">
            {units === "metric" ? "°C" : "°F"}
          </button>
        </div>

        {w.error && <div className="text-red-600">Error: {w.error}</div>}

        {w.forecast && (
          <>
            <WeatherCard city={w.selected} data={w.forecast} units={units} />
            <ForecastList data={w.forecast} units={units} />
          </>
        )}
      </div>
    </div>
  );
}
