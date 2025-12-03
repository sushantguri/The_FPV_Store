import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import * as api from '../api';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart, Heart } from 'lucide-react';

const Shop = () => {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const { data } = await api.fetchProducts(page, search, category, minPrice, maxPrice, sort);
                setProducts(data.result);
                setTotalPages(data.pagination.pages);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [page, search, category, minPrice, maxPrice, sort]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    return (
        <div className="bg-[#F5F5F0] min-h-screen">
            <div className="max-w-[1500px] mx-auto flex">
                {/* Left Sidebar - Filters */}
                <div className="w-64 p-4 border-r border-gray-200 hidden md:block bg-white">
                    <h3 className="font-bold text-sm mb-2">Department</h3>
                    <ul className="text-sm space-y-1 mb-4">
                        {['Motors', 'Frames', 'Electronics', 'Cameras', 'Batteries', 'Props'].map(cat => (
                            <li key={cat}>
                                <button
                                    onClick={() => setCategory(cat)}
                                    className={`hover:text-[#1A1A1A] hover:underline ${category === cat ? 'font-bold text-[#1A1A1A]' : 'text-gray-600'}`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => setCategory('')}
                                className={`hover:text-[#1A1A1A] hover:underline ${category === '' ? 'font-bold text-[#1A1A1A]' : 'text-gray-600'}`}
                            >
                                All Departments
                            </button>
                        </li>
                    </ul>

                    <h3 className="font-bold text-sm mb-2">Price</h3>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm">$</span>
                        <input
                            type="number"
                            placeholder="Min"
                            className="w-16 p-1 border border-gray-300 rounded text-sm"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <span className="text-sm">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            className="w-16 p-1 border border-gray-300 rounded text-sm"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <button className="px-2 py-1 bg-white border border-gray-300 rounded text-sm shadow-sm hover:bg-gray-50">Go</button>
                    </div>

                    <h3 className="font-bold text-sm mb-2">Avg. Customer Review</h3>
                    <div className="space-y-1 cursor-pointer">
                        {[4, 3, 2, 1].map(star => (
                            <div key={star} className="flex items-center gap-1 text-sm hover:text-[#1A1A1A] hover:underline">
                                <div className="flex text-[#FF9900]">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>{i < star ? '★' : '☆'}</span>
                                    ))}
                                </div>
                                <span className="text-gray-600">& Up</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content - Products */}
                <div className="flex-1 p-4">
                    <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-sm shadow-sm">
                        <div className="text-sm text-gray-600">
                            {products.length} results {category && `for "${category}"`}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Sort by:</span>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="text-sm border border-gray-300 rounded p-1 bg-[#F0F2F2] hover:bg-[#E3E6E6] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
                            >
                                <option value="">Featured</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="rating">Avg. Customer Review</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A1A1A]"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white border border-gray-200 rounded-sm p-4 flex flex-col hover:shadow-lg transition-shadow">
                                    <div className="h-48 bg-gray-50 mb-4 flex items-center justify-center relative group">
                                        <img
                                            src={product.imageUrl || 'https://via.placeholder.com/150'}
                                            alt={product.name}
                                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                                        />
                                        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                                            <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                                        </button>
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <Link to={`/product/${product.id}`} className="text-base font-medium text-gray-900 hover:text-[#1A1A1A] hover:underline line-clamp-2 mb-1">
                                            {product.name}
                                        </Link>

                                        <div className="flex items-center gap-1 mb-1">
                                            <div className="flex text-[#FF9900] text-sm">
                                                {'★'.repeat(Math.round(product.rating || 4))}
                                                {'☆'.repeat(5 - Math.round(product.rating || 4))}
                                            </div>
                                            <span className="text-xs text-[#007185] hover:underline cursor-pointer">1,234</span>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="flex items-baseline gap-1.5 mb-2">
                                                <span className="text-xs align-top mt-1">$</span>
                                                <span className="text-2xl font-medium">{Math.floor(product.price)}</span>
                                                <span className="text-xs align-top mt-1">{(product.price % 1).toFixed(2).substring(2)}</span>
                                            </div>

                                            <div className="text-xs text-gray-500 mb-3">
                                                Delivery <span className="font-bold text-gray-700">Tomorrow, Dec 4</span>
                                            </div>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="w-full bg-[#1A1A1A] hover:bg-[#333333] text-white border border-transparent rounded-full py-1.5 text-sm shadow-sm active:shadow-inner transition-colors"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center space-x-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`px-3 py-1 border rounded shadow-sm text-sm font-medium ${page === i + 1
                                        ? 'bg-white border-[#1A1A1A] text-[#1A1A1A] ring-1 ring-[#1A1A1A]'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
