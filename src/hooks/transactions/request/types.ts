import { Transaction } from '@/models/transaction';

export interface UseRequestTransaction {
  disconnected?: boolean;
  contract: `0x${string}`;
  transaction: Transaction;
}
