import Image from 'next/image';

import { Token as TokenType } from '@/models/transaction';

interface TokenProps {
  token: TokenType;
  onClick?: () => void;
}

const Token = ({ token, onClick }: TokenProps) => {
  return (
    <div
      key={token.address}
      className={`border-2 border-black bg-white rounded-lg p-2 ${
        onClick ? 'cursor-pointer' : ''
      } `}
      onClick={onClick}
    >
      <Image
        src={token.imageUrl}
        alt={`${Token.name} logo`}
        width={60}
        height={60}
        className="h-16 w-16"
        unoptimized
      />
    </div>
  );
};

export default Token;
