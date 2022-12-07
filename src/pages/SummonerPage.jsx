import React from 'react';
import Nav from '../components/Nav';
import SummonerInfo from '../components/Summoner/SummonerInfo';
import MatchHistory from '../components/Match/MatchHistory';

const SummonerPage = () => {
  return (
    <>
      <Nav />
      <main className='max-w-4xl w-full h-auto flex flex-col justify-center items-center'>
        <SummonerInfo />
        <MatchHistory />
      </main>
    </>
  );
};

export default SummonerPage;
