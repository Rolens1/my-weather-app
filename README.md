# Weather App — React + TypeScript

A production-style weather app built with **React + TypeScript** and **Vite**.
Search any city, view **current conditions** and a **5-day forecast**, toggle **°C/°F**, save **favorites**, and enjoy **dynamic backgrounds** that react to the weather and time of day. Powered by **Open-Meteo** (no API key).

[![CI (Vitest)](https://github.com/Rolens1/my-weather-app/actions/workflows/ci.yml/badge.svg)](https://github.com/Rolens1/my-weather-app/actions/workflows/ci.yml)

**Live:** [https://my-weather-app-p020.onrender.com/](https://my-weather-app-p020.onrender.com/)

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [API](#api)
- [Local setup](#local-setup)
- [Scripts](#scripts)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Performance & UX](#performance--ux)
- [Deployment (Render + GitHub Actions)](#deployment-render--github-actions)
- [License](#license)

---

## Features

- 🔎 **Type-ahead search** with **debounce** and **canceled** stale requests
- 📍 **Geolocation** fallback (“Use my location”)
- 🌡️ **Current weather** + **5-day forecast**
- 🔁 **Unit toggle** (°C/°F), persisted
- ⭐ **Favorites** (add/remove, quick select, persisted; max configurable)
- 🎨 **Dynamic background** themes by **weather code** + **day/night**
- 🧱 **Skeleton loaders** + friendly **retryable error** state
- ⚡ **Local cache with TTL** (geocode: 1 day; forecast: 30 min)
- ✅ **Type-safe APIs** with **Zod** parsing
- 🧪 **Vitest + Testing Library** coverage for helpers, components & hooks
- 🧭 **SWR-style refresh**: render cached instantly, then refresh

---

## Tech stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Data & Types:** Fetch + AbortController, Zod
- **State/UX:** Custom hooks (`useWeather`, `useUnits`, `useFavorites`)
- **Testing:** Vitest, Testing Library
- **API:** Open-Meteo Geocoding + Forecast (no key)

---

## Architecture

```
src/
  api/
    geocode.ts          # geocoding client
    forecast.ts         # forecast client
    schemas.ts          # Zod schemas + normalize
  components/
    SearchBox.tsx       # combobox (keyboard + a11y)
    WeatherCard.tsx     # current conditions
    ForecastList.tsx    # 5-day tiles
    FavoriteButton.tsx  # star toggle
    FavoritesStrip.tsx  # quick-access favorites row
    Skeleton.tsx        # loading states
    ErrorState.tsx      # retryable error UI
  hooks/
    useWeather.ts       # search → select → fetch (cache + abort + swr)
    useUnits.ts         # °C/°F persisted
    useFavorites.ts     # favorites persisted & capped
  lib/
    format.ts           # formatters (temps, date, slug)
    weatherCode.ts      # WMO code → {label, icon, theme}
    storage.ts          # setJSON/getJSON with TTL
  styles/
    tailwind.css        # Tailwind + theme utilities
  App.tsx
  main.tsx
```

**Design choices**

- **Parse at the edges** (Zod) → components receive clean models.
- **Hooks own behavior** (debounce/abort/cache) → components stay presentational.
- **Theme derives from data** (weather code + time).

---

## API

- **Geocoding**
  `https://geocoding-api.open-meteo.com/v1/search?name={q}&count=5&language=en`
- **Forecast**
  `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5&timezone=auto`

No API keys required.

---

## Local setup

```bash
# 1) Install
npm ci

# 2) Dev server
npm run dev

# 3) Open
http://localhost:5173
```

_No env vars needed._

---

## Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest"
}
```

---

## Testing

- **Where:** `src/**/*.test.ts(x)`
- **Run:** `npm test` (watch) or `npm test -- --run` (CI)

Included tests:

- `format.test.ts` — temperature/weekday formatting
- `weatherCode.test.ts` — WMO code mapping + themes
- `SearchBox.test.tsx` — combobox keyboard selection
- `WeatherCard.test.tsx` / `ForecastList.test.tsx` — rendering
- `useFavorites.test.tsx` — add/toggle/limit/persist
- `ErrorState.test.tsx` — retryable error UX

Vitest config (in `vite.config.ts`) uses `jsdom`, global matchers, and `src/test/setup.ts`.

---

## Accessibility

- Proper ARIA roles for combobox/listbox/option
- Keyboard navigation (↑/↓/Enter/Escape) with no preselected item
- Visible focus; color contrast ≥ 4.5
- Polite status messaging during async work

---

## Performance & UX

- Debounced geocoding + **AbortController** to cancel stale requests
- Client cache with TTL for snappy reloads
- SWR refresh: show cached immediately, revalidate in background
- Dynamic backgrounds with smooth transitions

---

## Deployment (Render + GitHub Actions)

This repo supports two clean workflows—pick one:

### Option A — Render auto-deploys, Actions run tests (simple)

- Render **Static Site**:

  - **Build Command:** `npm ci && npm run build`
    _(Optional: add `npm test -- --run` before build to block bad deploys.)_
  - **Publish Directory:** `dist`
  - **Rewrite rule:** `/* → /index.html` (SPA)

- Vite `base: "/"` (already set).
- GitHub **`ci.yml`** runs `npm test -- --run` on PRs and pushes.
- Badge (top of this README) points at the CI workflow.

### Option B — Gate deploys on green CI

- In Render: **Auto-Deploy = Off**.
- Create a **Deploy Hook**; add it as repo secret `RENDER_DEPLOY_HOOK_URL`.
- Workflows:

  - `ci.yml` → runs tests
  - `render.yml` → triggers the Deploy Hook when CI succeeds on `master`

> See `.github/workflows/` for exact YAML.

---

## License

MIT

---

### Credits

- Weather data by **Open-Meteo**
- UI with **Tailwind CSS**
- Tests with **Vitest** + **Testing Library**

---
