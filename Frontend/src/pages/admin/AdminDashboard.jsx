import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import * as api from '../../api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBag,
    Users,
    Mail,
    Plus,
    ExternalLink,
    Clock,
    MapPin,
    CreditCard,
    AlertTriangle,
    RefreshCw,
    Database,
    Trash2,
    Package,
    ChevronRight,
    Zap,
    LayoutDashboard,
    ArrowUpRight,
    Activity,
    Scan
} from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders');
    const [data, setData] = useState({
        orders: [],
        users: [],
        contacts: [],
        products: [],
        tutorials: []
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const pilotData = user?.result || user || {};
    const isAdmin = pilotData?.role === 'admin';

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!isAdmin) {
            toast.error("Access Denied: Admin privileges required.");
            navigate('/');
            return;
        }

        fetchData();
    }, [user, isAdmin]);

    const fetchData = async () => {
        setLoading(true);
        setErrorMessage(null);
        try {
            const [ordersRes, usersRes, contactsRes, productsRes, tutorialsRes] = await Promise.all([
                api.fetchAllOrders(),
                api.fetchAllUsers(),
                api.fetchAllContacts(),
                api.fetchProducts(1, '', '', '', '', '', 100),
                api.fetchTutorials()
            ]);

            setData({
                orders: ordersRes.data || [],
                users: usersRes.data || [],
                contacts: contactsRes.data || [],
                products: productsRes.data.result || [],
                tutorials: tutorialsRes.data || []
            });
        } catch (error) {
            console.error("Admin Fetch Error:", error);
            const msg = error.response?.data?.message || error.message || "Failed to establish connection with secure data-tower.";
            setErrorMessage(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, currentStatus) => {
        const statuses = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];
        const currentIndex = statuses.indexOf(currentStatus);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];

        try {
            await api.updateOrderStatus(id, nextStatus);
            toast.success(`Order status updated to ${nextStatus.toUpperCase()}`);
            const ordersRes = await api.fetchAllOrders();
            setData(prev => ({ ...prev, orders: ordersRes.data }));
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("ARE YOU SURE YOU WANT TO DECOMMISSION THIS ASSET?")) return;

        try {
            await api.deleteProduct(id);
            toast.success("ASSET DECOMMISSIONED SUCCESSFULLY");
            const productsRes = await api.fetchProducts(1, '', '', '', '', '', 100);
            setData(prev => ({ ...prev, products: productsRes.data.result }));
        } catch (error) {
            console.error(error);
            toast.error("FAILED TO DECOMMISSION ASSET");
        }
    };

    const handleUpdateStock = async (product, newStock) => {
        try {
            await api.updateProduct(product.id, {
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                imageUrl: product.image_url,
                stock: newStock
            });
            toast.success(`STOCK UPDATED: ${product.name}`);
            const productsRes = await api.fetchProducts(1, '', '', '', '', '', 100);
            setData(prev => ({ ...prev, products: productsRes.data.result }));
        } catch (error) {
            console.error(error);
            toast.error("FAILED TO UPDATE STOCK");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#0a0a0c]">
                <div className="relative">
                    <div className="w-20 h-20 border-2 border-[#00a3ff]/10 border-t-[#00a3ff] rounded-full animate-spin"></div>
                    <Scan className="w-8 h-8 text-[#00a3ff] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="mt-8 text-[#00a3ff] font-mono tracking-widest text-xs uppercase animate-pulse">
                    Loading Admin Data...
                </div>
            </div>
        );
    }

    const handleDeleteTutorial = async (id) => {
        if (!window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS TUTORIAL?")) return;

        try {
            await api.deleteTutorial(id);
            toast.success("TUTORIAL DELETED SUCCESSFULLY");
            const tutorialsRes = await api.fetchTutorials();
            setData(prev => ({ ...prev, tutorials: tutorialsRes.data }));
        } catch (error) {
            console.error(error);
            toast.error("FAILED TO DELETE TUTORIAL");
        }
    };

    const tabs = [
        { id: 'orders', label: 'Order Requests', icon: <ShoppingBag className="w-4 h-4" /> },
        { id: 'inventory', label: 'Inventory Hub', icon: <Database className="w-4 h-4" /> },
        { id: 'academy', label: 'Academy', icon: <Zap className="w-4 h-4" /> },
        { id: 'users', label: 'Pilot Registry', icon: <Users className="w-4 h-4" /> },
        { id: 'contacts', label: 'Comms Log', icon: <Mail className="w-4 h-4" /> },
    ];

    const groupedProducts = data.products.reduce((acc, product) => {
        const cat = product.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(product);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white/90 selection:bg-[#00a3ff]/20 pt-28 pb-20 overflow-x-hidden relative">
            {/* Holographic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00a3ff]/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#818cf8]/5 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/5 relative">
                        <div className="absolute bottom-0 left-0 w-32 h-[2px] bg-[#00a3ff] shadow-[0_0_15px_#00a3ff]" />
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <LayoutDashboard className="w-4 h-4 text-[#00a3ff]" />
                                <span className="text-xs font-bold uppercase tracking-widest text-[#00a3ff]">Quad Hub</span>
                            </div>
                            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase">
                                Quad <span className="text-[#00a3ff]">Control</span>
                            </h1>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/admin/create-product"
                                className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-[#00a3ff] hover:text-white transition-all duration-300 rounded-lg group"
                            >
                                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add Product
                            </Link>
                            <Link
                                to="/admin/create-tutorial"
                                className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-4 border border-white/10 text-white font-black uppercase text-xs tracking-widest hover:bg-white/5 hover:border-[#00a3ff]/40 transition-all duration-300 rounded-lg"
                            >
                                <Zap className="w-4 h-4 text-[#00a3ff]" /> Add Tutorial
                            </Link>
                        </div>
                    </div>
                </motion.header>

                {/* Grid Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 mb-12">
                    <StatCard icon={<ShoppingBag />} label="Requests" value={data.orders.length} delay={0.1} />
                    <StatCard icon={<Database />} label="Inventory" value={data.products.length} delay={0.2} />
                    <StatCard icon={<Zap />} label="Tutorials" value={data.tutorials.length} delay={0.3} />
                    <StatCard icon={<Users />} label="Pilots" value={data.users.length} delay={0.4} />
                    <StatCard icon={<Mail />} label="Signals" value={data.contacts.length} delay={0.5} />
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-white/5 mb-10 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex gap-2 min-w-max pb-1">
                        {tabs.map((tab, idx) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    relative flex items-center gap-3 px-8 py-4 font-bold uppercase text-xs tracking-widest transition-all duration-300
                                    ${activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/70'}
                                `}
                            >
                                {tab.icon}
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00a3ff] shadow-[0_0_10px_#00a3ff]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dynamic Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        {activeTab === 'orders' && <OrdersTab orders={data.orders} onUpdate={handleStatusUpdate} />}
                        {activeTab === 'inventory' && (
                            <InventoryTab
                                grouped={groupedProducts}
                                onDelete={handleDeleteProduct}
                                onNavigate={(p) => navigate(`/product/${p}`)}
                                onUpdateStock={handleUpdateStock}
                            />
                        )}
                        {activeTab === 'academy' && <AcademyTab tutorials={data.tutorials} onDelete={handleDeleteTutorial} />}
                        {activeTab === 'users' && <UsersTab users={data.users} />}
                        {activeTab === 'contacts' && <ContactsTab contacts={data.contacts} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- Sub-Components: Tabs ---

const OrdersTab = ({ orders, onUpdate }) => (
    <div className="space-y-6">
        {orders.length === 0 ? (
            <EmptyState icon={<Scan />} text="No active order transmissions detected" />
        ) : (
            orders.map((order, idx) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={order.id}
                    className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 hover:border-[#00a3ff]/30 transition-all duration-500 group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a3ff]/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex flex-col xl:flex-row justify-between gap-10">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <span className="px-4 py-1.5 bg-[#00a3ff]/10 text-[#00a3ff] text-xs font-bold uppercase tracking-widest rounded-full">
                                    ID: {order.id.toString().padStart(4, '0')}
                                </span>
                                <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full ${order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                    order.status === 'shipped' ? 'bg-blue-500/10 text-blue-500' :
                                        'bg-yellow-500/10 text-yellow-500'
                                    }`}>
                                    {order.status}
                                </span>
                                {order.transaction_id && (
                                    <span className="px-4 py-1.5 bg-white/5 text-white/60 text-xs font-mono uppercase tracking-widest rounded-full flex items-center gap-2">
                                        <Package className="w-3 h-3" /> TXN: {order.transaction_id.slice(-8)}
                                    </span>
                                )}
                                <div className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase ml-auto sm:ml-0">
                                    <Clock className="w-3 h-3" /> {new Date(order.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                                <div>
                                    <p className="text-[#00a3ff] text-xs uppercase font-bold tracking-widest mb-4 opacity-70">Customer Profile</p>
                                    <h4 className="text-xl font-bold text-white tracking-tight">{order.user_name}</h4>
                                    <p className="text-white/50 text-sm mt-1">{order.user_email}</p>
                                </div>
                                <div>
                                    <p className="text-[#00a3ff] text-xs uppercase font-bold tracking-widest mb-4 opacity-70">Shipping Address</p>
                                    <div className="flex items-start gap-3 bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                        <MapPin className="w-4 h-4 text-[#00a3ff]/60 mt-0.5" />
                                        <p className="text-sm leading-relaxed text-white/80">
                                            {order.address}, {order.city}, {order.zip_code}, {order.country}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/5 pt-8">
                                <div className="flex justify-between items-end mb-6">
                                    <p className="text-[#00a3ff] text-xs uppercase font-bold tracking-widest opacity-70">Order Items</p>
                                    <span className="text-white/40 text-xs font-mono">{order.items.reduce((acc, curr) => acc + curr.quantity, 0)} Items Total</span>
                                </div>
                                <div className="grid gap-3">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between bg-black/40 px-6 py-4 rounded-xl border border-white/5 hover:border-white/20 transition-all group/item">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 p-1 flex-shrink-0">
                                                    <img src={item.product?.imageUrl} alt="" className="w-full h-full object-cover rounded-md opacity-80 group-hover/item:opacity-100 transition-all" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white/90 tracking-tight">{item.product?.name}</span>
                                                    <span className="text-xs font-semibold text-[#00a3ff] mt-1">Qty: {item.quantity}</span>
                                                </div>
                                            </div>
                                            <span className="font-mono text-sm text-white/90 bg-white/5 px-4 py-1.5 rounded-lg border border-white/5">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="xl:w-80 flex flex-col justify-between border-t xl:border-t-0 xl:border-l border-white/5 pt-8 xl:pt-0 xl:pl-10">
                            <div className="bg-[#00a3ff]/5 border border-[#00a3ff]/10 p-8 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#00a3ff]" />
                                <p className="text-[#00a3ff] text-xs uppercase font-bold tracking-widest mb-2 opacity-70">Total Value</p>
                                <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-6">
                                    ${parseFloat(order.total).toFixed(2)}
                                </h3>
                                <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-widest">
                                    <CreditCard className="w-4 h-4 text-[#00a3ff]" /> {order.payment_method?.replace('_', ' ') || 'SECURED_LINK'}
                                </div>
                            </div>
                            <button
                                onClick={() => onUpdate(order.id, order.status)}
                                className="mt-8 w-full py-5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#00a3ff] hover:text-white transition-all duration-300 shadow-lg"
                            >
                                Update Status
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))
        )}
    </div>
);

const InventoryTab = ({ grouped, onDelete, onNavigate, onUpdateStock }) => {
    const [editingId, setEditingId] = useState(null);
    const [tempStock, setTempStock] = useState("");

    const startEdit = (p) => {
        setEditingId(p.id);
        setTempStock(p.stock);
    };

    const saveEdit = (p) => {
        const parsed = parseInt(tempStock);
        if (!isNaN(parsed)) {
            onUpdateStock(p, parsed);
        }
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    return (
        <div className="space-y-16">
            {Object.keys(grouped).length === 0 ? (
                <EmptyState icon={<Database />} text="No hardware packets detected in system" />
            ) : (
                Object.entries(grouped).map(([catName, products], gIdx) => (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: gIdx * 0.1 }}
                        key={catName}
                        className="relative"
                    >
                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{catName}</h2>
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                            <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/50 tracking-widest uppercase">
                                {products.length} Products
                            </span>
                        </div>

                        {/* Desktop View Table */}
                        <div className="hidden lg:block bg-white/[0.02] border border-white/5 overflow-hidden group">
                            <table className="w-full text-left font-mono">
                                <thead className="bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-white/5">
                                    <tr>
                                        <th className="px-8 py-6">Product ID</th>
                                        <th className="px-8 py-6">Item</th>
                                        <th className="px-8 py-6 text-center">Price</th>
                                        <th className="px-8 py-6 text-center">Stock</th>
                                        <th className="px-8 py-6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {products.map((p, pIdx) => (
                                        <tr key={p.id} className="hover:bg-white/[0.03] group/row transition-all duration-300">
                                            <td className="px-8 py-6 text-white/40 font-mono">#{p.id.toString().padStart(3, '0')}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 bg-black/40 rounded-lg border border-white/10 p-1 overflow-hidden">
                                                        <img src={p.image_url} alt="" className="w-full h-full object-cover rounded-md opacity-80 group-hover/row:opacity-100 transition-all" />
                                                    </div>
                                                    <span className="font-bold text-white/90 group-hover/row:text-[#00a3ff] transition-colors">{p.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="font-bold text-white tracking-tight">${p.price}</span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                {editingId === p.id ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <input
                                                            type="number"
                                                            value={tempStock}
                                                            onChange={(e) => setTempStock(e.target.value)}
                                                            className="w-16 bg-white/5 border border-white/20 rounded text-white text-center text-xs py-1.5 focus:border-[#00a3ff] transition-colors"
                                                        />
                                                        <button onClick={() => saveEdit(p)} className="text-[#00a3ff] hover:text-white"><RefreshCw className="w-3 h-3" /></button>
                                                        <button onClick={cancelEdit} className="text-red-500 hover:text-white"><AlertTriangle className="w-3 h-3" /></button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => startEdit(p)}
                                                        className={`cursor-pointer px-4 py-1 border font-black text-[9px] tracking-widest hover:border-[#00a3ff]/50 transition-colors inline-block ${p.stock <= 5 ? 'border-red-500/50 bg-red-500/10 text-red-500 animate-pulse' : 'border-white/10 bg-white/5 text-white/60'
                                                            }`}>
                                                        {p.stock} UNITS
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-3 opacity-40 group-hover/row:opacity-100 transition-opacity">
                                                    <button onClick={() => onNavigate(p.id)} className="p-3 bg-white/5 hover:bg-[#00a3ff] hover:text-white transition-all text-[#00a3ff] border border-white/5">
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => onDelete(p.id)} className="p-3 bg-white/5 hover:bg-red-500 hover:text-white transition-all text-red-500 border border-white/5">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card Layout */}
                        <div className="lg:hidden grid gap-4">
                            {products.map((p) => (
                                <div key={p.id} className="bg-white/[0.03] border border-white/10 p-6 flex flex-col gap-6 group relative overflow-hidden">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-black/40 border border-white/10 p-1 overflow-hidden">
                                            <img src={p.image_url} alt="" className="w-full h-full object-cover opacity-80" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">#{p.id.toString().padStart(3, '0')}</span>
                                                <span className="text-lg font-black text-white italic tracking-tighter">${p.price}</span>
                                            </div>
                                            <h4 className="text-sm font-black text-white uppercase italic tracking-tight leading-tight truncate">{p.name}</h4>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        {editingId === p.id ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={tempStock}
                                                    onChange={(e) => setTempStock(e.target.value)}
                                                    className="w-16 bg-black border border-[#00a3ff] text-white text-center text-xs py-1"
                                                />
                                                <button onClick={() => saveEdit(p)} className="p-1 bg-white/5 text-[#00a3ff] hover:bg-[#00a3ff] hover:text-white"><RefreshCw className="w-4 h-4" /></button>
                                                <button onClick={cancelEdit} className="p-1 bg-white/5 text-red-500 hover:bg-red-500 hover:text-white"><AlertTriangle className="w-4 h-4" /></button>
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => startEdit(p)}
                                                className={`cursor-pointer px-4 py-1.5 border font-black text-[9px] tracking-[0.2em] ${p.stock <= 5 ? 'border-red-500/30 bg-red-500/5 text-red-500' : 'border-white/5 bg-white/5 text-white/40'
                                                    }`}>
                                                RESERVE: {p.stock} U
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            <button onClick={() => onNavigate(p.id)} className="p-3 bg-white/5 text-[#00a3ff] border border-white/5 active:bg-[#00a3ff] active:text-white transition-all">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => onDelete(p.id)} className="p-3 bg-white/5 text-red-500 border border-white/5 active:bg-red-500 active:text-white transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                ))
            )}
        </div>
    );
};

const AcademyTab = ({ tutorials, onDelete }) => (
    <div className="space-y-6">
        {tutorials.length === 0 ? (
            <EmptyState icon={<Zap />} text="No tutorials created yet" />
        ) : (
            tutorials.map((tutorial, idx) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={tutorial.id}
                    className="bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:border-[#00a3ff]/30 transition-all duration-300 group relative overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                        <div className="flex-1">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase text-white/50 tracking-widest mb-4 inline-block">
                                Author: {tutorial.author}
                            </span>
                            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">{tutorial.title}</h3>
                            <p className="text-white/50 text-sm line-clamp-2 leading-relaxed">{tutorial.content}</p>
                            {tutorial.video_url && (
                                <a href={tutorial.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-4 text-[#00a3ff] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                                    <Activity className="w-3 h-3" /> Watch Video
                                </a>
                            )}
                        </div>
                        <div className="flex flex-row md:flex-col items-end gap-3 justify-between md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                            <div className="text-white/40 text-xs font-mono uppercase tracking-widest">
                                {new Date(tutorial.created_at).toLocaleDateString()}
                            </div>
                            <button onClick={() => onDelete(tutorial.id)} className="p-3 bg-white/5 text-red-500 rounded-lg active:bg-red-500 active:text-white hover:bg-red-500/10 transition-all flex items-center gap-2 group/del">
                                <Trash2 className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest hidden md:inline-block group-hover/del:text-red-500">Delete</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))
        )}
    </div>
);

const UsersTab = ({ users }) => (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left font-mono">
                <thead className="bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-white/5">
                    <tr>
                        <th className="px-8 py-6">User ID</th>
                        <th className="px-8 py-6">Name</th>
                        <th className="px-8 py-6">Email Address</th>
                        <th className="px-8 py-6">Role</th>
                        <th className="px-8 py-6 text-right">Joined</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                    {users.map((u, idx) => (
                        <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.03 }}
                            key={u.id}
                            className="hover:bg-white/[0.03] transition-colors"
                        >
                            <td className="px-8 py-5 text-white/40">#{u.id}</td>
                            <td className="px-8 py-5 font-bold text-white tracking-tight">{u.name || 'Unknown'}</td>
                            <td className="px-8 py-5 text-white/60">{u.email}</td>
                            <td className="px-8 py-5">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${u.role === 'admin' ? 'bg-[#00a3ff]/10 text-[#00a3ff]' : 'bg-white/5 text-white/50'
                                    }`}>
                                    {u.role}
                                </span>
                            </td>
                            <td className="px-8 py-5 text-right text-white/40">
                                {new Date(u.created_at).toLocaleDateString()}
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ContactsTab = ({ contacts }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.length === 0 ? (
            <div className="col-span-full"><EmptyState icon={<Mail />} text="No messages found" /></div>
        ) : (
            contacts.map((contact, idx) => (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={contact.id}
                    className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:border-[#00a3ff]/20 transition-all duration-300 relative overflow-hidden group h-full flex flex-col"
                >
                    <div className="absolute top-0 right-0 p-6">
                        <span className="text-white/5 text-5xl font-bold leading-none group-hover:text-[#00a3ff]/10 transition-colors">
                            {String(contact.id).padStart(2, '0')}
                        </span>
                    </div>
                    <div className="mb-8 relative">
                        <p className="text-[#00a3ff] text-xs uppercase font-bold tracking-widest mb-2 opacity-70">From</p>
                        <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">{contact.name}</h3>
                        <p className="text-white/50 text-sm mt-1">{contact.email}</p>
                    </div>
                    <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 relative flex-1 mb-8">
                        <p className="text-white/80 text-sm leading-relaxed">"{contact.message}"</p>
                    </div>
                    <div className="flex items-center justify-between text-white/40 text-xs font-mono tracking-widest uppercase border-t border-white/5 pt-6">
                        <span>{new Date(contact.created_at).toLocaleDateString()}</span>
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-[#00a3ff] hover:text-white transition-colors">
                            Reply <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </motion.div>
            ))
        )}
    </div>
);

const StatCard = ({ icon, label, value, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-[#00a3ff]/30 transition-all cursor-default"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a3ff]/5 blur-[60px] -mr-16 -mt-16 group-hover:bg-[#00a3ff]/10 transition-all duration-500" />
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-[#00a3ff]/60 group-hover:text-[#00a3ff] transition-colors duration-300">
                    {React.cloneElement(icon, { size: 16 })}
                </span>
                <p className="text-white/50 font-bold text-xs uppercase tracking-widest group-hover:text-white/80 transition-colors">{label}</p>
            </div>
            <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none">{String(value).padStart(2, '0')}</p>
        </div>
    </motion.div>
);

const EmptyState = ({ icon, text }) => (
    <div className="py-32 flex flex-col items-center justify-center border border-dashed border-white/5 bg-white/[0.01] rounded-3xl">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/20 group">
            {React.cloneElement(icon, { size: 32, className: "group-hover:scale-110 transition-transform" })}
        </div>
        <p className="text-white/40 font-bold text-xs uppercase tracking-widest text-center px-4">{text}</p>
    </div>
);

export default AdminDashboard;
