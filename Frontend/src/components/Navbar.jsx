import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, Ghost, X, ChevronRight, ChevronDown, ChevronUp, Cpu, Radio, Activity, Target, Shield } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionItem = ({ title, children, isOpenDefault = false, closeMenu }) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault);
    return (
        <div className="border-b border-gray-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 flex items-center justify-between text-sm font-bold tracking-wider hover:bg-gray-50 transition-colors"
            >
                <span className="uppercase">{title}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden bg-white"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const user = authContext.user;
    const { cartCount } = useContext(CartContext);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Lock scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const menuVariants = {
        closed: { opacity: 0, x: '100%' },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: 20 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
                            <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:rotate-12 transition-transform duration-300">
                                <img src="/logo.png" alt="Quad Hub Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-black italic tracking-tighter text-white group-hover:text-gradient transition-all duration-300">
                                QUAD HUB
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'text-white' : ''}`}>Shop</Link>
                            <Link to="/tutorials" className={`nav-link ${location.pathname === '/tutorials' ? 'text-white' : ''}`}>Tutorials</Link>
                            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'text-white' : ''}`}>About</Link>
                            <Link to="/customer-service" className={`nav-link ${location.pathname === '/customer-service' ? 'text-white' : ''}`}>Support</Link>
                            {(user?.result?.role === 'admin' || user?.role === 'admin') && (
                                <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                                    <Link to="/admin" className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 pb-0.5 rounded border ${location.pathname.startsWith('/admin') ? 'bg-[#00a3ff] border-[#00a3ff] text-black' : 'border-white/20 text-white/50 hover:text-white hover:border-white/40'} transition-all`}>Admin Panel</Link>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 md:gap-6">
                            <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
                                <Search className="w-5 h-5" />
                            </button>

                            <Link to={user ? "/dashboard" : "/login"} className="flex items-center gap-3 group" onClick={closeMenu}>
                                <div className="flex flex-col items-end hidden lg:flex">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">
                                        {user ? 'Pilot Active' : 'Offline'}
                                    </span>
                                    <span className="text-xs font-bold text-white group-hover:text-[#00a3ff] transition-colors">
                                        {user ? (user.result?.name || user.name || 'Profile') : 'Login'}
                                    </span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#00a3ff]/50 transition-all overflow-hidden">
                                    {user ? (
                                        <div className="w-full h-full bg-gradient-to-tr from-[#00a3ff] to-white/40 flex items-center justify-center">
                                            <span className="text-sm font-black text-white">{(user.result?.name || user.name || 'P')[0].toUpperCase()}</span>
                                        </div>
                                    ) : (
                                        <User className="w-5 h-5 text-gray-400 group-hover:text-[#00a3ff]" />
                                    )}
                                </div>
                            </Link>

                            <Link to="/cart" className="relative group" onClick={closeMenu}>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/50 transition-all">
                                    <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                </div>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#00a3ff] text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#0a0a0c]">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <button className="md:hidden text-white" onClick={toggleMenu}>
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Redesigned Mobile Menu matching request */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="md:hidden fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-3xl overflow-y-auto flex flex-col text-white"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-end">
                            <button onClick={closeMenu} className="p-2 text-gray-400 hover:text-white transition-colors">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Menu Content */}
                        <div className="flex flex-col pb-20 px-6 pt-6">

                            {/* User Welcome / Login */}
                            <div className="mb-8 pb-8 border-b border-white/10">
                                <Link to={user ? "/dashboard" : "/login"} className="flex items-center gap-4" onClick={closeMenu}>
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
                                        {user ? (
                                            <div className="w-full h-full bg-gradient-to-tr from-[#00a3ff] to-white/40 flex items-center justify-center">
                                                <span className="text-xl font-black text-white">{(user.result?.name || user.name || 'P')[0].toUpperCase()}</span>
                                            </div>
                                        ) : (
                                            <User className="w-6 h-6 text-[#00a3ff]" />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-[#00a3ff] uppercase tracking-widest leading-none mb-1">
                                            {user ? 'Pilot Active' : 'Authenticate'}
                                        </span>
                                        <span className="text-lg font-bold text-white">
                                            {user ? (user.result?.name || user.name || 'Profile') : 'Login / Register'}
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            {/* Main Navigation */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Core Systems</span>
                                <div className="h-px bg-white/10 flex-1 ml-4" />
                            </div>

                            <div className="flex flex-col gap-2 mb-8">
                                <Link to="/" className="text-2xl font-black italic uppercase tracking-wider py-2 hover:text-[#00a3ff] transition-colors" onClick={closeMenu}>Home</Link>
                                <Link to="/shop" className="text-2xl font-black italic uppercase tracking-wider py-2 hover:text-[#00a3ff] transition-colors" onClick={closeMenu}>Full Inventory</Link>
                                <Link to="/tutorials" className="text-2xl font-black italic uppercase tracking-wider py-2 hover:text-[#00a3ff] transition-colors" onClick={closeMenu}>Academy</Link>
                                <Link to="/about" className="text-2xl font-black italic uppercase tracking-wider py-2 hover:text-[#00a3ff] transition-colors" onClick={closeMenu}>About Us</Link>
                                <Link to="/customer-service" className="text-2xl font-black italic uppercase tracking-wider py-2 hover:text-[#00a3ff] transition-colors" onClick={closeMenu}>Comms & Support</Link>
                            </div>

                            {/* Categories */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Hardware Categories</span>
                                <div className="h-px bg-white/10 flex-1 ml-4" />
                            </div>

                            <div className="flex flex-col gap-1">
                                {[
                                    { id: 'motors', label: 'MOTORS' },
                                    { id: 'frames', label: 'FRAMES' },
                                    { id: 'electronics', label: 'ELECTRONICS' },
                                    { id: 'fpv-equipment', label: 'FPV EQUIPMENT' },
                                    { id: 'battery-charging', label: 'BATTERY & CHARGING' },
                                    { id: 'propellers', label: 'PROPELLERS' },
                                    { id: 'radio-receiver', label: 'RADIO & RECEIVER' },
                                    { id: 'accessories', label: 'ACCESSORIES' }
                                ].map((cat) => (
                                    <Link
                                        key={cat.id}
                                        to={`/shop?category=${cat.id}`}
                                        className="py-3 text-base font-bold tracking-wider text-gray-300 hover:text-white flex items-center justify-between group"
                                        onClick={closeMenu}
                                    >
                                        <span className="group-hover:translate-x-2 transition-transform">{cat.label}</span>
                                        <ChevronRight className="w-4 h-4 text-[#00a3ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
