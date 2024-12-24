import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <section className='h-[8vh] bg-gray-800'>
        <nav className='flex justify-between p-4 text-white'>
            <h1>Navbar</h1>
            <ul className='flex'>
            <Link to={'/'} className='mx-2'>Home</Link>
            <Link to={'/register'} className='mx-2'>Register</Link>
            <Link to={'/login'} className='mx-2'>Login</Link>
            </ul>
        </nav>
    </section>
  )
}

export default Navbar