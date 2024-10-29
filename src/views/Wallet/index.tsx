import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { BaseButton } from "../../components/BaseButton";
import { FlexColumn, PasswordInput, SmallText } from "../../components/Common";
import { WalletContext } from "../../contexts/WalletContext";

export const WalletView = () => {
  const walletContext = useContext(WalletContext);

  return (
    <>
      <FlexColumn>
        <SmallText>button with drawer</SmallText>
        <SmallText>100.000,00</SmallText>
        <SmallText>------------divider-------------</SmallText>
        <SmallText>{JSON.stringify(walletContext?.wallets)}</SmallText>
      </FlexColumn>
    </>
  );
};
