import React, { memo } from 'react';
import Logo from './Logo';

const Footer = memo(() => {
  return (
    <footer className='h-36 flex flex-col justify-center items-center'>
      <div className='flex text-sm underline mb-3'>
        <span className='mr-5'>개인정보처리방침</span>
        <span className='mr-5'>이용약관</span>
        <span className='mr-5'>환불정책</span>
        <span className='mr-5'>도움말</span>
        <span className='hidden sm:block'>고객센터</span>
      </div>
      <p className='text-sm mb-2'>Ⓒ 2022.bk | All right reserved.</p>
      <Logo css='text-2xl sm:text-3xl opacity-30 drop-shadow-none' />
    </footer>
  );
});

export default Footer;
