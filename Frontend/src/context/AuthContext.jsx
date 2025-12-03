import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();

    const login = async (formData) => {
        try {
            const { data } = await api.signIn(formData);
            setUser(data);
            localStorage.setItem('profile', JSON.stringify(data));
            navigate('/');
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    const register = async (formData) => {
        try {
            const { data } = await api.signUp(formData);
            setUser(data);
            localStorage.setItem('profile', JSON.stringify(data));
            navigate('/');
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
