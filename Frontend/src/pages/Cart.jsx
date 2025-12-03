import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useContext(CartContext);

    return (
        <div className="bg-[#F5F5F0] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Check out our latest products and start building your drone!</p>
                        <Link to="/shop" className="inline-block bg-[#1A1A1A] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#333333] transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                {cart.map((item) => (
                                    <div key={item.id} className="p-6 border-b border-gray-100 last:border-0 flex gap-6">
                                        <div className="w-24 h-24 bg-gray-50 rounded-md flex-shrink-0 flex items-center justify-center">
                                            <img
                                                src={item.imageUrl || 'https://via.placeholder.com/150'}
                                                alt={item.name}
                                                className="max-w-full max-h-full object-contain mix-blend-multiply"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between mb-2">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    <Link to={`/product/${item.id}`} className="hover:text-[#1A1A1A] hover:underline">
                                                        {item.name}
                                                    </Link>
                                                </h3>
                                                <p className="text-lg font-bold text-gray-900">${item.price}</p>
                                            </div>

                                            <p className="text-sm text-green-600 mb-4">In Stock</p>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center border border-gray-300 rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-3 py-1 text-gray-600 hover:bg-gray-50 border-r border-gray-300"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4 py-1 text-gray-900 font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-3 py-1 text-gray-600 hover:bg-gray-50 border-l border-gray-300"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="h-4 w-px bg-gray-300"></div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-sm text-red-600 hover:text-red-800 font-medium hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        
                        <div className="lg:w-80 flex-shrink-0">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cartCount} items)</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-gray-900">
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-[#1A1A1A] text-white py-3 rounded-lg font-medium hover:bg-[#333333] transition-colors shadow-sm mb-3">
                                    Proceed to Checkout
                                </button>

                                <div className="text-xs text-gray-500 text-center">
                                    Secure Checkout provided by Stripe
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
