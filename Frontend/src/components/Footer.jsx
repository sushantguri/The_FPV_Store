
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Ghost, Shield, Zap, Rocket, Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0c] text-white border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
            {/* Decoration - Updated to Sapphire */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00a3ff]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 group mb-8">
                            <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:rotate-12 transition-transform duration-300">
                                <img src="/logo.png" alt="Quad Hub Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-black italic tracking-tighter text-white group-hover:text-gradient transition-all">
                                QUAD HUB
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
                            The definitive source for high-performance FPV components and pilot training. Engineered for the next generation of flight.
                        </p>
                        <div className="mb-6 border-l-2 border-[#00a3ff]/50 pl-4 py-1">
                            <h4 className="text-[9px] font-black tracking-[0.3em] text-[#00a3ff] uppercase mb-1">Headquarters</h4>
                            <p className="text-gray-400 text-xs uppercase tracking-widest max-w-[280px] font-bold leading-relaxed">
                                SCF 49 Kahnuwan Road <br/>
                                1st Floor, Opp. Police Chownki
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <SocialLink href="https://www.instagram.com/quadhub_india?igsh=c2o2NWxra2wxNXdm" icon={<Instagram className="w-4 h-4" />} />
                            <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
                            <SocialLink href="https://youtube.com/@quadhubindia?si=AxF8D4w_FCBQYMjH" icon={<Youtube className="w-4 h-4" />} />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-black tracking-[0.3em] text-[#00a3ff] uppercase mb-8">Navigation</h3>
                        <ul className="space-y-4">
                            <FooterLink to="/about" label="About Us" />
                            <FooterLink to="/shop" label="Flight Catalog" />
                            <FooterLink to="/tutorials" label="Pilot Academy" />
                            <FooterLink to="/customer-service" label="Mission Support" />
                            <FooterLink to="/dashboard" label="Pilot Profile" />
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-black tracking-[0.3em] text-white/50 uppercase mb-8">Resources</h3>
                        <ul className="space-y-4">
                            <FooterLink to="/customer-service" label="Technical Schematics" />
                            <FooterLink to="/customer-service" label="Terms of Deployment" />
                            <FooterLink to="/customer-service" label="Privacy Protocol" />
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-black tracking-[0.3em] text-[#00a3ff] uppercase mb-8">Status</h3>
                        <div className="space-y-6">
                            <StatusItem icon={<Shield className="w-4 h-4 text-[#00a3ff]" />} label="System integrity" value="Nominal" />
                            <StatusItem icon={<Zap className="w-4 h-4 text-white/60" />} label="Network latency" value="14ms" />
                            <StatusItem icon={<Globe className="w-4 h-4 text-green-500" />} label="Main Server" value="Online" />
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">
                        © 2026 QUAD HUB // ALL SYSTEMS OPERATIONAL
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        <Rocket className="w-3 h-3" /> DESIGNED FOR HIGH-G MANEUVERS
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ to, label }) => (
    <li>
        <Link to={to} className="text-sm font-bold text-gray-500 hover:text-white hover:translate-x-1 transition-all inline-block uppercase tracking-wider">
            {label}
        </Link>
    </li>
);

const SocialLink = ({ icon, href }) => (
    <a href={href || "#"} target={href && href !== "#" ? "_blank" : "_self"} rel={href && href !== "#" ? "noopener noreferrer" : undefined} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-[#00a3ff]/50 hover:bg-[#00a3ff]/10 transition-all">
        {icon}
    </a>
);

const StatusItem = ({ icon, label, value }) => (
    <div className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                {icon}
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
        </div>
        <span className="text-[10px] font-black text-white uppercase tracking-widest">{value}</span>
    </div>
);

export default Footer;
