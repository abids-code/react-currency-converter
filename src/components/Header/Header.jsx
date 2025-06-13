import React from 'react';

const Header = () => {
    return (
        <header className='max-w-10/12 mx-auto py-4'>
            <nav className='flex justify-between items-center'>
                <h2 className='text-xl font-bold'>Currency Converter</h2>
                <ul className='flex gap-12 text-lg font-base'>
                    <li><a href='#' className='hover:font-medium'>Home</a></li>
                    <li><a href='#' className='hover:font-medium'>About</a></li>
                    <li><a href='#' className='hover:font-medium'>Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;