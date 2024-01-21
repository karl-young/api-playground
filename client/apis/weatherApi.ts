import request from 'superagent'

export interface HourlyData {
  time: string
  temperature_2m: number
  relative_humidity_2m: number
  rain: number
  visibility: number
}

export interface WeatherData {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  elevation: number
  current_units: CurrentUnits
  current: Current
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
}
export async function getWeatherData(): Promise<WeatherData> {
  const response = await request.get(
    'https://api.open-meteo.com/v1/forecast?latitude=-45.9281&longitude=170.1983&current=temperature_2m,relative_humidity_2m,apparent_temperature&timezone=auto'
  )
  console.log(response.body, 'Api response')
  return response.body
}

export default getWeatherData
