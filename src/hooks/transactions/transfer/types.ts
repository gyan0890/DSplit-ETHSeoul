import { Token } from '@/models/transaction';

export interface UseTransferTransaction {
  token: Token;
  disconnected: boolean;
  address: `0x${string}`;
  amount: number;
}
