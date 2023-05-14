import { constants } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
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
  const nativeToken = token.address === constants.AddressZero;

  const { config, error } = usePrepareContractWrite({
    address: token.address,
    abi: erc20ABI,
    functionName: 'transfer',
    enabled: !disconnected && !nativeToken,
    args: [address, parseUnits(amount.toString(), token.decimals)]
  });

  const { config: nativeConfig, error: nativeError } = usePrepareSendTransaction({
    request: {
      to: address,
      value: parseUnits(amount.toString(), token.decimals)
    },
    enabled: !disconnected && nativeToken
  });

  return nativeToken ? { config: nativeConfig, error: nativeError } : { config, error };
};

export default usePrepareTransferTransaction;
