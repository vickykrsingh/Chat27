import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {AuthContext} from '../../context/AuthContext.jsx'
import moment from 'moment'
import { SelectedChatContext } from "../../context/SelectedChat.jsx";
function ChatBox() {
  const [message, setMessage] = useState([]);
  const [showDate,setShowDate] = useState(false)
  const {user} = useContext(AuthContext)
  const {selectedChat,selectedId} = useContext(SelectedChatContext)
  const getMessage = async () => {
    try {
      const { data } = await axios.get(`/message/get-message/${selectedId}`);
      if (data.success) {
        setMessage((prev)=>prev=data.allMessages);
      }else{
        throw new Error("no conversation found")
      }
    } catch (error) {
      setMessage((prev)=>prev=[]);
    }
  };
  useEffect(() => {
    if(selectedId){
      getMessage();
    }
  }, [selectedId]);
  return (
    <section className="h-[75vh] bg-slate-800 py-2 px-1 overflow-y-scroll">
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
