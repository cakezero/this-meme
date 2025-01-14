import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { SOLANA_RPC } from "./env";

export const getSolBalance = async (walletAddress: string) => {
  try {
    const connection = new Connection(SOLANA_RPC);

    const walletAddy = new PublicKey(walletAddress);
    const checkedWalletAddress = PublicKey.isOnCurve(walletAddy.toBytes());

    if (!checkedWalletAddress) {
      throw new Error("Invalid wallet address");
    }

    const balance = await connection.getBalance(walletAddy);
    const solBalance = balance / LAMPORTS_PER_SOL;
    return solBalance;

  } catch (error) {
    throw new Error("Error fetching balance");
  }
}
