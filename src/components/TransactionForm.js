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
        setValue,
        watch
    } = useForm({
        defaultValues: {
            description: '',
            amount: '',
            type: 'expense',
            category: '',
            date: new Date().toISOString().split('T')[0]
        }
    });

    const watchType = watch('type');

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
            } else {
                await transactionService.addTransaction(transactionData, user.token);
                toast.success('Transaction added successfully!');
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="glass-card p-6 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 gradient-text">
                    {transactionToEdit ? '✏️ Edit Transaction' : '➕ Add New Transaction'}
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-gray-300 text-sm font-semibold mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            placeholder="e.g., Grocery shopping, Salary payment"
                            className="w-full py-3 px-4 text-gray-100 bg-dark-lighter border border-dark-lighter rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            {...register('description', { 
                                required: 'Description is required',
                                minLength: { value: 3, message: 'Description must be at least 3 characters' },
                                maxLength: { value: 100, message: 'Description must be less than 100 characters' }
                            })}
                        />
                        {errors.description && (
                            <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Amount */}
                    <div>
                        <label htmlFor="amount" className="block text-gray-300 text-sm font-semibold mb-2">
                            Amount
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">$</span>
                            <input
                                type="number"
                                step="0.01"
                                id="amount"
                                placeholder="0.00"
                                className="w-full py-3 pl-8 pr-4 text-gray-100 bg-dark-lighter border border-dark-lighter rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                {...register('amount', { 
                                    required: 'Amount is required',
                                    min: { value: 0.01, message: 'Amount must be greater than 0' },
                                    max: { value: 999999.99, message: 'Amount is too large' }
                                })}
                            />
                        </div>
                        {errors.amount && (
                            <p className="text-red-400 text-xs mt-1">{errors.amount.message}</p>
                        )}
                    </div>

                    {/* Type */}
                    <div>
                        <label htmlFor="type" className="block text-gray-300 text-sm font-semibold mb-2">
                            Type
                        </label>
                        <select
                            id="type"
                            className="w-full py-3 px-4 text-gray-100 bg-dark-lighter border border-dark-lighter rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            {...register('type', { required: 'Type is required' })}
                        >
                            <option value="expense">💸 Expense</option>
                            <option value="income">💰 Income</option>
                        </select>
                        {errors.type && (
                            <p className="text-red-400 text-xs mt-1">{errors.type.message}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-gray-300 text-sm font-semibold mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            className="w-full py-3 px-4 text-gray-100 bg-dark-lighter border border-dark-lighter rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            {...register('category', { 
                                required: 'Category is required'
                            })}
                        >
                            <option value="">Select a category</option>
                            {categories[watchType]?.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label htmlFor="date" className="block text-gray-300 text-sm font-semibold mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="w-full py-3 px-4 text-gray-100 bg-dark-lighter border border-dark-lighter rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            {...register('date', { required: 'Date is required' })}
                        />
                        {errors.date && (
                            <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <LoadingButton
                            type="submit"
                            isLoading={isLoading}
                            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                            {transactionToEdit ? 'Update Transaction' : 'Add Transaction'}
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;
