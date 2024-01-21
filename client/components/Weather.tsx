import { useEffect, useState } from 'react'
import getWeatherData, { WeatherData, HourlyData } from '../apis/weatherApi.ts'


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
      console.log(weatherResponse, "here")
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

  const currentDate = new Date()
  const currentISODate = currentDate.toISOString()

  //const currentIndex = weather?.hourly.time.indexOf(currentISODate)
  return (
    <>
      <div>
        <h1>Weather</h1>
        <div>
          <p>Temp: {weather?.current.temperature_2m}</p>
          <p>Apparent Temp: {weather?.current.apparent_temperature}</p>
          <p>Humidity: {weather?.current.relative_humidity_2m}</p>
        </div>
      </div>
    </>
  )
}

export default Weather
