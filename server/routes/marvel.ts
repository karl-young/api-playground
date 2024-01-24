import express from 'express'
import request from 'superagent'
import crypto from 'crypto'
import { getRandomInt } from '../lib.ts'

const router = express.Router()
const privateKey = process.env.API_ACCESS_KEY
const publicKey = '61512a89c9dd5233c2e86896d99e2f94'
const apiUrl = 'https://gateway.marvel.com/v1/public/comics'

// Get /api/v1/comics
router.get('/', async (req, res) => {
  try {
    if (privateKey) {
      // Constructing the query string modifier
      const modifier = `?orderBy=modified&limit=99&offset=${getRandomInt(
        0,
        2000
      )}`

      // Generating timestamp and hash for authentication
      const timestamp = new Date().getTime()
      const hash = crypto
        .createHash('md5')
        .update(timestamp + privateKey + publicKey)
        .digest('hex')

      // Making a GET request to Marvel's API
      const response = await request.get(
        `${apiUrl}${modifier}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
      )
      res.json(response.body)
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('Something went wrong with the routes')
    }
  }
})

export default router