export interface WalletProvider {
  getAccountData: (address: string) => Promise<AccountData>;
  sendTransaction: (txData: any) => Promise<TransactionResult>;
  // Add other methods as needed
}

export interface AccountData {
  balances: Balance[];
  // Add other account data properties
}

export interface Balance {
  asset: string;
  amount: string;
}

export interface TransactionResult {
  success: boolean;
  // Add other properties as needed
}
