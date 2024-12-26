import React, { useContext, useEffect } from 'react'
import Left from '../components/left'
import Right from '../components/right'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import StartNewChat from '../components/StartNewChat'
import { SelectedChatContext } from '../context/SelectedChat'
function home() {
  const {id} = useParams()
  const {user,setUser} = useContext(AuthContext)
  const {selectedChat,setSelectedChat,selectedId,setSelectedId} = useContext(SelectedChatContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }else{
      setSelectedId((prev)=>prev=id)
    }
  },[id])
  return (
    <main className='flex'>
      <Left />
      {
        id ? <Right /> : <StartNewChat/>
      }
    </main>
  )
}

export default home