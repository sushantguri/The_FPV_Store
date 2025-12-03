import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        zipCode: '',
        country: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                items: cart,
                total: cartTotal,
                ...formData
            };
            await api.createOrder(orderData);
            clearCart();
            navigate('/order-success');
        } catch (error) {
            console.error(error);
            alert('Failed to place order. Please try again.');
        }
    };

    if (cart.length === 0) {
        return <div className="text-center py-20">Your cart is empty.</div>;
    }

    return (
        <div className="bg-[#F5F5F0] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8 text-center">Checkout</h1>

                <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Shipping Information</h3>
                                <p className="mt-1 text-sm text-gray-500">Please enter your shipping details.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            required
                                            className="shadow-sm focus:ring-[#1A1A1A] focus:border-[#1A1A1A] block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            required
                                            className="shadow-sm focus:ring-[#1A1A1A] focus:border-[#1A1A1A] block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                                        ZIP / Postal Code
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="zipCode"
                                            id="zipCode"
                                            required
                                            className="shadow-sm focus:ring-[#1A1A1A] focus:border-[#1A1A1A] block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="country"
                                            id="country"
                                            required
                                            className="shadow-sm focus:ring-[#1A1A1A] focus:border-[#1A1A1A] block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Order Summary</h3>
                                <div className="mt-4 bg-gray-50 p-4 rounded-md">
                                    <div className="flex justify-between text-sm font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${cartTotal.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between text-sm font-medium text-gray-900 mt-2">
                                        <p>Shipping</p>
                                        <p>Free</p>
                                    </div>
                                    <div className="flex justify-between text-base font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
                                        <p>Total</p>
                                        <p>${cartTotal.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-5">
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1A1A1A] hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A1A1A]"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
