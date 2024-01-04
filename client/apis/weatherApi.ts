import request from 'superagent'

export interface HourlyData {
  time: string
  temperature_2m: number
  relative_humidity_2m: number
  rain: number
  visibility: number
}

export interface Weather {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  elevation: number
  current_units: CurrentUnits
  current: Current
  hourly: HourlyData[] // Update this line
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
}
export async function getWeatherData(): Promise<Weather> {
  const response = await request.get(
    'https://api.open-meteo.com/v1/forecast?latitude=-45.9281&longitude=170.1983&hourly=temperature_2m,relative_humidity_2m,rain,visibility&timezone=Pacific%2FAuckland'
  )
  console.log(response.body)
  return response.body
}

export default getWeatherData
