import React, { useContext } from 'react'
import { SocketContext } from '../../context/SocketContext.jsx'

function ChatBoxHead({chatUser}) {
  const {socket,onlineUsers} = useContext(SocketContext)
  console.log(chatUser)
  const isOnline = onlineUsers.includes(chatUser._id);
  console.log(isOnline,'-------')
  return (
    <section className='h-[10vh]'>
      <div className='flex items-center justify-between p-4 border-b border-slate-700'>
        <div className='flex items-center gap-3'>
          <img src='/dummyAvatar.avif' alt='user' className='w-12 h-12 rounded-full'/>
          <div>
            <h2 className='text-lg font-semibold'>{chatUser?.name||"dummy"}</h2>
            <p className='text-gray-500'>
              <span className='font-semibold'>{isOnline ? 'online' : 'offline'}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChatBoxHead