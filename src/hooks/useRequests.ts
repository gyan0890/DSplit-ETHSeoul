import React, { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { useAccount } from 'wagmi';

import { requestContracts, requestEnabledChains } from '@/models/chains';
import { Request, Requests } from '@/models/transaction';

import abi from '../../abis/FrenmoRequests.json';

const useRequests = () => {
  const [requests, setRequests] = useState<Requests>({});
  const { isConnected, address } = useAccount();

  useEffect(() => {
    const check = async () => {
      if (!isConnected) return;

      requestEnabledChains.map(async (chain) => {
        const publicClient = createPublicClient({
          chain,
          transport: http()
        });
        const data = await publicClient.readContract({
          address: requestContracts[chain.id],
          abi,
          functionName: 'myRequests',
          // @ts-expect-error
          account: address!,
          chainId: chain.id
        });
        setRequests({ ...requests, ...{ [chain.id]: data as Request[] } });
      });
    };
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return { requests };
};

export default useRequests;
