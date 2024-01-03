export interface WeatherType {
    // latitude: number
  // longitude: number
  // generationtime_ms: number
  // utc_offset_seconds: number
  // timezone: string
  // timezone_abbreviation: string
  // elevation: number
  // current_units: CurrentUnits
  current: Current
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
}