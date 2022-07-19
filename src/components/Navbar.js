import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import ThemeToggle from './ThemeToggle';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {UserAuth} from '../context/AuthContext';

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const {user, logout} = UserAuth()

    const handleNav = () => {
        setNav(!nav)
    }

  



  return (
    <div className='rounded-div flex items-center justify-between h-20'>
        <Link to='/'>
            <h1 className='text-lg md:text-2xl font-bold'>Cryptobase</h1>
        </Link>
        <div className='hidden md:block'>
            <ThemeToggle />
        </div>

        {user?.email ? (
            <div>
                <Link to='/account' className='p-4 text-right'>Account</Link>
            </div>
        ) : (
            <div className='hidden md:block'>
                <Link to='signin' className='p-4 hover:text-accent'>Sign In</Link>
                <Link to='signup' className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl'>Sign Up</Link>
            </div>
        )}
        {/* Menu Icon */}
        <div onClick={handleNav} className='block md:hidden cursor-pointer z-10'>
            {nav ? <AiOutlineClose className='text-primary text-2xl' /> : <AiOutlineMenu className='text-primary text-2xl' />}
        </div>

        {/* Mobile Menu */}
        <div className={nav ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10' : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'}>
        <ul className='w-full p-4'>
            <li onClick={handleNav} className='border-b py-6'>
                <Link to='/'>Home</Link>
            </li>
            <li onClick={handleNav} className='border-b py-6'>
                <Link to='/account'>Account</Link>
            </li>
            <li className='border-b py-6'>
                <ThemeToggle />
            </li>
        </ul>
        <div className='flex flex-col w-full p-4'>
            <Link onClick={handleNav} to='/signup'>
                <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-lg'>Sign Up</button>
            </Link>
            <Link onClick={handleNav} to='/signin'>
                <button className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-lg'>Sign In</button>
            </Link>
        </div>
        </div>

    </div>
  )
}

export default Navbar