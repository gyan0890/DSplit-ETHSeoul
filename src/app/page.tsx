import React from 'react';
import Link from 'next/link';
import { Button, Logo } from '@/components';
import { Baskervville } from 'next/font/google';

const baskervville = Baskervville({ subsets: ['latin'], weight: ['400'] });

const IndexPage = () => {
  return (
    <div>
      <Logo />
      <div className={`${baskervville.className} mt-16`}>
        <div className="flex w-full justify-center items-center">
          <Link href="/">
            <Button label="send crypto" />
          </Link>
        </div>
        <div className="mt-4 flex w-full justify-center items-center">
          <Link href="/">
            <Button label="make a request" />
          </Link>
        </div>
      </div>
      <div className="mt-64"></div>
    </div>
  );
};

export default IndexPage;
