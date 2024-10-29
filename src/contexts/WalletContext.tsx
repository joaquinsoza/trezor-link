// WalletContext.tsx
import React, { createContext, useState } from "react";

export interface WalletEntry {
  blockchain: string;
  address: string;
  [key: string]: any; // Additional properties
}

export interface WalletContextType {
  wallets: WalletEntry[];
  setWallets: (wallets: WalletEntry[]) => void;
}

export const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallets, setWallets] = useState<WalletEntry[]>([]);

  return (
    <WalletContext.Provider value={{ wallets, setWallets }}>
      {children}
    </WalletContext.Provider>
  );
};
