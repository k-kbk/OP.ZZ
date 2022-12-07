import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';

const SummonerProfile = memo((props) => {
  const { state: summoner } = useLocation();
  const { REACT_APP_IMG_URL: IMG_URL } = process.env;

  return (
    <div className='flex justify-start items-center wrap gap-5 mt-16'>
      <div className='max-w-[5rem] max-h-[5rem] overflow-hidden rounded-md'>
        <img
          src={`${IMG_URL}/profileicon/${summoner.profileIconId}.png`}
          alt='icon'
        />
      </div>
      <div className='flex flex-col'>
        <p className='font-bold text-3xl'>{summoner.name}</p>
        <p className='font-semibold text-myIndigo opacity-70'>
          {summoner.summonerLevel} LV
        </p>
      </div>
    </div>
  );
});

export default SummonerProfile;
