import request from 'superagent'
import { Result } from '../../models/Comic.ts'

const serverURL = '/api/v1'

export async function getComics(): Promise<Result[]> {
  const response = await request.get(`${serverURL}/comics`)
  const jsonINfo = JSON.parse(response.body.text)
  return jsonINfo.data.results
}
