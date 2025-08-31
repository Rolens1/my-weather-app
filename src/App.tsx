import { useWeather } from "./hooks/useWeather";

export default function App() {
  const w = useWeather();

  // DEV ONLY: quickly test the data flow
  // type into the console: window._w.setQuery("Montreal")
  // then select: window._w.selectCity(window._w.results[0])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)._w = w;

  return (
    <div style={{ padding: 16, fontFamily: "system-ui" }}>
      <h1>Phase 1 – Data Check</h1>
      <pre>
        {JSON.stringify(
          {
            status: w.status,
            error: w.error,
            results: w.results?.map((r) => r.name),
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
