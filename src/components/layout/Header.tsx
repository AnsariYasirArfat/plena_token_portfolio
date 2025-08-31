import React from "react";
import WalletConnect from "@/components/wallet/WalletConnect";
import TokenLogo from "@/assets/svg/TokenLogo";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 sm:p-3">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <TokenLogo />
        <h1 className="text-lg font-semibold text-plena-text">Token Portfolio</h1>
      </div>

      {/* Wallet Connect Button */}
      <WalletConnect />
    </header>
  );
};

export default Header;
