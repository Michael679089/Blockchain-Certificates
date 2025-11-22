
'use client'

import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "../../server-sided/thirdweb/client";
import { createWallet } from "thirdweb/wallets";









export function ThirdWebConnectButtonPrimary() {
  return (
    <ConnectButton
      client={client}
      connectModal={{ size: "compact" }}
      theme={darkTheme({
        colors: {
          primaryButtonBg: "hsl(198, 100%, 15%)",
          primaryButtonText: "hsl(0, 0%, 100%)",
        },
      })}
      wallets={[createWallet("io.metamask")]} // Only MetaMask
      connectButton={{
        label: (
          <span className="inline-flex items-center gap-2">
            <img
              src="/pictures/icons/MetaMask-icon-fox.svg"
              alt="MetaMask"
              className="h-5 w-5 pointer-events-none"
            />
            <span>Connect Wallet</span>
          </span>
        ),
      }}
    />
  );
}