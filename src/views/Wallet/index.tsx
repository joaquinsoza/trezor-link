import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { WalletContext } from "../../contexts/WalletContext";
import { shortenAddress } from "../../helpers/address";
import { useAccountData } from "../../hooks/useAccountData";
import LoadingView from "../Loading";
import MessageCarousel from "../../components/MessageCarousel";

// Main Wallet View Component
export const WalletView = () => {
  const walletContext = useContext(WalletContext);

  const wallet = walletContext?.wallets[0];
  const chain = wallet?.blockchain || "stellar"; // Default to 'stellar'
  const address = wallet?.address || "";

  const { accountData, loading, error } = useAccountData(chain, address);

  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);

  useEffect(() => {
    if (error) {
      console.log("error", error);
      if (error.status === 404) {
        addMessage(error.message);
      } else {
        addMessage(`Error: ${error.message || "An error occurred."}`);
      }
    }
  }, [error]);

  const addMessage = (text: string) => {
    setMessages((prevMessages) => [...prevMessages, { id: Date.now(), text }]);
  };

  const onCloseMessage = (id: number) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  if (loading) {
    return <LoadingView />;
  }

  // Extract balances
  const balances = accountData?.balances || [];
  const xlmBalance =
    balances.find((b: any) => b.asset === "XLM")?.amount || "0";

  return (
    <Container>
      <Header>
        <AccountText>{shortenAddress(address)}</AccountText>
      </Header>
      <BalanceSection>
        <Balance>
          {Number(xlmBalance).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}{" "}
          XLM
        </Balance>
        {/* You can calculate balance change if needed */}
        {/* <BalanceChange>+233.36 +13.27%</BalanceChange> */}
      </BalanceSection>
      <ActionButtons>
        <ActionButton>Receive</ActionButton>
        <ActionButton>Send</ActionButton>
        <ActionButton>Swap</ActionButton>
        <ActionButton>Buy</ActionButton>
      </ActionButtons>
      {/* Add MessageCarousel here */}
      {messages.length > 0 && (
        <MessageCarousel messages={messages} onCloseMessage={onCloseMessage} />
      )}
      <TokenList>
        {balances.map((balance: any, index: any) => (
          <TokenItem key={index}>
            <TokenName>{balance.asset}</TokenName>
            <TokenBalance>{balance.amount}</TokenBalance>
          </TokenItem>
        ))}
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
