import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ConnectHardwareWallet } from "./views/ConnectHardwareWallet";
import { WalletView } from "./views/Wallet";
import PasswordSetup from "./views/PasswordSetup";
import PasswordPrompt from "./views/PasswordPrompt";
import {
  addWallet,
  EncryptedWalletData,
  loadWalletData,
} from "./helpers/storage";
import { WalletContext } from "./contexts/WalletContext";
import { StorageKeys } from "./constants/storageKeys";

const Popup = styled.div`
  width: 100%;
  height: 100%;
`;

const App = () => {
  const walletContext = useContext(WalletContext);

  const [hasTemporaryData, setHasTemporaryData] = useState(false);
  const [hasWalletData, setHasWalletData] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    chrome.storage.session.get(StorageKeys.SESSION_WALLET_DATA, (result) => {
      setHasTemporaryData(!!result[StorageKeys.SESSION_WALLET_DATA]);
      chrome.runtime.sendMessage({ logger: result });
    });

    // Check if an encrypted address is stored
    chrome.storage.local.get(StorageKeys.ENCRYPTED_WALLET_DATA, (result) => {
      setHasWalletData(!!result[StorageKeys.ENCRYPTED_WALLET_DATA]);
      chrome.runtime.sendMessage({ logger: result });
    });
  }, []);

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
    });
    setHasWalletData(true);
    setIsAuthenticated(true);
  };

  const handlePasswordEntered = (password: string) => {
    const handleWalletDataLoad = (walletData: EncryptedWalletData | null) => {
      if (walletData) {
        walletContext?.setWallets(walletData.wallets);
        setIsAuthenticated(true);
      } else {
        alert("Incorrect password.");
      }
    };
    loadWalletData(password, handleWalletDataLoad);
  };

  if (!hasTemporaryData && !hasWalletData) {
    // First-time setup: prompt to set a password and connect wallet
    return (
      <Popup>
        <ConnectHardwareWallet />
      </Popup>
    );
  } else if (hasTemporaryData && !hasWalletData) {
    // Should offer to set password to store data localy and clear the session data
    return (
      <Popup>
        <PasswordSetup onPasswordSet={handlePasswordSet} />
      </Popup>
    );
  } else if (hasWalletData && !isAuthenticated) {
    // Should Authenticate the user with the password
    return (
      <Popup>
        <PasswordPrompt onPasswordEntered={handlePasswordEntered} />
      </Popup>
    );
  } else {
    // User is authenticated; show wallet interface
    return (
      <Popup>
        <WalletView />
      </Popup>
    );
  }
};

export default App;
