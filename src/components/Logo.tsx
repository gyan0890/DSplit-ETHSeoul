import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import logo from '../../public/logo.png';

const Logo = () => (
  <div className="flex w-full justify-center items-center">
    <Link href="/">
      <Image
        src={logo}
        alt="dsplit logo"
        className="h-8 w-auto content-center"
        width={500}
        height={150}
      />
    </Link>
  </div>
);
export default Logo;