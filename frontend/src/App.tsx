import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Head } from './components/head/Head';
import { Login } from './components/login/Login';
import { Signup } from './components/login/Signup';
import { Foot } from './components/foot/Foot';

export default function App() {
  return (
    <div className="app">
      <div className='appHead'>
        <Head />
      </div>
      <div className='appBody'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element=<Login />></Route>
            <Route path="/signup" element=<Signup />></Route>
          </Routes>
        </BrowserRouter>
      </div>
      <div className='appFoot'>
        <Foot />
      </div>
    </div>
  );
}
