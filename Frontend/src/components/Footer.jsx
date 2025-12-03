import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#1F1F1F] text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Get to Know Us</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/about" className="hover:underline">About Us</Link></li>
                            <li><Link to="/careers" className="hover:underline">Careers</Link></li>
                            <li><Link to="/press" className="hover:underline">Press Releases</Link></li>
                            <li><Link to="/tutorials" className="hover:underline">Tutorials</Link></li>
                            <li><Link to="/science" className="hover:underline">FPV Science</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Connect with Us</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="#" className="hover:underline flex items-center gap-2"><Facebook size={16} /> Facebook</a></li>
                            <li><a href="#" className="hover:underline flex items-center gap-2"><Twitter size={16} /> Twitter</a></li>
                            <li><a href="#" className="hover:underline flex items-center gap-2"><Instagram size={16} /> Instagram</a></li>
                            <li><a href="#" className="hover:underline flex items-center gap-2"><Youtube size={16} /> Youtube</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Make Money with Us</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/sell" className="hover:underline">Sell on FPV Haven</Link></li>
                            <li><Link to="/affiliate" className="hover:underline">Become an Affiliate</Link></li>
                            <li><Link to="/advertise" className="hover:underline">Advertise Your Products</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Let Us Help You</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/account" className="hover:underline">Your Account</Link></li>
                            <li><Link to="/orders" className="hover:underline">Your Orders</Link></li>
                            <li><Link to="/shipping" className="hover:underline">Shipping Rates & Policies</Link></li>
                            <li><Link to="/customer-service" className="hover:underline">Customer Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 text-center">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <span className="text-2xl font-bold tracking-tighter">FPV Haven</span>
                    </div>
                    <p className="text-sm text-gray-400">
                        © 2024 FPV Haven, Inc. or its affiliates
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
