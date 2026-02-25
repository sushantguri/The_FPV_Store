import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, ShieldCheck, ArrowRight, ChevronLeft, Rocket, Info, CheckCircle2, QrCode } from 'lucide-react';
import * as api from '../api';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);

    React.useEffect(() => {
        if (!user) {
            navigate('/login?redirect=checkout');
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        zipCode: '',
        country: '',
        transactionId: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('QR_PAY');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        if (!formData.name || !formData.address || !formData.city || !formData.zipCode || !formData.country) {
            alert('Please complete all delivery details before proceeding.');
            return;
        }
        setCurrentStep(2);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (paymentMethod === 'QR_PAY' && !formData.transactionId) {
            alert('Critical Error: UPI Transaction ID is mandatory for manual verification.');
            return;
        }
        try {
            const orderData = {
                items: cart,
                total: cartTotal,
                paymentMethod,
                ...formData
            };
            await api.createOrder(orderData);
            clearCart();
            navigate('/order-success');
        } catch (error) {
            console.error(error);
            alert('Mission failure: Logistics relay failed. Please retry.');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-4">
                <div className="text-center">
                    <Rocket className="w-16 h-16 text-gray-800 mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Hangar is Empty</h2>
                    <Link to="/shop" className="neon-btn inline-block">ACQUIRE GEAR</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0c] min-h-screen pb-20 overflow-hidden relative">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00e5ff]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#7000ff]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10 pt-8">
                {/* Top Nav */}
                <div className="flex items-center justify-between mb-12">
                    <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-white transition-all uppercase tracking-[0.3em] group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Abort Mission
                    </Link>

                    <div className="flex items-center gap-4">
                        <StepIndicator active={currentStep >= 1} number="01" label="Logistics" />
                        <div className={`w-12 h-[2px] ${currentStep >= 2 ? 'bg-[#00e5ff]' : 'bg-white/10'}`} />
                        <StepIndicator active={currentStep >= 2} number="02" label="Payment" />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left - Form Content */}
                    <div className="flex-grow">
                        <header className="mb-10">
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase italic">
                                MISSION <span className="text-gradient">DEPLOYMENT</span>
                            </h1>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#00e5ff]">Secured_Tunnel_Active</span>
                            </div>
                        </header>

                        <div className="space-y-12">
                            {currentStep === 1 && (
                                <section className="animate-in fade-in slide-in-from-right-8 duration-500">
                                    <div className="glass-card p-10 relative overflow-hidden group border-white/5">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent" />

                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-12 h-12 bg-[#00e5ff]/10 rounded-2xl flex items-center justify-center border border-[#00e5ff]/20">
                                                <MapPin className="w-6 h-6 text-[#00e5ff]" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Delivery Coordinates</h3>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Set your designated drop-off point</p>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-[9px] uppercase font-black tracking-[0.3em] text-gray-400 ml-1">Full Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-all font-bold placeholder:text-gray-800 placeholder:italic"
                                                        placeholder="John Doe"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[9px] uppercase font-black tracking-[0.3em] text-gray-400 ml-1">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        name="country" /* Note: Assuming we map 'country' to phone for simplicity, or we should use it for State */
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-all font-bold placeholder:text-gray-800 placeholder:italic"
                                                        placeholder="+1 234 567 8900"
                                                        value={formData.country}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[9px] uppercase font-black tracking-[0.3em] text-gray-400 ml-1">Complete Address</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-all font-bold placeholder:text-gray-800 placeholder:italic"
                                                    placeholder="123 Main Street, Apt 4B"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-[9px] uppercase font-black tracking-[0.3em] text-gray-400 ml-1">City</label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-white/20 transition-all font-bold"
                                                        placeholder="New York"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[9px] uppercase font-black tracking-[0.3em] text-gray-400 ml-1">Zip Code</label>
                                                    <input
                                                        type="text"
                                                        name="zipCode"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-white/20 transition-all font-bold"
                                                        placeholder="10001"
                                                        value={formData.zipCode}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={nextStep}
                                            className="mt-12 neon-btn w-full flex items-center justify-center gap-3 py-5 uppercase font-black tracking-[0.3em] italic"
                                        >
                                            CONTINUE TO SECURITY <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </section>
                            )}

                            {currentStep === 2 && (
                                <section className="animate-in fade-in slide-in-from-right-8 duration-500">
                                    <div className="glass-card p-10 relative overflow-hidden group border-white/5">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7000ff]/50 to-transparent" />

                                        <div className="flex items-center justify-between mb-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-[#7000ff]/10 rounded-2xl flex items-center justify-center border border-[#7000ff]/20">
                                                    <CreditCard className="w-6 h-6 text-[#7000ff]" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Payment Protocol</h3>
                                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Secure your hardware acquisition</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setCurrentStep(1)} className="text-[9px] font-black text-[#00e5ff] uppercase tracking-widest hover:underline">Edit Logistics</button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-10 text-center">
                                            <PaymentMethod
                                                id="QR_PAY"
                                                label="Scan & Pay (UPI)"
                                                icon={<QrCode />}
                                                active={paymentMethod === 'QR_PAY'}
                                                onClick={() => setPaymentMethod('QR_PAY')}
                                            />
                                        </div>

                                        {paymentMethod === 'QR_PAY' ? (
                                            <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                                <div className="relative p-8 bg-black/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col items-center">
                                                    {/* Scanning Animation Over QR */}
                                                    <div className="relative z-10 bg-white p-5 rounded-[2rem] shadow-[0_0_50px_rgba(0,229,255,0.1)] mb-6">
                                                        <div className="relative overflow-hidden rounded-2xl w-[200px] h-[200px]">
                                                            <img src="/payment_qr.png" alt="Payment QR" className="w-full h-full object-contain" />
                                                            {/* Scanning Line */}
                                                            <div className="absolute left-0 w-full h-1 bg-[#00e5ff] shadow-[0_0_15px_#00e5ff] opacity-50 animate-scan pointer-events-none" />
                                                        </div>
                                                    </div>

                                                    <div className="text-center space-y-2 relative z-10">
                                                        <p className="text-xl font-black text-white italic tracking-tighter uppercase">Total Amount: ${cartTotal.toFixed(2)}</p>
                                                        <p className="text-[9px] font-black text-[#00e5ff] uppercase tracking-[0.4em] mb-4">Awaiting Signal...</p>
                                                        <div className="flex items-center justify-center gap-2 text-gray-500">
                                                            <Info className="w-3 h-3" />
                                                            <span className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">Scan with GPay, PhonePe, or Paytm</span>
                                                        </div>
                                                    </div>

                                                    {/* Technical background elements */}
                                                    <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-white/5 rounded-tr-3xl" />
                                                    <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-white/5 rounded-bl-3xl" />
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between ml-1 text-[9px] font-black uppercase tracking-[0.3em]">
                                                        <span className="text-[#00e5ff]">Verified Transaction ID</span>
                                                        <span className="text-yellow-500">MANDATORY_FIELD</span>
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            name="transactionId"
                                                            required
                                                            placeholder="Enter 12-digit Ref Number"
                                                            className="w-full bg-[#00e5ff]/5 border border-[#00e5ff]/20 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-[#00e5ff] transition-all font-mono text-sm tracking-wider animate-pulse-border"
                                                            value={formData.transactionId}
                                                            onChange={handleChange}
                                                        />
                                                        <CheckCircle2 className={`absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-500 ${formData.transactionId.length >= 8 ? 'text-green-500 scale-100 opacity-100' : 'text-white/10 scale-50 opacity-0'}`} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-10 bg-white/5 border border-dashed border-white/10 rounded-3xl text-center space-y-4 animate-in zoom-in-95 duration-500">
                                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                                    <Rocket className="w-8 h-8 text-gray-500" />
                                                </div>
                                                <h4 className="text-sm font-black text-white uppercase tracking-widest italic">Analog Payment Mode Selected</h4>
                                                <p className="text-xs text-gray-500 leading-relaxed font-bold">Logistics agents will collect credits upon physical hardware handover.</p>
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit}>
                                            <button
                                                type="submit"
                                                className={`mt-12 w-full flex items-center justify-center gap-4 py-6 rounded-full font-black tracking-[0.4em] uppercase transition-all duration-500 relative overflow-hidden group ${(paymentMethod === 'QR_PAY' && !formData.transactionId)
                                                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                                    : 'bg-white text-black hover:bg-[#00e5ff] hover:text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95'
                                                    }`}
                                            >
                                                <span className="relative z-10 italic">Execute Final Deployment</span>
                                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </form>
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Right - Mission Briefing */}
                    <div className="lg:w-96 flex-shrink-0">
                        <div className="glass-card p-10 border-white/5 sticky top-24 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16" />
                            <h3 className="text-[10px] font-black tracking-[0.5em] text-[#00e5ff] uppercase mb-10 border-b border-white/5 pb-4 italic">Cargo manifest</h3>

                            <div className="space-y-8 mb-10">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex-shrink-0 border border-white/5 overflow-hidden group-hover:border-[#00e5ff]/30 transition-all p-1">
                                            <img src={item.imageUrl} alt="" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-1">
                                                <div className="text-xs font-black text-white uppercase tracking-tighter leading-none line-clamp-1">{item.name}</div>
                                                <div className="text-xs font-mono font-bold text-white pl-2">${(item.price * item.quantity).toFixed(2)}</div>
                                            </div>
                                            <div className="text-[9px] text-[#00e5ff] uppercase font-black tracking-widest opacity-70 italic">QUANTITY: {item.quantity}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-white/5 border-dashed">
                                <SummaryDetail label="Hardware Value" value={`$${cartTotal.toFixed(2)}`} />
                                <SummaryDetail label="Logistics Tax" value="EXEMPT" color="#00e5ff" />
                                <div className="flex justify-between items-end pt-6">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Payload</span>
                                        <span className="text-4xl font-black text-white tracking-tighter italic leading-none">${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 p-4 bg-[#00e5ff]/5 border border-[#00e5ff]/10 rounded-2xl flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-[#00e5ff]/10 flex items-center justify-center border border-[#00e5ff]/20">
                                    <ShieldCheck className="w-4 h-4 text-[#00e5ff]" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-white uppercase tracking-widest">Secured Transmission</p>
                                    <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest mt-0.5">AES-256 Encrypted</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StepIndicator = ({ active, number, label }) => (
    <div className="flex flex-col items-center gap-2">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-500 border ${active
            ? 'checkout-step-active border-transparent'
            : 'bg-white/5 border-white/10 text-gray-600'
            }`}>
            {number}
        </div>
        <span className={`text-[8px] font-black uppercase tracking-[0.3em] ${active ? 'text-white' : 'text-gray-700'}`}>{label}</span>
    </div>
);

const PaymentMethod = ({ id, label, icon, active, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`p-8 rounded-[2rem] border transition-all duration-500 flex flex-col items-center gap-4 group relative overflow-hidden ${active
            ? 'bg-[#7000ff]/10 border-[#7000ff] text-white'
            : 'bg-white/[0.02] border-white/5 text-gray-600 hover:border-white/20 hover:text-gray-400'
            }`}
    >
        {active && <div className="absolute top-0 right-0 w-24 h-24 bg-[#7000ff]/10 blur-3xl -mr-12 -mt-12" />}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${active ? 'bg-[#7000ff]/20 text-[#7000ff] scale-110' : 'bg-white/5'}`}>
            {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
        {active && <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#7000ff] rounded-full" />}
    </button>
);

const SummaryDetail = ({ label, value, color }) => (
    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
        <span className="text-gray-600">{label}</span>
        <span className="font-bold tracking-tighter bg-white/5 px-2 py-1 rounded border border-white/5" style={{ color: color || 'white' }}>{value}</span>
    </div>
);

export default Checkout;
