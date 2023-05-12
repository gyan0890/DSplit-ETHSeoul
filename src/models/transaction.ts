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
}

export interface Transaction {
  type: 'send' | 'request';
  to: User;
  chainId: number;
  token: Token;
  amount: number;
  note: string | undefined;
}
