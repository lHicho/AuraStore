import './App.css'

import { supabase } from './context/supabase.jsx'

import { useEffect } from 'react'
import { useThemeStore } from './context/zustand.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import Filters from './components/filters/Filters.jsx'
import Deals from './components/deals/Deals.jsx'
import Hero from './components/hero/Hero.jsx'
import Card from './components/card/Card.jsx'
import BackToTop from './components/BackToTop.jsx'
import Register from './components/auth/Register.jsx'
import Login from './components/auth/Login.jsx'
import Home from './components/home/Home.jsx' // New import for Home component

import { FaThumbsUp } from "react-icons/fa6";


import ProductDetail from './components/productDetail/ProductDetail.jsx'

function App() {
  const isLightTheme = useThemeStore((state) => state.light);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isLightTheme ? 'light' : 'dark');
  }, [isLightTheme]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <BackToTop />
    </Router>
  )
}



export default App
