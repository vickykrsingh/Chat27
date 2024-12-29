import React, { useContext, useEffect } from 'react'
import Left from '../components/left'
import Right from '../components/right'
import { useParams } from 'react-router-dom'
import StartNewChat from '../components/StartNewChat'
import { SelectedChatContext } from '../context/SelectedChat'
function home() {
  const {id} = useParams()
  const {setSelectedId} = useContext(SelectedChatContext)
  useEffect(()=>{
    if(id){
      setSelectedId(id)
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