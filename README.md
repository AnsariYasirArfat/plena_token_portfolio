# Plena Finance Token Portfolio Assignment

A modern, responsive token portfolio dashboard built with React, Vite, TypeScript, Redux Toolkit, Tailwind CSS, and wagmi for wallet integration, showcasing real-time crypto market data and user watchlist management.

## 🚀 Live Demo
[View Live on Vercel](https://plena-token-portfolio.vercel.app/) 

## 📋 Project Overview
This project is a frontend implementation of a crypto token portfolio dashboard for Plena Finance, featuring:

- A portfolio dashboard with a total value card, donut chart, and watchlist table
- Real-time token data (prices, 24h changes, 7d sparklines) fetched from the CoinGecko API
- A modal for adding tokens to the watchlist with search and trending sections
- Editable token holdings with real-time value calculations
- Wallet connection integration using wagmi
- Responsive design for desktop and mobile, matching provided Figma designs
- State persistence with localStorage for watchlist and holdings
- Optimized rendering and smooth UX with loading, empty, and error states

## 🛠️ Tech Stack

- **Framework**: React (with Vite and TypeScript)
- **State Management**: Redux Toolkit (with RTK Query for API calls)
- **Styling**: Tailwind CSS
- **Charts**: Recharts (for donut chart and sparklines)
- **Wallet Integration**: wagmi (with viem and TanStack Query)
- **Deployment**: Vercel (or Netlify, update as needed)

## 🏁 Setup & Run Instructions

### Clone the repository:
```bash
git clone https://github.com/AnsariYasirArfat/plena_token_portfolio
cd plena-finance-token-portfolio
```

### Install dependencies:
```bash
npm install
```

### Run the development server:
```bash
npm run dev
```

### Open in your browser:
Navigate to `http://localhost:5173`

## 🗂️ Folder & Component Structure

```
/src
├─ components/
│  ├─ layout/
│  │  └─ Header.tsx               # App header with logo and wallet connect
│  ├─ portfolio/
│  │  ├─ PortfolioTotal.tsx       # Portfolio total value card
│  │  ├─ DonutChart.tsx           # Portfolio distribution chart
│  │  └─ PortfolioSummary.tsx     # Portfolio section container
│  ├─ watchlist/
│  │  ├─ Watchlist.tsx            # Main watchlist component
│  │  ├─ WatchlistHeader.tsx      # Watchlist header with refresh button
│  │  ├─ WatchlistTableContent.tsx # Watchlist table content
│  │  ├─ WatchlistRow.tsx         # Individual token row
│  │  ├─ SparklineChart.tsx       # 7-day price trend chart
│  │  └─ Pagination.tsx           # Table pagination controls
│  ├─ modals/
│  │  └─ AddTokenModal.tsx        # Add token search and selection modal
│  └─ wallet/
│     └─ WalletConnect.tsx        # Wallet connection component
├─ store/
│  ├─ store.ts                     # Redux store configuration
│  ├─ hook.ts                      # Typed Redux hooks
│  └─ slices/
│     ├─ apiSlice.ts              # RTK Query for CoinGecko API
│     ├─ watchlistSlice.ts        # Watchlist state management
│     ├─ portfolioSlice.ts        # Portfolio calculations
│     └─ walletSlice.ts           # Wallet connection state
├─ hooks/
│  ├─ useDebounce.ts              # Debounce hook for search
│  └─ useWalletSync.ts            # Wallet state synchronization
├─ services/
│  └─ localStorage.ts              # Local storage utilities
├─ utils/
│  ├─ constants.ts                 # App constants and configuration
│  ├─ helpers.ts                   # Helper functions
│  └─ formatters.ts                # Data formatting utilities
├─ types/
│  ├─ token.d.ts                   # Token-related type definitions
│  ├─ portfolio.d.ts               # Portfolio state types
│  ├─ api.d.ts                     # API response types
│  └─ watchlist.d.ts               # Watchlist state types
├─ config/
│  └─ wagmi.ts                     # Wagmi wallet configuration
├─ App.tsx                         # Main app component
├─ main.tsx                        # Entry point with providers
└─ index.css                       # Tailwind CSS and custom styles
```

## ⚙️ Key Features & Implementation Details

### Portfolio Dashboard

**Portfolio Total Card:**
- Displays sum of token values (holdings × price) and last updated timestamp
- Donut chart (Recharts) visualizes portfolio breakdown, with colors matching watchlist items

**Watchlist Table:**
- Columns: Token (logo, name, symbol), Price, 24h % (green/red), Sparkline (7d), Holdings (editable input), Value, Row Menu (delete option)
- Pagination footer for large watchlists
- Refresh Prices button triggers API refetch and updates timestamp

**Data Fetching:**
- Uses CoinGecko API (`/coins/markets`) for prices, 24h changes, and 7d sparklines
- RTK Query handles caching and refetching for performance

### Add Token Modal

**Search Input:**
- Debounced search (300ms delay) using CoinGecko `/search` endpoint
- Displays token logo, name, symbol, and radio button for selection

**Trending Section:**
- Fetches trending tokens via `/search/trending` endpoint
- Shown below search results for quick access

**Add to Watchlist:**
- Footer button enabled only when at least one token is selected
- Adds selected tokens to watchlist and persists to localStorage

### State Management & Persistence

**Redux Toolkit:**
- `watchlistSlice`: Manages token list and holdings
- `portfolioSlice`: Computes total value and tracks last updated timestamp
- `walletSlice`: Stores wagmi connection status
- `apiSlice`: RTK Query for API calls (e.g., fetch prices, search)

**LocalStorage:**
- Watchlist and holdings are persisted using `localStorage.setItem` on state changes
- Restored on app load to maintain state across sessions

**Computed Values:**
- Value (holdings × price) and Portfolio Total (sum of values) calculated via memoized Redux selectors for performance

### Wallet Connection

**wagmi Integration:**
- Connect Wallet button uses wagmi's `useConnect` hook to connect to MetaMask or similar wallets
- Displays connected status or wallet address in the UI
- Watchlist persists independently of wallet connection, as per requirements


## 🧩 How Core Features Are Implemented

### Real-Time Data & Refresh

- Prices and 24h changes fetched via `/coins/markets` endpoint, triggered on mount and by Refresh Prices button
- Sparklines use 7d price data from the same endpoint, rendered with Recharts
- Timestamp updated on successful fetch using `new Date().toISOString()`

### Editable Holdings

- Holdings input updates Redux state on change, recalculating Value and Portfolio Total in real-time
- Persisted to localStorage to restore on reload
- Debounced to prevent excessive updates

### Wallet Integration

- wagmi configured with public provider for Ethereum mainnet/testnet
- `<WagmiProvider>` wraps app in `Provider.tsx`
- Connection status displayed in UI, with no impact on watchlist persistence

### Responsive Design

- Tailwind CSS used for mobile-first styling
- Table stacks on mobile, chart sizes adjust dynamically
- Figma measurements (padding, fonts, colors) followed closely for pixel-perfect UI

## 📸 Screenshots
![Desktop Image 1](/public/screenshots/image1.png)
![Desktop Image 2](/public/screenshots/image2.png)
![Desktop Image 3](/public/screenshots/image3.png)
![Desktop Image 4](/public/screenshots/image4.png)
![Desktop Image 5](/public/screenshots/image5.png)

![Mobile Image 1](/public/screenshots/image6.png)
![Mobile Image 2](/public/screenshots/image7.png)
![Mobile Image 3](/public/screenshots/image8.png)
![Mobile Image 4](/public/screenshots/image9.png)

## 📝 Notes

- **API**: CoinGecko public API used (free tier, no key required). Handles tokens, prices, trends, and search
---

