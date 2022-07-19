import React from 'react';
import ThemeToggle from './ThemeToggle';
// import {AiOutlineInstagram} from 'react-icons/ai'
import {FaInstagram, FaFacebook, FaGithub, FaLinkedin} from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='rounded-div mt-8 pt-8 text-primary'>
        <div className='grid md:grid-cols-2'>
            <div className='flex justify-evenly w-full md:max-w-[300px] uppercase'>
                <div>
                    <ul className='font-bold'>
                        <li className='text-sm py-2'>Help Center</li>
                        <li className='text-sm py-2'>Contact Us</li>
                        <li className='text-sm py-2'>API Status</li>
                        <li className='text-sm py-2'>Documentation</li>
                    </ul>
                </div>
                <div>
                    <h2 className='font-bold'>Info</h2>
                    <ul>
                        <li className='text-sm py-2'>About Us</li>
                        <li className='text-sm py-2'>Careers</li>
                        <li className='text-sm py-2'>Invest</li>
                        <li className='text-sm py-2'>Legal</li>
                    </ul>
                </div>
            </div>
                <div className='text-right'>
                    <div className='w-full flex justify-end'>
                        <div className='w-full md:w-[300px] py-4 relative'>
                            <div className='flex justify-center md:justify-end py-4 md:py-0 md:pb-4 mt-[-1rem]'><ThemeToggle /></div>
                            <p className='text-center md:text-right'>Sign up for crypto news</p>
                            <div className='py-4'>
                                <form action="">
                                    <input className='bg-primary rounded-2xl p-2 mr-2 w-full shadow-xl md:w-auto placeholder:text-sm placeholder:p-2' type="email" placeholder='email' />
                                    <Link to='/signup'>
                                        <button className='bg-button text-btnText px-4 p-2 w-full rounded-2xl shadow-xl hover:shadow-2xl md:w-auto my-2'>Sign Up</button>
                                    </Link>
                                </form>
                            </div>
                            <div className='flex py-4 justify-between text-accent'>
                                <a href="https://www.instagram.com/tiodwisatrio_/" target='blank'>
                                    <FaInstagram  />
                                </a>
                                <a href="https://www.facebook.com/Tiodwisatrio27/" target='blank'>
                                    <FaFacebook />
                                </a>
                                <a href="https://www.github.com/tiodwisatrio/" target='blank'>
                                    <FaGithub />
                                </a>
                                <a href="https://www.instagram.com/tiodwisatrio_/" target='blank'>
                                    <FaLinkedin />
                                </a>
                                
                                
                               
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <p className='text-center font-semibold pb-8 '>&copy; Tio Dwi Satrio 2022</p>
    </div>

  )
}

export default Footer