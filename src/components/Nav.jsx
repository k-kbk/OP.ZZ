import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';

const Nav = () => {
  return (
    <nav className='w-full h-auto sm:h-auto flex justify-center items-center bg-myIndigo shadow-md'>
      <div className='w-5/6 sm:w-2/3 flex flex-col sm:flex-row items-center justify-center sm:justify-between mt-3 mb-4 sm:mt-4 sm:mb-4 gap-2 sm:gap-0'>
        <Logo css='text-white text-3xl sm:text-4xl' />
        <SearchBar
          formCss='w-full sm:w-60'
          inputCss='text-sm mx-4 my-2'
          buttonCss='px-4'
        />
      </div>
    </nav>
  );
};

export default Nav;
