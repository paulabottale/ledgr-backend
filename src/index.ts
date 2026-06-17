import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database'
import { errorHandler } from './middleware/errorHandler'
import authRoutes from './routes/authRoutes'
import transactionRoutes from './routes/transactionRoutes'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3001


const allowedOrigins = [
  'http://localhost:5173',
  'https://ledgr-frontend-nine.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json())


app.get('/health', (req, res) => {
    res.json({status: 'ok', project: 'Ledgr API'})
})


app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)


app.use(errorHandler)

const startServer = async (): Promise<void> => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Ledgr server running on ${PORT}`)
    })
}

startServer()

