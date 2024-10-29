import React from "react";
import { BaseButton } from "../../components/BaseButton";
import { FlexColumn, SmallText } from "../../components/Common";

export const ConnectHardwareWallet = () => {
  const ConnectWallet = () => {
    chrome.runtime.sendMessage({ action: "getStellarAddress" });
  };

  return (
    <>
      <FlexColumn>
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: "white",
            marginBottom: "4rem",
          }}
        />

        <BaseButton width="85%" size="lg" onClick={ConnectWallet}>
          Connect Hardware Wallet
        </BaseButton>
        <SmallText>lorem ipsum, some warning or info</SmallText>
      </FlexColumn>
    </>
  );
};
