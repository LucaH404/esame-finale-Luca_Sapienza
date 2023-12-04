import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tutorial" element={<></>}/>
        <Route path="/home" element= {<></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
