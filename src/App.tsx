import React from 'react';
import { Container } from "@mui/material";
import Login from './LoginRegister/Login';
import RegisterComp from './LoginRegister/RegisterComp';
import Navbar from './Components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Profile from './Page/MyProfile';
import {useState} from "react"
import Home from './Page/Home';
import './App.css'
const App=()=> {
  return (
    <BrowserRouter>
    <div className='App'>
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/register'element={<RegisterComp/>}/>
        <Route path='/Home'element={<><Home/><Navbar/></>}/>
        <Route  path='/Profile/:usernameRoute'element={<><Navbar/><Profile/></>}/>
      </Routes>
       </div>
    </BrowserRouter>
     
  );
}

export default App;
