import React, { useContext, useEffect } from 'react'
import Left from '../components/left'
import Right from '../components/right'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import StartNewChat from '../components/StartNewChat'
function home() {
  const {id} = useParams()
  const {user,setUser} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  })
  return (
    <main className='flex'>
      <Left currentActiveUser={id} />
      {
        id ? <Right id={id} /> : <StartNewChat/>
      }
    </main>
  )
}

export default home