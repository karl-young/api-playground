import request from 'superagent'
import { Welcome } from '../../models/welcome.ts'
import { Affirmation } from '../../models/Affirmations.ts'

const serverURL = 'http://localhost:3000/api/v1'


export async function getWelcome(): Promise<Welcome> {
  const response = await request.get(`${serverURL}/welcome`)
  return response.body
}

export async function getAffirmations(): Promise<Affirmation> {
  const response = await request.get(`/api/v1/affirmations`)
  
  return response.body
}
