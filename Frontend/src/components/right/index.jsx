import React from 'react'
import ChatBoxHead from './ChatBoxHead'
import ChatBox from './ChatBox'
import MessageInput from './MessageInput'

function Right() {
  return (
    <section className='w-[70%] min-h-[92vh] bg-slate-600 text-gray-100'>
      <ChatBoxHead/>
      <ChatBox/>
      <MessageInput/>
    </section>
  )
}

export default Right