import request from 'superagent'
import { Datum } from '../../models/Giphy.ts'
export async function getTrendingGifs(apiKey: string): Promise<Datum[]> {
  try {
  const response = await request
    .get(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
  return response.body.data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Something went wrong Api call')
    }
  }
}