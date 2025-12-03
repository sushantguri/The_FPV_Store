import React from 'react';

const TutorialCard = ({ tutorial }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{tutorial.content}</p>
                {tutorial.videoUrl && (
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                        <iframe
                            src={tutorial.videoUrl.replace('watch?v=', 'embed/')}
                            title={tutorial.title}
                            
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded"
                        ></iframe>
                    </div>
                )}
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {tutorial.author || 'Admin'}</span>
                    <span>{new Date(tutorial.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default TutorialCard;
