import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import transactionService from '../services/transactionService';
import TransactionForm from '../components/TransactionForm';
import ExpenseChart from '../components/ExpenseChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        income: 0,
        expense: 0,
        balance: 0,
    });
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const fetchTransactions = useCallback(async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            navigate('/login');
            return;
        }
        try {
            const data = await transactionService.getTransactions(user.token);
            setTransactions(data);

            // Calculate summary
            let totalIncome = 0;
            let totalExpense = 0;
            data.forEach((transaction) => {
                if (transaction.type === 'income') {
                    totalIncome += transaction.amount;
                } else {
                    totalExpense += transaction.amount;
                }
            });
            setSummary({
                income: totalIncome,
                expense: totalExpense,
                balance: totalIncome - totalExpense,
            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('user');
                navigate('/login');
            }
        }
    }, [navigate]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const handleAddTransaction = (type = 'expense') => {
        setEditingTransaction(null);
        setShowTransactionForm(true);
    };

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setShowTransactionForm(true);
    };

    const handleCloseForm = () => {
        setShowTransactionForm(false);
        setEditingTransaction(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            const user = JSON.parse(localStorage.getItem('user'));
            try {
                await transactionService.deleteTransaction(id, user.token);
                alert('Transaction deleted successfully!');
                fetchTransactions(); // Refresh transactions
            } catch (error) {
                console.error('Error deleting transaction:', error);
                alert('Failed to delete transaction');
            }
        }
    };

    return (
        <div className="p-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Income Card */}
                <div className="glass-card rounded-xl p-6 border border-green-500/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400">Total Income</p>
                            <h2 className="text-2xl font-bold mt-1">Rp {summary.income.toLocaleString()}</h2>
                            <p className="text-green-500 text-sm mt-2 flex items-center">
                                <FontAwesomeIcon icon="arrow-up" className="mr-1" /> 12.5% from last month
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                            <FontAwesomeIcon icon="wallet" className="text-green-500 text-xl" />
                        </div>
                    </div>
                </div>

                {/* Expense Card */}
                <div className="glass-card rounded-xl p-6 border border-red-500/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400">Total Expenses</p>
                            <h2 className="text-2xl font-bold mt-1">Rp {summary.expense.toLocaleString()}</h2>
                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                <FontAwesomeIcon icon="arrow-down" className="mr-1" /> 5.3% from last month
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                            <FontAwesomeIcon icon="shopping-bag" className="text-red-500 text-xl" />
                        </div>
                    </div>
                </div>

                {/* Balance Card */}
                <div className="glass-card rounded-xl p-6 border border-primary/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400">Current Balance</p>
                            <h2 className="text-2xl font-bold mt-1">Rp {summary.balance.toLocaleString()}</h2>
                            <p className="text-primary text-sm mt-2 flex items-center">
                                <FontAwesomeIcon icon="info-circle" className="mr-1" /> Updated just now
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                            <FontAwesomeIcon icon="piggy-bank" className="text-primary text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Expense Breakdown Chart */}
                <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Expense Breakdown</h3>
                        <select className="bg-dark-light text-sm rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>Last 3 Months</option>
                        </select>
                    </div>
                    <div className="chart-container">
                        <ExpenseChart transactions={transactions} />
                    </div>
                </div>

                {/* Monthly Trend Chart */}
                <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Monthly Trend</h3>
                        <select className="bg-dark-light text-sm rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>2023</option>
                            <option>2022</option>
                            <option>2021</option>
                        </select>
                    </div>
                    <div className="chart-container">
                        {/* Placeholder for Chart.js Line Chart */}
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full h-40 relative">
                                {/* Income Line */}
                                <div className="absolute left-0 right-0 bottom-0 h-px bg-dark-lighter"></div>
                                <div className="absolute left-0 right-0 bottom-0 h-px bg-dark-lighter"></div>
                                <div className="absolute left-0 right-0 bottom-0 h-px bg-dark-lighter"></div>
                                <div className="absolute left-0 right-0 bottom-0 h-px bg-dark-lighter"></div>

                                <div className="absolute bottom-0 left-0 w-full flex items-end justify-between px-4">
                                    <div className="h-16 w-4 bg-green-500/70 rounded-t-sm animate-float" style={{ animationDelay: '0s' }}></div>
                                    <div className="h-20 w-4 bg-green-500/70 rounded-t-sm animate-float" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="h-24 w-4 bg-green-500/70 rounded-t-sm animate-float" style={{ animationDelay: '0.4s' }}></div>
                                    <div className="h-28 w-4 bg-green-500/70 rounded-t-sm animate-float" style={{ animationDelay: '0.6s' }}></div>
                                    <div className="h-20 w-4 bg-green-500/70 rounded-t-sm animate-float" style={{ animationDelay: '0.8s' }}></div>
                                    <div className="h-32 w-4 bg-green-500/70 rounded-t-sm animate-float" style={{ animationDelay: '1s' }}></div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full flex items-end justify-between px-4">
                                    <div className="h-12 w-4 bg-red-500/70 rounded-t-sm animate-float" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="h-16 w-4 bg-red-500/70 rounded-t-sm animate-float" style={{ animationDelay: '0.3s' }}></div>
                                    <div className="h-20 w-4 bg-red-500/70 rounded-t-sm animate-float" style={{ animationDelay: '0.5s' }}></div>
                                    <div className="h-24 w-4 bg-red-500/70 rounded-t-sm animate-float" style={{ animationDelay: '0.7s' }}></div>
                                    <div className="h-28 w-4 bg-red-500/70 rounded-t-sm animate-float" style={{ animationDelay: '0.9s' }}></div>
                                    <div className="h-18 w-4 bg-red-500/70 rounded-t-sm animate-float" style={{ animationDelay: '1.1s' }}></div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 text-xs text-gray-400">
                                    <span>Jan</span>
                                    <span>Feb</span>
                                    <span>Mar</span>
                                    <span>Apr</span>
                                    <span>May</span>
                                    <span>Jun</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center space-x-6 mt-6">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Income</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-sm">Expenses</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="glass-card rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Recent Transactions</h3>
                    <button
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm flex items-center"
                        onClick={() => handleAddTransaction('expense')}
                    >
                        <FontAwesomeIcon icon="plus" className="mr-2" /> Add Transaction
                    </button>
                </div>

                <div className="space-y-4">
                    {transactions.map((transaction) => (
                        <div key={transaction._id} className="transaction-card bg-dark-light hover:bg-dark-lighter rounded-lg p-4 transition-all duration-200 cursor-pointer">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-4">
                                    <FontAwesomeIcon icon="home" className="text-purple-500" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium">{transaction.description}</h4>
                                    <p className="text-xs text-gray-400">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                        {transaction.type === 'income' ? '+' : '-'}Rp {transaction.amount.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-400">{transaction.type === 'income' ? 'Direct Deposit' : 'Bank Account'}</p>
                                </div>
                                <div className="ml-4 flex space-x-2">
                                    <button
                                        className="text-gray-400 hover:text-primary"
                                        onClick={() => handleEdit(transaction)}
                                    >
                                        <FontAwesomeIcon icon="edit" />
                                    </button>
                                    <button
                                        className="text-gray-400 hover:text-red-500"
                                        onClick={() => handleDelete(transaction._id)}
                                    >
                                        <FontAwesomeIcon icon="trash" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <button className="text-primary hover:text-primary-dark text-sm font-medium">
                        View All Transactions <FontAwesomeIcon icon="arrow-right" className="ml-1" />
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                    className="bg-dark-light hover:bg-primary/20 border border-primary/20 rounded-lg p-4 flex flex-col items-center justify-center transition-colors"
                    onClick={() => handleAddTransaction('income')}
                >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <FontAwesomeIcon icon="plus" className="text-primary" />
                    </div>
                    <span className="text-sm">Add Income</span>
                </button>
                <button
                    className="bg-dark-light hover:bg-red-500/20 border border-red-500/20 rounded-lg p-4 flex flex-col items-center justify-center transition-colors"
                    onClick={() => handleAddTransaction('expense')}
                >
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                        <FontAwesomeIcon icon="minus" className="text-red-500" />
                    </div>
                    <span className="text-sm">Add Expense</span>
                </button>
                <button className="bg-dark-light hover:bg-accent/20 border border-accent/20 rounded-lg p-4 flex flex-col items-center justify-center transition-colors">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                        <FontAwesomeIcon icon="exchange-alt" className="text-accent" />
                    </div>
                    <span className="text-sm">Transfer</span>
                </button>
                <button className="bg-dark-light hover:bg-purple-500/20 border border-purple-500/20 rounded-lg p-4 flex flex-col items-center justify-center transition-colors">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-2">
                        <FontAwesomeIcon icon="chart-line" className="text-purple-500" />
                    </div>
                    <span className="text-sm">Reports</span>
                </button>
            </div>

            {showTransactionForm && (
                <TransactionForm
                    onSave={fetchTransactions}
                    onCancel={handleCloseForm}
                    transactionToEdit={editingTransaction}
                />
            )}
        </div>
    );
};

export default DashboardPage;
