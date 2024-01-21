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
      console.log(weatherResponse, 'here')
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
      <div>
        <h1>Weather</h1>
        <div>
          <p>Temp: {weather?.current.temperature_2m}°C</p>
          <p>Apparent Temp: {weather?.current.apparent_temperature}°C</p>
          <p>Humidity: {weather?.current.relative_humidity_2m}%</p>
          <p>Pressure: {weather?.current.pressure_msl} hPa</p>
        </div>
      </div>
    </>
  )
}

export default Weather
