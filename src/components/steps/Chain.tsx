import Image from 'next/image';
import React from 'react';
import { Chain } from 'wagmi';

import { chainIcons, enabledChains, requestContracts } from '@/models/chains';
import { Transaction } from '@/models/transaction';
import { chunk } from '@/utils';

interface ChainProps {
  type: Transaction['type'];
  onSelectChain: (id: number) => void;
}

const Chain = ({ type, onSelectChain }: ChainProps) => {
  const requestChainIds = Object.keys(requestContracts); // chains with the requests contract deployed
  const chains =
    type === 'request'
      ? enabledChains.filter((c) => requestChainIds.includes(String(c.id)))
      : enabledChains;
  return (
    <>
      <h1 className="text-2xl text-center">Choose chain</h1>

      <div className="mt-8">
        {chunk(chains, 2).map((chains, index) => {
          return (
            <div key={index} className="flex flex-row space-x-2 mb-4">
              {chains.map((chain: Chain) => {
                return (
                  <div
                    key={chain.id}
                    className="flex flex-col border-2 border-black bg-white rounded-lg p-2 cursor-pointer items-center w-1/2"
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
                    <span className="text-center">{chain.name}</span>
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
