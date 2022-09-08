import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import Admin from './Pages/Admin'
import InfoFesta from './Pages/InfoFesta'
import LandingPage from './Pages/LandingPage'



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/landingPage' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/infoFesta' element={<InfoFesta />} />
        <Route path='*' element={<LandingPage />} />
      </Routes>
    </Router>
  );
}


export default App;