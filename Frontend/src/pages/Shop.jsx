
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import * as api from '../api';
import { Link, useLocation } from 'react-router-dom';
import {
    Search, Filter, ShoppingCart, Heart, SlidersHorizontal, ChevronRight,
    Sparkles, LayoutGrid, List, Cpu, Crosshair, Wifi, Battery, Terminal,
    Scan, Grid, Zap, Activity, Radio, Box, X, Hammer, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
    { id: '', label: 'ALL SYSTEMS', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'motors', label: 'MOTORS', icon: <Zap className="w-4 h-4" /> },
    { id: 'frames', label: 'FRAMES', icon: <Box className="w-4 h-4" /> },
    { id: 'electronics', label: 'ELECTRONICS', icon: <Cpu className="w-4 h-4" /> },
    { id: 'fpv-equipment', label: 'FPV EQUIPMENT', icon: <Radio className="w-4 h-4" /> },
    { id: 'battery-charging', label: 'BATTERY & CHARGING', icon: <Battery className="w-4 h-4" /> },
    { id: 'propellers', label: 'PROPELLERS', icon: <Activity className="w-4 h-4" /> },
    { id: 'radio-receiver', label: 'RADIO & RECEIVER', icon: <Wifi className="w-4 h-4" /> },
    { id: 'accessories', label: 'ACCESSORIES', icon: <SlidersHorizontal className="w-4 h-4" /> },
];

const Shop = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category') || '';

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    // Debounce search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearch(query);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const [category, setCategory] = useState(initialCategory);

    // Sync category from URL
    useEffect(() => {
        setCategory(queryParams.get('category') || '');
    }, [location.search]);

    const { addToCart } = useContext(CartContext);

    // Filters
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('');

    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const currentCategory = category.replace(/-/g, ' ');
                const { data } = await api.fetchProducts(page, search, currentCategory, minPrice, maxPrice, sort);
                setProducts(data.result);
                setTotalPages(data.pagination.pages || 1);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [page, search, category, minPrice, maxPrice, sort]);

    // Group products by category when in "All" view
    const groupedProducts = category
        ? null
        : products.reduce((acc, product) => {
            const cat = product.category || 'Other';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(product);
            return acc;
        }, {});

    return (
        <div className="bg-[#050505] min-h-screen pb-20 overflow-x-hidden relative font-sans text-white/90 selection:bg-[#00a3ff]/20">
            {/* HUD / Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00a3ff]/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00e5ff]/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 pt-28">
                {/* Armory Header */}
                <header className="mb-12">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/5 relative">
                        <div className="absolute bottom-0 left-0 w-32 h-[2px] bg-[#00a3ff] shadow-[0_0_15px_#00a3ff]" />

                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="px-3 py-1 bg-[#00a3ff]/10 border border-[#00a3ff]/20 text-[#00a3ff] text-[9px] font-black uppercase tracking-[0.2em] italic flex items-center gap-2">
                                    <Wifi className="w-3 h-3" /> LINK: STABLE [ SECURE CONNECTION ]
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-white/20 font-mono text-[9px] uppercase tracking-[0.5em] mb-2 font-bold">V.4.0.2</span>
                                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white uppercase italic leading-[0.8] flex flex-wrap items-center gap-x-6">
                                    ARMORY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a3ff] to-[#00e5ff] pl-2 pr-6 md:pr-10 drop-shadow-[0_0_20px_rgba(0,163,255,0.3)]">REQUISITION</span>
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-6 pb-2">
                            <div className="flex items-baseline gap-4 text-right">
                                <span className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em]">AVAILABLE ASSETS</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-white italic leading-none">{products.length}</span>
                                    <span className="text-white/40 font-black text-[10px] uppercase tracking-widest italic">UNITS</span>
                                </div>
                            </div>

                            <div className="relative w-full sm:w-96 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#00a3ff] transition-colors" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                                    placeholder="SEARCH DATABASE..."
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-sm py-4 pl-12 pr-4 text-[10px] focus:outline-none focus:border-[#00a3ff]/20 focus:bg-white/[0.05] transition-all uppercase tracking-[0.2em] font-black placeholder:text-white/5"
                                />
                                <div className="absolute right-0 top-0 bottom-0 w-px bg-white/5" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* HUD Category Bar */}
                <div className="mb-12 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="flex gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => { setCategory(cat.id); setPage(1); }}
                                className={`
                                    px-6 py-2.5 rounded-full flex items-center gap-3 transition-all duration-300 whitespace-nowrap text-[10px] font-black tracking-[0.2em] border
                                    ${category === cat.id
                                        ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                        : 'bg-white/[0.03] border-white/10 text-gray-500 hover:border-[#00a3ff]/40 hover:text-white hover:bg-white/[0.08]'}
                                `}
                            >
                                <span className={category === cat.id ? 'text-[#00a3ff]' : 'text-[#00a3ff]/40 group-hover:text-[#00a3ff]'}>{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* HUD Sidebar */}
                    <aside className={`
                        fixed lg:relative inset-y-0 left-0 z-50 w-80 lg:w-72 transform ${showMobileFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                        transition-transform duration-300 ease-in-out bg-[#050505] lg:bg-transparent lg:block shrink-0
                        p-8 lg:p-0 border-r lg:border-r-0 border-white/10 space-y-8
                    `}>
                        <div className="lg:hidden flex justify-between items-center mb-10">
                            <span className="text-xl font-black uppercase tracking-widest text-[#00a3ff]">System Filters</span>
                            <button onClick={() => setShowMobileFilters(false)}><X className="w-6 h-6" /></button>
                        </div>

                        <div className="p-8 bg-white/[0.01] border border-white/5 relative overflow-hidden group rounded-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2 italic">
                                    {`> FILTER PARAMETERS`}
                                </h3>
                                <div className="w-8 h-8 rounded-full border border-[#00a3ff]/20 flex items-center justify-center relative">
                                    <div className="absolute inset-0 rounded-full border-t border-[#00a3ff] animate-spin duration-[3s]" />
                                    <Box className="w-3 h-3 text-[#00a3ff]/40" />
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <span className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase mb-3 block italic">Credit Range</span>
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="number"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}
                                                placeholder="MIN"
                                                className="w-full bg-black/40 border border-white/10 p-4 rounded-sm text-[10px] focus:border-[#00a3ff]/40 outline-none text-white font-black placeholder:text-white/10 tracking-widest"
                                            />
                                        </div>
                                        <div className="w-2 h-[1px] bg-white/10" />
                                        <div className="relative flex-1">
                                            <input
                                                type="number"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                placeholder="MAX"
                                                className="w-full bg-black/40 border border-white/10 p-4 rounded-sm text-[10px] focus:border-[#00a3ff]/40 outline-none text-white font-black placeholder:text-white/10 tracking-widest"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <span className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase mb-3 block italic">Sort Protocol</span>
                                    <div className="relative group/select">
                                        <select
                                            value={sort}
                                            onChange={(e) => setSort(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 p-4 rounded-sm text-[10px] focus:border-[#00a3ff]/40 outline-none appearance-none cursor-pointer text-white font-black tracking-widest pr-10 uppercase italic"
                                        >
                                            <option value="">DEFAULT SEQUENCE</option>
                                            <option value="price:asc">CREDIT LOW_TO_HIGH</option>
                                            <option value="price:desc">CREDIT HIGH_TO_LOW</option>
                                        </select>
                                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-[#00a3ff] rotate-90" />
                                    </div>
                                </div>
                            </div>

                            {/* Status Links */}
                            <div className="mt-12 space-y-2 border-t border-white/5 pt-8">
                                <p className="text-[9px] font-bold text-[#00a3ff]/40 tracking-[0.1em] mb-4 hover:pl-2 hover:text-[#00a3ff] transition-all cursor-pointer italic">{`READY FOR DEPLOYMENT`}</p>
                                <p className="text-[9px] font-bold text-white/5 tracking-[0.1em] mb-4 hover:pl-2 hover:text-white/20 transition-all cursor-pointer italic">{`SCANNING SECTOR 7`}</p>
                                <p className="text-[9px] font-bold text-white/5 tracking-[0.1em] mb-4 hover:pl-2 hover:text-white/20 transition-all cursor-pointer italic">{`OPTIMIZING ROUTE`}</p>
                            </div>
                        </div>
                    </aside>

                    {/* Module Grid / Sections */}
                    <main className="flex-1">
                        {loading ? (
                            <div className="h-96 flex flex-col items-center justify-center gap-6">
                                <div className="w-16 h-1 bg-white/10 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#00a3ff] animate-[shimmer_2s_infinite]" />
                                </div>
                                <span className="text-[10px] font-bold text-[#00a3ff] tracking-[0.5em] animate-pulse uppercase">Syncing HUD Data...</span>
                            </div>
                        ) : groupedProducts ? (
                            <div className="space-y-24">
                                {Object.keys(groupedProducts).length > 0 ? (
                                    Object.entries(groupedProducts).map(([catName, catProducts]) => (
                                        <section key={catName} className="relative">
                                            <div className="flex items-center gap-6 mb-10">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-[#00a3ff] shadow-[0_0_10px_#00a3ff]" />
                                                    <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic">{catName}</h2>
                                                </div>
                                                <div className="h-[1px] flex-1 bg-gradient-to-right from-white/10 via-white/5 to-transparent" />
                                                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-bold text-white/40 tracking-[0.2em]">
                                                    {catProducts.length} UNITS
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                                                {catProducts.map((product, pIndex) => (
                                                    <motion.div
                                                        key={product.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: pIndex * 0.05, duration: 0.5 }}
                                                    >
                                                        <ProductItem product={product} addToCart={addToCart} />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </section>
                                    ))
                                ) : (
                                    <div className="h-[60vh] flex flex-col items-center justify-center gap-8 border border-[#00a3ff]/10 bg-white/[0.01] relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,163,255,0.05)_0%,transparent_70%)]" />
                                        <div className="relative">
                                            <div className="w-24 h-24 border border-[#00a3ff]/20 flex items-center justify-center relative">
                                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00a3ff]" />
                                                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00a3ff]" />
                                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00a3ff]" />
                                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00a3ff]" />
                                                <Scan className="w-10 h-10 text-[#00a3ff] animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="text-center space-y-2">
                                            <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">SECTOR EMPTY</h3>
                                            <p className="text-[10px] font-bold text-[#00a3ff] tracking-[0.3em] uppercase opacity-70">No assets found matching parameters.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : products.length > 0 ? (
                            <div>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                                    {products.map((product, pIndex) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: pIndex * 0.05, duration: 0.5 }}
                                        >
                                            <ProductItem product={product} addToCart={addToCart} />
                                        </motion.div>
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <div className="mt-20 flex items-center justify-center gap-8 pt-12 border-t border-white/5">
                                        <button
                                            disabled={page === 1}
                                            onClick={() => setPage(p => p - 1)}
                                            className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase transition-all disabled:opacity-20 text-white/60 hover:text-[#00a3ff]"
                                        >
                                            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1" /> Prev_page
                                        </button>
                                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded text-[10px] font-black text-[#00a3ff]">
                                            {page.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}
                                        </div>
                                        <button
                                            disabled={page === totalPages}
                                            onClick={() => setPage(p => p + 1)}
                                            className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase transition-all disabled:opacity-20 text-white/60 hover:text-[#00a3ff]"
                                        >
                                            Next_page <ChevronRight className="w-4 h-4 group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="h-[60vh] flex flex-col items-center justify-center gap-8 border border-[#00a3ff]/10 bg-white/[0.01] relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,163,255,0.05)_0%,transparent_70%)]" />
                                <div className="relative">
                                    <div className="w-24 h-24 border border-[#00a3ff]/20 flex items-center justify-center relative">
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00a3ff]" />
                                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00a3ff]" />
                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00a3ff]" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00a3ff]" />
                                        <Scan className="w-10 h-10 text-[#00a3ff] animate-pulse" />
                                    </div>
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">SECTOR EMPTY</h3>
                                    <p className="text-[10px] font-bold text-[#00a3ff] tracking-[0.3em] uppercase opacity-70">No assets found matching parameters.</p>
                                </div>
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Component: ProductItem ---
const ProductItem = ({ product, addToCart }) => {
    return (
        <motion.div
            whileHover={{ y: -8, transition: { duration: 0.4, ease: "circOut" } }}
            className="group relative bg-black/40 border border-white/5 rounded-sm overflow-hidden hover:border-[#00a3ff]/30 transition-all duration-500 shadow-xl"
        >
            <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 z-10" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 z-10" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 z-10" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 z-10" />

            <div className="aspect-square overflow-hidden bg-black relative">
                <img
                    src={product.image_url || 'https://via.placeholder.com/400'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Constant Scanning Beam on Tag */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-sm text-[8px] font-black uppercase tracking-[0.2em] text-[#00a3ff] hud-scanline">
                        {product.category || 'GEAR.v1'}
                    </span>
                </div>

                {product.stock <= 5 && (
                    <div className="absolute top-4 right-4 z-20">
                        <span className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-[8px] font-black uppercase tracking-widest animate-pulse">
                            <span className="w-1 h-1 bg-red-500 rounded-full" /> CRITICAL_STOCK
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6 md:p-8 relative">
                <div className="flex flex-col mb-6">
                    <span className="text-[8px] font-black text-[#00a3ff] uppercase tracking-[0.2em] mb-2 block">{product.category || 'HARDWARE'}</span>
                    <h3 className="text-sm md:text-lg font-black uppercase tracking-widest text-white line-clamp-1 group-hover:text-[#00a3ff] transition-colors italic leading-none">
                        {product.name}
                    </h3>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xl md:text-2xl font-black text-white tracking-tighter">${product.price}</span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="p-3 text-[#00a3ff] hover:text-[#00e5ff] hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.8)] transition-all duration-300"
                    >
                        <ShoppingCart className="w-6 h-6" />
                    </button>
                </div>

                {/* Holographic Underglow */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00a3ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
};

export default Shop;
