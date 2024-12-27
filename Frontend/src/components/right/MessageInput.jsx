import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectedChatContext } from '../../context/SelectedChat'
import { SocketContext } from '../../context/SocketContext'
import { MessageContext } from '../../context/MessageContext'

function MessageInput() {
  const [inputMessage,setInputMessage] = useState('')
  // const {message,setMessage} = useContext(MessageContext)
  const {selectedId} = useContext(SelectedChatContext)
  // const {socket,setSocket} = useContext(SocketContext)
  const handleSendMessage = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(`/message/send/${selectedId}`,{message:inputMessage})
      if(data.success){
        setInputMessage((prev)=>prev='')
        // await socket.on('newMessage',(data)=>{
        //   console.log(data)
        //   setMessage([...message,data])
        //   console.log(message,'total message')
        // })
        // socket.on('newMessageSender',(data)=>{
        //   console.log(data)
        //   setMessage(prev=>prev=[...message,data])
        //   console.log(message,'total message')
        // })
        // return ()=>socket.close()
      }else{
        toast.error("Please try again")
      }
    } catch (error) {
      toast.error("Netword error")
    }
  }
  return (
    <section>
      <form onSubmit={handleSendMessage} className='flex items-center p-2 bg-slate-700 h-[7vh]'>
        <input value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)} type='text' placeholder='Type a message' className='flex-1 p-2 bg-slate-700 outline-none text-gray-100'/>
        <button className='p-2 bg-slate-700 text-gray-100'>Send</button >
      </form>
    </section>
  )
}

export default MessageInput