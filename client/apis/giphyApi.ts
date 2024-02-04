import request from 'superagent'
import { Datum } from '../../models/Giphy.ts'

export async function getTrendingGifs(query: string): Promise<Datum[]> {
  const response = await request.get(
    `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&limit=10&offset=0&rating=g&lang=en`
  )
  console.log(response.body.data)
  return response.body.data
}
