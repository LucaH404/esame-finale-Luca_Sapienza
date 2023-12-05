import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/contact/:id" element= {<Contact/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
