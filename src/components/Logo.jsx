import React from 'react';
import { Link } from 'react-router-dom';

const Logo = (props) => {
  return (
    <div>
      <Link to={'/'} className={'font-BlackOpsOne drop-shadow-md ' + props.css}>
        OP.ZZ
      </Link>
    </div>
  );
};

export default Logo;
