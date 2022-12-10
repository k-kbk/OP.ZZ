/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import SummonerProfile from './SummonerProfile';
import SummonerRank from './SummonerRank.jsx';

const SummonerInfo = () => {
  return (
    <div className='w-5/6 flex justify-center'>
      <header className='max-w-4xl w-full flex flex-col items-center'>
        <SummonerProfile />
        <SummonerRank />
      </header>
    </div>
  );
};

export default SummonerInfo;
