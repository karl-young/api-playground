import request from 'superagent'

export async function searchStarWars(
  query: string,
  selection: string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  try {
    const response = await request.get(
      `https://swapi.dev/api/${selection}/?search=${query}`
    )
    return response.body.results
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Something went wrong Api call')
    }
  }
}

