import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { TGeo } from "../api/schemas";

type Status = "idle" | "searching" | "ready" | "loading" | "error";

type Props = {
  query: string;
  setQuery: (q: string) => void;
  results: TGeo[];
  status: Status;
  canSearch: boolean;
  onSelect: (c: TGeo) => void | Promise<unknown>;
};

export default function SearchBox({
  query,
  setQuery,
  results,
  status,
  canSearch,
  onSelect,
}: Props) {
  const [active, setActive] = useState<number>(-1);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setActive(-1);
  }, [results]);

  const showList = useMemo(() => {
    return (
      canSearch &&
      (status === "ready" || status === "searching") &&
      results.length > 0
    );
  }, [canSearch, status, results]);

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!showList) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => {
        if (results.length === 0) return -1;
        if (i < 0) return 0; // first press selects first
        return Math.min(i + 1, results.length - 1);
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? -1 : i - 1)); // can move back to "none"
    } else if (e.key === "Enter") {
      if (results.length === 0) return;
      e.preventDefault();
      const idx = active >= 0 ? active : 0; // default to first
      onSelect(results[idx]);
    } else if (e.key === "Escape") {
      setActive(-1);
    }
  }

  return (
    <div className="relative">
      <label htmlFor="city" className="sr-only">
        Search City
      </label>
      <input
        id="city"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search for a city..."
        className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
      />
      {status === "searching" && (
        <div className="absolute right-3 top-2.5 text-xs text-zinc-500">
          Searching...
        </div>
      )}

      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label="City search results"
          className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-xl border bg-white shadow-card"
        >
          {results.map((r, i) => {
            const id = `${listId}-${i}`;
            const isActive = i === active;
            return (
              <li
                id={id}
                key={id}
                role="option"
                aria-selected={isActive}
                className={`cursor-pointer px-3 py-2 ${
                  isActive ? "bg-sky-500" : ""
                }`}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(r); // preventing input blur?
                }}
              >
                <span className="font-medium">{r.name}</span>
                {r.country ? (
                  <span className="text-zinc-500">{r.country}</span>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
