import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
    const { token, settoken, backend_url } = useContext(AppContext); 
    const navigate = useNavigate();
    const [state, setstate] = useState("sign up");
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [name, setname] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'sign up') {
                const { data } = await axios.post(`${backend_url}/api/user/register`, { name, password, email });
                if (data.success) {
                    localStorage.setItem('token', data.token); // Store token
                    settoken(data.token);
                    toast.success('Account created successfully!');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(`${backend_url}/api/user/login`, { password, email });
                if (data.success) {
                    localStorage.setItem('token', data.token); // Store token
                    settoken(data.token);
                    toast.success('Logged in successfully!');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <h1 className='font-semibold text-2xl'>{state === 'sign up' ? 'Create Account' : 'Login'}</h1>
                <p>Please {state === 'sign up' ? 'sign up' : 'Log in'} to book appointment</p>
                {state === 'sign up' && (
                    <div className='w-full'>
                        <p>Full Name</p>
                        <input className='border border-zinc-300 rounded  w-full p-2 mt-1' type='text' onChange={(e) => setname(e.target.value)} value={name} />
                    </div>
                )}
                <div className='w-full'>
                    <p>Email</p>
                    <input className='border border-zinc-300 w-full rounded p-2 mt-1' type='email' onChange={(e) => setemail(e.target.value)} value={email} />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='password' onChange={(e) => setpassword(e.target.value)} value={password} />
                </div>
                <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>
                    {state === 'sign up' ? 'Create Account' : 'Login'}
                </button>
                {state === 'sign up' ? (
                    <p>Already have an account? <span onClick={() => setstate('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
                ) : (
                    <p>Create a new account? <span onClick={() => setstate('sign up')} className='text-primary underline cursor-pointer'>Click here</span></p>
                )}
            </div>
        </form>
    );
}

export default Login;
