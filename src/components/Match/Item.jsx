import React, { memo } from 'react';

const Item = memo((props) => {
  const { REACT_APP_IMG_URL: IMG_URL } = process.env;

  return (
    <>
      {props.data ? (
        <div className='w-4 h-4 sm:w-6 sm:h-6 rounded-sm overflow-hidden'>
          <img src={`${IMG_URL}/item/${props.data}.png`} alt='item5' />
        </div>
      ) : (
        <div className='w-4 h-4 sm:w-6 sm:h-6 bg-myGray bg-opacity-50 rounded-sm'></div>
      )}
    </>
  );
});

export default Item;
