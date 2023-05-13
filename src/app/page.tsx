'use client';
import React, { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

import { AddNote, Address, Amount, Chain, Done, SelectType, Token } from '@/components/steps';
import Confirmation from '@/components/steps/Confirmation';
import { Token as TokenType, Transaction } from '@/models/transaction';

const SELECT_TYPE_STEP = 0;
const ADDRESS_STEP = 1;
const CHAIN_STEP = 2;
const TOKEN_STEP = 3;
const AMOUNT_STEP = 4;
const NOTE_STEP = 5;
const CONFIRM_STEP = 6;
const DONE = 7;

const IndexPage = () => {
  const [step, setStep] = useState(SELECT_TYPE_STEP);
  const [transaction, setTransaction] = useState<Transaction>({} as Transaction);
  const { chain } = useNetwork();

  const onSelectType = (type: Transaction['type']) => {
    setTransaction({ ...transaction, ...{ type } });
    setStep(ADDRESS_STEP);
  };

  const onSetDestination = (to: Transaction['to']) => {
    setTransaction({ ...transaction, ...{ to } });
    setStep(CHAIN_STEP);
  };

  const onSelectChain = (chainId: number) => {
    setTransaction({ ...transaction, ...{ chainId } });
    setStep(TOKEN_STEP);
  };

  const onSelectToken = (token: TokenType) => {
    setTransaction({ ...transaction, ...{ token } });
    setStep(AMOUNT_STEP);
  };

  const onSetAmount = (amount: number) => {
    setTransaction({ ...transaction, ...{ amount } });
    setStep(NOTE_STEP);
  };

  const onSetNote = (note: string) => {
    setTransaction({ ...transaction, ...{ note } });
    setStep(CONFIRM_STEP);
  };

  const reset = () => {
    setTransaction({} as Transaction);
    setStep(SELECT_TYPE_STEP);
  };

  useEffect(() => {
    if (chain && step === CONFIRM_STEP && chain.id !== transaction.chainId) {
      setStep(CHAIN_STEP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  switch (step) {
    case SELECT_TYPE_STEP:
      return (
        <SelectType
          onSend={() => onSelectType('send')}
          onRequest={() => onSelectType('request')}
        />
      );
    case ADDRESS_STEP:
      return <Address type={transaction.type} onSetDestination={onSetDestination} />;
    case CHAIN_STEP:
      return <Chain type={transaction.type} onSelectChain={onSelectChain} />;
    case TOKEN_STEP:
      return <Token chainId={transaction.chainId} onSelectToken={onSelectToken} />;
    case AMOUNT_STEP:
      return (
        <Amount
          type={transaction.type}
          onSetAmount={onSetAmount}
          token={transaction.token}
        />
      );
    case NOTE_STEP:
      return <AddNote onSetNote={onSetNote} />;
    case CONFIRM_STEP:
      return <Confirmation transaction={transaction} onConfirm={() => setStep(DONE)} />;
    case DONE:
      return <Done onBackHome={reset} type={transaction.type} />;
  }
};

export default IndexPage;
