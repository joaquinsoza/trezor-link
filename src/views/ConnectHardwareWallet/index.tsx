import React from "react";
import styled from "styled-components";
import { BaseButton } from "../../components/BaseButton";
import { FlexColumn, SmallText } from "../../components/Common";

interface MessageResponse {
  success: boolean;
  [key: string]: any; // Adjust according to the actual response structure
}

export const ConnectHardwareWallet = () => {
  const ConnectWallet = () => {
    chrome.runtime.sendMessage(
      { action: "getAddress" },
      (response: MessageResponse) => {
        if (response.success) {
          console.info(response);
        } else {
          console.error(response);
        }
      }
    );
  };

  // chrome.storage.local.set()

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
