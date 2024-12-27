import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import io from 'socket.io-client'

const SocketContext = createContext();

const SocketProvider  = ({children}) => {
    const [socket,setSocket] = useState(null)
    const {user,setUser} = useContext(AuthContext);
    const [onlineUsers,setOnlineUsers] = useState([])
    useEffect(()=>{
        if(user){
            const socket = io(import.meta.env.VITE_SOCKETIO_SERVER_URL,{
                query:{
                    userId : user._id
                }
            })
            setSocket(socket)
            socket.on('getOnline',(users) => {
                setOnlineUsers(users)
            })
            return () => socket.close()
        }else{
            if(socket){
                socket.close();
                setSocket(null)
            }
        }
    },[user])

    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketProvider,SocketContext}