import express from 'express'
import dotenv from 'dotenv'
const app = express()
dotenv.config()



app.listen(8080,()=>{
    console.log(`server is running on ${process.env.BASE_URL}`)
})