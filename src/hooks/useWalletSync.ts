import { useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import { useAppDispatch } from "@/store/hook";
import { setWalletConnection, disconnectWallet } from "@/store/slices/walletSlice";

export function useWalletSync() {
  const dispatch = useAppDispatch();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  useEffect(() => {
    if (isConnected && address) {
      dispatch(
        setWalletConnection({
          isConnected: true,
          address,
          chainId,
        })
      );
    } else {
      dispatch(disconnectWallet());
    }
  }, [isConnected, address, chainId, dispatch]);
}
