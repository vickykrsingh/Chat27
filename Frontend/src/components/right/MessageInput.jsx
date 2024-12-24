import React from 'react'

function MessageInput() {
  return (
    <section>
      <div className='flex items-center p-2 bg-slate-700 h-[7vh]'>
        <input type='text' placeholder='Type a message' className='flex-1 p-2 bg-slate-700 outline-none text-gray-100'/>
        <button className='p-2 bg-slate-700 text-gray-100'>Send</button >
      </div>
    </section>
  )
}

export default MessageInput