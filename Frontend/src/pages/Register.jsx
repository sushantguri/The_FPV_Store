
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Ghost, User, Mail, Lock, UserPlus, ArrowLeft, Sparkles } from 'lucide-react';

const Register = () => {
    const { register, user } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return alert("Access keys do not match!");
        }
        await register(formData);
    };

    React.useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="flex-1 bg-[#0a0a0c] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7000ff]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00e5ff]/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-xl w-full relative">
                {/* Header */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-3 group mb-6">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_20px_rgba(0,229,255,0.3)] border border-white/10">
                            <img src="/logo.png" alt="Quad Hub Logo" className="w-full h-full object-cover" />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">JOIN THE <span className="text-gradient">QUAD HUB</span></h1>
                    <p className="text-gray-500 text-sm font-medium tracking-wide uppercase">Register your pilot flight profile</p>
                </div>

                {/* Register Card */}
                <div className="glass-card p-10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent" />

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 ml-1">Pilot Callsign</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-all placeholder:text-gray-700 font-medium text-sm"
                                    placeholder="JOHNNY_FPV"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 ml-1">Frequency (Email)</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-white focus:outline-none focus:border-[#7000ff]/50 transition-all placeholder:text-gray-700 font-medium text-sm"
                                    placeholder="pilot@quadhub.com"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 ml-1">Access Key</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-all placeholder:text-gray-700 font-medium text-sm"
                                        placeholder="••••••••"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 ml-1">Confirm Key</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-white focus:outline-none focus:border-[#7000ff]/50 transition-all placeholder:text-gray-700 font-medium text-sm"
                                        placeholder="••••••••"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="neon-btn w-full flex items-center justify-center gap-3 py-4 group mt-4 font-black tracking-widest"
                        >
                            COMMIT REGISTRATION <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-white/5 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-all group uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Terminal Login
                        </Link>
                    </div>
                </div>

                <p className="mt-8 text-center text-[10px] text-gray-700 font-black uppercase tracking-[0.2em] max-w-xs mx-auto">
                    By registering, you agree to the <span className="text-gray-500">Pilot Conduct Treaty</span> and <span className="text-gray-500">Flight Safety Guidelines</span>.
                </p>
            </div>
        </div>
    );
};

export default Register;
