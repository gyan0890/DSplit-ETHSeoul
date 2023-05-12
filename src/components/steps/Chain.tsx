import Image from 'next/image';
import React from 'react';
import { Chain } from 'wagmi';

import { chainIcons, enabledChains } from '@/models/chains';
import { chunk } from '@/utils';

interface ChainProps {
  onSelectChain: (id: number) => void;
}

const Chain = ({ onSelectChain }: ChainProps) => {
  return (
    <>
      <h1 className="text-2xl text-center">Choose chain</h1>

      <div className="mt-8">
        {chunk(enabledChains, 2).map((chains, index) => {
          return (
            <div key={index} className="flex flex-row space-x-2 mb-4">
              {chains.map((chain: Chain) => {
                return (
                  <div
                    key={chain.id}
                    className="border-2 border-black bg-white rounded-lg p-2 cursor-pointer"
                    onClick={() => onSelectChain(chain.id)}
                  >
                    <Image
                      src={chainIcons[chain.id]}
                      alt={`${chain.name} logo`}
                      width={60}
                      height={60}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Chain;
