import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const {accessToken}=useContext(AuthContext);

  return <div>Prepmate
    <Signup/>
    <Login/>
    {accessToken ? "logged in":"logged out"}
    
  </div>

}

export default App
