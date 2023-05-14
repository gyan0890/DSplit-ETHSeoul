import { UseRequestTransaction } from './types';
import useGaslessRequestTransaction from './useGaslessRequestTransaction';
import useGasRequestTransaction from './useGasRequestTransaction';

const useRequestTransaction = ({
  disconnected,
  contract,
  transaction
}: UseRequestTransaction) => {
  const {
    token: { gasless }
  } = transaction;

  const withGasCall = useGasRequestTransaction({ disconnected, contract, transaction });

  const {
    gaslessEnabled,
    isFetching,
    isLoading,
    isSuccess,
    data,
    isError,
    error,
    request
  } = useGaslessRequestTransaction({ contract, transaction });

  if (!isFetching && gaslessEnabled) {
    return { isLoading, isSuccess, data, isError, error, request };
  }

  return withGasCall;
};

export default useRequestTransaction;
