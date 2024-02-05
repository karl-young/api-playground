import request from 'superagent'

const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs'

// export async function getTrendingGifs(apiKey: string, limit: number = 20) {
//   try{
//     const response = await request.get(`${GIPHY_API_URL}/trending?api_key=${apiKey}&limit=${limit}`)
//     return response.body.data
//   }
// }

export async function getTrendingGifs(apiKey: string, limit = 20) {
  try {
    const response = await request.get(GIPHY_API_URL).query({
      api_key: apiKey,
      limit,
    })
    console.log(response.body.data)
    return response.body.data
  } catch (error) {
    console.error('Error fetching trending gifs:')
    throw error
  }
}
