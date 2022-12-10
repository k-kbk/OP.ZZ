import React from 'react';

const WorldsImg = (props) => {
  return (
    <div className='max-w-[15rem] max-h-[15rem] w-1/2 sm:w-full mt-8 opacity-80'>
      <img src={`${process.env.PUBLIC_URL}/images/worlds.png`} alt='worlds' />
    </div>
  );
};

export default WorldsImg;
