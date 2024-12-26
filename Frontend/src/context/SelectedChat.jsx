import axios from "axios";
import { createContext, useEffect, useState } from "react";

const SelectedChatContext = createContext();

const SelectedChatProvider = ({children}) => {
    const [selectedChat,setSelectedChat] = useState(null);
    const [selectedId,setSelectedId] = useState('');
    const fetchChatUser = async () => {
        try {
          const {data} = await axios.get(`/auth/get-user/${selectedId}`)
          if(data.success){
            setSelectedChat((prev)=>prev=data.user)
          }
        } catch (error) {
          setSelectedChat((prev)=>prev=null)
        }
      }
      useEffect(()=>{
        if(selectedId){
            fetchChatUser()
        }
      },[selectedId])
    return (
        <SelectedChatContext.Provider value={{selectedChat,setSelectedChat,selectedId,setSelectedId}}>
            {children}
        </SelectedChatContext.Provider>
    )
}

export {SelectedChatContext,SelectedChatProvider}