import { useState, useEffect } from 'react'
import { getWeatherData } from '../apis/weatherApi.ts'

interface WeatherData {
  hourly: {
    time: Date[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    apparent_temperature: number[]
    rain: number[]
    visibility: number[]
  }
  daily: {
    time: Date[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    sunrise: Date[]
    sunset: Date[]
  }
  timezone: string
  past_days: number
}

interface WeatherComponentProps {
  latitude: number
  longitude: number
}

const Weather = ({ latitude, longitude }: WeatherComponentProps) => {
  const [WeatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWeatherData({ latitude, longitude })
        const data = await response.json()
        setWeatherData({
          hourly: data,
          daily: data,
          timezone: data.timezone,
          past_days: data.past_days,
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [latitude, longitude])

  if (!WeatherData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <h1>Weather</h1>
        <h2>Hourly</h2>
        <pre>{JSON.stringify(WeatherData.hourly, null, 2)}</pre>
        <h2>Daily</h2>
        <pre>{JSON.stringify(WeatherData.daily, null, 2)}</pre>
      </div>
    </>
  )
}

export default Weather
