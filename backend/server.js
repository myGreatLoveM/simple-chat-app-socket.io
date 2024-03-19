import { app, server } from './socket/socket.js'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './db/connectDb.js'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.route.js'
import userRoutes from './routes/user.route.js'
import path from 'path'

const PORT = process.env.PORT || 3000
const __dirname = path.resolve()
dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

server.listen(PORT, () => {
  connectDB()
  console.log(`Server listening on port ${PORT}`)
})

