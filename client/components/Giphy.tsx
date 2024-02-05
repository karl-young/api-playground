// src/components/GiphyTrending.tsx
import { useEffect, useState } from 'react'
import { getTrendingGifs } from '../apis/giphyApi.ts'

const GiphyTrending = () => {
  const [trendingGifs, setTrendingGifs] = useState([])

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      const apiKey = process.env.REACT_APP_GIPHY_API_KEY
      if (!apiKey) {
        console.error('Giphy API key is missing.')
        return
      }

      try {
        const gifs = await getTrendingGifs(apiKey)
        setTrendingGifs(gifs)
      } catch (error: any) {
        console.error('Error fetching trending gifs:', error.message)
      }
    }

    fetchTrendingGifs()
  }, [])

  return (
    <div>
      <h2>Trending GIFs</h2>
      <ul>
        {trendingGifs.map((gif) => (
          <li key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GiphyTrending
