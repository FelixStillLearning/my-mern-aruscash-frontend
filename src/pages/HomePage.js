import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-DEFAULT text-gray-100">
            <div className="text-center p-8">
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
                    ArusKas
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                    Your Personal Finance Tracker
                </p>
                <Link to="/register" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default HomePage;