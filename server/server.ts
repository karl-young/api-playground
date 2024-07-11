import { join } from 'node:path'
import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'
import request from 'superagent'
import cors from 'cors'

import welcomeRouter from './routes/welcome.ts'
import comicsRouter from './routes/marvel.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/comics', comicsRouter)
server.use('/api/v1/welcome', welcomeRouter)
server.get('/api/v1/affirmations', async (req, res) => {
  try {
    const response = await request.get(`https://www.affirmations.dev`)
    res.json(response.body)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching affirmations:', error.message)
      res.status(500).send('Internal Server Error')
    }
  }
})

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
