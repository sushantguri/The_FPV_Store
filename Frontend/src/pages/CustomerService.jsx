
import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';
import * as api from '../api';

const CustomerService = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.submitContactForm(formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-[#F5F5F0] min-h-screen">
            {/* Hero Header */}
            <div className="bg-[#1A1A1A] text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                        How can we help you today?
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        We're here to help with any questions about your FPV drone build, orders, or parts.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Cards */}
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#F5F5F0] rounded-full flex items-center justify-center mx-auto mb-6">
                            <Phone className="w-8 h-8 text-[#1A1A1A]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                        <p className="text-gray-500 mb-4">Mon-Fri from 9am to 6pm PST</p>
                        <a href="tel:+15551234567" className="text-[#1A1A1A] font-bold hover:text-[#333333] text-lg">
                            +1 (555) 123-4567
                        </a>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#F5F5F0] rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="w-8 h-8 text-[#1A1A1A]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-500 mb-4">We'll get back to you within 24 hours</p>
                        <a href="mailto:support@fpvhaven.com" className="text-[#1A1A1A] font-bold hover:text-[#333333] text-lg">
                            support@fpvhaven.com
                        </a>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#F5F5F0] rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8 text-[#1A1A1A]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                        <p className="text-gray-500 mb-4">Come say hi at our HQ</p>
                        <p className="text-[#1A1A1A] font-bold text-lg">
                            123 Drone Valley<br />San Francisco, CA
                        </p>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="mt-16 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-12 bg-[#F5F5F0]">
                        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Send us a message</h2>
                        <p className="text-gray-600 mb-8">
                            Fill out the form and our team will get back to you as soon as possible.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-gray-600">
                                <Clock className="w-6 h-6 text-[#1A1A1A]" />
                                <span>Fast response time</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-600">
                                <MessageSquare className="w-6 h-6 text-[#1A1A1A]" />
                                <span>Expert support team</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 p-12">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1A1A1A] focus:border-[#1A1A1A]"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1A1A1A] focus:border-[#1A1A1A]"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1A1A1A] focus:border-[#1A1A1A]"
                                    placeholder="How can we help?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-[#1A1A1A] hover:bg-[#333333] text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>
                            {status === 'success' && (
                                <p className="text-green-600 text-center mt-2">Message sent successfully!</p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-600 text-center mt-2">Failed to send message. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerService;
