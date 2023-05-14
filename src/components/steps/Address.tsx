import { ethers } from 'ethers';
import React, { useState } from 'react';

import { Button } from '@/components';
import { Transaction, User } from '@/models/transaction';
import { development, LensClient, production } from '@lens-protocol/client';

interface AddressStepProps {
  type: Transaction['type'];
  onSetDestination: (user: Transaction['to']) => void;
}

const AddressStep = ({ onSetDestination, type }: AddressStepProps) => {
  const [search, setSearch] = useState('handle.test');

  const searchAddress = async () => {
    if (!search) return;

    if (ethers.utils.isAddress(search)) {
      const user: User = { address: search as `0x${string}` };
      onSetDestination(user);
    } else {
      try {
        const lensClient = new LensClient({
          environment: process.env.NODE_ENV === 'development' ? development : production
        });
        const lensProfile = await lensClient.profile.fetch({
          handle: search
        });
        if (lensProfile) {
          const { ownedBy } = lensProfile;
          const user: User = { address: ownedBy as `0x${string}`, name: search };
          onSetDestination(user);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-2xl text-center">
        {type === 'request' ? 'Request crypto from' : 'Send crypto to'}
      </h1>

      <form className="mt-8">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            className="mt-4 w-64 h-14 bg-white border-2 border-black rounded-md p-2 block w-full p-4 pl-10 text-center"
            type="search"
            placeholder="marcos.lens"
            autoFocus
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
      <div className="mt-4 text-center">
        <Button label="continue" onClick={searchAddress} />
      </div>
    </div>
  );
};

export default AddressStep;
