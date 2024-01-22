import request from 'superagent'
import { WeatherData } from '../../models/Weather.ts'

export async function getWeatherData(): Promise<WeatherData> {
  const response = await request.get(
    'https://api.open-meteo.com/v1/forecast?latitude=-45.87416&longitude=170.50361&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl&daily=sunrise,sunset&timezone=Pacific%2FAuckland'
  )

  return response.body
}

export default getWeatherData
