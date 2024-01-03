import { useEffect, useState } from 'react'
import getWeatherData from '../apis/weatherApi.ts'
import { WeatherType } from '../../models/Weather.ts'

const Weather = () => {
  const [weather, setWeather] = useState<WeatherType | null>(null)

  useEffect(() => {
    fetchWeather()
  }, [])

  async function fetchWeather() {
    try {
      const weatherData = await getWeatherData()
      setWeather(weatherData)
    } catch (error) {
      console.error(error, "Didn't get Weather")
    }
  }
  return (
    <>
      <div>
        <h1>Weather</h1>
        <p>{weather?.current?.temperature_2m}</p>
        <p>{weather?.current?.time}</p>
        <p>{weather?.current?.interval}</p>
      </div>
    </>
  )
}

export default Weather
