import React from 'react';

import { Button, Requests } from '@/components';

interface SelectTypeProps {
  onSend: () => void;
  onRequest: () => void;
}

const SelectType = ({ onSend, onRequest }: SelectTypeProps) => {
  return (
    <>
      <div>
        <Button label="send crypto" onClick={onSend} />
      </div>
      <div className="mt-4">
        <Button label="make a request" onClick={onRequest} />
      </div>
      <Requests />
    </>
  );
};

export default SelectType;
