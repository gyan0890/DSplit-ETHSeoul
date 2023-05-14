import { ethers } from 'ethers';

import usePrepareTransferTransaction from '@/hooks/usePrepareTransferTransaction';

import { UseTransferTransaction } from './types';
import useGaslessTransferTransaction from './useGaslessTransferTransaction';
import useGasTransferTransaction from './useGasTransferTransaction';

const useTransferTransaction = ({
  token,
  disconnected,
  amount,
  address
}: UseTransferTransaction) => {
  const withGasCall = useGasTransferTransaction({ token, disconnected, amount, address });

  const {
    gaslessEnabled,
    isFetching,
    isLoading,
    isSuccess,
    data,
    isError,
    error,
    transfer
  } = useGaslessTransferTransaction({ token, address, disconnected, amount });

  if (!isFetching && gaslessEnabled && token.address !== ethers.constants.AddressZero) {
    return { isLoading, isSuccess, data, isError, error, transfer };
  }

  return withGasCall;
};
export default useTransferTransaction;
