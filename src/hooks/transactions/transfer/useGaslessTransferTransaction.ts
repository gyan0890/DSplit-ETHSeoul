import { BigNumber } from 'ethers';
import { Interface, parseUnits } from 'ethers/lib/utils';
import { useState } from 'react';
import { erc20ABI, useAccount, useContractReads } from 'wagmi';

import useBiconomy from '@/hooks/useBiconomy';
import { sendSignedTransaction } from '@/utils/signing/sending';
import { signGaslessTransaction } from '@/utils/signing/signing';

import { UseTransferTransaction } from './types';

interface Data {
  hash?: `0x${string}`;
}

const noncesAbi = [
  'function name() public view returns (string)',
  'function getNonce(address user) public view returns (uint256 nonce)',
  'function _nonces(address user) public view returns (uint256)',
  'function nonces(address user) public view returns (uint256)'
];

const useGaslessTransferTransaction = ({
  address: to,
  amount,
  token
}: UseTransferTransaction) => {
  const [data, updateData] = useState<Data>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>();

  const { address: userAddress } = useAccount();
  const tokenAddress = token.address;

  const { biconomy, gaslessEnabled } = useBiconomy({ contract: tokenAddress });

  const tokenContract = { address: tokenAddress, abi: noncesAbi };
  const {
    data: reads,
    isSuccess: dataReadSuccess,
    isFetching
  } = useContractReads({
    contracts: [
      { ...tokenContract, functionName: 'name' },
      { ...tokenContract, functionName: 'getNonce', args: [userAddress] },
      { ...tokenContract, functionName: '_nonces', args: [userAddress] },
      { ...tokenContract, functionName: 'nonces', args: [userAddress] }
    ]
  });

  if (isFetching || biconomy === undefined) {
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

  const [name, getNonce, noncesResult, nonces] = reads as [
    string | undefined,
    BigNumber | undefined,
    BigNumber | undefined,
    BigNumber | undefined
  ];
  const nonce = getNonce || noncesResult || nonces;

  if (biconomy === null || !gaslessEnabled || (dataReadSuccess && (!name || !nonce))) {
    return {
      isFetching,
      gaslessEnabled: false,
      isSuccess,
      isLoading,
      data,
      isError,
      error
    };
  }

  const transfer = async () => {
    const contractInterface = new Interface(erc20ABI);
    const functionSignature = contractInterface.encodeFunctionData('transfer', [
      to,
      parseUnits(`${amount}`, token.decimals)
    ]);
    const { r, s, v } = await signGaslessTransaction({
      userAddress: userAddress!,
      contract: tokenAddress,
      name: name!,
      nonce: nonce!,
      chainId: token.chainId,
      functionSignature
    });

    try {
      setIsLoading(true);
      biconomy.on('txMined', (minedData) => {
        setIsLoading(false);
        setIsSuccess(true);
        updateData(minedData);
      });

      biconomy.on('onError', (error) => {
        console.error('error', error);
        setIsLoading(false);
        setIsSuccess(false);
        setIsError(true);
        setError(error);
      });

      sendSignedTransaction({
        biconomy,
        userAddress: userAddress!,
        tokenAddress,
        functionSignature,
        r,
        s,
        v
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
    transfer
  };
};

export default useGaslessTransferTransaction;
