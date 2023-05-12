import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../public/logo.svg';

const Logo = () => (
  <div className="mt-8 flex w-full justify-center items-center">
    <Link href="/">
      <Image src={logo} alt="frenmo logo" className="h-8 w-auto content-center" />
    </Link>
  </div>
);
export default Logo;
