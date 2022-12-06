import React from 'react';
import Logo from '../assets/worlds.png';

const WorldsImg = (props) => {
  return (
    <div className='max-w-[15rem] max-h-[15rem] w-1/2 sm:w-full mt-8 opacity-70'>
      <img src={Logo} alt='worlds' />
    </div>
  );
};

export default WorldsImg;
