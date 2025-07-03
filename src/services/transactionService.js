import axios from 'axios';

const API_URL = '/api/transactions/';

// Get user transactions
const getTransactions = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

// Add new transaction
const addTransaction = async (transactionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, transactionData, config);
    return response.data;
};

// Update transaction
const updateTransaction = async (id, transactionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + id, transactionData, config);
    return response.data;
};

// Delete transaction
const deleteTransaction = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

const transactionService = {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
};

export default transactionService;
