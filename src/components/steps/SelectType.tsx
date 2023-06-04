import React from 'react';

import { Button, Requests } from '@/components';

interface SelectTypeProps {
  onSend: () => void;
  onRequest: () => void;
}

const SelectType = ({ onSend, onRequest }: SelectTypeProps) => {
  return (
    <>
      <div className="mt-4">
        <Button label="Add Expense" onClick={onSend} />
      </div>
      <div className="mt-4">
        <Button label="Add Group" onClick={onRequest} />
      </div>
      <div className="mt-4">
        <Button label="View Expenses" onClick={onSend} />
      </div>
      <div className="mt-4">
        <Button label="View Groups" onClick={onRequest} />
      </div>
      <Requests />
    </>
  );
};

export default SelectType;
