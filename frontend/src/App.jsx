import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Topics from './pages/Topics'
import Notes from './pages/Notes'
import {Routes,Route,Link,Navigate,useNavigate} from 'react-router-dom';
import axios from 'axios'
function App() {
  const {accessToken,loading,setAccessToken}=useContext(AuthContext);
  const navigate=useNavigate();
  
      async function handleLogout(){
        try{
        const logoutGet=await axios.post("/api/auth/logout");
        
        setAccessToken(null);
        navigate("/login");
        }catch(err){
          console.log(err.message);
          
        }
      }
 
  if(loading){
    return <div className='loading screen'>Loading...</div>
  }
  return(

  <div>Prepmate
    
    {accessToken ? "logged in":"logged out"}
    
    <nav>
      {accessToken?(
        <>
        <Link to="/topics">Topics</Link>
        <Link to="/notes">Notes</Link>
        <button onClick={handleLogout}>Logout</button>
        </>
      ):(
        <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/topics" element={accessToken?<Topics/>:<Navigate to="/login"/>}/>
      <Route path="/notes" element={accessToken?<Notes/>:<Navigate to="/login"/>}/>
    </Routes>
     
  </div>

  );
}

export default App
