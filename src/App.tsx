import React,{ useEffect, useState } from 'react'
import Home from './pages/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Player from './pages/Player/Player.tsx';
import { onAuthStateChanged } from 'firebase/auth/cordova';
import { auth } from './firebase.ts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth,async (user) => {
      if(user){
        console.log("Logged In");
        navigate('/');
      }else{
        console.log("Logged Out");
        navigate('/login');
      }
    })
  },[])

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/player/:id' element={<Player />}/>
      </Routes>
    </div>
  )
}

export default App;