import React from 'react';
import { Link } from 'react-router-dom';

const Logo = (props) => {
  return (
    <div className='drop-shadow-md'>
      <Link to={'/'} className={'font-[MyLotte] ' + props.css}>
        OP.ZZ
      </Link>
    </div>
  );
};

export default Logo;
