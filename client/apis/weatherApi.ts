import { ApiClentParams } from '../../models/Weather.ts'

const getWeatherData = async ({ latitude, longitude }: ApiClentParams) => {
  const params = {
    latitude: latitude,
    longitude: longitude,
    hourly: ['temperature_2m', 'weathercode', 'windspeed_10m'],
    daily: ['weathercode', 'temperature_2m_max', 'temperature_2m_min'],
    timezone: 'Pacific/Aukland',
    past_days: 1,
  }
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${params.hourly.join(
    ','
  )}&daily=${params.daily.join(',')}&timezone=${params.timezone}&past_days=${
    params.past_days
  }`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error, "Didn't get weather data")
    throw error
  }
}

export default getWeatherData
