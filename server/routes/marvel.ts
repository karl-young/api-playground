import  express  from "express"
import request from "superagent"
import * as dotenv from 'dotenv'

const router = express.Router()
const privateKey = process.env.MARVEL_PRIVATE_KEY
const publicKey = process.env.MARVEL_PUBLIC_KEY
// const ts = new Date().getTime()
// const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString()
const apiUrl = 'https://gateway.marvel.com/v1/public/characters'
