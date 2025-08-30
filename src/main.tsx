import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import StoreProvider from "@/components/providers/StoreProvider.tsx";
import { WalletProvider } from "./components/providers/WalletProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </StoreProvider>
  </StrictMode>
);
