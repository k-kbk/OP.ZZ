import React from 'react';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import WorldsImg from '../components/WorldsImg';

const Home = () => {
  return (
    <main className='max-w-screen-lg w-full h-full flex flex-col justify-center items-center drop-shadow-sm'>
      <Logo css='text-6xl sm:text-7xl' />
      <SearchBar
        formCss='sm:w-2/3 my-10'
        inputCss='sm:text-lg mx-4 my-3'
        buttonCss='px-3 sm:px-4'
      />
      <WorldsImg />
    </main>
  );
};

export default Home;
