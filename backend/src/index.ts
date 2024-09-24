import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import TodoRoutes from './todos/routes'

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb'

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*') // Permitir solicitudes desde cualquier origen
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Métodos permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Encabezados permitidos
  next()
})
app.use(express.json())

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado')
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err)
  })

// routes
app.use('/api', TodoRoutes)
app.get('/', (req, res) => {
  res.send('API corriendo con TypeScript')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
