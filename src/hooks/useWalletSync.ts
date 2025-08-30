import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { useAppDispatch } from "@/store/hook";
import {
  setWalletConnection,
  disconnectWallet,
} from "@/store/slices/walletSlice";

export const useWalletSync = () => {
  const dispatch = useAppDispatch();
  const { address, isConnected, chainId } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  useEffect(() => {
    if (isConnected && address) {
      dispatch(
        setWalletConnection({
          isConnected: true,
          address,
          chainId: chainId,
          balance: balance?.formatted,
        })
      );
    } else {
      dispatch(disconnectWallet());
    }
  }, [isConnected, address, chainId, balance, dispatch]);
};
