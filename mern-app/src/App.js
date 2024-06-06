import React from 'react';
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NewPage from './components/NewPage';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path='/room/:room' element={<NewPage/>}/>
          <Route path='/' element={<Login />} />
          <Route path="/home" element={<Home/>}/>
          <Route path='/signup' element={<Signup />} />
       
        </Routes>
      </Router>
    </div>
  );
}
