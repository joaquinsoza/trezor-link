// src/setup/setup.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { WalletProvider } from "../contexts/WalletContext";
import SetupApp from "./SetupApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <WalletProvider>
    <SetupApp />
  </WalletProvider>
);
