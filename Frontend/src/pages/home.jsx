import React, { useContext } from 'react'
import Left from '../components/left'
import Right from '../components/right'
import { AuthContext } from '../context/AuthContext'
function home() {
  const {user,setUser} = useContext(AuthContext)
  return (
    <main className='flex'>
      <Left/>
      <Right/>
    </main>
  )
}

export default home