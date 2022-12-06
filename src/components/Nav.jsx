import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';

const Nav = () => {
  return (
    <nav className='w-full top-0 fixed z-50 flex justify-center bg-main shadow-lg'>
      <div className='w-4/5 flex items-center justify-between my-3'>
        <Logo css='text-white text-2xl sm:text-3xl' />
        <SearchBar inputCss='text-sm mx-4 my-2.5' buttonCss='px-4' />
      </div>
    </nav>
  );
};

export default Nav;
