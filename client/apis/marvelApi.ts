import request from 'superagent'
import { Comic } from '../../models/Comic.ts'

const serverURL = '/api/v1'

export async function getComics(): Promise<Comic[]> {
  const response = await request.get(`${serverURL}/comics`)
  const jsonINfo = JSON.parse(response.body.text)
  return jsonINfo.data.results
}
