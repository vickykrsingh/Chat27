import React from 'react'

function Navbar() {
  return (
    <section className='h-[8vh] bg-gray-800'>
        <nav className='flex justify-between p-4 text-white'>
            <h1>Navbar</h1>
            <ul className='flex'>
            <li className='mx-2'>Home</li>
            <li className='mx-2'>About</li>
            <li className='mx-2'>Contact</li>
            </ul>
        </nav>
    </section>
  )
}

export default Navbar