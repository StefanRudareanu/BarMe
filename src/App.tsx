import React from 'react';
import { Container } from "@mui/material";
import Login from './LoginRegister/Login';
import RegisterComp from './LoginRegister/RegisterComp';
import Navbar from './Components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Profile from './Page/MyProfile';
import './App.css'
const App=()=> {
  return (
    <BrowserRouter>
    <div className='App'>
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/register'element={<RegisterComp/>}/>
        <Route path='/Home'element={<Navbar/>}/>
        <Route path='/MyProfile'element={<><Navbar/><Profile/></>}/>
      </Routes>
       </div>
    </BrowserRouter>
     
  );
}

export default App;
