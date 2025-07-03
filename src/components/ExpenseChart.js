import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19FFD4', '#FF19B8'];

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

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseChart;
