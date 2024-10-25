import React from "react";
import styled from "styled-components";
import { BaseButton } from "../../components/BaseButton";
import { FlexColumn, PasswordInput, SmallText } from "../../components/Common";

export const WalletView = () => {
  // chrome.storage.local.set()

  return (
    <>
      <FlexColumn>
        <SmallText>button with drawer</SmallText>
        <SmallText>100.000,00</SmallText>
        <SmallText>------------divider-------------</SmallText>
      </FlexColumn>
    </>
  );
};
