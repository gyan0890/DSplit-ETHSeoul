import { UseRequestTransaction } from './types';
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

  return withGasCall;
};

export default useRequestTransaction;
