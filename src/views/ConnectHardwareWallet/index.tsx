import React from "react";
import { BaseButton } from "../../components/BaseButton";
import { FlexColumn, SmallText } from "../../components/Common";

export const ConnectHardwareWallet = ({
  callback,
}: {
  callback: (response: any) => void;
}) => {
  const ConnectWallet = () => {
    chrome.runtime.sendMessage({ action: "getStellarAddress" }, (response) => {
      if (response.success) {
        callback(response);
      } else {
        console.error("Failed to get stellar address");
      }
    });
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
