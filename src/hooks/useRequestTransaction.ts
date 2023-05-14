import { utils } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

import { Transaction } from '@/models/transaction';

import abi from '../../abis/FrenmoRequests.json';

interface UseRequestTransaction {
  disconnected: boolean;
  address: `0x${string}`;
  transaction: Transaction;
}

const useRequestTransaction = ({
  disconnected,
  address,
  transaction
}: UseRequestTransaction) => {
  const [id] = useState(new Date().getTime().toString());
  const requestId = utils.formatBytes32String(id);
  const { type, to, token, amount, note } = transaction;

  const { config, isError, error } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'request',
    args: [
      requestId,
      to.address,
      token.address,
      parseUnits(`${amount}`, token.decimals),
      note
    ],
    enabled: !disconnected && type === 'request'
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  return {
    isLoading,
    isSuccess,
    request: write,
    data,
    isError,
    error
  };
};

export default useRequestTransaction;
