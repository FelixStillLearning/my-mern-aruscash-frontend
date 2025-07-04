import React, { useState, useEffect } from 'react';
import transactionService from '../services/transactionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TransactionForm = ({ onSave, transactionToEdit, onCancel }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense'); // 'income' or 'expense'
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (transactionToEdit) {
            setDescription(transactionToEdit.description);
            setAmount(transactionToEdit.amount);
            setType(transactionToEdit.type);
            setCategory(transactionToEdit.category);
            setDate(new Date(transactionToEdit.date).toISOString().split('T')[0]);
        } else {
            // Reset form if no transaction to edit
            setDescription('');
            setAmount('');
            setType('expense');
            setCategory('');
            setDate('');
        }
    }, [transactionToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            alert('Please log in to add transactions.');
            return;
        }

        const transactionData = {
            description,
            amount: parseFloat(amount),
            type,
            category,
            date,
        };

        try {
            if (transactionToEdit) {
                await transactionService.updateTransaction(transactionToEdit._id, transactionData, user.token);
                alert('Transaction updated successfully!');
            } else {
                await transactionService.addTransaction(transactionData, user.token);
                alert('Transaction added successfully!');
            }
            onSave(); // Callback to refresh transactions in parent component
            onCancel(); // Close the form
        } catch (error) {
            console.error('Error saving transaction:', error);
            alert('Failed to save transaction.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="glass-card p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">{transactionToEdit ? 'Edit Transaction' : 'Add New Transaction'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">Description</label>
                        <input
                            type="text"
                            id="description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-lighter border-dark-lighter"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-gray-300 text-sm font-bold mb-2">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-lighter border-dark-lighter"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="type" className="block text-gray-300 text-sm font-bold mb-2">Type</label>
                        <select
                            id="type"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-lighter border-dark-lighter"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-300 text-sm font-bold mb-2">Category</label>
                        <input
                            type="text"
                            id="category"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-lighter border-dark-lighter"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="date" className="block text-gray-300 text-sm font-bold mb-2">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-lighter border-dark-lighter"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {transactionToEdit ? 'Update Transaction' : 'Add Transaction'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;