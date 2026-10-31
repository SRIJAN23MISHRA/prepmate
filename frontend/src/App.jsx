import { useState } from 'react'
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
import {BrowserRouter,Routes,Route,Link,Navigate} from 'react-router-dom';

function App() {
  const {accessToken,loading}=useContext(AuthContext);
  if(loading){
    return <div className='loading screen'>Loading...</div>
  }
  return(
  <BrowserRouter>
  <div>Prepmate
    
    {accessToken ? "logged in":"logged out"}
    
    <nav>
      <Link to="/login" >Login</Link>
      <Link to="/signup" >Signup</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/notes">Notes</Link>
    </nav>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/topics" element={accessToken?<Topics/>:<Navigate to="/login"/>}/>
      <Route path="/notes" element={accessToken?<Notes/>:<Navigate to="/notes"/>}/>
    </Routes>
   
  </div>
</BrowserRouter>
  );
}

export default App
