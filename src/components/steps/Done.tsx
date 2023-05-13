import React from 'react';

import { Transaction } from '@/models/transaction';

import Button from '../Button';

interface DoneProps {
  type: Transaction['type'];
  onBackHome: () => void;
}
const Done = ({ type, onBackHome }: DoneProps) => {
  return (
    <div className="flex flex-col w-full justify-center items-center mt-16">
      <h1 className="text-2xl text-center mb-4">
        {type === 'request' ? 'Requested' : 'Sent'} 🎉
      </h1>
      <Button label="Back home" onClick={onBackHome} />
    </div>
  );
};

export default Done;
