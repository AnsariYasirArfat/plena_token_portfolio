import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { localStorageService } from '../../services/localStorage';

// Load initial wallet state from localStorage
const loadInitialWalletState = () => {
  return localStorageService.wallet.loadConnectionState();
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    isConnected: loadInitialWalletState(),
    address: null as string | null,
    chainId: null as number | null,
    isLoading: false,
    error: null as string | null,
  },
  reducers: {
    // Connect wallet
    connectWallet: (state, action: PayloadAction<{ address: string; chainId: number }>) => {
      state.isConnected = true;
      state.address = action.payload.address;
      state.chainId = action.payload.chainId;
      state.error = null;
      
      localStorageService.wallet.saveConnectionState(true);
    },

    // Disconnect wallet
    disconnectWallet: (state) => {
      state.isConnected = false;
      state.address = null;
      state.chainId = null;
      state.error = null;
      
      localStorageService.wallet.clearConnectionState();
    },

    // Set loading state
    setWalletLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error state
    setWalletError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Update wallet address
    updateWalletAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

export const {
  connectWallet,
  disconnectWallet,
  setWalletLoading,
  setWalletError,
  updateWalletAddress,
} = walletSlice.actions;

export default walletSlice.reducer;
