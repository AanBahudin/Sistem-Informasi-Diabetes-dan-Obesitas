import React from 'react'
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
 
 const Navbar = ({data}) => {
    
    const [bgOpacity, setBgOpacity] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
        const scrollTop = window.scrollY;
        const heroHeight = window.innerHeight;
        
        
        const opacity = Math.min(scrollTop / heroHeight, 1);
        setBgOpacity(opacity);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

   return (
    <div className='py-8 mx-auto px-16 flex justify-between z-10 fixed w-[90%] transition-colors duration-75 rounded-b-[8px]'
    style={{ backgroundColor: `rgba(241, 245, 249, ${bgOpacity})` }}>
        <Link to='/' className='text-2xl font-semibold text-slate-900 cursor-default'>E-Health</Link>

        <section className='flex flex-row gap-x-7 items-center'>
            <a href='/#contacts' className='text-slate-800 text-sm cursor-default hover:text-blue duration-200 ease-in-out no-underline'>Kontak</a>
            <a href='/#services' className='text-slate-800 text-sm cursor-default hover:text-blue duration-200 ease-in-out no-underline'>Layanan</a>
            <a href='/artikel' className='text-slate-800 text-sm cursor-default hover:text-blue duration-200 ease-in-out no-underline'>Artikel</a>
            <NavLink to='/login' className={({isActive}) => `${isActive ? 'hidden' : 'visible'} bg-blue/80 text-slate-800 px-8 py-2 text-sm rounded-md no-underline`} end>
                {data ? 'Dashboard' : 'Login'}
            </NavLink>
        </section>
    </div>
   )
 }
 
 export default Navbar