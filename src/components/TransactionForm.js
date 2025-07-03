import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import transactionService from '../services/transactionService';

const TransactionForm = ({ onTransactionAdded, editingTransaction, setEditingTransaction }) => {
    const [formData, setFormData] = useState({
        type: 'expense',
        amount: '',
        category: '',
        date: '',
        description: '',
    });

    const { type, amount, category, date, description } = formData;

    useEffect(() => {
        if (editingTransaction) {
            setFormData({
                type: editingTransaction.type,
                amount: editingTransaction.amount,
                category: editingTransaction.category,
                date: new Date(editingTransaction.date).toISOString().split('T')[0],
                description: editingTransaction.description,
            });
        } else {
            setFormData({
                type: 'expense',
                amount: '',
                category: '',
                date: '',
                description: '',
            });
        }
    }, [editingTransaction]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            alert('Please login to add transactions');
            return;
        }

        try {
            if (editingTransaction) {
                await transactionService.updateTransaction(editingTransaction._id, formData, user.token);
                alert('Transaction updated successfully!');
            } else {
                await transactionService.addTransaction(formData, user.token);
                alert('Transaction added successfully!');
            }
            setFormData({
                type: 'expense',
                amount: '',
                category: '',
                date: '',
                description: '',
            });
            setEditingTransaction(null); // Clear editing state
            onTransactionAdded(); // Refresh transactions in Dashboard
        } catch (error) {
            console.error('Error saving transaction:', error);
            alert('Failed to save transaction');
        }
    };

    return (
        <Form onSubmit={submitHandler} className="mb-4">
            <h2>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
            <Row>
                <Col md={6}>
                    <Form.Group controlId='type' className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            as='select'
                            name='type'
                            value={type}
                            onChange={onChange}
                        >
                            <option value='expense'>Expense</option>
                            <option value='income'>Income</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId='amount' className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter amount'
                            name='amount'
                            value={amount}
                            onChange={onChange}
                            required
                        ></Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group controlId='category' className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter category'
                            name='category'
                            value={category}
                            onChange={onChange}
                            required
                        ></Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId='date' className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type='date'
                            name='date'
                            value={date}
                            onChange={onChange}
                            required
                        ></Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId='description' className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Enter description'
                    name='description'
                    value={description}
                    onChange={onChange}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
            </Button>
            {editingTransaction && (
                <Button variant='secondary' onClick={() => setEditingTransaction(null)} className="ms-2">
                    Cancel Edit
                </Button>
            )}
        </Form>
    );
};

export default TransactionForm;
