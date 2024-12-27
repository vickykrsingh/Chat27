import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import {AuthContext} from '../../context/AuthContext.jsx'
import moment from 'moment'
import { SelectedChatContext } from "../../context/SelectedChat.jsx";
import { MessageContext } from "../../context/MessageContext.jsx";
import { SocketContext } from "../../context/SocketContext.jsx";
function ChatBox() {
  const {message,setMessage} = useContext(MessageContext)
  const [showDate,setShowDate] = useState(false)
  const {user} = useContext(AuthContext)
  const {selectedChat} = useContext(SelectedChatContext)
  const {socket,setSocket} = useContext(SocketContext)
  const audio = new Audio('/noti.mp3')
  useEffect(()=>{
    if(socket){
      socket.on('newMessage',(data)=>{
        console.log(data)
        setMessage([...message,data])
      })
      audio.play()
    }
  },[socket,setSocket,message])

  const chatContainerRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to the bottom of the chat container
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [message]);
  
  return (
    <section className="h-[75vh] bg-slate-800 py-2 px-1 overflow-y-scroll" ref={chatContainerRef}>
      {user&&Array.isArray(message) && message.length>0 ? message.map((msg) => {
        return (
          <div key={msg._id} className={`chat flex flex-col ps-3 pe-3 ${msg.sender===user._id ? 'chat-end':'chat-start'}`}>
            <div onClick={()=>setShowDate((prev)=>prev=!prev)} className={`chat-bubble cursor-pointer ${msg.sender===user._id ? 'chat-bubble-accent':'chat-bubble-success'}`}>
              {msg.message}
            </div>
            {showDate && <p className="opacity-50 text-sm">
              {moment(msg.createdAt).format("Mo D YY, h:mm a")}
              </p>}
          </div>
        );
      }) : <section className="w-full h-full flex items-center justify-center">
        <div className="text-2xl font-semibold opacity-50">
          <p>Say hi👋 to {selectedChat?.name}</p>
        </div>
      </section>
    }
    </section>
  );
}

export default ChatBox;
