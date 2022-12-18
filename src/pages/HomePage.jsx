import React from 'react';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import WorldsImg from '../components/WorldsImg';

const Home = () => {
  return (
    <main className='max-w-screen-lg w-full h-mobileScreen flex flex-col justify-center items-center'>
      <Logo css='text-7xl sm:text-8xl text-myIndigo' />
      <SearchBar
        formCss='max-w-lg w-3/4 my-10'
        inputCss='sm:text-lg mx-4 my-3'
        buttonCss='px-3 sm:px-4'
      />
      <WorldsImg />
    </main>
  );
};

export default Home;
