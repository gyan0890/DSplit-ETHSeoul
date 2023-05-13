import { parseUnits, zeroAddress } from 'viem';
import { erc20ABI, usePrepareContractWrite, usePrepareSendTransaction } from 'wagmi';

import { Token } from '@/models/transaction';

interface UsePrepareTransferTransactionProps {
  token: Token;
  disconnected: boolean;
  address: `0x${string}`;
  amount: number;
}
const usePrepareTransferTransaction = ({
  token,
  address,
  amount,
  disconnected
}: UsePrepareTransferTransactionProps) => {
  const nativeToken = token.address === zeroAddress;
  const { config, error } = usePrepareContractWrite({
    address: token.address,
    abi: erc20ABI,
    functionName: 'transfer',
    enabled: !disconnected && !nativeToken,
    args: [address, parseUnits(`${amount}`, token.decimals)]
  });

  const { config: nativeConfig, error: nativeError } = usePrepareSendTransaction({
    to: address,
    value: parseUnits(`${amount}`, token.decimals),
    enabled: !disconnected && nativeToken
  });

  return nativeToken ? { config: nativeConfig, error: nativeError } : { config, error };
};

export default usePrepareTransferTransaction;
