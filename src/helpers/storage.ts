import { StorageKeysAddress } from "../constants/storageKeys";
import { WalletContextType } from "../contexts/WalletContext";
import { decryptData, encryptData } from "./crypto";

export interface EncryptedWalletData {
  wallets: Array<{
    blockchain: string;
    address: string;
    [key: string]: any; // Additional properties
  }>;
}

export const saveWalletData = (
  walletData: EncryptedWalletData,
  password: string
) => {
  const dataString = JSON.stringify(walletData);
  const ciphertext = encryptData(dataString, password);

  chrome.storage.local.set({ encryptedWalletData: ciphertext }, () => {
    console.log("Wallet data saved securely.");
  });
};

export const loadWalletData = (
  password: string,
  callback: (data: EncryptedWalletData | null) => void
) => {
  chrome.storage.local.get("encryptedWalletData", (result) => {
    if (result.encryptedWalletData) {
      try {
        const decryptedData = decryptData(result.encryptedWalletData, password);

        if (decryptedData) {
          const walletData = JSON.parse(decryptedData) as EncryptedWalletData;
          callback(walletData);
        } else {
          console.error("Incorrect password.");
          callback(null);
        }
      } catch (error) {
        console.error("Decryption failed:", error);
        callback(null);
      }
    } else {
      console.error("No wallet data found.");
      callback(null);
    }
  });
};

export const addWallet = (
  blockchain: string,
  address: string,
  password: string,
  walletContext: WalletContextType | null
) => {
  loadWalletData(password, (existingData) => {
    const wallets = existingData?.wallets || [];
    wallets.push({ blockchain, address });

    saveWalletData({ wallets }, password);
    walletContext?.setWallets(wallets);
  });
};
