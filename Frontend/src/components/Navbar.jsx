import axios from 'axios'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const {user,setUser} = useContext(AuthContext)
  const handleLogout = async () => {
    try {
      const {data} = await axios.get(`/auth/logout`);
      if(data.success){
        localStorage.removeItem('user')
        setUser(null)
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <section className='h-[8vh] bg-gray-800'>
        <nav className='flex justify-between p-4 text-white'>
            {user&&<h1>{user.name}</h1>}
            <ul className='flex'>
            <Link to={'/'} className='mx-2'>Home</Link>
            {
              user ? (
                <button onClick={()=>handleLogout()}>Logout</button>
              ) : <>
                <Link to={'/register'} className='mx-2'>Register</Link>
                <Link to={'/login'} className='mx-2'>Login</Link>
              </>
            }
            </ul>
        </nav>
    </section>
  )
}

export default Navbar