import React, { useContext } from "react";
import styled from "styled-components";
import { WalletContext } from "../../contexts/WalletContext";
import { shortenAddress } from "../../helpers/address";

// Main Wallet View Component
export const WalletView = () => {
  const walletContext = useContext(WalletContext);

  return (
    <Container>
      <Header>
        <AccountText>
          {shortenAddress(walletContext?.wallets[0].address as string)}
        </AccountText>
      </Header>
      <BalanceSection>
        <Balance>$1,010.05</Balance>
        <BalanceChange>+233.36 +13.27%</BalanceChange>
      </BalanceSection>
      <ActionButtons>
        <ActionButton>Receive</ActionButton>
        <ActionButton>Send</ActionButton>
        <ActionButton>Swap</ActionButton>
        <ActionButton>Buy</ActionButton>
      </ActionButtons>
      <TokenList>
        <TokenItem>
          <TokenName>GG</TokenName>
          <TokenBalance>1000</TokenBalance>
        </TokenItem>
        <TokenItem>
          <TokenName>Ga</TokenName>
          <TokenBalance>1000</TokenBalance>
        </TokenItem>
      </TokenList>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  color: #fff;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AccountName = styled.h2`
  font-size: 16px;
  margin: 0;
`;

const AccountText = styled.p`
  font-size: 14px;
  color: #888;
`;

const BalanceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Balance = styled.h1`
  font-size: 32px;
  margin: 0;
`;

const BalanceChange = styled.p`
  font-size: 14px;
  color: #4caf50;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const ActionButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  margin: 0 5px;
  &:hover {
    background-color: #444;
  }
`;

const TokenList = styled.div`
  margin-top: 20px;
`;

const TokenItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #444;
`;

const TokenName = styled.span`
  font-size: 14px;
`;

const TokenBalance = styled.span`
  font-size: 14px;
  color: #4caf50;
`;
