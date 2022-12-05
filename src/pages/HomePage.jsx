import React from 'react';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import WorldsImg from '../components/WorldsImg';

const Home = () => {
  return (
    <div className='max-w-screen-lg w-full h-full flex flex-col justify-center items-center drop-shadow-sm'>
      <Logo />
      <SearchBar formStyle='w-2/3 m-10 text-base sm:text-lg' />
      <WorldsImg />
    </div>
  );
};

export default Home;
