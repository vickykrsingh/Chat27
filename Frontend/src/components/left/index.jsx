import React from 'react'
import Users from '../users'
import Search from './Search'

function Left() {
  return (
    <section className='w-[30%] h-[92vh] bg-slate-900 text-gray-100'>
      <Search/>
      <section className='h-[85vh] overflow-y-scroll'>
      <Users/>
      </section>
    </section>
  )
}

export default Left