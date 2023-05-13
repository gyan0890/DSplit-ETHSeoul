import { useContractWrite, useSendTransaction } from 'wagmi';

const useTransferTransaction = (config: any, nativeToken: boolean) => {
  const { data, isError, error, write } = useContractWrite(config);
  const {
    data: nativeData,
    isError: nativeIsError,
    error: nativeError,
    sendTransaction
  } = useSendTransaction(config);

  return nativeToken
    ? {
        data: nativeData,
        isError: nativeIsError,
        error: nativeError,
        transfer: sendTransaction
      }
    : { data, isError, error, transfer: write };
};
export default useTransferTransaction;
