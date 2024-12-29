import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    // const storedUser = JSON.parse(localStorage.getItem('user')) || null;
    const [user,setUser] = useState(null);
    const navigate = useNavigate()
    const getUserInfo = async () => {
      try {
          const {data} = await axios.get('/auth/get-logged-in-user-info');
          if(!data.user){
              navigate('/login')
          }else{
              setUser(data.user)
          }
      } catch (error) {
          setUser(null)
          navigate('/login')
      }
  }
  useEffect(()=>{
    getUserInfo()
  },[])
    return (
        <AuthContext.Provider value={{user,setUser}} >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider,AuthContext};