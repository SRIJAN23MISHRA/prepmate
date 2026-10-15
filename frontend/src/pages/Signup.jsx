import { useState } from "react";
import axios from "axios";
function Signup(){
    const[name,changename]=useState("");
    const[email,changeemail]=useState("");
    const[password,changepassword]=useState("");
    const handleSubmit=async(e)=>{
        try{
        e.preventDefault();
         const response= await axios.post('/api/auth/signup', { name, email, password });
          console.log(response.data);
          
        }catch(err){
           console.log(err.response.data);
           
        }
    }
    return <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>changename(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>changeemail(e.target.value)}/>
       <input type="password" placeholder="Password" value={password} onChange={(e)=>{changepassword(e.target.value)}} />
        <button type="submit">Sign up</button>
      </form>
     
    </div>
}
export default Signup;