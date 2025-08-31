import { z } from "zod";

// this is what I expect to receive from the apis
// Geocoding schemas
export const GeoItem = z.object({
  id: z.number().optional(),
  name: z.string(),
  country: z.string().optional(),
  country_code: z.string().optional(),
  admin1: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  population: z.number().optional(),
});

export const GeoResponse = z.object({
  results: z.array(GeoItem).optional(),
});

export type TGeo = z.infer<typeof GeoItem>;

// Forecast Schemas
export const ForecastResponse = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  current: z.object({
    time: z.string().optional(),
    temperature_2m: z.number(),
    apparent_temperature: z.number().optional(),
    weather_code: z.number(),
    wind_speed_10m: z.number().optional(),
  }),
  daily: z.object({
    time: z.array(z.string()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    weather_code: z.array(z.number()),
  }),
});

export type TForeCast = z.infer<typeof ForecastResponse>;

// Normalized Shape for UI
export type NormalizedForcast = {
  current: {
    tempC: number;
    feelsLikeC?: number;
    code: number;
    wind?: number;
  };
  daily: Array<{
    date: string; // the format is ISO (yyyy-mm-dd)
    minC: number;
    maxC: number;
    code: number;
  }>;
};

export function normalizedForcast(f: TForeCast): NormalizedForcast {
  const days = f.daily.time.map((date, i) => ({
    date,
    minC: f.daily.temperature_2m_min[i],
    maxC: f.daily.temperature_2m_max[i],
    code: f.daily.weather_code[i],
  }));

  return {
    current: {
      tempC: f.current.temperature_2m,
      feelsLikeC: f.current.apparent_temperature,
      code: f.current.weather_code,
      wind: f.current.wind_speed_10m,
    },
    daily: days,
  };
}
