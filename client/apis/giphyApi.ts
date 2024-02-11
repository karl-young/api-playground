import request from 'superagent'
import { Datum } from '../../models/Giphy.ts'
export async function searchGifs(
  apiKey: string,
  query: string
): Promise<Datum[]> {
  try {
    const response = await request.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    )
    return response.body.data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Something went wrong Api call')
    }
  }
}
