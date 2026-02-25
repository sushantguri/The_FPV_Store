
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Zap, Shield, Globe, Sparkles, Star, ChevronRight, Cpu, Activity, Layout, ChevronLeft, LayoutGrid, Crosshair, Box, Battery, Wifi, SlidersHorizontal, Radio } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const features = [
        { icon: <Cpu className="w-8 h-8 text-[#00a3ff]" />, title: 'Premium Components', desc: 'Direct access to high-tier flight controllers and ESCs.' },
        { icon: <Shield className="w-8 h-8 text-[#00e5ff]" />, title: 'Certified Safe', desc: 'Every component is tested for maximum reliability.' },
        { icon: <Zap className="w-8 h-8 text-[#00a3ff]" />, title: 'Same Day Shipping', desc: 'Strategic warehouse locations for rapid global delivery.' },
        { icon: <Layout className="w-8 h-8 text-[#00e5ff]" />, title: 'Expert Curation', desc: 'Hand-picked gear by pro pilots who know the tech.' },
    ];

    const shopCategories = [
        { id: 'dji-drones', label: 'DJI DRONES', icon: <Crosshair className="w-5 h-5 md:w-6 md:h-6" /> },
        { id: 'motors', label: 'MOTORS', icon: <Zap className="w-5 h-5 md:w-6 md:h-6" /> },
        { id: 'frames', label: 'FRAMES', icon: <Box className="w-5 h-5 md:w-6 md:h-6" /> },
        { id: 'electronics', label: 'ELECTRONICS', icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" /> },
        { id: 'fpv-equipment', label: 'FPV EQUIPMENT', icon: <Radio className="w-5 h-5 md:w-6 md:h-6" /> },
        { id: 'battery-charging', label: 'BATTERY & CHARGING', icon: <Battery className="w-5 h-5 md:w-6 md:h-6" /> },
        { id: 'propellers', label: 'PROPELLERS', icon: <Activity className="w-5 h-5 md:w-6 md:h-6" /> },
        { id: 'radio-receiver', label: 'RADIO & RECEIVER', icon: <Wifi className="w-5 h-5 md:w-6 md:h-6" /> },
        { id: 'accessories', label: 'ACCESSORIES', icon: <SlidersHorizontal className="w-5 h-5 md:w-6 md:h-6" /> },
    ];

    const featuredProducts = [
        { id: 1, name: "Apex Carbon 5\" Frame", price: "89.99", image: "/drone1.png", category: "Frames", rating: "4.9" },
        { id: 2, name: "SpeedyBee F405 Stack", price: "124.50", image: "/stack.png", category: "Electronics", rating: "4.8" },
        { id: 3, name: "HD Digital Goggles X", price: "549.00", image: "/goggles.png", category: "Visuals", rating: "5.0" },
    ];

    // Auto-running carousel
    const [activeSlide, setActiveSlide] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % featuredProducts.length);
        }, 3000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const goToSlide = (index) => setActiveSlide(index);
    const prevSlide = () => setActiveSlide(prev => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    const nextSlide = () => setActiveSlide(prev => (prev + 1) % featuredProducts.length);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00a3ff]/30 overflow-x-hidden">

            {/* --- Advanced Hero Section --- */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                {/* Visual Foundation */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/hero_new.png"
                            alt="Hero Background"
                            className="w-full h-full object-cover opacity-60 scale-105"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00a3ff]/5 blur-[150px] rounded-full animate-pulse pointer-events-none" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8 hud-scanline"
                        >
                            <Sparkles className="w-4 h-4 text-[#00a3ff]" />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-gray-300">Global Hub for FPV Innovation</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-8 uppercase italic group relative pr-4"
                        >
                            <span className="relative z-10">THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a3ff] to-[#00e5ff] group-hover:animate-glitch pr-6 md:pr-8 lg:pr-12">QUAD</span></span> <br />
                            <span className="text-white relative z-10 group-hover:animate-glitch pr-6 md:pr-8 lg:pr-12">HUB</span>
                            <div className="absolute inset-x-0 top-1/2 h-1 bg-[#00a3ff]/20 -translate-y-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-base md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed font-medium"
                        >
                            Professional grade equipment for elite pilots. We provide the architecture for high-speed flight, digital clarity, and uncompromised build quality.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Link to="/shop" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black uppercase tracking-[0.15em] text-sm rounded-sm hover:bg-[#00a3ff] hover:text-white transition-all duration-500 text-center">
                                SHOP GEAR
                            </Link>
                            <Link to="/tutorials" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-sm font-black uppercase tracking-[0.15em] rounded-sm hover:bg-white/10 transition-all duration-500 text-center flex items-center justify-center gap-2">
                                <Play className="w-4 h-4 flex-shrink-0" /> PILOT ACADEMY
                            </Link>
                        </motion.div>

                        {/* Mobile Drone Hover Animation */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="lg:hidden mt-16 flex flex-col items-center justify-center w-full relative z-20"
                        >
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                {/* Drone Assembly - Slow Yaw */}
                                <div className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite] group">
                                    {/* Cross Arms */}
                                    <div className="absolute top-1/2 left-1/2 w-[140px] h-1 bg-gradient-to-r from-[#00a3ff]/20 via-[#00a3ff]/60 to-[#00a3ff]/20 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full" />
                                    <div className="absolute top-1/2 left-1/2 w-[140px] h-1 bg-gradient-to-r from-[#00a3ff]/20 via-[#00a3ff]/60 to-[#00a3ff]/20 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full" />

                                    {/* Main Chassis / Flight Controller */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-12 bg-[#050505] border-2 border-[#00a3ff] rounded-sm z-20 flex flex-col items-center justify-between py-1 shadow-[0_0_15px_rgba(0,163,255,0.4)]">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]" />
                                        <div className="w-6 h-1 bg-[#00e5ff] rounded-sm" />
                                    </div>

                                    {/* Propellers x4 */}
                                    {/* Top Left */}
                                    <div className="absolute top-4 left-4 w-14 h-14 rounded-full border border-white/10 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.15)] overflow-hidden">
                                        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.1s]" />
                                        <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.1s]" />
                                    </div>

                                    {/* Top Right */}
                                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full border border-white/10 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.15)] overflow-hidden">
                                        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.1s] [animation-direction:reverse]" />
                                        <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.1s] [animation-direction:reverse]" />
                                    </div>

                                    {/* Bottom Left */}
                                    <div className="absolute bottom-4 left-4 w-14 h-14 rounded-full border border-white/10 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.15)] overflow-hidden">
                                        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.1s] [animation-direction:reverse]" />
                                        <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.1s] [animation-direction:reverse]" />
                                    </div>

                                    {/* Bottom Right */}
                                    <div className="absolute bottom-4 right-4 w-14 h-14 rounded-full border border-white/10 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.15)] overflow-hidden">
                                        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.1s]" />
                                        <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.1s]" />
                                    </div>
                                </div>

                                {/* Outer Tracking Ring */}
                                <div className="absolute inset-0 border border-[#00a3ff]/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" />
                            </div>

                            <div className="mt-8 relative z-20">
                                <span className="text-[10px] font-black text-[#00a3ff] uppercase tracking-[0.4em] flex items-center gap-2 bg-black/50 px-4 py-2 rounded-sm border border-[#00a3ff]/20 backdrop-blur-md">
                                    <Activity className="w-3 h-3 animate-pulse" /> Telemetry Locked
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* HUD / Data Panel for Desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
                        className="hidden lg:block lg:col-span-4 space-y-4"
                    >
                        <div className="glass-card p-6 border-white/10 group overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-[#00a3ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black text-[#00a3ff] uppercase tracking-widest">System Status</span>
                                <Activity className="w-4 h-4 text-[#00a3ff] animate-pulse" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '80%' }}
                                        transition={{ delay: 1.5, duration: 1.5, ease: "circOut" }}
                                        className="h-full bg-[#00a3ff]"
                                    />
                                </div>
                                <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                                    <span>Signal Integrity</span>
                                    <span>98%</span>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Drone Hover Animation */}
                        <div className="glass-card p-8 border-white/10 relative overflow-hidden group min-h-[250px] flex flex-col items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00a3ff]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative w-36 h-36 flex items-center justify-center">
                                {/* Drone Assembly - Slow Yaw */}
                                <div className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite] transition-all duration-1000">
                                    {/* Cross Arms */}
                                    <div className="absolute top-1/2 left-1/2 w-[110px] h-1 bg-gradient-to-r from-[#00a3ff]/20 via-[#00a3ff]/60 to-[#00a3ff]/20 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full" />
                                    <div className="absolute top-1/2 left-1/2 w-[110px] h-1 bg-gradient-to-r from-[#00a3ff]/20 via-[#00a3ff]/60 to-[#00a3ff]/20 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full" />

                                    {/* Main Chassis / Flight Controller */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-10 bg-[#050505] border border-[#00a3ff] rounded-sm z-20 flex flex-col items-center justify-between py-1 shadow-[0_0_10px_rgba(0,163,255,0.4)]">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-[pulse_0.5s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_8px_red]" />
                                        <div className="w-4 h-[2px] bg-[#00e5ff] rounded-sm" />
                                    </div>

                                    {/* Propellers x4 */}
                                    {/* Top Left */}
                                    <div className="absolute top-3 left-3 w-10 h-10 rounded-full border border-white/10 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm shadow-[0_0_10px_rgba(0,229,255,0.1)] overflow-hidden">
                                        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.08s]" />
                                        <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.08s]" />
                                    </div>

                                    {/* Top Right */}
                                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full border border-white/10 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm shadow-[0_0_10px_rgba(0,229,255,0.1)] overflow-hidden">
                                        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.08s] [animation-direction:reverse]" />
                                        <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.08s] [animation-direction:reverse]" />
                                    </div>

                                    {/* Bottom Left */}
                                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full border border-white/10 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm shadow-[0_0_10px_rgba(0,229,255,0.1)] overflow-hidden">
                                        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.08s] [animation-direction:reverse]" />
                                        <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.08s] [animation-direction:reverse]" />
                                    </div>

                                    {/* Bottom Right */}
                                    <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full border border-white/10 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm shadow-[0_0_10px_rgba(0,229,255,0.1)] overflow-hidden">
                                        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.08s]" />
                                        <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent animate-spin [animation-duration:0.08s]" />
                                    </div>
                                </div>

                                {/* Outer Tracking Rings */}
                                <div className="absolute inset-0 border border-[#00a3ff]/10 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />
                                <div className="absolute inset-4 border border-[#00e5ff]/5 rounded-full rotate-45 group-hover:rotate-180 transition-transform duration-1000" />
                            </div>

                            <div className="mt-8 relative z-20 text-center">
                                <span className="text-[9px] font-black text-[#00a3ff] uppercase tracking-[0.3em] flex items-center gap-2 group-hover:text-[#00e5ff] transition-colors">
                                    <Activity className="w-3 h-3 animate-pulse" /> Drone Telemetry Active
                                </span>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                            className="glass-card p-6 border-white/10 opacity-60 cursor-crosshair transition-all"
                        >
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Connected Nodes</div>
                            <div className="text-2xl font-black text-white italic tracking-tighter">8,421 LABS</div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Mobile Running Scanner Animation (Bottom of Hero) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden lg:hidden z-20">
                    <motion.div
                        className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#00a3ff] to-transparent"
                        animate={{ x: ['-100%', '300%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                </div>
            </section>

            {/* --- Shopping Categories Slider --- */}
            <section className="py-8 border-b border-white/5 bg-[#050505] relative z-20">
                <div className="w-full overflow-hidden flex flex-col items-center">
                    <div className="w-full overflow-x-auto no-scrollbar pb-4 pt-2 px-4 sm:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex gap-4 md:gap-6 w-max mx-auto px-4"
                        >
                            {shopCategories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    to={`/shop?category=${cat.id}`}
                                    className="flex flex-col items-center justify-center p-4 md:p-6 min-w-[120px] md:min-w-[140px] bg-[#00a3ff]/[0.03] border border-[#00a3ff]/10 hover:bg-[#00a3ff]/[0.08] hover:border-[#00a3ff]/40 rounded-lg group transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00a3ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="text-[#00a3ff]/70 group-hover:text-[#00e5ff] group-hover:scale-110 transition-all duration-300 mb-3 drop-shadow-[0_0_8px_rgba(0,163,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.6)] relative z-10">
                                        {cat.icon}
                                    </div>
                                    <span className="text-[10px] md:text-xs font-black text-gray-300 group-hover:text-white text-center uppercase tracking-wider relative z-10">
                                        {cat.label}
                                    </span>
                                </Link>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Core Features Grid --- */}
            <section className="py-20 md:py-32 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a3ff]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.12, duration: 0.6 }}
                                className="group p-5 md:p-8 border border-[#00a3ff]/10 bg-[#00a3ff]/[0.02] hover:bg-[#00a3ff]/[0.06] transition-all duration-500 rounded-sm relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-[2px] h-0 bg-[#00a3ff] group-hover:h-full transition-all duration-700" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a3ff]/5 blur-[50px] rounded-full group-hover:bg-[#00a3ff]/10 transition-all duration-500" />
                                <div className="mb-4 md:mb-8 transform group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_8px_rgba(0,163,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.8)] relative z-10">{f.icon}</div>
                                <h3 className="text-sm md:text-xl font-black text-white mb-2 md:mb-4 uppercase tracking-[0.05em] md:tracking-[0.1em] relative z-10">{f.title}</h3>
                                <p className="text-xs md:text-sm text-gray-300 leading-relaxed hidden sm:block relative z-10">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Section Divider --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
            </div>

            {/* --- Auto-Running Product Carousel --- */}
            <section className="py-16 md:py-32 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00e5ff]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 md:mb-20"
                    >
                        <div className="w-full max-w-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-px bg-[#00a3ff]" />
                                <span className="text-[#00a3ff] font-bold text-[10px] uppercase tracking-[0.4em]">Hardware Inventory</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white tracking-tight uppercase italic leading-[1.1]">
                                STRATEGIC <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a3ff] to-[#00e5ff] pr-4 md:pr-8">DEPLOYMENTS</span>
                            </h2>
                        </div>
                        <motion.div whileHover={{ x: 5 }}>
                            <Link to="/shop" className="text-[10px] md:text-xs font-black text-gray-500 hover:text-[#00a3ff] transition-all flex items-center gap-2 uppercase tracking-widest group/link">
                                ACCESS FULL INVENTORY <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Mobile Carousel */}
                    <div className="block md:hidden relative">
                        <div className="overflow-hidden rounded-sm">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSlide}
                                    initial={{ opacity: 0, x: 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -60 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="relative group border border-white/5 bg-black/40"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 z-10" />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 z-10" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 z-10" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 z-10" />

                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={featuredProducts[activeSlide].image}
                                            alt={featuredProducts[activeSlide].name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                        <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 border border-white/10 flex items-center gap-2">
                                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            <span className="text-[10px] font-black text-white">{featuredProducts[activeSlide].rating}</span>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 border border-[#00a3ff]/20">
                                            <span className="text-[9px] font-black text-[#00a3ff] uppercase">{featuredProducts[activeSlide].category}</span>
                                        </div>
                                    </div>
                                    <div className="p-5 border-t border-white/5">
                                        <h3 className="text-lg font-black text-white tracking-widest uppercase mb-3">{featuredProducts[activeSlide].name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-black text-white tracking-tighter">${featuredProducts[activeSlide].price}</span>
                                            <Link to="/shop" className="px-5 py-2 bg-[#00a3ff] text-black text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-white transition-all duration-300">
                                                Shop Now
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Carousel Controls */}
                        <div className="flex items-center justify-between mt-6">
                            <button onClick={prevSlide} className="p-2 border border-white/10 rounded-sm hover:border-[#00a3ff]/40 transition-all">
                                <ChevronLeft className="w-5 h-5 text-gray-400" />
                            </button>
                            <div className="flex gap-2">
                                {featuredProducts.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToSlide(i)}
                                        className={`h-1 rounded-full transition-all duration-500 ${i === activeSlide ? 'w-8 bg-[#00a3ff]' : 'w-2 bg-white/20'}`}
                                    />
                                ))}
                            </div>
                            <button onClick={nextSlide} className="p-2 border border-white/10 rounded-sm hover:border-[#00a3ff]/40 transition-all">
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden md:grid md:grid-cols-3 gap-12">
                        {featuredProducts.map((p, index) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="relative group overflow-hidden border border-white/5 bg-black/40 transition-all duration-500 hover:border-[#00a3ff]/20"
                            >
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 z-10" />
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 z-10" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 z-10" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 z-10" />

                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <Link to="/shop" className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform">SHOP NOW</Link>
                                    </div>
                                    <div className="absolute top-6 left-6 bg-black/80 px-4 py-1.5 border border-white/10 flex items-center gap-2">
                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                        <span className="text-[10px] font-black text-white">{p.rating}</span>
                                    </div>
                                </div>
                                <div className="p-8 border-t border-white/5">
                                    <span className="text-[9px] font-black text-[#00a3ff] uppercase tracking-[0.2em] mb-2 block">{p.category}</span>
                                    <h3 className="text-xl font-black text-white tracking-widest uppercase line-clamp-1 mb-6">{p.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-black text-white tracking-tighter">${p.price}</span>
                                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-1">Asset_{p.id.toString().padStart(3, '0')}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Professional Academy CTA --- */}
            <section className="py-16 md:py-32 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto relative group">
                    <div className="absolute inset-0 bg-[#00a3ff]/20 blur-[150px] -z-10 group-hover:bg-[#00a3ff]/30 transition-all duration-1000" />
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-2 border border-white/10 bg-black overflow-hidden rounded-sm"
                    >
                        <div className="relative h-56 sm:h-72 lg:h-auto overflow-hidden">
                            <img
                                src="https://dji-official-fe.djicdn.com/dps/407048a6e395ef255e989db12fd872a1.jpg"
                                alt="Academy"
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black via-black/40 to-transparent" />
                        </div>
                        <div className="p-8 sm:p-10 lg:p-16 flex flex-col justify-center items-start">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-[#00a3ff]/10 border border-[#00a3ff]/20 rounded-full mb-6"
                            >
                                <Globe className="w-3 h-3 text-[#00a3ff]" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#00a3ff]">Academy Program v.2.4</span>
                            </motion.div>
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase italic leading-none pr-4"
                            >
                                ESCALATE YOUR <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a3ff] to-[#00e5ff] pr-4 md:pr-8">FLIGHT SKILLS</span>
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-gray-400 mb-10 text-base leading-relaxed font-medium"
                            >
                                Join our advanced pilot curriculum. Master complex building techniques, digital frequency management, and high-G cinematic maneuvers.
                            </motion.p>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="w-full sm:w-auto"
                            >
                                <Link to="/tutorials" className="block sm:inline-block text-center px-8 py-4 bg-[#00a3ff] text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all duration-500 rounded-sm italic">
                                    COMMENCE TRAINING
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
