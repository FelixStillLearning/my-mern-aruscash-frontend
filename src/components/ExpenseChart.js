import React from 'react';

const ExpenseChart = ({ transactions }) => {
    const expenseData = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => {
            const existingCategory = acc.find(item => item.name === curr.category);
            if (existingCategory) {
                existingCategory.value += curr.amount;
            } else {
                acc.push({ name: curr.category, value: curr.amount });
            }
            return acc;
        }, []);

    const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);

    const getCategoryColor = (index) => {
        const colors = ['bg-primary', 'bg-accent', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500', 'bg-indigo-500', 'bg-yellow-500'];
        return colors[index % colors.length];
    };

    return (
        <div className="chart-container">
            <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-48 h-48 rounded-full bg-gradient-to-r from-dark-light to-dark-lighter flex items-center justify-center">
                    {/* This is a placeholder for a more complex chart animation/visual */}
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-primary border-r-accent border-b-purple-500 border-l-pink-500 animate-spin-slow"></div>
                    <div className="w-40 h-40 rounded-full bg-dark-light flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Total</p>
                            <p className="text-xl font-bold">Rp {totalExpense.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {expenseData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(index)} mr-2`}></div>
                        <span className="text-sm">{entry.name}</span>
                        <span className="text-sm font-medium ml-auto">{((entry.value / totalExpense) * 100).toFixed(0)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseChart;
