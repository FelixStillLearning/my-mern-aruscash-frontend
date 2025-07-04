import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await authService.login({ email, password });
            navigate('/dashboard');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-DEFAULT text-gray-100">
            <div className="glass-card p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor='email' className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            className="w-full px-3 py-2 bg-dark-light border border-dark-lighter rounded-md text-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
                        ></input>
                    </div>

                    <div className="mb-6">
                        <label htmlFor='password' className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            className="w-full px-3 py-2 bg-dark-light border border-dark-lighter rounded-md text-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
                        ></input>
                    </div>

                    <button type='submit' className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    New Customer? <Link to={'/register'} className="text-primary hover:underline">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;