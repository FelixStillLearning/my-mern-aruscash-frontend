import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Row, Col, Card, Button } from 'react-bootstrap';
import transactionService from '../services/transactionService';
import TransactionForm from '../components/TransactionForm';
import ExpenseChart from '../components/ExpenseChart';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        income: 0,
        expense: 0,
        balance: 0,
    });
    const [editingTransaction, setEditingTransaction] = useState(null);

    const fetchTransactions = async () => {
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
    };

    useEffect(() => {
        fetchTransactions();
    }, [navigate]);

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
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
        <div>
            <h1>Dashboard</h1>

            <Row className="mb-4">
                <Col md={4}>
                    <Card bg="success" text="white" className="mb-2">
                        <Card.Body>
                            <Card.Title>Total Income</Card.Title>
                            <Card.Text>Rp {summary.income.toLocaleString()}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card bg="danger" text="white" className="mb-2">
                        <Card.Body>
                            <Card.Title>Total Expense</Card.Title>
                            <Card.Text>Rp {summary.expense.toLocaleString()}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card bg="info" text="white" className="mb-2">
                        <Card.Body>
                            <Card.Title>Balance</Card.Title>
                            <Card.Text>Rp {summary.balance.toLocaleString()}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h2 className="mt-4">Expense Distribution</h2>
            <ExpenseChart transactions={transactions} />

            <TransactionForm
                onTransactionAdded={fetchTransactions}
                editingTransaction={editingTransaction}
                setEditingTransaction={setEditingTransaction}
            />

            <h2 className="mt-4">Recent Transactions</h2>
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>TYPE</th>
                        <th>CATEGORY</th>
                        <th>AMOUNT</th>
                        <th>DESCRIPTION</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.category}</td>
                            <td>Rp {transaction.amount.toLocaleString()}</td>
                            <td>{transaction.description}</td>
                            <td>
                                <Button
                                    variant='light'
                                    className='btn-sm'
                                    onClick={() => handleEdit(transaction)}
                                >
                                    <i className='fas fa-edit'></i>
                                </Button>
                                <Button
                                    variant='danger'
                                    className='btn-sm ms-2'
                                    onClick={() => handleDelete(transaction._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DashboardPage;
