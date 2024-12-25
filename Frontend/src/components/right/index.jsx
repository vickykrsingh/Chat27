import React, { useEffect, useState } from 'react'
import ChatBoxHead from './ChatBoxHead'
import ChatBox from './ChatBox'
import MessageInput from './MessageInput'
import axios from 'axios'

function Right({id}) {
  const [chatUser,setChatUser] = useState(null)
  const fetchChatUser = async () => {
    try {
      const {data} = await axios.get(`/auth/get-user/${id}`)
      if(data.success){
        setChatUser((prev)=>prev=data.user)
      }
    } catch (error) {
      setChatUser((prev)=>prev=null)
    }
  }
  useEffect(()=>{
    fetchChatUser()
  },[id])
  return (
    <section className='w-[70%] min-h-[92vh] bg-slate-600 text-gray-100'>
      <ChatBoxHead chatUser={chatUser} />
      <ChatBox id={id} chatUser={chatUser} />
      <MessageInput/>
    </section>
  )
}

export default Right