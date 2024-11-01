// hooks/useAccountData.ts
import { useState, useEffect } from "react";
import { WalletProvider } from "../types/WalletProvider";
import { stellarProvider } from "../providers/stellarProvider";
import { evmProvider } from "../providers/evmProvider";

export const useAccountData = (chain: string, address: string) => {
  const [accountData, setAccountData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let provider: WalletProvider;
    let isMounted = true;

    switch (chain) {
      case "stellar":
        provider = stellarProvider;
        break;
      case "ethereum":
        provider = evmProvider;
        break;
      // ... other chains
      default:
        setError({ message: `Unsupported chain: ${chain}` });
        setLoading(false);
        return;
    }

    provider
      .getAccountData(address)
      .then((data) => {
        if (isMounted) {
          setAccountData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [chain, address]);

  return { accountData, loading, error };
};
