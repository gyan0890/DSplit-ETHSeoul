'use client';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import { useAccount } from 'wagmi';

import { useRequests } from '@/hooks';
import { Request } from '@/models/transaction';

const inter = Inter({ weight: ['700'], subsets: ['latin'] });

const Requests = () => {
  const { requests } = useRequests();
  const { address } = useAccount();
  const requested = Object.values(requests)
    .flat()
    .filter((r: Request) => r.to === address);

  if (!requested.length) {
    return <></>;
  }

  return (
    <div className="mt-32 text-center">
      <Link
        href="/requests"
        className="flex flex-row space-x-2 justify-center items-center"
      >
        <span className="text-center">see requests</span>
        <div
          className={`${inter.className} font-bold text-white rounded-full bg-red-600 flex items-center justify-center w-6 h-6`}
        >
          {requested.length}
        </div>
      </Link>
    </div>
  );
};

export default Requests;
