import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3001

//Middlewares
app.use(cors())
app.use(express.json())

//Health check
app.get('/health', (req, res) => {
    res.json({status: 'ok', project: 'Ledgr API'})
})

//conectar la base de datos e iniciar el servidor, primero conectar la base de datos y luego iniciar el servidor
const startServer = async (): Promise<void> => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Ledgr server running on ${PORT}`)
    })
}

startServer()

