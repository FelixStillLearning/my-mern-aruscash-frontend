import React from 'react';

const CategoriesPage = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-100">Categories</h1>
                <p className="text-gray-400">Manage your transaction categories</p>
            </div>
            
            <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🏷️</div>
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">Coming Soon</h3>
                        <p className="text-gray-400">
                            Category management features are being developed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;
