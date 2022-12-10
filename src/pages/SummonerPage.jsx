import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import SummonerInfo from '../components/Summoner/SummonerInfo';
import MatchHistory from '../components/Match/MatchHistory';

const SummonerPage = () => {
  const { state: summoner } = useLocation();

  const goTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Nav />
      <main className='w-full h-auto flex flex-col justify-center items-center'>
        <SummonerInfo />
        <MatchHistory summoner={summoner} />
        <button
          onClick={goTop}
          className='font-semibold text-sm text-white w-auto h-auto fixed bottom-8 right-4 sm:right-10 px-2 py-2 bg-gray-300 sm:bg-none rounded-full shadow-md sm:shadow-none'>
          <img
            src={`${process.env.PUBLIC_URL}/images/up.png`}
            alt='up'
            className='w-5 h-5 sm:w-8 sm:h-8'
          />
        </button>
      </main>
    </>
  );
};

export default SummonerPage;
