import { useContext, useEffect } from "react"
import { SocketContext } from "./SocketContext"
import { MessageContext } from "./MessageContext"
import { createContext } from "react";

const GetMessageContext = createContext()

const GetMessageProvider = ({children}) => {
    const {socket,setSocket} = useContext(SocketContext)
    const {message,setMessage} = useContext(MessageContext)

    useEffect(()=>{
        socket.on('newMessage',(newMessage)=>{
            setMessage([...message,newMessage])
        })
        return ()=>socket.off("newMessage")
    },[socket,message,setMessage])
    return(
        <GetMessageContext.Provider>
            {children}
        </GetMessageContext.Provider>
    )
}

export {GetMessageContext,GetMessageProvider};