import Link from 'next/link';
import React from 'react';

import { Button } from '@/components';

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
      <div className="mt-32 hidden">
        <Link href="/" className="text-base">
          see requests
        </Link>
      </div>
    </>
  );
};

export default SelectType;
