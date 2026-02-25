import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Users, MapPin, Mail, ChevronRight, Rocket, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-[#0a0a0c] min-h-screen text-white relative overflow-hidden flex flex-col pt-10 font-sans">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00a3ff]/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 lg:py-16 md:py-12 py-8">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center md:mb-24 mb-16"
                >
                    <span className="text-[#00a3ff] font-black uppercase tracking-[0.3em] text-xs mb-4 block">CLASSIFIED INTEL</span>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 uppercase">
                        ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a3ff] to-white/80">QUAD HUB</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed border-l-2 border-[#00a3ff]/50 pl-6 text-left">
                        We are the architects of the skies. Born from a passion for bleeding-edge technology and high-G maneuvers, QUAD HUB is the premier nexus for top-tier FPV hardware, elite pilot training, and the ultimate flight experience.
                    </p>
                </motion.div>

                {/* Core Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    <FeatureCard
                        icon={<Rocket className="w-8 h-8 text-[#00a3ff]" />}
                        title="HIGH-VELOCITY GEAR"
                        desc="Curated selection of frames, motors, and flight controllers designed to shatter speed records and dominate the track."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={<Shield className="w-8 h-8 text-[#00a3ff]" />}
                        title="UNCOMPROMISING QUALITY"
                        desc="Every component in our inventory undergoes rigorous stress-testing to ensure survival in the most hostile flight environments."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<Users className="w-8 h-8 text-[#00a3ff]" />}
                        title="ELITE PILOT ACADEMY"
                        desc="From absolute beginners to racing pros, our comprehensive tutorials elevate your piloting skills to the next dimension."
                        delay={0.3}
                    />
                </div>

                {/* Cyberpunk Style Stats / Info Section */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden mb-32">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#00a3ff]" />
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex-1 space-y-6"
                        >
                            <h2 className="text-3xl font-black italic uppercase tracking-tight">Our Directive</h2>
                            <p className="text-gray-400 leading-relaxed font-medium">
                                Founded in 2026, QUAD HUB emerged from the underground racing circuit with a singular directive: to supply pilots with gear that refuses to quit. We noticed a vacuum in reliable, top-tier equipment accessible to both rookies and veterans. We filled that void.
                            </p>
                            <p className="text-gray-400 leading-relaxed font-medium">
                                Whether you're building a cinematic long-range cruiser capable of infiltrating enemy territory or a sub-250g race quad that screams at 150mph, we have the specialized hardware you need. Access granted.
                            </p>

                            <div className="pt-6">
                                <Link to="/shop" className="inline-flex items-center gap-3 bg-[#00a3ff] text-black font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-white hover:text-black transition-all duration-300 group">
                                    Call In The Drop
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>

                        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                            <StatBox value="500+" label="Missions Flown" />
                            <StatBox value="10k+" label="Pilots Trained" />
                            <StatBox value="99.9%" label="System Uptime" />
                            <StatBox value="0ms" label="Delay in Action" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay }}
        className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl hover:bg-white/5 hover:border-[#00a3ff]/50 transition-all group"
    >
        <div className="w-16 h-16 rounded-xl bg-[#00a3ff]/10 border border-[#00a3ff]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-black uppercase tracking-wide mb-4 group-hover:text-[#00a3ff] transition-colors">{title}</h3>
        <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
    </motion.div>
);

const StatBox = ({ value, label }) => (
    <div className="bg-[#050505] border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-black italic text-white tracking-tighter mb-2">{value}</span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00a3ff]">{label}</span>
    </div>
);

export default About;
