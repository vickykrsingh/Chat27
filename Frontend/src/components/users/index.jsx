import React from 'react'
import {Link} from 'react-router-dom'

function Users({user,currentActiveUser}) {
  return (
    <Link to={`/${user._id}`} className=''>
        <div className={`flex items-center justify-between p-4 border-b border-gray-300 ${currentActiveUser==user._id ? 'bg-slate-600':''}`}>
            <div className='flex items-center space-x-4'>
            <img src='/dummyAvatar.avif' alt='user' className='w-12 h-12 rounded-full'/>
            <div>
                <h2 className='text-lg font-semibold'>{user.name}</h2>
                <p className='text-gray-500'>
                <span className='font-semibold'>{user.email}</span>
                </p>
            </div>
            </div>
        </div>
    </Link>
  )
}

export default Users