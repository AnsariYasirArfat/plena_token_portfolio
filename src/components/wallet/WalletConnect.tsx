import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import PlenaWallet from "@/assets/svg/PlenaWallet";

const WalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 px-3 py-2 bg-plena-lime rounded-lg">
          <PlenaWallet />

          <span className="text-sm font-medium text-plena-base">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => disconnect()}
          className="text-plena-text hover:text-plena-lime hover:bg-red-400"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button
                    variant={"plena"}
                    onClick={openConnectModal}
                    className=" rounded-full"
                  >
                    <PlenaWallet />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    className="bg-red-500 text-plena-text hover:bg-red-600"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={openChainModal}
                    className="text-plena-text hover:text-plena-lime"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <div className="flex items-center space-x-2 px-3 py-2 bg-plena-component rounded-lg">
                    <PlenaWallet />

                    <span className="text-sm font-medium text-plena-text">
                      {account.address.slice(0, 6)}...
                      {account.address.slice(-4)}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnect;
