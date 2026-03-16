import './App.css'
import { useEffect } from 'react'
import { useThemeStore } from './context/zustand.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import Home from './components/home/Home.jsx'
import ProductDetail from './components/productDetail/ProductDetail.jsx'
import Cart from './components/cart/Cart.jsx'
import Register from './components/auth/Register.jsx'
import Login from './components/auth/Login.jsx'

import AdminLogin from './components/admin/AdminLogin.jsx'
import AdminDashboard from './components/admin/AdminDashboard.jsx'
import AdminOrders from './components/admin/AdminOrders.jsx'
import AdminProducts from './components/admin/AdminProducts.jsx'
import AdminUsers from './components/admin/AdminUsers.jsx'
import AdminAnalytics from './components/admin/AdminAnalytics.jsx'
import AdminSettings from './components/admin/AdminSettings.jsx'
import AdminInventory from './components/admin/AdminInventory.jsx'
import AdminReviews from './components/admin/AdminReviews.jsx'
import AdminCoupons from './components/admin/AdminCoupons.jsx'
import AdminNotifications from './components/admin/AdminNotifications.jsx'

function App() {
  const isLightTheme = useThemeStore((state) => state.light);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isLightTheme ? 'light' : 'dark');
  }, [isLightTheme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/admin/coupons" element={<AdminCoupons />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
      </Routes>
      <BackToTop />
    </Router>
  )
}

export default App
