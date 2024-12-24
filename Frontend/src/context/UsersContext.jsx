import { createContext, useState } from "react";

const UsersContext = createContext();


const UsersProvider = ({children}) => {
    const [allUsers,setAllUsers] = useState([]);
    const [loading,setLoading] = useState(false)

    return (
        <UsersContext.Provider value={{allUsers,setAllUsers,loading,setLoading}}>
            {children}
        </UsersContext.Provider>
    )
}

export {UsersContext,UsersProvider}