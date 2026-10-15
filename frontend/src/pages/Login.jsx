import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Login(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const {setAccessToken}=useContext(AuthContext);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        
        const response=await axios.post('/api/auth/login',{email,password});
        console.log(response.data);
        
        setAccessToken(response.data.accessToken);
    
        }catch(err){
            console.log(err.response?.data);
            
        }
    }
     return <div>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit">Login</button>
          </form>
     </div>
}
export default Login;