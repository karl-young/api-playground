export interface WeatherData {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  elevation: number
  current: Current
  daily: Daily
}
export interface Daily {
  sunrise: string
  sunset: string
}
export interface Current {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  pressure_msl: number
}