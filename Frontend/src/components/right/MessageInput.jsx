import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectedChatContext } from '../../context/SelectedChat'

function MessageInput() {
  const [inputMessage,setInputMessage] = useState('')
  const {selectedId} = useContext(SelectedChatContext)
  const noti = new Audio('/noti.mp3')
  const handleSendMessage = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(`/message/send/${selectedId}`,{message:inputMessage})
      if(data.success){
        await noti.play()
        setInputMessage((prev)=>prev='')
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