import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);

export const fetchProducts = (page, search, category, minPrice, maxPrice, sort) =>
    API.get(`/products?page=${page}&search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`);
export const fetchProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const updateProduct = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const fetchTutorials = () => API.get('/tutorials');
export const fetchTutorial = (id) => API.get(`/tutorials/${id}`);
export const createTutorial = (newTutorial) => API.post('/tutorials', newTutorial);
export const updateTutorial = (id, updatedTutorial) => API.patch(`/tutorials/${id}`, updatedTutorial);
export const deleteTutorial = (id) => API.delete(`/tutorials/${id}`);

export const createOrder = (orderData) => API.post('/orders', orderData);
export const submitContactForm = (formData) => API.post('/contact', formData);
