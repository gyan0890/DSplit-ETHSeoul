import React from 'react';

import { Button, TokenComponent } from '@/components';
import { Transaction } from '@/models/transaction';

interface ConfirmationProps {
  transaction: Transaction;
  onConfirm: () => void;
}

const Confirmation = ({ transaction, onConfirm }: ConfirmationProps) => {
  const { type, to, token, amount, note } = transaction;

  const confirm = () => {};

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
        <Button label="confirm" onClick={onConfirm} />
      </div>
    </div>
  );
};

export default Confirmation;
