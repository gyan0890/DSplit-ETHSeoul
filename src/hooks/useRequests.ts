import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

import { requestContracts, requestEnabledChains } from '@/models/chains';
import { Requests } from '@/models/transaction';
import { readContract } from '@wagmi/core';

import { frenmoRequestsAbi } from '../../abis';

const useRequests = () => {
  const [requests, setRequests] = useState<Requests>({});
  const { isConnected, address } = useAccount();

  useEffect(() => {
    const check = async () => {
      if (!isConnected) return;

      requestEnabledChains.map(async (chain) => {
        const data = await readContract({
          address: requestContracts[polygonMumbai.id],
          abi: frenmoRequestsAbi,
          functionName: 'myRequests',
          chainId: polygonMumbai.id,
          overrides: {
            from: address
          }
        });
        // @ts-expect-error
        setRequests({ ...requests, ...{ [chain.id]: data as Request[] } });
      });
    };
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return { requests };
};

export default useRequests;
