import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
}

const initialState: WalletState = {
  isConnected: false,
  address: null,
  chainId: null,
  balance: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletConnection: (
      state,
      action: PayloadAction<{
        isConnected: boolean;
        address?: string;
        chainId?: number;
        balance?: string;
      }>
    ) => {
      state.isConnected = action.payload.isConnected;
      if (action.payload.address) state.address = action.payload.address;
      if (action.payload.chainId) state.chainId = action.payload.chainId;
      if (action.payload.balance) state.balance = action.payload.balance;
    },
    disconnectWallet: (state) => {
      state.isConnected = false;
      state.address = null;
      state.chainId = null;
      state.balance = null;
    },
  },
});

export const { setWalletConnection, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;
