/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import SummonerProfile from './SummonerProfile';
import SummonerRank from './SummonerRank.jsx';

const SummonerInfo = () => {
  return (
    <header className='w-full flex flex-col'>
      <SummonerProfile />
      <SummonerRank />
    </header>
  );
};

export default SummonerInfo;
