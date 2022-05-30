import express from 'express'
import { route } from './routes.js'
import cors from "cors"
import dotenv from 'dotenv'

dotenv.config()

const server = express()

server.use(express.json())
server.use(cors())

server.use(route)

server.listen(process.env.PORT || 3001, () => {
    console.log("server is running!")
})
