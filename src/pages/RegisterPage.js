import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { name, email, password, confirmPassword } = formData;

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else {
            try {
                await authService.register({ name, email, password });
                navigate('/dashboard');
            } catch (error) {
                alert('Failed to register');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-DEFAULT text-gray-100">
            <div className="glass-card p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor='name' className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input
                            type='text'
                            id='name'
                            placeholder='Enter name'
                            name='name'
                            value={name}
                            onChange={onChange}
                            className="w-full px-3 py-2 bg-dark-light border border-dark-lighter rounded-md text-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
                        ></input>
                    </div>

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

                    <div className="mb-4">
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

                    <div className="mb-6">
                        <label htmlFor='confirmPassword' className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                        <input
                            type='password'
                            id='confirmPassword'
                            placeholder='Confirm password'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={onChange}
                            className="w-full px-3 py-2 bg-dark-light border border-dark-lighter rounded-md text-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
                        ></input>
                    </div>

                    <button type='submit' className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                        Register
                    </button>
                </form>

                <div className="mt-6 text-center">
                    Have an Account? <Link to={'/login'} className="text-primary hover:underline">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;