import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signUp } = UserAuth();

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')
    try {
      await signUp(email,password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <div>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold text-center mb-10'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl mb-8'>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-3 bg-primary rounded-2xl placeholder:text-sm'
                type='email'
                placeholder='your email...'
              />
            </div>
          </div>
          <div className='my-4'>
            <label>Password</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl mb-12'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-3 bg-primary rounded-2xl placeholder:text-sm'
                type='password'
                placeholder='your password...'
              />
            </div>
          </div>
          <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl font-semibold'>
            Sign Up
          </button>
        </form>
        <p className='my-4 text-center'>
          Already have an account?{' '}
          <Link to='/singin' className='text-accent'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;