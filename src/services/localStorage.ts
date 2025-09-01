import { STORAGE_KEYS } from '../utils/constants';

// Local storage service for data persistence
export const localStorageService = {
  // Watchlist operations
  watchlist: {
    save: (data: WatchListState): void => {
      try {
        localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(data));
      } catch (error) {
        console.error('Error saving watchlist to localStorage:', error);
      }
    },

    load: (): WatchListState | null => {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error('Error loading watchlist from localStorage:', error);
        return null;
      }
    },

    clear: (): void => {
      try {
        localStorage.removeItem(STORAGE_KEYS.WATCHLIST);
      } catch (error) {
        console.error('Error clearing watchlist from localStorage:', error);
      }
    },
  },

  // Holdings operations
  holdings: {
    save: (holdings: Record<string, number>): void => {
      try {
        localStorage.setItem(STORAGE_KEYS.HOLDINGS, JSON.stringify(holdings));
      } catch (error) {
        console.error('Error saving holdings to localStorage:', error);
      }
    },

    load: (): Record<string, number> => {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.HOLDINGS);
        return data ? JSON.parse(data) : {};
      } catch (error) {
        console.error('Error loading holdings from localStorage:', error);
        return {};
      }
    },

    clear: (): void => {
      try {
        localStorage.removeItem(STORAGE_KEYS.HOLDINGS);
      } catch (error) {
        console.error('Error clearing holdings from localStorage:', error);
      }
    },
  },

  // Utility functions
  clearAll: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing all localStorage data:', error);
    }
  },
};