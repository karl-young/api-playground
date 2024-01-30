import express from 'express'
import request from 'superagent'
import crypto from 'crypto'
import { getRandomInt } from '../lib.ts'
import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router()
const privateKey = process.env.API_ACCESS_KEY
const publicKey = `61512a89c9dd5233c2e86896d99e2f94`
const apiUrl = 'https://gateway.marvel.com/v1/public/comics'
console.log('before route')

// Get /api/v1/comics
router.get('/', async (req, res) => {
  console.log('Requesting data before try')
  try {
    console.log("Requesting data from Marvel's API")
    if (privateKey) {
      const ts = req.query.ts
      const hash = req.query.hash
      const apikey = req.query.apikey
      console.log('Received ts:', ts)
      console.log('Received hash:', hash)
      console.log('Received apikey:', apikey)
      // Constructing the query string modifier
      const modifier = `?orderBy=modified&limit=99&offset=${getRandomInt(
        0,
        1460
      )}`
      // Generating timestamp and hash for authentication
      const timestamp = new Date().getTime()
      console.log(timestamp, 'timestamp')
      const generatedHash = crypto
        .createHash('md5')
        .update(timestamp + privateKey + publicKey)
        .digest('hex')

      // Making a GET request to Marvel's API
      const response = await request.get(
        `${apiUrl}${modifier}&ts=${timestamp}&apikey=${publicKey}&hash=${generatedHash}`
      )
      console.log(response, 'Api routes')
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
