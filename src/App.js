import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;