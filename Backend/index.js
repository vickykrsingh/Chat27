import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import db from './utils/db.js'
import cookieParser from 'cookie-parser'
const app = express()
dotenv.config()
app.use(express.json()) // middleware to parse body 
app.use(cookieParser())
db()

// routes middleware
app.use('/api/auth',userRoutes)


app.listen(8080,()=>{
    console.log(`server is running on ${process.env.BASE_URL}`)
})