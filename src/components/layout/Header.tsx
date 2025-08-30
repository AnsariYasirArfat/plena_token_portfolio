import React from "react";
import WalletConnect from "@/components/wallet/WalletConnect";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-plena-component border-b border-border">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-plena-lime rounded-md flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="28" height="28" rx="8" fill="#A9E851" />
            <path d="M6 6L19 9.5L22 22H6V6Z" fill="#18181B" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-white">Token Portfolio</h1>
      </div>

      {/* Wallet Connect Button */}
      <WalletConnect />
    </header>
  );
};

export default Header;
