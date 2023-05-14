import { constants } from 'ethers';
import React from 'react';
import { toast } from 'react-toastify';
import { useAccount, useNetwork, useSwitchNetwork, useWaitForTransaction } from 'wagmi';
import { polygon } from 'wagmi/chains';

import { Button, TokenComponent, TransactionLink } from '@/components';
import {
	usePrepareTransferTransaction, useRequestTransaction, useTransactionFeedback,
	useTransferTransaction
} from '@/hooks/';
import { enabledChains, requestContracts } from '@/models/chains';
import { Transaction } from '@/models/transaction';
import { useConnectModal } from '@rainbow-me/rainbowkit';

interface ConfirmationProps {
  transaction: Transaction;
  onConfirm: () => void;
}

const Confirmation = ({ transaction, onConfirm }: ConfirmationProps) => {
  const { type, to, token, amount, note, chainId } = transaction;
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { chain } = useNetwork();
  const needsToSwitchNetwork = chain?.id !== chainId;
  const { switchNetwork } = useSwitchNetwork();
  const destinationChain = enabledChains.find((c) => c.id === chainId);
  const request = type === 'request';
  const disconnected = !address || !chain;

  const { config, error: sendPrepareError } = usePrepareTransferTransaction({
    token,
    disconnected,
    amount,
    address: to.address
  });

  const {
    data,
    isError: sendIsError,
    error: sendError,
    transfer
  } = useTransferTransaction(config, token.address === constants.AddressZero);

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  const {
    data: requestData,
    isSuccess: requestIsSuccess,
    isError: requestIsError,
    error: requestError,
    request: requestToken
  } = useRequestTransaction({
    disconnected,
    transaction,
    address: requestContracts[chain?.id || polygon.id]
  });

  useTransactionFeedback({
    hash: (request ? requestData : data)?.hash,
    isSuccess: request ? requestIsSuccess : isSuccess,
    isError: request ? requestIsError : sendIsError,
    error: request ? requestError : sendError,
    Link: <TransactionLink hash={(request ? requestData : data)?.hash} />,
    onNotificationShow: onConfirm
  });

  const confirm = () => {
    const error = request ? requestError : sendPrepareError;
    if (disconnected) {
      openConnectModal?.();
    } else if (needsToSwitchNetwork) {
      switchNetwork?.(chainId);
    } else if (error) {
      // @ts-expect-error
      toast.error(error.shortMessage, {
        theme: 'dark',
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
      });
    } else {
      request ? requestToken?.() : transfer?.();
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-2xl text-center">{type === 'request' ? 'Request' : 'Send'}</h1>

      {!!to.name ? (
        <div className="flex flex-col justify-center items-center mt-4">
          <strong className="text-2xl font-bold">{to.name}</strong>
          <span className="text-sm">{to.address}</span>
        </div>
      ) : (
        <span className="text-xl mt-4">{to.address}</span>
      )}

      <div className="mt-4">
        <TokenComponent token={token} />
      </div>

      <strong className="text-2xl font-bold mt-6">
        {amount} {token.symbol}
      </strong>

      {note && (
        <>
          <h1 className="text-2xl text-center mt-4">for</h1>
          <strong className="text-2xl font-bold mt-4">{note}</strong>
        </>
      )}

      <div className="mt-4 text-center">
        <Button
          label={
            disconnected
              ? 'connect wallet'
              : needsToSwitchNetwork
              ? `switch to ${destinationChain?.name}`
              : 'confirm'
          }
          onClick={confirm}
        />
      </div>
    </div>
  );
};

export default Confirmation;
