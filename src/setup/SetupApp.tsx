// src/setup/SetupApp.tsx
import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { ConnectHardwareWallet } from "../views/ConnectHardwareWallet";
import PasswordSetup from "../views/PasswordSetup";
import { addWallet, EncryptedWalletData } from "../helpers/storage";
import { StorageKeys } from "../constants/storageKeys";

const SetupApp = () => {
  const walletContext = useContext(WalletContext);

  const [hasTemporaryData, setHasTemporaryData] = useState(false);
  const [hasWalletData, setHasWalletData] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    // Check for temporary data and encrypted wallet data
    chrome.storage.local.get(
      [StorageKeys.SESSION_WALLET_DATA, StorageKeys.ENCRYPTED_WALLET_DATA],
      (result) => {
        setHasTemporaryData(!!result[StorageKeys.SESSION_WALLET_DATA]);
        setHasWalletData(!!result[StorageKeys.ENCRYPTED_WALLET_DATA]);
      }
    );
  }, []);

  // TODO: Instead of storing the first wallet in session storage, store all wallets
  //   const handlePasswordSet = (password: string) => {
  //     chrome.storage.local.get(StorageKeys.SESSION_WALLET_DATA, (result) => {
  //       const sessionWalletData = result[StorageKeys.SESSION_WALLET_DATA];
  //       if (Array.isArray(sessionWalletData) && sessionWalletData.length > 0) {
  //         sessionWalletData.forEach((wallet) => {
  //           addWallet(wallet.blockchain, wallet.address, password, walletContext);
  //         });
  //         chrome.storage.local.remove(StorageKeys.SESSION_WALLET_DATA, () => {
  //           setIsSetupComplete(true);
  //         });
  //       } else {
  //         console.error("No session wallet data found or data is invalid.");
  //       }
  //     });
  //   };

  const handlePasswordSet = (password: string) => {
    chrome.storage.session.get(StorageKeys.SESSION_WALLET_DATA, (result) => {
      if (result[StorageKeys.SESSION_WALLET_DATA]) {
        addWallet(
          result[StorageKeys.SESSION_WALLET_DATA][0].blockchain,
          result[StorageKeys.SESSION_WALLET_DATA][0].address,
          password,
          walletContext
        );
      }
      chrome.storage.session.clear();
      handleWalletDataLoad({
        wallets: result[StorageKeys.SESSION_WALLET_DATA],
      });
    });
    setHasWalletData(true);
  };

  const handleWalletDataLoad = (walletData: EncryptedWalletData | null) => {
    if (walletData) {
      walletContext?.setWallets(walletData.wallets);
      //   setIsAuthenticated(true);
    } else {
      alert("Incorrect password.");
    }
  };

  if (isSetupComplete) {
    return (
      <div>
        <h2>Setup Complete</h2>
        <p>You can now use the extension from the popup.</p>
      </div>
    );
  }

  const connectCallback = (response: any) => {
    console.log("connectCallback");
    setHasTemporaryData(true);
  };

  if (!hasTemporaryData && !hasWalletData) {
    // First-time setup: prompt to connect wallet
    return <ConnectHardwareWallet callback={connectCallback} />;
  } else if (hasTemporaryData && !hasWalletData) {
    // Offer to set password
    return <PasswordSetup onPasswordSet={handlePasswordSet} />;
  } else {
    // Should not reach here, but handle gracefully
    return (
      <div>
        <p>
          Setup is already complete. You can use the extension from the popup.
        </p>
      </div>
    );
  }
};

export default SetupApp;
