import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Tutorials from './pages/Tutorials';
import Login from './pages/Login';
import Register from './pages/Register';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import CustomerService from './pages/CustomerService';

import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import CreateProduct from './pages/admin/CreateProduct';
import CreateTutorial from './pages/admin/CreateTutorial';
import AdminDashboard from './pages/admin/AdminDashboard';
import About from './pages/About';




const Layout = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hideFooter = ['/customer-service', '/dashboard', '/cart'].includes(location.pathname.replace(/\/+$/, ''));

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0c]">
      <Navbar />
      <main className="flex-grow pt-20 flex flex-col relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex-grow flex flex-col"
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/customer-service" element={<CustomerService />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/create-product" element={<CreateProduct />} />
              <Route path="/admin/create-tutorial" element={<CreateTutorial />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0a0a0c',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minWidth: '250px',
            fontFamily: 'monospace',
          },
          success: {
            iconTheme: {
              primary: '#00a3ff',
              secondary: '#0a0a0c',
            },
            style: {
              border: '1px solid rgba(0, 163, 255, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 700,
              fontSize: '11px',
            }
          },
          error: {
            iconTheme: {
              primary: '#ff3d00',
              secondary: '#0a0a0c',
            },
            style: {
              border: '1px solid rgba(255, 61, 0, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 700,
              fontSize: '11px',
            }
          }
        }}
      />
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
