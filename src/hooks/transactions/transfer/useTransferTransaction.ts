import { ethers } from 'ethers';

import usePrepareTransferTransaction from '@/hooks/usePrepareTransferTransaction';

import { UseTransferTransaction } from './types';
import useGasTransferTransaction from './useGasTransferTransaction';

const useTransferTransaction = ({
  token,
  disconnected,
  amount,
  address
}: UseTransferTransaction) => {
  const withGasCall = useGasTransferTransaction({ token, disconnected, amount, address });

  return withGasCall;
};
export default useTransferTransaction;
