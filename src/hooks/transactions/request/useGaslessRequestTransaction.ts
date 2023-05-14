import { Contract, utils } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import useBiconomy from '@/hooks/useBiconomy';

import { frenmoRequestsAbi } from '../../../../abis';
import { UseRequestTransaction } from './types';

interface Data {
  hash?: `0x${string}`;
}

const useGaslessRequestTransaction = ({
  contract,
  transaction
}: UseRequestTransaction) => {
  const [data, updateData] = useState<Data>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>();

  const { address } = useAccount();

  const { biconomy, gaslessEnabled } = useBiconomy({ contract });

  if (biconomy === undefined) {
    return {
      isFetching: true,
      gaslessEnabled,
      isSuccess,
      isLoading,
      data,
      isError,
      error
    };
  }

  if (biconomy === null || !gaslessEnabled) {
    return {
      isFetching: false,
      gaslessEnabled: false,
      isSuccess,
      isLoading,
      data,
      isError,
      error
    };
  }

  const request = async () => {
    try {
      const provider = await biconomy.provider;
      const contractInstance = new Contract(
        contract,
        frenmoRequestsAbi,
        biconomy.ethersProvider
      );
      const id = new Date().getTime().toString();
      const requestId = utils.formatBytes32String(id);
      const { data: transactionData } =
        await contractInstance.populateTransaction.request(
          requestId,
          transaction.to.address,
          transaction.token.address,
          parseUnits(transaction.amount.toString(), transaction.token.decimals),
          transaction.note
        );
      const txParams = {
        data: transactionData,
        to: contract,
        from: address,
        signatureType: 'EIP712_SIGN',
        gasLimit: 200000
      };
      // @ts-ignore
      await provider.send('eth_sendTransaction', [txParams]);
      setIsLoading(true);
      biconomy.on('txMined', (minedData) => {
        setIsLoading(false);
        setIsSuccess(true);
        updateData(minedData);
      });

      biconomy.on('onError', (error) => {
        setIsError(true);
        setError(error);
        setIsLoading(false);
        setIsSuccess(false);
      });
    } catch (error) {
      console.error('error', error);
      setIsLoading(false);
      setIsSuccess(false);
      setIsError(true);
      setError(error);
    }
  };

  return {
    isFetching: false,
    gaslessEnabled: true,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    request
  };
};

export default useGaslessRequestTransaction;
