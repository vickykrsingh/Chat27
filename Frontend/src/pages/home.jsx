import React, { useContext, useEffect } from 'react'
import Left from '../components/left'
import Right from '../components/right'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
function home() {
  const {user,setUser} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  })
  return (
    <main className='flex'>
      <Left/>
      <Right/>
    </main>
  )
}

export default home