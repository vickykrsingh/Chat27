import { createContext, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || null;
    const [user,setUser] = useState(storedUser || null);
    return (
        <AuthContext.Provider value={{user,setUser}} >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider,AuthContext};