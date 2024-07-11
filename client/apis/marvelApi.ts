import request from 'superagent'
import { Result } from '../../models/Comic.ts'

const serverURL = 'http://localhost:3000/api/v1'

export async function getComics(): Promise<Result[]> {
  const response = await request.get(`${serverURL}/comics`)
  return response.body.data.results
}
