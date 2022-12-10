import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';

const SummonerProfile = memo((props) => {
  const { state: summoner } = useLocation();
  const { REACT_APP_IMG_URL: IMG_URL } = process.env;

  return (
    <>
      {summoner && (
        <div className='w-full flex justify-start items-center wrap mt-10 sm:mt-16'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-md'>
            <img
              src={`${IMG_URL}/profileicon/${summoner.profileIconId}.png`}
              alt='icon'
            />
          </div>
          <div className='flex flex-col ml-4 sm:ml-5'>
            <p className='font-bold text-2xl sm:text-3xl'>{summoner.name}</p>
            <p className='font-semibold text-myIndigo text-sm sm:text-base opacity-70'>
              {summoner.summonerLevel} LV
            </p>
          </div>
        </div>
      )}
    </>
  );
});

export default SummonerProfile;
