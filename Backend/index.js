import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.route.js'
import db from './utils/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()
app.use(express.json()) // middleware to parse body 
app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
db()

// routes middleware
app.use('/api/auth',userRoutes)
app.use('/api/message',messageRoutes)


app.listen(8080,()=>{
    console.log(`server is running on ${process.env.BASE_URL}`)
})