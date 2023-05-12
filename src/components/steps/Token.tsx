import React from 'react';

import { tokens } from '@/models/chains';
import { Token } from '@/models/transaction';
import { chunk } from '@/utils';

import { TokenComponent } from '../';

interface TokenProps {
  chainId: number;
  onSelectToken: (token: Token) => void;
}

const Token = ({ chainId, onSelectToken }: TokenProps) => {
  return (
    <>
      <h1 className="text-2xl text-center">Choose Token</h1>

      <div className="mt-8">
        {chunk(tokens[chainId], 2).map((chainTokens, index) => {
          return (
            <div key={index} className="flex flex-row space-x-2 mb-4">
              {chainTokens.map((token: Token) => {
                return (
                  <TokenComponent
                    key={token.address}
                    onClick={() => onSelectToken(token)}
                    token={token}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Token;
