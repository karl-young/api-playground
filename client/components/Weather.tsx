import { useEffect, useState } from 'react'
import getWeatherData from '../apis/weatherApi.ts'
import { WeatherData } from '../../models/Weather.ts'

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [Error, setError] = useState(false)
  useEffect(() => {
    fetchWeather()
  }, [])

  async function fetchWeather() {
    try {
      const weatherResponse = await getWeatherData()
      setWeather(weatherResponse)
    } catch (error) {
      console.error(error, "Didn't get Weather")
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  if (Error) {
    return <p>Error fetching weather data</p>
  }
  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="description">
        <h1>Weather</h1>
        <h2>Temp: {weather?.current.temperature_2m}°C</h2>
        <h2>Apparent Temp: {weather?.current.apparent_temperature}°C</h2>
        <h2>Humidity: {weather?.current.relative_humidity_2m}%</h2>
        <h2>Pressure: {weather?.current.pressure_msl} hPa</h2>
      </div>
    </>
  )
}

export default Weather
