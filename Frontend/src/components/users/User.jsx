import React from 'react'

function User() {
  return (
    <section className=''>
        <div className='flex items-center justify-between p-4 border-b border-gray-300'>
            <div className='flex items-center space-x-4'>
            <img src='/dummyAvatar.avif' alt='user' className='w-12 h-12 rounded-full'/>
            <div>
                <h2 className='text-lg font-semibold'>John Doe</h2>
                <p className='text-gray-500'>
                <span className='font-semibold'>@johndoe</span>
                </p>
            </div>
            </div>
            <button className='bg-blue-500 text-white px-4 py-2 rounded'>Follow</button>
        </div>
    </section>
  )
}

export default User