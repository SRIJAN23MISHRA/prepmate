import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
   const [loading,setLoading]=useState(true);
   useEffect(()=>{
    const turnRefresh=async()=>{ 
      try{
          const getToken=await axios.post("/api/auth/refresh");
          if(getToken){
          setAccessToken(getToken.data.accessToken);
          
          }
        }catch(err){
            console.log(err.message);
            
        }finally{
          setLoading(false);
        }
    }
    turnRefresh();
   },[])
  return (
    <AuthContext.Provider value={{ accessToken,setAccessToken,loading}}>
      {children}
    </AuthContext.Provider>
  );
}