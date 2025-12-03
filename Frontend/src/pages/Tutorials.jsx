import React, { useState, useEffect } from 'react';
import * as api from '../api';
import { PlayCircle, User } from 'lucide-react';

const Tutorials = () => {
    const [tutorials, setTutorials] = useState([]);

    useEffect(() => {
        const getTutorials = async () => {
            try {
                const { data } = await api.fetchTutorials();
                setTutorials(data);
            } catch (error) {
                console.log(error);
            }
        };
        getTutorials();
    }, []);

    return (
        <div className="bg-[#F5F5F0] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">FPV Drone Building Tutorials</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutorials.map((tutorial) => (
                        <div key={tutorial.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative pb-[56.25%] bg-gray-200">
                                <img
                                    src={tutorial.thumbnailUrl || 'https://via.placeholder.com/640x360'}
                                    alt={tutorial.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <PlayCircle className="w-16 h-16 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <span className="bg-[#1A1A1A] text-white px-2 py-0.5 rounded text-xs font-bold mr-2">
                                        {tutorial.difficulty || 'Beginner'}
                                    </span>
                                    <span>{tutorial.duration || '10 min'}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                    {tutorial.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {tutorial.description}
                                </p>
                                <button 
                                        onClick={() => window.open(`https://www.youtube.com/watch?v=wkfEZmsQqiA&list=PLn8PRpmsu08pQBgjxYFXSsODEF3Jqmm-y`, "_blank")}
                                        className="text-[#1A1A1A] font-medium hover:underline flex items-center gap-1">
                                        Watch Tutorial <span className="text-lg">›</span>
                                        </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tutorials;
