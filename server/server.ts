import { join } from 'node:path'
import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'
import request from 'superagent'

import welcome from './routes/welcome.ts'
import comics from './routes/marvel.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/welcome', welcome)
server.get('/api/v1/affirmations', async (req, res) => {
  const response = await request.get(`https://www.affirmations.dev`)
  res.json(response.body)
})
server.use("/api/v1/comics", comics)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
