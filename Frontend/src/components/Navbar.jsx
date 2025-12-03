
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const user = authContext.user;

    const cartContext = useContext(CartContext);
    const cartCount = cartContext.cartCount;

    return (
        <nav className="bg-[#262626] text-white sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 py-2 gap-4">
                <Link to="/" className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm">
                    <span className="text-2xl font-bold tracking-tighter">FPV Haven</span>
                </Link>

                <div className="flex-1 max-w-3xl hidden md:flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#FF9900]">
                    <div className="bg-[#E6E6E6] text-gray-600 px-3 flex items-center text-xs border-r border-gray-300 cursor-pointer hover:bg-gray-300 transition-colors">
                        All <span className="ml-1">▼</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Search FPV Haven"
                        className="flex-1 px-3 text-black focus:outline-none"
                    />
                    <button className="bg-[#333333] hover:bg-[#404040] text-white px-4 flex items-center justify-center transition-colors">
                        <Search className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm cursor-pointer">
                        <span className="font-bold text-sm">EN</span>
                        <span className="text-xs">▼</span>
                    </div>

                    <Link to={user ? "/dashboard" : "/login"} className="hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm">
                        <div className="text-xs text-gray-300">Hello, {user ? user.name : 'sign in'}</div>
                        <div className="font-bold text-sm leading-none">Account & Lists <span className="text-xs">▼</span></div>
                    </Link>

                    <Link to="/orders" className="hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm">
                        <div className="text-xs text-gray-300">Returns</div>
                        <div className="font-bold text-sm leading-none">& Orders</div>
                    </Link>

                    <Link to="/cart" className="flex items-end hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm">
                        <div className="relative">
                            <ShoppingCart className="h-8 w-8" />
                            <span className="absolute -top-1 -right-1 bg-[#F5F5F0] text-[#1A1A1A] text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        </div>
                        <span className="font-bold text-sm mb-1 ml-1">Cart</span>
                    </Link>
                </div>
            </div>

            <div className="bg-[#1F1F1F] text-white text-sm px-4 py-1.5 flex items-center gap-4 overflow-x-auto">
                <button className="flex items-center gap-1 font-bold hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm">
                    <Menu className="h-5 w-5" /> All
                </button>
                <Link to="/shop" className="hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm">Today's Deals</Link>
                <Link to="/customer-service" className="hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm">Customer Service</Link>
                <Link to="/shop" className="hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm">Gift Cards</Link>
                <Link to="/shop" className="hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm">Sell</Link>
            </div>
        </nav>
    );
};

export default Navbar;
