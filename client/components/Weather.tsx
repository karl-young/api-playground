import { useEffect, useState } from 'react'
import getWeatherData, { Weather, HourlyData } from '../apis/weatherApi.ts'

// interface Weather {
//   hourly: {
//     time: string[]
//     temperature_2m: number[]
//     relative_humidity_2m: number[]
//     rain: number[]
//     visibility: number[]
//   }
// }
const Weather = () => {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(true)
  const [Error, setError] = useState(false)
  useEffect(() => {
    fetchWeather()
  }, [])

  async function fetchWeather() {
    try {
      const weatherData = await getWeatherData()
      console.log(weatherData)
      setWeather(weatherData)
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

  const currentIndex = weather?.hourly.time.indexOf(currentISODate)
  return (
    <>
      <div>
        <h1>Weather</h1>
        {weather?.hourly.map((hourData: HourlyData, index: number) => (
          <div key={index}>
            <p>Time: {hourData.time}</p>
            <p>Temperature: {hourData.temperature_2m}</p>
            <p>Humidity: {hourData.relative_humidity_2m}</p>
            <p>Rain: {hourData.rain}</p>
            <p>Visibility: {hourData.visibility}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Weather
