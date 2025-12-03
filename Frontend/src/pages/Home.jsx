import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-[#F5F5F0] min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-[#1A1A1A] text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://dji-official-fe.djicdn.com/dps/407048a6e395ef255e989db12fd872a1.jpg"
                        alt="FPV Drone Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Elevate Your Flight
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl">
                        Discover premium FPV parts, frames, and accessories for the ultimate drone experience.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/shop" className="bg-[#F5F5F0] text-[#1A1A1A] px-8 py-3 rounded-full font-bold text-lg hover:bg-white transition-colors">
                            Shop Now
                        </Link>
                        <Link to="/tutorials" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Top Deal Section */}
            <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/3">
                        <img src="https://m.media-amazon.com/images/I/61s7s+eR+JL._AC_SL1500_.jpg" alt="Top Deal" className="w-full h-auto object-contain max-h-64 mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-[#CC0C39] text-white text-sm font-bold px-2 py-1 rounded-sm">28% off</span>
                            <span className="text-[#CC0C39] font-bold text-lg">Top Deal</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">DJI O3 Air Unit</h2>
                        <p className="text-gray-600 mb-4">Experience high-definition low-latency transmission with the DJI O3 Air Unit. Perfect for your next build.</p>
                        <Link to="/shop" className="text-[#007185] hover:text-[#C7511F] hover:underline font-medium">See all deals</Link>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Premium Motors</h2>
                        <img src="https://m.media-amazon.com/images/I/61s7s+eR+JL._AC_SL1500_.jpg" alt="Motors" className="w-full h-48 object-contain mb-4 mix-blend-multiply" />
                        <Link to="/shop" className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm font-medium">Shop Motors</Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Durable Frames</h2>
                        <img src="https://m.media-amazon.com/images/I/71rP7f78eFL._AC_SL1500_.jpg" alt="Frames" className="w-full h-48 object-contain mb-4 mix-blend-multiply" />
                        <Link to="/shop" className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm font-medium">Shop Frames</Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4">FPV Cameras</h2>
                        <img src="https://m.media-amazon.com/images/I/61s7s+eR+JL._AC_SL1500_.jpg" alt="Cameras" className="w-full h-48 object-contain mb-4 mix-blend-multiply" />
                        <Link to="/shop" className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm font-medium">Shop Cameras</Link>
                    </div>
                </div>
            </div>

            {/* Discounts Grid */}
            <div className="bg-white py-8 mb-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">Up to 50% off | FPV Essentials</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="bg-gray-100 h-40 mb-4 flex items-center justify-center">
                                    <img src={`https://m.media-amazon.com/images/I/61s7s+eR+JL._AC_SL1500_.jpg`} alt="Product" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="flex gap-2 items-center mb-1">
                                    <span className="bg-[#CC0C39] text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">20% off</span>
                                    <span className="text-[#CC0C39] font-bold text-sm">Deal</span>
                                </div>
                                <p className="text-sm text-gray-700 line-clamp-2">High Performance FPV Motor 2306 1750KV</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
