import {Server} from 'socket.io'
import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:process.env.CLIENT_URL,
        credentials:true,
        methods:['GET','POST','PUT','DELETE']
    }
})
const users = {}

export const getReceiverSocketId = (receiverId) => {
    return users[receiverId]
}

io.on('connection',(socket)=>{
    console.log("New client connected",socket.id)

    const userId = socket.handshake.query.userId;
    if(userId){
        users[userId] = socket.id;
    }

    io.emit('getOnline',Object.keys(users))

    socket.on('disconnect',()=>{
        console.log(`Client disconnected: ${socket.id}`)
        delete users[userId];
        io.emit('getOnline',Object.keys(users))
    })
})

export {app,io,server}