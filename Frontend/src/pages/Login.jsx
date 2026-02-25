
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Ghost, Mail, Lock, LogIn, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
    const { login, user } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    };

    React.useEffect(() => {
        if (user) {
            const params = new URLSearchParams(location.search);
            const redirect = params.get('redirect');
            navigate(redirect ? `/${redirect}` : '/dashboard');
        }
    }, [user, navigate, location.search]);

    return (
        <div className="flex-1 bg-[#0a0a0c] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00e5ff]/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full relative">
                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-3 group mb-6">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_20px_rgba(0,229,255,0.3)] border border-white/10">
                            <img src="/logo.png" alt="Quad Hub Logo" className="w-full h-full object-cover" />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">PILOT <span className="text-gradient">LOGIN</span></h1>
                    <p className="text-gray-500 text-sm font-medium tracking-wide uppercase">Authenticate your flight credentials</p>
                </div>

                {/* Login Card */}
                <div className="glass-card p-10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7000ff]/50 to-transparent" />

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-all placeholder:text-gray-700 font-medium"
                                    placeholder="pilot@quadhub.com"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-end ml-1">
                                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500">Access Key</label>
                                <button type="button" className="text-[10px] font-bold text-[#00e5ff] hover:underline uppercase tracking-widest">Forgot?</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-[#7000ff]/50 transition-all placeholder:text-gray-700 font-medium"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="neon-btn w-full flex items-center justify-center gap-3 py-4 group mt-4"
                        >
                            INITIATE SEQUENCE <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-white/5 text-center">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">No flight profile detected?</p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-gradient transition-all group"
                        >
                            CREATE PILOT ACCOUNT <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Footer Shield */}
                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-700 font-black uppercase tracking-[0.3em]">
                    <Sparkles className="w-3 h-3" /> Secure Encrypted Portal
                </div>
            </div>
        </div>
    );
};

export default Login;
