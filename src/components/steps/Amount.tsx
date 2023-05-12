import React, { useState } from 'react';
import { NumericFormat, OnValueChange } from 'react-number-format';

import { Button } from '@/components';
import { Token, Transaction } from '@/models/transaction';

interface AmountStepProps {
  type: Transaction['type'];
  token: Token;
  onSetAmount: (amount: number) => void;
}

const AmountStep = ({ onSetAmount, type, token }: AmountStepProps) => {
  const [amount, setAmount] = useState<number>();

  const onValueChange: OnValueChange = ({ floatValue }) => setAmount?.(floatValue);

  const onNext = () => {
    if (!amount) return;

    onSetAmount(amount);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-2xl text-center">
        {type === 'request' ? 'How much to request?' : 'How much to send?'}
      </h1>

      <form className="mt-8">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {token.symbol}
          </div>

          <NumericFormat
            value={amount}
            onValueChange={onValueChange}
            className="mt-4 w-64 h-14 bg-white border-2 border-black rounded-md p-2 block w-full p-4 pl-10 text-center"
            allowedDecimalSeparators={[',', '.']}
            decimalScale={token.decimals}
            inputMode="decimal"
            placeholder="100"
            required
            allowNegative={false}
          />
        </div>
      </form>
      <div className="mt-4 text-center">
        <Button label="next" onClick={onNext} />
      </div>
    </div>
  );
};

export default AmountStep;
