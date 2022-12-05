import React from 'react';
import Search from '../assets/search.png';

const SearchBar = (props) => {
  return (
    <form
      className={
        'max-w-lg flex justify-center rounded-md bg-white ' + props.formStyle
      }>
      <input
        type='text'
        placeholder='소환사명을 입력해주세요'
        className={
          'w-full font-medium px-2 py-3 mx-2 focus:outline-none placeholder:font-normal placeholder:opacity-30 placeholder:text-gray-700'
        }
      />
      <button type='submit' className='px-3 sm:px-5'>
        <img src={Search} alt='search' className='max-w-5 max-h-5' />
      </button>
    </form>
  );
};

export default SearchBar;
