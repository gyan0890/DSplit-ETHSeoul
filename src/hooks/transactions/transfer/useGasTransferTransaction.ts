import { ethers } from 'ethers';
import { useContractWrite, useSendTransaction } from 'wagmi';

import usePrepareTransferTransaction from '@/hooks/usePrepareTransferTransaction';

import { UseTransferTransaction } from './types';

const useGasTransferTransaction = ({
  token,
  disconnected,
  amount,
  address
}: UseTransferTransaction) => {
  const { config } = usePrepareTransferTransaction({
    token,
    disconnected,
    amount,
    address
  });
  // @ts-expect-error
  const { data, isError, error, write } = useContractWrite(config);

  const {
    data: nativeData,
    isError: nativeIsError,
    error: nativeError,
    sendTransaction
  } = useSendTransaction(config);

  const nativeToken = token.address === ethers.constants.AddressZero;
  return nativeToken
    ? {
        data: nativeData,
        isError: nativeIsError,
        error: nativeError,
        transfer: sendTransaction
      }
    : { data, isError, error, transfer: write };
};
export default useGasTransferTransaction;
