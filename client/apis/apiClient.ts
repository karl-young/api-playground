import request from 'superagent'
import { Welcome } from '../../models/welcome.ts'
import { Affirmation } from '../../models/Affirmations.ts'

const serverURL = `${window.location.origin}/api/v1`

export async function getWelcome(): Promise<Welcome> {
  const response = await request.get(`${serverURL}/welcome`)
  return response.body
}

export async function getAffirmations(): Promise<Affirmation> {
  const response = await request.get(`${serverURL}/affirmations`)

  return response.body
}
