import React, { useContext, useEffect } from 'react'
import Users from '../users'
import Search from './Search'
import { UsersContext } from '../../context/UsersContext'
import toast from 'react-hot-toast'
import axios, { all } from 'axios'

function Left() {
  const {allUsers,setAllUsers,loading,setLoading} = useContext(UsersContext)

  useEffect(()=>{
    async function getAllUsers(){
      setLoading(true)
      try {
        const {data} = await axios.get(`/auth/get-all-users`);
        if(data.success){
          setAllUsers(data.users)
        }else{
          setAllUsers(null)
        }
      } catch (error) {
        toast.error("Something went wrong")
        setAllUsers(null)
      }
      setLoading(false)
    }
    getAllUsers()
  },[])
  return (
    <section className='w-[30%] h-[92vh] bg-slate-900 text-gray-100'>
      <Search/>
      <section className='h-[85vh] overflow-y-scroll'>
        {
          allUsers.length>0 || loading ? allUsers.map((user)=>{
            return <Users key={user._id} user={user} />
          }) : <div className='w-full h-full flex items-center justify-center'>
            <img className='w-20 h-20' src='/loader.svg' alt='loading...'/>
          // </div>
        }
      </section>
    </section>
  )
}

export default Left