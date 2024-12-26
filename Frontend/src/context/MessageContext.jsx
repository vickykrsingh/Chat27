import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { SelectedChatContext } from "./SelectedChat";

const MessageContext = createContext();

const MessageProvider = ({children}) => {
    const [message,setMessage] = useState([])
    const {selectedId} = useContext(SelectedChatContext)
    const getMessage = async () => {
        try {
          const { data } = await axios.get(`/message/get-message/${selectedId}`);
          if (data.success) {
            setMessage((prev)=>prev=data.allMessages);
          }else{
            throw new Error("no conversation found")
          }
        } catch (error) {
          setMessage((prev)=>prev=[]);
        }
      };
      useEffect(() => {
        if(selectedId){
          getMessage();
        }
      }, [selectedId]);
    return (
        <MessageContext.Provider value={{message,setMessage}}>
            {children}
        </MessageContext.Provider>
    )
}

export {MessageContext,MessageProvider}