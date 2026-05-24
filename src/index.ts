import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3001


app.use(cors())
app.use(express.json())


app.get('/health', (req, res) => {
    res.json({status: 'ok', project: 'Ledgr API'})
})


const startServer = async (): Promise<void> => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Ledgr server running on ${PORT}`)
    })
}

startServer()

