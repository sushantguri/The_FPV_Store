import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../api';
import { ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await fetchProduct(id);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (!product) return <div className="text-center py-12">Product not found.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                        src={product.imageUrl || 'https://via.placeholder.com/600'}
                        alt={product.name}
                        className="w-full h-full object-center object-cover"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="mt-4 text-xl text-indigo-600 font-semibold">${product.price}</p>
                    <div className="mt-4 prose prose-sm text-gray-500">
                        <p>{product.description}</p>
                    </div>
                    <div className="mt-6">
                        <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-900">{product.category}</span></p>
                        <p className="text-sm text-gray-500 mt-1">Stock: <span className="font-medium text-gray-900">{product.stock}</span></p>
                    </div>
                    <div className="mt-8">
                        <button className="flex items-center justify-center w-full md:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                            <ShoppingCart className="w-6 h-6 mr-2" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
