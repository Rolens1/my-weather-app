import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import { useWeather } from "./hooks/useWeather";
import { useUnits } from "./hooks/useUnits";
import { themeFor, wxInfo } from "./lib/weatherCode";
import ErrorState from "./components/ErrorState";
import { CardSkeleton, ForecastSkeleton } from "./components/Skeleton";

export default function App() {
  const w = useWeather();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)._w = w;
  const { units, toggle } = useUnits();

  // theme computed for current weather
  const code = w.forecast?.current.code ?? 0;
  const theme = themeFor(code);

  // keeping the ref of the last selected city
  const doRetry = () => {
    if (w.selected) w.selectCity(w.selected);
  };

  return (
    <div className={`min-h-screen ${theme} p-6 transition-colors duration-500`}>
      <div className="mx-auto grid max-w-3xl gap-4">
        <h1 className="text-3xl font-semibold">Weather App</h1>

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

        {w.status === "error" && (
          <ErrorState
            message={w.error ?? "Could not load forecast."}
            onRetry={doRetry}
          />
        )}
        {w.status === "loading" && (
          <>
            <CardSkeleton />
            <ForecastSkeleton />
          </>
        )}

        {w.forecast && w.status === "ready" && (
          <>
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              <span aria-label="condition">
                {wxInfo(code).icon} {wxInfo(code).label}
              </span>
            </div>
            <WeatherCard city={w.selected} data={w.forecast} units={units} />
            <ForecastList data={w.forecast} units={units} />
          </>
        )}
      </div>
    </div>
  );
}
