export type WxInfo = {
  label: string;
  icon: string;
  group: "clear" | "cloud" | "fog" | "drizzle" | "rain" | "snow" | "storm";
};

const MAP: Record<number, WxInfo> = {
  0: { label: "Clear", icon: "☀️", group: "clear" },
  1: { label: "Mainly clear", icon: "🌤️", group: "clear" },
  2: { label: "Partly cloudy", icon: "⛅", group: "cloud" },
  3: { label: "Overcast", icon: "☁️", group: "cloud" },
  45: { label: "Fog", icon: "🌫️", group: "fog" },
  48: { label: "Depositing rime", icon: "🌫️", group: "fog" },

  51: { label: "Light drizzle", icon: "🌦️", group: "drizzle" },
  53: { label: "Drizzle", icon: "🌦️", group: "drizzle" },
  55: { label: "Heavy drizzle", icon: "🌧️", group: "drizzle" },

  61: { label: "Light rain", icon: "🌧️", group: "rain" },
  63: { label: "Rain", icon: "🌧️", group: "rain" },
  65: { label: "Heavy rain", icon: "🌧️", group: "rain" },
  66: { label: "Freezing rain", icon: "🧊🌧️", group: "rain" },
  67: { label: "Heavy freezing rain", icon: "🧊🌧️", group: "rain" },

  71: { label: "Light snow", icon: "🌨️", group: "snow" },
  73: { label: "Snow", icon: "🌨️", group: "snow" },
  75: { label: "Heavy snow", icon: "❄️", group: "snow" },
  77: { label: "Snow grains", icon: "❄️", group: "snow" },

  80: { label: "Rain showers", icon: "🌧️", group: "rain" },
  81: { label: "Heavy rain showers", icon: "🌧️", group: "rain" },
  82: { label: "Violent rain showers", icon: "🌧️", group: "rain" },
  85: { label: "Snow showers", icon: "🌨️", group: "snow" },
  86: { label: "Heavy snow showers", icon: "❄️", group: "snow" },

  95: { label: "Thunderstorm", icon: "⛈️", group: "storm" },
  96: { label: "Thunder + hail", icon: "⛈️", group: "storm" },
  99: { label: "Thunder + heavy hail", icon: "⛈️", group: "storm" },
};

export function wxInfo(code: number): WxInfo {
  return MAP[code] ?? { label: "Unknown", icon: "❔", group: "cloud" };
}

// Theme class helper. Night: 19→5
export function themeFor(code: number, hour?: number): string {
  const { group } = wxInfo(code);
  const h = typeof hour === "number" ? hour : new Date().getHours();
  const isNight = h >= 19 || h < 6;
  if (isNight) return "theme-night";
  switch (group) {
    case "clear":
      return "theme-clear";
    case "rain":
      return "theme-rain";
    case "snow":
      return "theme-snow";
    case "fog":
      return "theme-fog";
    case "cloud":
    case "drizzle":
      return "theme-cloud";
    case "storm":
      return "theme-rain"; // reuse cool tones
    default:
      return "theme-clear";
  }
}
