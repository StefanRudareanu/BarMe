import React from 'react';
import { Container } from "@mui/material";
import Login from './LoginRegister/Login';
import Register from './LoginRegister/Register';
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
        <Route path='/register'element={<Register/>}/>
        <Route path='/Home'element={<Navbar/>}/>
        {/* <Route path='/Profile'element={<Navbar/>}/> */}
        <Route path='/MyProfile'element={<><Navbar/><Profile/></>}/>
      </Routes>
       </div>
    </BrowserRouter>
     
  );
}

export default App;
