import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import transactionService from '../services/transactionService';
import { LoadingButton } from './LoadingSpinner';

const TransactionForm = ({ onSave, transactionToEdit, onCancel }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: {
            description: '',
            amount: '',
            type: 'expense',
            category: '',
            date: new Date().toISOString().split('T')[0]
        }
    });

    // Transaction categories
    const categories = {
        expense: [
            { value: 'housing', label: '🏠 Housing' },
            { value: 'food', label: '🍽️ Food & Dining' },
            { value: 'transportation', label: '🚗 Transportation' },
            { value: 'entertainment', label: '🎬 Entertainment' },
            { value: 'shopping', label: '🛒 Shopping' },
            { value: 'healthcare', label: '🏥 Healthcare' },
            { value: 'utilities', label: '💡 Utilities' },
            { value: 'education', label: '📚 Education' },
            { value: 'other', label: '📋 Other' }
        ],
        income: [
            { value: 'salary', label: '💼 Salary' },
            { value: 'freelance', label: '💻 Freelance' },
            { value: 'business', label: '🏢 Business' },
            { value: 'investment', label: '📈 Investment' },
            { value: 'bonus', label: '💰 Bonus' },
            { value: 'gift', label: '🎁 Gift' },
            { value: 'other', label: '📋 Other' }
        ]
    };

    useEffect(() => {
        if (transactionToEdit) {
            setValue('description', transactionToEdit.description);
            setValue('amount', transactionToEdit.amount);
            setValue('type', transactionToEdit.type);
            setValue('category', transactionToEdit.category);
            setValue('date', new Date(transactionToEdit.date).toISOString().split('T')[0]);
        } else {
            reset({
                description: '',
                amount: '',
                type: 'expense',
                category: '',
                date: new Date().toISOString().split('T')[0]
            });
        }
    }, [transactionToEdit, setValue, reset]);

    const onSubmit = async (data) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            toast.error('Please log in to add transactions.');
            return;
        }

        setIsLoading(true);
        const transactionData = {
            ...data,
            amount: parseFloat(data.amount),
        };

        try {
            if (transactionToEdit) {
                await transactionService.updateTransaction(transactionToEdit._id, transactionData, user.token);
                toast.success('Transaction updated successfully!');
            }
            onSave(); // Callback to refresh transactions in parent component
            onCancel(); // Close the form
        } catch (error) {
            console.error('Error saving transaction:', error);
            toast.error('Failed to save transaction.');
        } finally {
            setIsLoading(false);
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