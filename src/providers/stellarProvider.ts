import { Horizon, SorobanRpc } from "@stellar/stellar-sdk";
import { WalletProvider, AccountData } from "../types/WalletProvider";

const horizon = new Horizon.Server("https://horizon.stellar.org");
const soroban = new SorobanRpc.Server("https://horizon.stellar.org");

export const stellarProvider: WalletProvider = {
  getAccountData: async (address: string): Promise<AccountData> => {
    try {
      const account = await horizon.loadAccount(address);

      const balances = account.balances.map((balance) => {
        console.log("balance", balance);
        return {
          asset: balance.asset_type === "native" ? "XLM" : `${balance}`,
          amount: balance.balance,
        };
      });

      return { balances };
    } catch (error: any) {
      console.log("🛑 « error:", error);
      // Check if it's a 404 error
      if (error == "NotFoundError: Not Found") {
        throw { status: 404, message: "Account not found" };
      }
      throw { status: 500, message: error };
    }
  },
  sendTransaction: async (txData: any) => {
    // Implement send transaction logic
    return { success: false };
  },
  // Implement other methods as needed
};
