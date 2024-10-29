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
    async function loadData() {
      const sessionData = await new Promise<{ [key: string]: any }>((resolve) =>
        chrome.storage.session.get([StorageKeys.SESSION_WALLET_DATA], resolve)
      );
      const localData = await new Promise<{ [key: string]: any }>((resolve) =>
        chrome.storage.local.get([StorageKeys.ENCRYPTED_WALLET_DATA], resolve)
      );

      const tempData = !!sessionData[StorageKeys.SESSION_WALLET_DATA];
      const walletData = !!localData[StorageKeys.ENCRYPTED_WALLET_DATA];

      setHasTemporaryData(tempData);
      setHasWalletData(walletData);

      if (!tempData && !walletData) {
        // Both are false, open setup page
        chrome.tabs.create({ url: "/setup.html" });
        window.close();
      }
    }

    loadData();
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
      handleWalletDataLoad({
        wallets: result[StorageKeys.SESSION_WALLET_DATA],
      });
    });
    setHasWalletData(true);
  };

  const handlePasswordEntered = (password: string) => {
    loadWalletData(password, handleWalletDataLoad);
  };

  const handleWalletDataLoad = (walletData: EncryptedWalletData | null) => {
    if (walletData) {
      walletContext?.setWallets(walletData.wallets);
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password.");
    }
  };

  // if (hasWalletData === null) {
  //   // While loading
  //   return (
  //     <Popup>
  //       <div>Loading...</div>
  //     </Popup>
  //   );
  // }

  // Handle loading state
  if (hasTemporaryData === null || hasWalletData === null) {
    // While loading
    return (
      <Popup>
        <div>Loading...</div>
      </Popup>
    );
  }

  if (hasTemporaryData && !hasWalletData) {
    // Should offer to set password to store data localy and clear the session data
    return (
      <Popup>
        <div>Please complete the setup in the newly opened tab.</div>
      </Popup>
    );
  } else if (hasWalletData && !isAuthenticated) {
    // Should Authenticate the user with the password
    return (
      <Popup>
        <PasswordPrompt onPasswordEntered={handlePasswordEntered} />
      </Popup>
    );
  } else if (isAuthenticated) {
    // User is authenticated; show wallet interface
    return (
      <Popup>
        <WalletView />
      </Popup>
    );
  } else {
    // Should not reach here, but handle gracefully
    return (
      <Popup>
        <div>Please complete the setup.</div>
      </Popup>
    );
  }
};

export default App;
