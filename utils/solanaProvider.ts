import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { chainConfig } from "../config/chainConfig";

export const createSolanaProvider = () => {
  return new SolanaPrivateKeyProvider({
    config: { chainConfig: chainConfig },
  });
};