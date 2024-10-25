import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ConnectHardwareWallet } from "./views/ConnectHardwareWallet";
import { UnlockConnectedWallet } from "./views/UnlockConnectedWallet";
import { WalletView } from "./views/Wallet";
import { StorageKeys } from "./constants/storageKeys";
// import "styles.css";

interface MessageResponse {
  success: boolean;
  [key: string]: any; // Adjust according to the actual response structure
}

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

const Popup = styled.div`
  width: 100%;
  height: 100%;
`;

const App = () => {
  const [stellarWallet, setStellarWallet] = useState();
  // i should get the storage first to check if there are any wallet connected
  useEffect(() => {
    chrome.storage.local.get(StorageKeys.STELLAR_WALLET).then((response) => {
      console.log("🚀 « response:", response);
      // setStellarWallet(response);
    });
  }, []);

  // MOCKUPS
  //TODO: get somehow if there is any information stored for a wallet
  const isFirstConnection = false;
  //TODO should then decrypt the wallet with the password and then show it and keep it unlocked for x time
  const isUnlockable = true;
  // TODO: Know if its unlocked
  const isUnlocked = false;

  return (
    <Popup>
      {isFirstConnection && <ConnectHardwareWallet />}
      {isUnlockable && <UnlockConnectedWallet />}
      {isUnlocked && <WalletView />}
    </Popup>
  );
};

export default App;
