export interface User {
  name?: string;
  address: `0x${string}`;
}

export interface Token {
  name: string;
  symbol: string;
  address: `0x${string}`;
  chainId: number;
  decimals: number;
  imageUrl: string;
  coingeckoId: string;
  gasless: boolean;
}

export interface Transaction {
  type: 'send' | 'request';
  to: User;
  chainId: number;
  token: Token;
  amount: number;
  note: string | undefined;
}

export interface Request {
  amount: bigint;
  id: string;
  note: string;
  to: `0x${string}`;
  token: `0x${string}`;
}

export interface Requests {
  [key: number]: Request[];
}
