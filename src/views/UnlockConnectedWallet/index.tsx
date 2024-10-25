import React, { useState } from "react";
import { BaseButton } from "../../components/BaseButton";
import { FlexColumn, PasswordInput, SmallText } from "../../components/Common";

export const UnlockConnectedWallet = () => {
  const [password, setPassword] = useState(""); //TODO: This should just be a ref
  const [testText, setTestText] = useState();
  // chrome.storage.local.set()
  const UnlockWallet = () => {
    console.log(
      "TODO: This should decrypt the publicKey with the password and grant access to the wallets"
    );
    chrome.storage.local.set({ password: password });
  };

  const ReadStorage = async () => {
    const storageText = await chrome.storage.local.get("password");
    console.log(storageText);
    // setTestText(storageTextas);
  };

  return (
    <>
      <FlexColumn color="white">
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: "white",
            marginBottom: "4rem",
          }}
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <BaseButton width="85%" size="md" onClick={UnlockWallet}>
          Unlock wallet
        </BaseButton>
        <BaseButton width="85%" size="md" onClick={ReadStorage}>
          read storage
        </BaseButton>
        {testText}
      </FlexColumn>
    </>
  );
};
